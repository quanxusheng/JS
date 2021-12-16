const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('chaining cycle'))
  }
  console.log('=>111', x)
  if (x && typeof x === 'object' || typeof x === 'function') {
    let called
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}


class Promise1 {
  constructor(executor) {
    this.status = 'pending'
    this.data = ''
    this.resolveCbs = []
    this.rejectCbs = []

    const resolve = val => {
      // console.log('=val>', val)
      // console.log('=111>', this.status)
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.data = val
        console.log('=>444', this.resolveCbs)
        this.resolveCbs.forEach(fn => {
          console.log('=>mmmm', fn)
          fn()
        })
      } else {
        return
      }
    }
    
    const reject = (val) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.data = val
        this.rejectCbs.forEach(fn => fn())
      } else {
        return
      }
    }

    try{
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const s = this.status
    console.log('=>onFulfilled', onFulfilled)
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
    let promise2 = new Promise1((resolve, reject) => {
      if (s === 'fulfilled') {
        setTimeout(() => {
          try {
            // x可能是一个promise
            let x = onFulfilled(this.data)
            console.log('=>xxx', x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        },0)
      }
      if (s === 'rejected') {
        setTimeout(() => {
          try {
            // x可能是一个promise
            let x = onRejected(this.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        },0)
      }
      if (s === 'pending') {
        this.resolveCbs.push(() => {
          setTimeout(() => {
            try {
              // x可能是一个promise
              let x = onFulfilled(this.data)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          },0)
        })
        this.rejectCbs.push(() => {
          setTimeout(() => {
            try {
              // x可能是一个promise
              let x = onRejected(this.data)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          },0)
        })
      }
    })
    return promise2
  }
}


let p1 = new Promise1((resolve, reject) => {
  resolve('成功')
  // setTimeout(() => {
  //   console.log('=>', 123)
  //   resolve('成功')
  // }, 1000)
  // reject('失败')
  // resolve(() => {
  //   console.log('=>callback', 'callback')
  // })
})
console.log('=>p1', p1)
p1.then().then(res => {
  console.log('=>kkk', res)
  // console.log('=>kkk', res())
})

// const promise = new Promise((resolve, reject) => {
//   reject('失败');
// }).then().then().then(data=>{
//   console.log(data);
// },err=>{
//   console.log('err',err);
// })