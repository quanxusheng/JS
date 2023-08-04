const { SyncHook } = require('tapable')
const fs = require('fs')

const baseDir = toUnixPath(process.cwd())

function toUnixPath(filePath) {
    return filePath.replace(/\\/g, '/')
}
console.log('=>process.cwd()', process.cwd())

class Compiler {
    constructor(config) {
        this.options = config
        this.hooks = {
            run: new SyncHook(),
            done: new SyncHook(),
        }
    }

    compile(callback) {
        const compilation = new Compilation(options)
        compilation.build(callback)
    }

    // 开始编译
    run(callback) {
        this.hooks.run.call()
        const onCompiled = () => {
            this.hooks.done.call()
        }
        this.compile(onCompiled)
    }
}

class Compilation {
    constructor(webpackOptions) {
        this.options = webpackOptions
        this.modules = [] // 本次编译所有生成出来的模块
        this.chunks = [] // 本次编译产出的所有代码块，入口模块和依赖的模块打包在一起为代码块
        this.assets = {} // 本次编译产出的资源文件
        this.fileDependencies = [] // 本次打包涉及到的文件，主要是为了实现watch模式下监听文件的变化，文件发生变化后会重新编译
    }

    //
    buildModule(name, modulePath) {
        let sourceCode = fs.readFileSync(modulePath, 'utf-8')
        let moduleId = './' + path.posix.relative(baseDir, modulePath)

        // 创建模块对象
        let module = {
            id: moduleId,
            names: [name], // namse设计成数组是因为代表的是此模块属于哪个代码块，可能属于多个代码块
            dependencies: [],
            _source: '',
        }

        // 找到对应的loader对源代码进行翻译和替换
        let loaders = []
        const { rules } = this.options.module
        rules.forEach(rule => {
            if (rule.math(rule.test)) {
                loaders.push(...rule.use)
            }
        })

        sourceCode = loaders.reduceRight((code, loader) => {
            return loader(code)
        }, sourceCode)

        return module
    }

    build(callback) {
        let entry = {}

        // 5.根据entry找到入口文件
        const { entry: tempEntry } = this.options
        if (typeof tempEntry === 'string') {
            entry.main = tempEntry
        } else {
            entry = tempEntry
        }

        for (let entryName in entry) {
            let entryFilePath = path.posix.join(baseDir, entry[entryName])

            this.fileDependencies.push(entryFilePath)
            let entryModule = this.buildModule(entryName, entryFilePath)

            this.modules.push(entryModule)
        }

        callback()
    }
}

module.exports = {
    webpack(config) {
        const compiler = new Compiler(config)
        const plugins = config.plugins
        for (let v of plugins) {
            v.apply(compiler)
        }
        return compiler
    },
}
