let obj = {
  name: 'alex'
}
var name = 'quan'
function a(name, age){
  this.name = name
  this.age = age
  console.log('=>', this.name)
  console.log('=>', this.age)
}

// a.apply(obj, 'yiyuan')

Function.prototype.newApply = function (context, args) {
  if (!Array.isArray(args)) {
    throw('CreateListFromArrayLike called on non-object')
  }
  context = context || window
  let symbol = Symbol()
  context[symbol] = this
  let res = context[symbol](...args)
  Reflect.deleteProperty(context, symbol)
  return res
}
a.newApply(obj, ['yiyuan', 18])
console.log('=>11', Function.prototype.newApply)