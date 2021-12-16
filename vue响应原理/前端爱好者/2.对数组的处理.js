
// 调用该方法来检测数据
function observe(value) {
  if (typeof value !== 'object') return
  let ob
  if (value.__ob__ && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

class Observer {
  constructor(value) {
    this.value = value
    def(value, '__ob__', this)
    const arrayPrototype = Array.prototype // 缓存真实原型
    const proxyPrototype = Object.create(arrayPrototype)
    Object.setPrototypeOf(value, proxyPrototype)
    if (Array.isArray(value)) {
      // 增加代理原型proxyPrototype.__proto__ === arrayPrototype
      this.observerArray(value)
    } else {
      this.walk()
    }

    const reactiveMethods = [
      'push',
      'pop',
      'unshift',
      'shift',
      'reserve',
      'sort',
      'splice'
    ]

    reactiveMethods.forEach(method => {
      const originnalMethod = arrayPrototype[method]
      Object.defineProperty(proxyPrototype, method, {
        value(...args) {
          const result = originnalMethod.apply(this, args)
          const ob = this.__ob__
          ob.dep.notify()
          return result
        },
        enumerable: false,
        writable: true,
        configurable: true
      })
    })

  }
  walk() {
    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))
  }
  observerArray(arr) {
    arr.forEach(i => observe(i))
  }
}

function def(obj, key, value, enumerable = false) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}

// 数据拦截
function defineReactive(data, key, value = data[key]) {
  const dep = new Dep()
  observe(value)
  Object.defineProperty(data, key, {
    get: function reactiveGetter() {
      dep.depend()
      return value
    },
    set: function reactiveSetter(newValue) {
      if (newValue === value) return
      value = newValue
      observe(newValue)
      dep.notify()
    }
  })
}

// 依赖
class Dep {
  constructor() {
    this.subs = []
  }

  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }

  notify() {
    const subs = [...this.subs]
    subs.forEach((s) => s.update())
  }

  addSub(sub) {
    this.subs.push(sub)
  }
}

Dep.target = null

const TargetStack = []

function pushTarget(_target) {
  TargetStack.push(Dep.target)
  Dep.target = _target
}

function popTarget() {
  Dep.target = TargetStack.pop()
}

// watcher
class Watcher {
  constructor(data, expression, cb) {
    this.data = data
    this.expression = expression
    this.cb = cb
    this.value = this.get()
  }

  get() {
    pushTarget(this)
    const value = parsePath(this.data, this.expression)
    popTarget()
    return value
  }

  update() {
    const oldValue = this.value
    this.value = parsePath(this.data, this.expression)
    this.cb.call(this.data, this.value, oldValue)
  }
}

// 工具函数
function parsePath(obj, expression) {
  const segments = expression.split('.')
  for (let key of segments) {
    if (!obj) return
    obj = obj[key]
  }
  return obj
}

// for test
let obj = {
  a: 1,
  b: {
    m: {
      n: 4
    }
  },
  colors: ['yellow', 'white', 'green']
}

observe(obj)

obj.colors.push('red')
console.log('=>obj', obj)
// let w1 = new Watcher(obj, 'a', (val, oldVal) => {
//   console.log(`obj.a 从 ${oldVal}(oldVal) 变成了 ${val}(newVal)`)
// })