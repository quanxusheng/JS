import {arrayMethods} from './array'
class Observer { 
  constructor(value) {
    Object.defineProperty(value, '__ob__', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: this
    })
    if (Array,isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(data) {
    for (let key in data) {
      defineReactive(data, key, data[key])
    }
  }
  observeArray(items) {
    for(let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
}
function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    get(){
      console.log('=>ggg', val)
      return val
    },
    set(newVal) {
      val  = newVal
      console.log('=>sss', val)
    }
  })
}
export function observe(value) {
  if (
    Object.prototype.toString.call(value) === '[object object]' ||
    Array.isArray(value)
  ) {
    return new Observer(value)
  }
}