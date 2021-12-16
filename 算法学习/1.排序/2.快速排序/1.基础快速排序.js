// 快速排序，以第一个值为基准，把小于和大于它的数分成两个数组，然后递归上述方法，再把得到的数组合并

const arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8]

function quickSort(arr) {
  if (arr.length < 2) return arr
  
  const left = []
  const right = []
  const target = arr[0]
  for(let i = 1; i < arr.length; i++) {
    if (target > arr[i]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
   return quickSort(left).concat([target], quickSort(right));
}
console.log('=>qqq', quickSort(arr))