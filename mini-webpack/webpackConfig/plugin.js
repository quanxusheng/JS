class WebpackRunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('webpackRunPlugin', () => {
            console.log('=>', '开始编译')
            return
        })
    }
}

class WebpackDonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('webpackDonePlugin', () => {
            // console.log('=>结束编译-compiler', compiler)
            // console.log('=>结束编译-compiler', compiler.webpackOptions.module)
            console.log('=>', '结束编译1')
        })
    }
}

module.exports = {
    WebpackRunPlugin,
    WebpackDonePlugin,
}
