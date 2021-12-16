let arr = [2, '1', '2', 'a', 2, '1', 'a', [1, 2, 'c']]
let res = []
let status
for (var i = 0; i < arr.length; i++) {
  status = false
  for(var j = 0; j < res.length; j++) {
    if (arr[i] === res[j]) {
      status = true
      break
    }
  }
  /* 
    res的循环结束，如果j的值等于res的长度
    res[j]的值是唯一的
  */
  if (!status) res.push(arr[i])
}
console.log('=>rrr', res)
/* 
每一轮循环其实就是拿arr里的每个成员和res的成员逐个比较
相同就跳出，不同就添加到res中
*/
function unique2(arr) {
    var res = arr.filter((item, index)=> {
        return arr.indexOf(item) === index;
    })
    return res;
}
// console.log('=>', unique2(arr))
// console.log('=>ss', Array.from(new Set(arr)))
console.log('=>ss', [...new Set(arr)])

