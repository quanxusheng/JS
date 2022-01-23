const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)

const p2 = new Promise((resolve, reject) => {
  // throw new Error('报错了');
  reject('999')
  // resolve('222')
})

const p3 = new Promise((resolve, reject) => {
  resolve('hello222');
})
.then(result => result)

let p = Promise.all([p1, p2, p3])
.then(result => console.log('=>result', result))
.catch(e => console.log('=>e', e));
console.log('=>pp', p)