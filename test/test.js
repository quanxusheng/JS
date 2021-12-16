var obj = {
  name: 'alex',
  sayName(name, age) {
    console.log('=>', name)
    console.log('=>', age)
    console.log('=>', this.name)
    return 222
  }
}

var obj2 = {
  name: 'fangyiyuan'
}

function Tea() {
  console.log('=>', this)
}
var F1 = Tea.bind({name: 'quanxusheng'})
F1()
console.log('=>F1', F1)
var F22 = F1.bind({name: 'alex'})
F22()


// function Stu (name, age) {
//   console.log('=>this', this)
//   this.name = name
//   this.age = age
// }
// Stu.prototype.type = 'hhh'
// var F1 = Stu.bind({name: 'quanxusheng'}, 'xxx', 999)
// F1()
// var F22 = Stu.bind({name: 'alex'}, 'yyy', 88)
// F22()

// Function.prototype.bind2 = function (obj, ...args) {
//   var fn = this
//   if (obj === undefined || obj === null) {
//     return fn()
//   }
//   var ffn = function(...args2) {
//     console.log('=new.target>', new.target)
//     console.log('=this>', this)
//     return fn.call(new.target ? this : obj, ...args, ...args2)
//   }
//   ffn.prototype = Object.create(fn.prototype)
//   ffn.prototype.constructor = fn
//   return ffn
// }
// var F2 = Stu.bind2({name: 'quanxusheng'}, 'xxx', 999)
// console.log('=>F2', F2)
// console.log('=>F22', new F2().type)

// var fn1 = obj.sayName.bind2(obj2, 'qqqq', '99')
// console.log('=>fn1', fn1)
// fn1()

// var a = obj.sayName.bind(obj2, 'qqqqq', 12)
// obj.sayName.call(obj2, 'xxx', 12)
/* Function.prototype.call2 = function(obj, ...arg) {
  if (obj === undefined || obj === null) {
    return this()
  }
  console.log('=>arg', arg)
  // console.log('=>', this)
  obj.fn = this
  let fn1 = obj.fn(...arg)
  delete obj.fn
  return fn1
}
// let fn1 = obj.sayName.call2(obj2, 'xxx', 12)
// let fn2 = obj.sayName.call2()
console.log('=>fn1', fn2) */