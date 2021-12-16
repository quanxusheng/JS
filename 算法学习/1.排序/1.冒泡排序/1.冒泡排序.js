var arr = [14, 2, 6, 3, 9, 11, 12, 13, 5, 1, 3]

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }

// const len = arr.length
// let flag = 1
// for (let i = 0; i < len; i++) {
//   console.log('=>gg', i)
//   for(let j = 0; j < len; j++) {
//     // console.log('=>ll', j)
//     if (arr[j] > arr[j + 1]) {
//       [arr[j], arr[j + 1]] = [arr[j+1], arr[j]]
//     }
//   }
// }
// for (let i = 0; i < len; i++) {
//   // 里层循环控制每一轮比较的次数j，arr[i] 只用跟其余的len - i个元素比较
//   for (let j = 1; j < len - i; j++) {
//     // 若前一个元素"大于"后一个元素，则两者交换位置
//     if (arr[j - 1] > arr[j]) {
//       [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
//     }
//   }
// }
console.log('=>', arr)
