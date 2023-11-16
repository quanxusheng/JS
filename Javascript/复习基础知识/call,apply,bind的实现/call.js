let obj = {
    name: 'alex',
}
var name = 'quan'
function a() {
    console.log('=>', this.name)
}
// a.call(obj, 'yiyuan')

Function.prototype.newCall = function (context, ...args) {
    context = context || window
    let symbol = Symbol()
    context[symbol] = this
    let result = context[symbol](...args)
    delete context[symbol]
    return result
}
console.log('=>', this)
console.log('=>', this.name)
// a.newCall(obj)
// a.call(this)
// a.newCall(obj, 'yiyuan', 18)
console.log('=>11', Function.prototype.newCall)
