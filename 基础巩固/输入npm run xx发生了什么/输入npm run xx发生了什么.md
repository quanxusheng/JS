# 输入npm run xx发生了什么

script: {
    dev: vue-cli-service server
}

比如输入 npm run dev
首先会找到package.json中的script下的dev，并执行 vue-cli-service server

为什么不直接执行vue-cli-service server？
因为操作系统并没有vue-cli-service server指令

那为什么npm run dev就可以执行？
npm install安装依赖的时候把vue-cli-service server指令添加到了node_modules文件下的bin目录，bin目录下面是可运行脚本，实际是软连接
当通过npm run dev执行vue-cli-service server的时候，npm会先去node_modules/bin目录去找vue-cli-service脚本去执行
