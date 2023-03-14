var module = require('./a')
console.log('=>11', module)
module.age = 20
module.name.one = 'yiyuan'
module.name.two.really = 'xusheng'
module.color.push('green')
console.log('=>22', module)
var moduleC = require('./c')
console.log('=>333', moduleC)