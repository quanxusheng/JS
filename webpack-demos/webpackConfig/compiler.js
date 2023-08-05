const fs = require('fs')
const path = require('path')
const { SyncHook } = require('tapable')
const parser = require('@babel/parser') // 将源代码字符串转换成ast抽象语法树
const traverse = require('@babel/traverse').default // 递归ast语法树，分析得到模块间的依赖关系
const generator = require('@babel/generator').default // 将ast语法树转换成代码
const types = require('@babel/types')

const baseDir = toUnixPath(process.cwd())

function toUnixPath(filePath) {
    return filePath.replace(/\\/g, '/')
}
// console.log('=>process.cwd()', process.cwd())

// 获取文件路径
function tryExtensions(modulePath, extensions) {
    if (fs.existsSync(modulePath)) {
        return modulePath
    }
    for (let i = 0; i < extensions?.length; i++) {
        let filePath = modulePath + extensions[i]
        if (fs.existsSync(filePath)) {
            return filePath
        }
    }
    throw new Error(`无法找到${modulePath}`)
}

//生成运行时代码
function getSource(chunk) {
    return `
      (() => {
        var modules = {
          ${chunk.modules.map(
              module => `
            "${module.id}": (module) => {
              ${module._source}
            }
          `
          )}  
        };
        var cache = {};
        function require(moduleId) {
          var cachedModule = cache[moduleId];
          if (cachedModule !== undefined) {
            return cachedModule.exports;
          }
          var module = (cache[moduleId] = {
            exports: {},
          });
          modules[moduleId](module, module.exports, require);
          return module.exports;
        }
        var exports ={};
        ${chunk.entryModule._source}
      })();
 `
}

class Compiler {
    constructor(webpackOptions) {
        this.webpackOptions = webpackOptions
        this.hooks = {
            run: new SyncHook(),
            done: new SyncHook(),
        }
    }

    // 开始编译
    run(callback) {
        this.hooks.run.call()
        const onCompiled = () => {
            this.hooks.done.call()
        }
        this.compile(onCompiled)
    }

    compile(callback) {
        const compilation = new Compilation(this.webpackOptions)
        compilation.build(callback)
    }
}

class Compilation {
    constructor(webpackOptions) {
        this.webpackOptions = webpackOptions
        this.modules = [] // 本次编译所有生成出来的模块
        this.chunks = [] // 本次编译产出的所有代码块，入口模块和依赖的模块打包在一起为代码块
        this.assets = {} // 本次编译产出的资源文件
        this.fileDependencies = [] // 本次打包涉及到的文件，主要是为了实现watch模式下监听文件的变化，文件发生变化后会重新编译
    }

