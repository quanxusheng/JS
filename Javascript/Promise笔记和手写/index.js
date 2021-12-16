 
  /* Promise是异步编程的解决方案，解决ajax请求数据中的回调地狱的问题，使
  代码看起来像同步一样，可读性高，它代表了一个异步操作的最终完成或者失败。
  从语法的层面上讲，Promise是一个对象，从它可以获取异步操作的消息
  
  特点：
   1.对象的状态不受外界影响
     pending，fulfilled，rejected。只有异步操作的结果来决定当前是哪一种状态
     ，任何其他操作都无法改变这个状态
   2.状态改变后不会再变，会一直保持这个结果
     Promise的状态只能有pending -> fulfilled/rejected，一旦修改就不能再变
   
   基本用法
     Promise是一个构造函数，new Promise返回一个Promise的实例对象，接收一个
     excutor执行函数作为参数，excutor有两个函数类型形参resolve和reject
     let p = new Promiss((resolve, reject) => {

     }) */
   // 例子 用Promise实现Ajax操作
   /* const getJSON = function(url) {
     const p = new Promise((res, rej) => {
       const handle = function () {
         if (this.readyState !== 4) {
           return
         }
         if (this.status === 200) {
           resolve(this.response)
         } else {
           reject(new Error(this.statusText))
         }
       }
        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadyStatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json');
        client.send();
     })
     return p
   }
   getJSON('/post.json')
    .then(json => {
      console.log('=>', json)
    })
    .catch(err => {
      console.log('=>', err)
    }) */

    /* Promise静态方法
     all，race，resolve，reject

    Promise原型方法
      Promise.prototype.then(onFulfiled, onRejected): 返回一个新的Promise，而不是this
      promise2 = promise1.then(alert)
      promise2 != promise1 // true

      Promise.prototype.catch: 在链式写法中可以捕获rejected中的错误
        Promise.catch(onRejected)相当于
        Promise.then(null, onRejected) -> onRejected不能捕获onFulfilled的错误
         所以最好用catch


    优点：将异步操作以同步操作的流程表达出来，更好的解决层层嵌套的回调问题
    缺点：
       无法取消Promise，Promise一旦新建即立即执行，无法取消
       不设置回调函数，内部错误不会被抛出
       处于pending状态时，无法得知目前进展到哪一个阶段
 */

   // 实现Promise

   function myPromise(fn) {
     var self = this
     self.status = 'pending' // Promise当前状态
     self.data = undefined // Promise的值

     // resolve/reject 时的回调函数集合，因为在Promise结束之前可能有多个回调添加到Primise上面
     self.onResolvedCallback = [] 
     self.onRejectedCallback = []
     
     function resolve(value) {
        if (self.status === 'pending') {
          self.status = 'fulfilled'
          self.data = value
          // 执行resolve的回调函数，将value传递到callback中
          self.onResolvedCallback.forEach(callback => callback(value))
        }
     }
     function reject(reason) {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        self.onRejectedCallback.forEach(callback => callback(reason))
      }
     }
     try {
       executor(resolve, reject)
     } catch(e) {
       reject(e)
     }
   }

   // onFulfilled/onRejectd 是Promise成功或失败的回调
   myPromise.prototype.then = function (onFulfilled, onRejectd) {
      let self = this
      let promise2

      // 根据标准，如果then的参数不是function,则忽略
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
      onRejected = typeof onRejected === 'function' ? onRejected : (value) => {throw value}

      if (self.status === 'fulfilled') {
        return promise2 = new myPromise(function(resolve, reject){
          try {
            var x = onFulfilled(self.data)
            // 如果 onFulfilled 的返回值是Promise对象，直接取它的结果作为promise2的结果
            if (x instanceof myPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (e) {
            reject(e)
          }
        })
      }
      if (self.status === 'rejected') {
        return promise2 = new myPromise(function(resolve, reject){
          try {
            var x = onRejected(self.data)
            // 如果onFulfilled的返回值是Promise对象，直接取它的结果作为promise2的结果
            if (x instanceof myPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (e) {
            reject(e)
          }
        })
      }
      if (self.status === 'pending') {
        // 如果当前Promise还处于pending状态，不能确定调用onFulfilled还是onRejected
        // 只能等到Promise的状态确定后，才能确定如何处理
        return promise2 = new myPromise(function(resolve, reject){
           self.onResolvedCallback.push(function(value) {
            try {
              var x = onFulfilled(self.data)
              if (x instanceof myPromise) {
                x.then(resolve, reject)
              } else {
                resolve(x)
              }
            } catch (e) {
              reject(e)
            }
          })

          self.onRejectedCallback.push(function(reason) {
            try {
              var x = onRejected(self.data)
              if (x instanceof myPromise) {
                x.then(resolve, reject)
              } else {
                resolve(x)
              }
            } catch (e) {
              reject(e)
            }
          })
        })
      }
   }

   myPromise.prototype.catch = function(onRejected) {
     return this.then(null, onRejected)
   }

   var p = new myPromise((resolve, reject) => {
     console.log(123);
     resolve(111)
   })