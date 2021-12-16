import {initState} from './state'
import {compileToFunctions} from './compiler/index'

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(vm)
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  
  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    if (!options.render) {
      let template = options.template
      if (!template && el){
        template = el.outerHTML
      }
    }
    if (template) {
      const render = compileToFunctions(template)
      options.render = render
    }
  }
  // 将当前组件实例挂载到真实的el节点上面
  return mountComponent(vm, el)
}