import { arrayMethods } from './array.js';
class Observer {
  constructor(value) {
    // 给每个响应式数据增加了一个不可枚举的__ob__属性 并且指向了 Observer 实例 
    // 防止已经被响应式观察的数据反复被观测
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    })
    // 因为对数组下标的拦截太浪费性能 对 Observer 构造函数传入的数据参数增加了数组的判断
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(data) {
    // 对传入的所有值进行观测
    let keys = Object.keys(data);
    for(let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }

  observeArray(items) {
    for(let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}

function defineReactive(data, key, value) {
  // 递归，如果value还是一个对象会继续走一遍odefineReactive 层层遍历一直到value不是对象才停止
  observe(value);
  // defineProperty数据劫持的核心
  Object.defineProperty(data, key, {
    get() {
      console.log('get');
      return value
    },
     set(newVal) {
       console.log('set');
       value = newVal;
     }
  })
}

export function observe(value) {
  // 传来的是数组的话就，进行属性劫持
  if (Object.prototype.toString.call(value) === '[object Object]' || 
  Array.isArray(value)) {
    return new Observer(value);
  }
}
