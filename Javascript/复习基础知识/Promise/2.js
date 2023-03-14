let p = new Promise((resolve, reject) => {
	// reject(new Error('报错啦'))
  // resolve(1)
  reject('nonono')
})
.then(res => {
	// setTimeout(() => console.log('=>11', ), 4000);
  console.log('=>res', 111)
})
.then(res => {
  // setTimeout(() => console.log('=>22', ), 3000);
   console.log('=>res', 222)
})
.then(res => {
  // setTimeout(() => console.log('=>33', ), 2000);
   console.log('=>res', 333)
	return 4;
}, err => {
  console.log('=>errr', err)
  return err
})
p.then(res => {
  console.log('=>xxxx', res)
  console.log('=>xxxx', p)
})