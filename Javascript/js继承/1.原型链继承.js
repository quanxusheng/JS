// 1.原型链继承

function Parent() {
  this.name = 'fang'
  this.colors = ['red', 'yellow']
}
Parent.prototype.getName = function () {
  console.log('=>', this.name)
}

var p2 = new Parent()
console.log('=>p2p2p2', p2)
function Child() {}
Child.prototype = new Parent()

console.log('=>Child11', Child.prototype)
console.log('=>Parent', Parent)
var child1 = new Child()
child1.colors.push('black')
console.log('=>child1', child1)
console.log('=>Child222', Child.prototype)
console.log('=>', child1.name)
console.log('=>p2p2p2', p2)

// 缺点是引用类型的属性会被实例共享， 不能传值
