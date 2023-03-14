import { observe } from './observer/index.js';
// 初始化调用时是有顺序的 prop>methods>data>computed>watch，
// 所以在data中可以拿到props中的值
export function initState(vm) {
  const opts = vm.$options;
  // if (opts.props) {
  //   initProps(vm)
  // }
  // if (opts.methods) {
  //   initMethod(vm)
  // }
  // if (opts.props) {
  //   initProps(vm)
  // }
  // 初始化data
  if (opts.data) {
    initData(vm)
  }
  // if (opts.computed) {
  //   initComputed(vm)
  // }
  // if (opts.watch) {
  //   initWatch(vm)
  // }
}

function initData(vm) {
  let data = vm.$options.data;
  // data推荐使用函数，防止数据在组件之间共享（闭包）
  // this._data实际上就是传入的data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  // 设置代理，也就是Vue实例上面 我们可以使用this.a来访问this._data.a
  const keys = Object.keys(data);
  let i = keys.length;
  while(i--) {
    const key = keys[i];
    proxy(vm, `_data`, key)
  }
  // 对数据进行观测 --响应式的核心方法
  observe(data);
}
function proxy(object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key];
    },
    set(newVal) {
      object[sourceKey][key] = newVal;
    }
  })
}
