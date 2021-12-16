const Observe = function(data) {
  // 循环为每个属性添加set get
  for (let key in data) {
    defineReactive(data, key)
  }
}

const defineReactive = function (obj, key) {
  // 局部变量dep, 用于get，set内部调用
  const dep = new Dep()
  // 获取当前值
  let val = obj[key]
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    configurable: true,
    get() {
      console.log('=>', 'in get')
      // 调用依赖收集器中的addSub, 用于收集当前属性与watcher中的依赖关系
      dep.depend()
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      // 当值变更时，通知依赖收集器，更新每个需要更新的watcher
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify()
    }
  })
}

const observe = function(data) {
  return new Observe(data)
}

const Vue = function(options) {
  const self = this
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this)
  }
  this.mount = function() {
    new Watcher(self, self.render)
  }
  this.render = function() {
    // console.log('=>sss', self)
    // console.log('=>ddd', self._data)
    with(self) {
      _data.text // ???
    }
  }
  observe(this._data)
}

const Watcher = function(vm, fn) {
  console.log('=>', 2324)
  const self = this
  this.vm = vm
  // 将当前Dep.target指向自己
  Dep.target = this
  // 向Dep方法添加当前watcher - 啥意思？
  this.addDep = function(dep) {
    dep.addSub(self)
  }
  // 更新方法，用于触发vm.render
  this.update = function() {
    console.log('=>', 'in watcher update')
    fn()
  }
  // 这里会首次调用vm._render,从而触发text的get
  // 从而将当前的wather与Dep关联起来
  this.value = fn()
  console.log('=>this.value', this.value)
  // 这里清空了Dep.target, 为了防止notify触发时，不停地绑定watcher与Dep
  // 造成代码死循环
  Dep.target = null
}

const Dep = function() {
  const self = this
  // 收集目标
  this.target = null
  // 储存收集器中需要通知的watcher
  this.subs = []
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function() {
    if(Dep.target) {
      // 这里其实可以直接写self.addSub(Dep, target)
      // 没有这么写因为想还原源码的过程
      Dep.target.addDep(self)
    }
  }
  // 为当前收集器添加Watcher
  this.addSub = function(watcher) {
    self.subs.push(watcher)
  }
  // 通知收集器中所有watcher，调用其update方法
  this.notify = function() {
    for(let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update()
    }
  }
}

const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    };
  }
})

console.log('=vvvv>', vue)
vue.mount()
// vue._data.text = '123'