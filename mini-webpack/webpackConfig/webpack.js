const { Compiler } = require('./compiler')

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
