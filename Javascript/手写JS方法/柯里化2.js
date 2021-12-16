// 支持多参数传递，原理是：使用闭包保存历史参数，使用递归解决多参数问题
function currying(fun, initArgs) {
  console.log('=>ff', fun)
  var _this = this;
  var len = fun.length; // 被改造函数参数的个数
  var args = initArgs || [];

  return function () {
    var _args = [...args, ...arguments]; // 参数
    console.log('=>111', args)
    console.log('=>222', arguments)
    console.log('=>333', len)
    // 如果参数个数小于最初的fun.length，则递归调用，继续收集参数
    if (_args.length < len) {
      return currying.call(_this, fun, _args);
    }

    // 参数收集完毕，则执行函数，返回结果
    return fun.apply(this, _args);
  }
}

// 使用
var curryingAdd = currying(function (a, b,c,d,e,f,g) {
  return a + b + c + d + e + f + g
})
// curryingAdd(1, 2)(3) // 6
console.log(curryingAdd(1)(2)(3,4,6)(5)(7)) // 6
// curryingAdd(1, 2, 3) // 6
