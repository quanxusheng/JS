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

// var ac = a.bind(obj, 11, 22)

Function.prototype.myBind = function(context, ...args) {
  let _that = this
  console.log('=>this', this)
  function bound (...subArgs) {
    console.log('=>subArgs', subArgs)
    context = new.target ? this : context
    return _that.call(context, ...subArgs, ...args)
  }
  bound.prototype = Object.create(_that.prototype)
  bound.prototype.constructor = bound
  return bound
}

var ac = a.myBind(obj, 11, 22)
console.log('=>nnn', new ac('aa', 'bb'))