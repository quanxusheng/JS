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
/*
=>process.cwd() E:\JS\mini-webpack
=> E:\JS\mini-webpack\webpackConfig
 */
// console.log('=>process.cwd()', process.cwd())
// console.log('=>', path.resolve(__dirname))

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

    // 4. 开始编译, 执行Compiler对象的run方法开始执行编译
    run(callback) {
        console.log('=>', 'run执行了')
        this.hooks.run.call() // 在编译前触发run钩子执行，表示开始启动编译了
        const onCompiled = (err, stats, fileDependencies) => {
            // 10. 确定好输出内容之后，根据配置的输出路径和文件名，将文件内容写入到文件系统 硬盘
            // console.log('=>stats', stats)
            for (let filename in stats.assets) {
                let filePath = path.join(this.webpackOptions.output.path, filename)
                fs.writeFileSync(filePath, stats.assets[filename], 'utf8')
            }

            callback(err, {
                toJson: () => stats,
            })
            // console.log('=>fileDependencies', Array.from(new Set(fileDependencies)))
            Array.from(new Set(fileDependencies)).forEach(fileDep => {
                fs.watch(fileDep, () => this.compile(onCompiled))
            })

            this.hooks.done.call()
        }
        this.compile(onCompiled)
    }

    compile(callback) {
        // 虽然webpack只有一个Compiler，但是每次编译都会产生一个新的Compilation
        // 这里主要是为了考虑watch模式，它会在启动时先编译一次，然后监听文件变化，如果发生变化会重新开始编译
        // 每次编译都会产出一个新的Compilation，代表每次的编译结果
        const compilation = new Compilation(this.webpackOptions)
        compilation.build(callback) // 执行compilation的build方法进行编译，编译成功之后执行回调
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
            // console.log('=>entryModule', entryModule)
            this.modules.push(entryModule)
            // console.log('=>this.modules', this.modules)

            // 8. 等所有模块都编译完成后，根据模块之间的依赖关系，组装代码块 chunk
            let chunk = {
                name: entryName, // entryName='main' 代码块的名称
                entryModule, // 此代码块对应的module的对象，这里就是 src/index.js 的module对象
                modules: this.modules.filter(item => item.names.includes(entryName)), //找出属于该代码块的模块
            }
            this.chunks.push(chunk)
        }
        // console.log('=>this.chunks', this.chunks)
        // 9 把各个代码块 chunk 转换成一个一个文件加入到输出列表
        this.chunks.forEach(chunk => {
            let filename = this.webpackOptions.output.filename.replace('[name]', chunk.name)
            // console.log('=>filename', filename)
            this.assets[filename] = getSource(chunk)
        })

        // 编译完成执行callback
        // console.log('=>this.chunks', this.chunks)
        // console.log('=>this.chunks', this.chunks[0].entryModule.names)
        // console.log('=>this.chunks', this.chunks[0].modules)
        // console.log('=>this.modules', this.modules)
        // console.log('=>this.chunks', this.chunks)
        console.log('=>this.fileDependencies', this.fileDependencies)
        // console.log('=>assets', this.assets)
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
        // console.log('=>sourceCode', sourceCode)
        let moduleId = './' + path.posix.relative(baseDir, modulePath)
        // console.log('=baseDir>', baseDir)
        // console.log('=modulePath>', modulePath)
        // console.log('=moduleId>', moduleId)

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

        // console.log('=>', moduleId, module, sourceCode)
        // console.log('=>sourceCode', sourceCode)
        // 第七步： 找出此模块所依赖的模块，再对依赖模块进行编译
        let ast = parser.parse(sourceCode, { sourceType: 'module' })
        // console.log('=>ast', ast)
        traverse(ast, {
            CallExpression: nodePath => {
                // console.log('=>nodePath', nodePath)
                const { node } = nodePath
                // console.log('=>', node.callee)
                if (node.callee.name === 'require') {
                    let depModuleName = node.arguments[0].value // 获取依赖的模块
                    // console.log('=>node.arguments', node.arguments)
                    // console.log('=>depModuleName', depModuleName)
                    let dirname = path.posix.dirname(modulePath) // 获取当前正在编译模块所在目录
                    // console.log('=>depModuleName', depModuleName)
                    let depModulePath = path.posix.join(dirname, depModuleName) // 获取依赖模块的绝对路径
                    // console.log('=>dirname', dirname)
                    // console.log('=>depModulePath', depModulePath)
                    let extensions = this.webpackOptions.resolve?.extensions || ['.js'] // 获取配置中的extensions
                    depModulePath = tryExtensions(depModulePath, extensions) // 尝试添加后缀，找到一个真实在硬盘存在的文件
                    // 7.3 将依赖模块的绝对路径 push 到 this.fileDependencies 中
                    this.fileDependencies.push(depModulePath)
                    // console.log('=>this.fileDependencies', this.fileDependencies)
                    // 7.4 生成依赖模块的模块id
                    let depModuleId = './' + path.posix.relative(baseDir, depModulePath)
                    // 7.5 修改语法结构，把 依赖的模块 改为 依赖模块id require('./name') => require('./src/name.js')
                    // console.log('=>baseDir', baseDir)
                    // console.log('=>depModulePath', depModulePath)
                    // console.log('=>depModuleId', depModuleId)
                    // console.log('=>types.stringLiteral(depModuleId)', types.stringLiteral(depModuleId))
                    node.arguments = [types.stringLiteral(depModuleId)]
                    // console.log('=>node.arguments', node.arguments)
                    // 7.6 将依赖模块的信息push到该模块的 dependencies 属性中
                    module.dependencies.push({ depModuleId, depModulePath })
                    // console.log('=>module', module)
                    // console.log('=>module', module.dependencies)
                }
            },
        })

        // 7.7 生成新代码，并把转译后的代码放到 module._source 属性上
        // console.log('=>ast', ast)
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
        // console.log('=>module', module)
        return module
    }
}

module.exports = {
    Compiler,
}
