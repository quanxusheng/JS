// const arr = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3]
// const arr = [9, 7, 4, 5, 3, 6]

// function selectionSort(array) {
//       for (let i = 0; i < array.length - 1; i++) {
//         let minIndex = i;
//         for (let j = i + 1; j < array.length; j++) {
//           if (array[j] < array[minIndex]) {
//             minIndex = j;
//           }
//         }
//         [array[minIndex], array[i]] = [array[i], array[minIndex]];
//       }
//     }
// selectionSort(array)

// for(let i = 0; i < arr.length-1; i++) {
//   let minIndex = i
//   for(let j = i + 1; j < arr.length; j++) {
//     if (arr[j] < arr[minIndex]) {
//       minIndex = j
//     }
//   }
//   console.log('=>ii', i)
//   console.log('=>minIndex', minIndex);
//   [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
// }
// console.log('=arr>', arr)

const arr = [9, 7, 4, 5, 3, 6]

for(let i  = 0; i < arr.length; i++) {
  let minIndex = i
  for(let j = i + 1; j < arr.length; j++) {
    if (arr[j] < arr[minIndex]) {
      minIndex = j
    }
  }
  console.log('=>', minIndex)
  console.log('=>', arr[minIndex])
}
