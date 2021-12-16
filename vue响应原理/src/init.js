import { initState } from './state.js'

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    // this是调用_init方法的对象（实例对象）
    const vm = this;
    // 所以在vue中通过this.$options可以访问到初始化时的配置项
    vm.$options = options
    initState(vm)
  }
}
