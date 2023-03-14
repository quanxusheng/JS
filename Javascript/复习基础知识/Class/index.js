
// static 定义在类中的静态属性或方法，只能由类或者继承的子类调用，不能被类创建的原型对象调用
/* 
  关键字:static

  1.通过关键字static定义的属性/方法是类自己的属性/方法,而不是定义在实例对象(this)上的属性/方法。

  2.存放在类(构造函数)的键值对中,与类的原型prototype同级,

  3.类可以直接调用,但是类的实例不能继承与调用,

  4.如果静态方法包含this关键字，这个this指的是类，而不是实例,

  5.父类的静态属性/方法，可以被子类继承。

*/
class Person {
  static name = 'alex'
  age = 18
  
  static sayName() {
    console.log('=>sayName', this.name)
    return this.name
  }
}
let p = new Person()
console.log('=>Person1', Person)
console.log('=>Person2', Person.name)
console.log('=>Person3', Person.sayName())
console.log('=>p', p)

class Son extends Person {
  constructor() {
    super()
  }
}

let s = new Son()
console.log('=>Son', Son)
console.log('=>Son1', Son.name)
console.log('=>Son2', Son.sayName())
console.log('=>s', s)