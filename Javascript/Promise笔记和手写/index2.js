var p = new Promise((resolve, reject) => {
  console.log('=>', 111)
  setTimeout(() => {
    console.log('=>', 2222)
    resolve(222)
  }, 1000)
})
p.then((res) =>{
  console.log('=>11', res)
})
p.then((res) =>{
  console.log('=>22', res)
})
p.then((res) =>{
  console.log('=>333', res)
})