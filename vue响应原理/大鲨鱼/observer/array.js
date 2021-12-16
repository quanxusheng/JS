const arrayProto = Array.prototype

export const arrayMethods = Object.create(arrayProto)
let methodsToPatch = [
  'push',
  'pop',
  'unshift',
  'shift',
  'reverse',
  'splice',
  'sort'
]
methodsToPatch.forEach(method => {
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2)
      default:
        break;
    }
    if (inserted) ob.observeArray(inserted)
    return result
  }
})