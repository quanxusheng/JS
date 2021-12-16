var obj = {
  name: 'alex'
}
var name = "fang"
function person(age, sex) {
  console.log('=>name', this.name)
  console.log('=>age', age)
  console.log('=>sex', sex)
  return {
    name: this.name,
    age,
    sex
  }
}
// person.call(obj)

Function.prototype.call2 = function(context, ...args) {
  var context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}
person.call2(null)
