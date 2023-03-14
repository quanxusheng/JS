this 的指向问题

1.优先级最高
new调用函数 this被绑定在了p上
const p = new Person()

2.其次
apply,call,bind
这三种改变this指向的方法
const p = fn.bind(obj).bind(obj2)
bind经过第一次改变this指向之后，后面若是接着bind，this也不会改变

3.然后
谁调用就指向谁
function fn() {}

fn() 这种情况永远指向window

4.箭头函数的this指向外层的作用域