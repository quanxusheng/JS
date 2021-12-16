// var a = 1;
// console.log('a:', a)
// var b = 2;
// console.log('b:', b)
// setTimeout(function task1(){
//   console.log('task1:', 5)
//   Promise.resolve(6).then(function microtask2(res){
//     console.log('microtask2:', res)
//   })
// }, 100)
// Promise.resolve(4).then(function microtask1(res){
//   console.log('microtask1:', res)
// })
// setTimeout(function task2(){
//   console.log('task1:', 7)
//   Promise.resolve(8).then(function microtask2(res){
//     console.log('microtask2:', res)
//   })
// }, 0)
// var c = 3;
// console.log('c:', c)

// 1, 2, 3, 4, 7 ,8, 5, 6

/* 

  宏任务：setTimeout, setInterval
  微任务：Promise

  1，先执行主线程的同步任务
  2，执行完同步任务，执行所有的微任务
  3，再执行宏任务队列，执行完一个宏任务之后，跳出来，再次从1循环
*/

var promise1 = new Promise((resolve, reject) => {
  console.log('=>', 1)
    setTimeout(() => {
      console.log('=>', 2)
        resolve(1);
    }, 0);
    console.log('=>', 3)
});
console.log('=>', 4)
promise1.then(res => {
    console.log('promise1微任务被执行了');
    promise1.then(res => { // 这里的微任务在本轮事件循环中被推入到微任务队列，然后在本轮事件循环结束（‘console.log('=>', 3333)’）后执行
      console.log('=>res111', res)
      console.log('=>res111', 222)
    })
    console.log('=>', 3333)
    setTimeout(() => {
      console.log('=>', 444)
    })
});
setTimeout(() => {
      console.log('=>', 666)
    }, 0);
console.log('=>', 5)

// 1,3,4,5,2,'promise1微任务被执行了',3333,666,1,222,444 // 2021-11-18的错误答案
// 1,3,4,5,2,'promise1微任务被执行了',3333,1,222,666，444 // 2021-11-18的正确答案