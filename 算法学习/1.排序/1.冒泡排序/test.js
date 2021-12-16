/* 
  冒泡排序
  1.持续比较数组前一个值和后一个值的大小，如果前值比后值大，则交换位置
  2.由于每一轮比较已经把最大的值放在了最后，所以每次内层循环要减掉1次
*/

const arr = [9, 1, 2, 7, 3]

function bubbleSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    let wipe = false
    for(let j = 0; j < arr.length - i - 1; j++) {
      console.log('=>11', arr[i])
      console.log('=>222', arr[j + 1])
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        wipe = true
      }
      if (!wipe) {
        return arr
      }
    }
  }
  return arr
}
console.log('=>aaaa', bubbleSort(arr))