let arr = [1, 2, 3, 4, 5, 6]
function find(e) {
  return e > 2
}
// console.log('=>', arr.findIndex(find))

function findIndex2(arr, fn) {
  for(let i = 0; i < arr.length; i++) {
    // console.log('=>', fn)
    // console.log('=>', fn.call(this, arr[i]))
    if (fn.call(this, arr[i])) return i
  }
  return -1
}
console.log('=>', findIndex2(arr, find))
