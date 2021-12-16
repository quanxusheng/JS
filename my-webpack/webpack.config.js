const path = require('path')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const isDev = process.env.NOOE_ENV === 'development'
const config = require('./public/config')['isDev' ? 'dev' : 'build']
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
          {
              test: /\.jsx?$/,
              use: {
                loader: 'babel-loader',
                options:{
                  "presets": ["@babel/preset-env"],
                  "plugins": [
                    [
                      "@babel/plugin-transform-runtime",
                      {
                        "corejs": 3
                      }
                    ]
                  ]
                }
              },
              exclude: /node_modules/ //排除 node_modules 目录
          },
          {
            test: /\.(le|c)ss$/,
            use: ['style-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [
                            require('autoprefixer')({
                                "overrideBrowserslist": [
                                    ">0.25%",
                                    "not dead"
                                ]
                            })
                        ]
                    }
                }
            }, 'less-loader'],
            exclude: /node_modules/
        }
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html',
          inify: {
              removeAttributeQuotes: false, //是否删除属性的双引号
              collapseWhitespace: false, //是否折叠空白
          },
          config: config.template
            // hash: true //是否加上hash，默认是 false
        })
      ],
      devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
}