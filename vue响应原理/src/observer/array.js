const arrProto = Array.prototype;

// arrayMethods继承自数组原型，在不破坏封装的前提下，动态扩展功能
export const arrayMethods = Object.create(arrProto);

let methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort',
]

methodsToPatch.forEach((method) => {
  arrayMethods[method] = function(...args) {
    // 保留原型方法的执行结果
    const result = arrProto[method].apply(this, args);
    // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性就是上段代码增加的 代表的是该数据已经被响应式观察过了指向Observer实例
    const ob = this.__ob__;
    console.log('ob', ob)
    // 这里的标志就是代表数组有新增操作
    let inserted;
    switch(method) {
      case 'push':
      case 'unshift': 
        inserted = args;
        break;
      case splice:
        inserted = args.slice(2);
      default:
        break;
    }
    // 如果有新增的元素 inserted是一个数组 调用Observer实例的observeArray对数组每一项进行观测
    console.log('args', args);
    console.log('inserted', inserted);
    if (inserted) {
      ob.observeArray(inserted);
    }
    return result;
  }
})
