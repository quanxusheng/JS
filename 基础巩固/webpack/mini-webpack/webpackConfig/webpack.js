const { Compiler } = require('./compiler')

module.exports = {
    // 2.
    webpack(config) {
        // 3.
        const compiler = new Compiler(config)
        // console.log('=>config', config)
        // console.log('=>compiler', compiler)
        const plugins = config.plugins
        console.log('=>', 'plugins开始执行')
        for (let v of plugins) {
            v.apply(compiler)
        }
        return compiler
    },
}
