let arr = [2, '1', '2', 'a', 2, 1, 'a']
let res = []
for (var i = 0; i < arr.length; i++) {
  if (res.indexOf(arr[i]) === -1) {
    res.push(arr[i])
  }
}
console.log('=>', res)
