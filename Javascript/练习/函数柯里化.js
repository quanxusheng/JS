const currying = (fn, ...args) => {
  console.log('=>fn', fn)
  console.log('=>args', args)
  return args.length < fn.length
        //参数长度不足时，重新柯里化该函数，等待接受新参数
        ? (...arguments) => currying(fn, ...args, ...arguments)
        //参数长度满足时，执行函数
        : fn(...args)
}
    

  

var sum = currying(function(a, b, c, d) {
  console.log('=>aaa', a)
    return a + b + c + d
});
// console.log('=>sum2', sum(2))
console.log(sum(2)(3)(5)(10))//10
// console.log(sum(2, 3, 5));//10
// console.log(sum(2)(3, 5));//10
// console.log(sum(2, 3)(5));//10