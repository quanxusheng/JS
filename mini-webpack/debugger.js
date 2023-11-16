// const { webpack } = require('webpack')
const { webpack } = require('./webpackConfig/webpack')
const webpackConfig = require('./webpack.config')

// 1.0
const compiler = webpack(webpackConfig)
// console.log('=>compiler11', compiler)

compiler.run((err, stats) => {
    // console.log('=>', err)
    // console.log(
    //     '=>',
    //     // stats
    //     stats.toJson({
    //         assets: true, //打印本次编译产出的资源
    //         chunks: true, //打印本次编译产出的代码块
    //         modules: true, //打印本次编译产出的模块
    //     })
    // )
})
