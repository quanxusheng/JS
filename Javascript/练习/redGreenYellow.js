var obj = {
  name: 'alex',
  love: ['red', 'yellow', 'green'],
  son: {
    name: 'fang',
    age: 11
  }
}

const orginalProto = Array.prototype;
const arrayProto = Object.create(orginalProto); // 先克隆一份Array的原型出来
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(method => {
  arrayProto[method] = function () {
    // 执行原始操作
    orginalProto[method].apply(this, arguments)
    console.log('监听赋值成功', method)
  }
})

function defineProperty(obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('=>ggg', val)
      return val
    },
    set(newV) {
      console.log('=>sss', newV)
      if (newV === val) return
      observe(newV)
      val = newV
    }
  })
}
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return
  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto
    for(let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }
  } else {
    for (let k in obj) {
      defineProperty(obj, k, obj[k])
    }
  }
}
observe(obj)
// obj.name = 'yiyuan'
// obj.love.push('blue')
// console.log('=>', obj)
// obj.love[3] = 'blue222'
// obj.son.name = 'fang111'
// obj.name = {
//   f: 'fff',
//   s: 'ssss'
// }
// obj.name.f = 'lll'
// obj.love[1] = 'blue'
function $set(obj, key, val) {
  defineProperty(obj, key, val)
}
// obj.name = 'lll'
obj.name2 = 'kkkk'
console.log('=>ooo', obj)
// $set(obj, 'height', 168)
// console.log('=>111', obj)
// console.log('=>222', obj.love[1])
