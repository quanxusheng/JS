/* 
  递归：函数将自身作为子例程调用

  如何实现调用自身的函数？
  每当递归函数调用自身，将给定的问题拆解为子问题，递归调用
  继续进行，直到子问题无需进一步递归就可以解决的地步

*/

// f(n) = f(n-1) + f(n-2)

// 斐波那契数列

// function calc(n) {
//   if (n < 2) return n
//   return calc(n - 1) + calc(n - 2)
// }

// function calc(n) {
//   if (n < 2) return n
//   let one = 0, two = 1, temp = 0, i = 0;
//   while( i < n-1) {
//     i++
//     temp = one + two
//     one = two
//     two = temp
//   }
//   return temp
// }


// for (let i = 1; i < 10; i++) {
//   console.log('=>', calc(i))
// }

// console.log('=>aaa', calc(3))

// for循环 + 解构赋值

// var fibonacci = function (n) {
//     let n1 = 1; n2 = 1;
//     for (let i = 2; i < n; i++) {
//         [n1, n2] = [n2, n1 + n2]
//     }
//     return n2
// }
// console.log('=>', fibonacci(5))