function Parent(name, age) {
  this.name = name || 'parent'
  this.age = age || 28
  this.address = '湖北'
}

Parent.prototype.sayName = function () {
  console.log('=>pp', this.name)
}

function Child(name, age) {
  Parent.call(this, name, age)
}

// 组合继承 缺点 因为用new调用了父函数，导致子类的原型上继承了不需要的父类属性
/* 
=> Child {name: 'alex', age: 18, address: '湖北'}
  address: "湖北"
  age: 18
  name: "alex"
  [[Prototype]]: Parent
    address: "湖北"
    age: 28
    name: "parent"
    [[Prototype]]: Object
*/
// Child.prototype = new Parent()


// 寄生组合式继承
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
  }
})

let child = new Child('alex', 18)
console.log('=>', child)



