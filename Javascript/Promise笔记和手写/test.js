function Promise2(fn) {
  this.callBacks = []

  const resolve = val => {
    console.log('=>val', val)
    this.callBacks.forEach(fn => {
      fn(val)
    })
  }
  fn(resolve)
}

Promise2.prototype.then = function (successCallback) {
  this.callBacks.push(successCallback)
}
let p = new Promise2((resolve) => {
  resolve(123)
})
p.then(res => {
  console.log('=>222', res)
})