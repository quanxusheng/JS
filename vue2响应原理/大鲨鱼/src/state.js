import {observe} from './observer/index.js'

// 初始化状态prop > methods > data > computed > watch
export function initState(vm) {
  const opts = vm.$options
  // if (opts.props) {
  //   initProps(vm)
  // }
  if (opts.data) {
    initData(vm)
  }
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

  for(let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}
function proxy(object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key]
    },
    set(newValue) {
      object[sourceKey][key] = newValue
    }
  })
}