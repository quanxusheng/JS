class WebpackRunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('webpackRunPlugin', () => {
            console.log('=>', '开始编译')
        })
    }
}

class WebpackDonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('webpackDonePlugin', () => {
            console.log('=>', '结束编译')
        })
    }
}

module.exports = {
    WebpackRunPlugin,
    WebpackDonePlugin,
}
