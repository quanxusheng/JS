let arr = [4, 1, '2', 3, 1, '2', 2, '1']

function unique() {
  let newArr = arr.concat().sort()
  let res = []
  let num
  for (let i = 0; i < newArr.length; i++) {
    if (num !== newArr[i]) {
      res.push(newArr[i])
    }
    num = newArr[i]
  }
  return res
}
console.log('=>', unique(arr))
