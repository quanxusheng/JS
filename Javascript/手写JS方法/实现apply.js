var obj = {
  name: 'alex'
}
var name = "fang"
function person(...args) {
  return {
    name: this.name,
    age: args[0],
    sex: args[1]
  }
}
person.apply(obj, [18, '男'])

Function.prototype.apply2 = function(context, args) {
  var context = context || window
  context.fn = this
  var result
  if (!Array.isArray(args)) {
    result = context.fn()
  } else {
    result = context.fn(...args)
  }
  delete context.fn
  return result
}
person.apply2(null, [18, '男'])
