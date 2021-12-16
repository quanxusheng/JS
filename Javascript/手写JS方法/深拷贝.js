// var arr = [2, 3, [4,5]]
var arr = {
  a: 1,
  b: [
    12,
    1
  ]
}
var arr1 = copy(arr)
arr['b'][0] = 1
console.log('=>', arr)
console.log('=>', arr1)
function checkType(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}
function copy(target) {
  let result, type = checkType(target)
  if (type === 'Array') {
    result = []
  } else if (type === 'Object') {
    result = {}
  } else {
    return target
  }
  for(let i in target) {
    let value = target[i]
    if (checkType(value) === 'Array' || checkType(value) === 'Object') {
      result[i] = copy(value)
    } else {
      result[i] = value
    }
  }
  return result
}