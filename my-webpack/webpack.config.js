
const path = require('path')
const webpack = 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    app: './src/app.js'
  },
  devServer: {
    open: true,
    hot: true
  },
  plugins: [
    // new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'my-webpack'
    })
  ],
  output: {
    // filename: 'bundle.js',
    // path: '/my-webpack/dist'
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: 'css-loader'
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs/'
          }
        }
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}