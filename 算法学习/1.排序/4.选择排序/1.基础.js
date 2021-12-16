const arr = [9, 7, 4, 5, 3, 6]
// function minNum (key) {
//   let minIndex = key
//   for(let i = 1; i < arr.length; i++) {
//     if (arr[0] > arr[i]) {
//       arr.shift()
//       minNum(i)
//     } else {
//       minIndex = key
//     }
//   }
//   return arr[minIndex]
// }
// console.log('=>', minNum(0))

for(let i = 0; i < arr.length; i++) {
  let minIndex = i
  for(let j = i + 1; j < arr.length; j++) {
    console.log('=>11', arr[j])
    console.log('=>22', arr[minIndex])
    if (arr[j] < arr[minIndex]) {
      minIndex = j
    }
  }
  // console.log('=>ii', i)
  // console.log('=>minIndex', minIndex);
  [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
}
console.log('=>', arr)