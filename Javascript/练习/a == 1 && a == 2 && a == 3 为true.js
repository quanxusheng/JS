// 如何让 a == 1 && a == 2 && a == 3 为true？

// 1.
/* let i = 1
var a = { // 隐式类型转换，先调用valueOf()函数
  valueOf() { 
    return i++
  }
} */


// 2.
/* let i = 1
Object.defineProperty(global || window, 'a', {
  get() {
    return i++
  }
}) */

// 3.

/* let a = new Proxy({}, {
    i: 1,
    get() {
      return () => this.i++;
    }
});
console.log('=>', a)
console.log('=>', a)
console.log('=>', a) */

console.log(a == 1 && a == 2 && a == 3)