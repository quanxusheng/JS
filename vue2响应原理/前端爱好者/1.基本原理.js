// 调用该方法来检测数据
function observe(data) {
  if (typeof data !== 'object') return
  new Observer(data)
}

class Observer {
  constructor(value) {
    this.value = value
    this.walk()
  }
  walk() {
    Object.keys(this.value).forEach((key) => defineReactive(this.value, key))
  }
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
  }
}

observe(obj)

let w1 = new Watcher(obj, 'a', (val, oldVal) => {
  console.log(`obj.a 从 ${oldVal}(oldVal) 变成了 ${val}(newVal)`)
})