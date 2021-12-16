const arr = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3]

function quickSort(arr, begin, end) {
  if (begin >= end) return
  let l = begin
  let r = end
  let target = arr[begin]
  while(l < r) {
    while(l < r && arr[r] >= target) {
      r--
    };
    while(l < r && arr[l] <= target) {
      l++
    };
    [arr[l], arr[r]] = [arr[r], arr[l]];
  };
  [arr[begin], arr[l]] = [arr[l], arr[begin]];
  console.log('=>ll', l)
  console.log('=>aa', arr)
  quickSort(arr, begin, l - 1);
  quickSort(arr, l + 1, end);
  return arr
  // console.log('=>arr', arr)
}
console.log('=>', quickSort(arr, 0, arr.length - 1))
// console.log('=>', quickSort(arr, 0, arr.length - 1))