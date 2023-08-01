// resolve用来拼接绝对路径的方法
const { resolve } = require('path')

module.exports = {
  // 模式
  mode: 'development', // 开发模式
  // webpack配置
  entry: './src/index.js', // 入口起点
  output: {
    // 输出
    // 输出文件名
    filename: 'dist.js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'dist'), // 输出路径，所有资源打包都会输出到这个文件夹下
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: resolve('./src/loader1.js')
      }
    ],
  },
  // plugin的配置
  plugins: [
  ],
  // 开发服务器 devServer：用来自动化，不用每次修改后都重新输入webpack打包一遍（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出（不会像之前那样在外面看到打包输出的build包，而是在内存中，关闭后会自动删除）
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'dist'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  },
}