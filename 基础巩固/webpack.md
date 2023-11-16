

## webpack的打包原理
以entry(入口文件)开始解析，找到文件引入的依赖 递归遍历分析 形成依赖树
对不同的文件类型通过对应的loader对其进行编译
整个过程通过发布订阅模式抛出hooks，plugins通过监听不同的事件节点对文件做对应的处理
使用ast语法树对模块间的依赖关系进行分析

babel是js的编译器 源码 -> 源码
静态分析
语法检测 代码高亮 代码格式化

@babel/core 
@babel/parser  将源代码字符串转成ast抽象语法树
@babel/traverse 递归遍历ast树查找模块的依赖关系，对模块代码分析
@babel/generator 将ast转化为代码

打包后的文件 
一个立即执行函数
 - __webpack_modules__ 编译后的文件模块内容
 - __webpack_module_cache__ 缓存文件
 - __webpack_exports__ 
 -- __webpack_require__()函数 webpack编译阶段会把esm和cmjs两种模块化方案替换成自己的__webapck_require__方法，从而达到缓存模块和抹平两种模块化差异

 sourceMap 源代码的映射文件

 loader: webapck默认只处理js文件，在打包过程中遇到的其他类型文件需要使用对应的loader将其转化为js代码然后再进行打包
 - 执行顺序 从右到左，从下到上
 - 每个loader必须返回合格的js字符串作为参数供下个loader使用
 - 使用loader
  - module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs/'
          }
        }
      }
    ]
  }