    build(callback) {
        let entry = {}

        // 5.根据entry找到入口文件

        // 6. 从入口文件触发，调用配置的 loader 规则，对各模块进行编译
        const { entry: tempEntry } = this.webpackOptions
        if (typeof tempEntry === 'string') {
            entry.main = tempEntry
        } else {
            entry = tempEntry
        }

        for (let entryName in entry) {
            // entryName='main' entryName就是entry的属性名，也将会成为代码块的名称

            // path.posix 为了解决不同操作系统的路径分隔符，这里拿到的就是入口文件的绝对路径
            let entryFilePath = path.posix.join(baseDir, entry[entryName])

            // 6.1 把入口文件的绝对路径添加到依赖数组[this.fileDenpencies]中，记录此次编译依赖的模块
            this.fileDependencies.push(entryFilePath)
            // 6.2 得到入口模块的 module 对象， 里面存放着该模块的路径，依赖模块，源代码等
            let entryModule = this.buildModule(entryName, entryFilePath)

            this.modules.push(entryModule)
            // console.log('=>this.modules', this.modules)

            // 8. 等所有模块都编译完成后，根据模块之间的依赖关系，组装代码块 chunk
            let chunk = {
                name: entryName, // entryName='main' 代码块的名称
                entryModule, // 此代码块对应的module的对象，这里就是 src/index.js 的module对象
                modules: this.modules.filter(item => item.names.includes(entryName)), //找出属于改代码块的模块
            }
            this.chunks.push(chunk)
        }

        // 9 把各个代码块 chunk 转换成一个一个文件加入到输出列表
        this.chunks.forEach(chunk => {
            let filename = this.webpackOptions.output.filename.replace('[name]', chunk.name)
            this.assets[filename] = getSource(chunk)
        })

        // 编译完成执行callback
        callback(
            null,
            {
                chunks: this.chunks,
                modules: this.modules,
                assets: this.assets,
            },
            this.fileDependencies
        )
    }
    //
    buildModule(name, modulePath) {
        // 6.2.1 读取模块内容 获取源代码
        let sourceCode = fs.readFileSync(modulePath, 'utf-8')
        let moduleId = './' + path.posix.relative(baseDir, modulePath)

        // 6.2.2 创建模块对象
        let module = {
            id: moduleId,
            names: [name], // names设计成数组是因为代表的是此模块属于哪个代码块，可能属于多个代码块
            dependencies: [],
            _source: '',
        }

        // 6.2.3 找到对应的Loader对源代码进行翻译和替换
        let loaders = []
        const { rules } = this.webpackOptions.module
        rules.forEach(rule => {
            if (modulePath.match(rule.test)) {
                loaders.push(...rule.use)
            }
        })
        // console.log('=>loaders', loaders)

        sourceCode = loaders.reduceRight((code, loader) => {
            return loader(code)
        }, sourceCode)

        // 通过Loader翻译后的内容一定得是js内容，因为最后走我们的babel/parse，只有js才能编译成AST
        // 第七步： 找出此模块所依赖的模块，再对依赖模块进行编译
        let ast = parser.parse(sourceCode, { sourceType: 'module' })
        // console.log('=>ast', ast)
        traverse(ast, {
            CallExpression: nodePath => {
                // console.log('=>nodePath', nodePath)
                const { node } = nodePath
                if (node.callee.name === 'require') {
                    let depModuleName = node.arguments[0].value // 获取依赖的模块
                    let dirname = path.posix.dirname(modulePath) // 获取当前正在编译模块所在目录
                    // console.log('=>depModuleName', depModuleName)
                    let depModulePath = path.posix.join(dirname, depModuleName) // 获取依赖模块的绝对路径
                    // console.log('=>dirname', dirname)
                    // console.log('=>depModulePath', depModulePath)
                    let extensions = this.webpackOptions.resolve?.extensions || ['.js'] // 获取配置中的extensions
                    depModulePath = tryExtensions(depModulePath, extensions) // 尝试添加后缀，找到一个真实在硬盘存在的文件
                    // 7.3 将依赖模块的绝对路径 push 到 this.fileDependencies 中
                    this.fileDependencies.push(depModulePath)
                    // 7.4 生成依赖模块的模块id
                    let depModuleId = './' + path.posix.relative(baseDir, depModulePath)
                    // 7.5 修改语法结构，把 依赖的模块 改为 依赖模块id require('./name') => require('./src/name.js')
                    node.arguments = [types.stringLiteral(depModuleId)]
                    // console.log('=>node.arguments', node.arguments)
                    // 7.6 将依赖模块的信息push到该模块的 dependencies 属性中
                    module.dependencies.push({ depModuleId, depModulePath })
                    // console.log('=>module', module)
                }
            },
        })

        // 7.7 生成新代码，并把转译后的代码放到 module._source 属性上
        let { code } = generator(ast)
        // console.log('=>code', code)
        module._source = code

        // 7.8 对依赖模块进行编译 对 module 对象中的 dependencies 进行递归执行 buildModule
        module.dependencies.forEach(({ depModuleId, depModulePath }) => {
            // 考虑到多入口打包 一个模块被多个其他模块引用，不需要重复打包
            let existModule = this.modules.find(item => item.id === depModuleId)
            // 如果modules里已经存在这个将要编译的依赖模块了，那么就不要编译了，直接把代码块的名称添加到对应模块的names字段里就可以
            if (existModule) {
                existModule.names.push(name)
            } else {
                // 7.9 对依赖模块编译完成后得到依赖模块的 module 对象，push 到 this.modules 中
                let depModule = this.buildModule(name, depModulePath)
                this.modules.push(depModule)
            }
        })

        // 7.10 等依赖模块全部编译完成后，返回入口模块的 module 对象
        console.log('=>module', module)
        return module
    }
}

module.exports = {
    Compiler,
}
