let arr = [1, 2, [3, 4], [5, [6, [7]]]]
let newArr = []

function uniqu(arr) {
  arr.map(item => {
    Array.isArray(item) ? uniqu(item) : newArr.push(item)
  })
}
uniqu(arr)
console.log('=>', arr)
console.log('=>', newArr)
