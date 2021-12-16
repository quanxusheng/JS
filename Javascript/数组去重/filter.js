let arr = [4, 1, '2', 3, 1, '2', 2, '1']
let arr1 = arr.sort().filter((item, index) => {
  console.log('=>1', arr.indexOf(item))
  console.log('=>22', index)
  return arr.indexOf(item) === index
})
console.log('=>', arr1)
