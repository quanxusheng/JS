//  const array = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3, 'bbb', 'aaa', 'a', 'k']

 /* // 1 空间复杂度高

 function quickSort(array) {
   if (array.length < 2) return array
   let target = array[0]
   let left = []
   let right = []
   for(let i = 1; i < array.length; i++) {
     if (target > array[i]) {
       left.push(array[i])
     } else {
       right.push(array[i])
     }
   }
   console.log('=>11', left)
   console.log('=>22', right)
   return quickSort(left).concat([target], quickSort(right))
 }
console.log('=>result', quickSort(array)) */

// 2 逻辑复杂些
// const array = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3]
// function quickSort(arr, start, end){
//   if (right - left < 1) return
//   let target = arr[left]
//   let left = start
//   let right = end
//   console.log('=>', target)
//   while(left < right) {
//     while(left < right && arr[right] >= target) {
//       right--
//     }
//     arr[left] = arr[right]
//     while(left < right && arr[left] <= target) {
//       left++
//     }
//     arr[right] = arr[left]
//   }
//   arr[left] = target
//   console.log('=>ss', left)
//   console.log('=>ee', right)
//   quickSort(arr, start, left - 1)
//   quickSort(arr, left + 1, end)
//   return array
// }
// quickSort(array, 0, array.length - 1)

// const arr = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3, 'bbb', 'aaa', 'a', 'k']
//  function quickSort(array, start, end) {
//       if (end - start < 1) {
//         return;
//       }
//       const target = array[start];
//       let l = start;
//       let r = end;
//       while (l < r) {
//         while (l < r && array[r] >= target) {
//           r--;
//         }
//         array[l] = array[r];
//         while (l < r && array[l] < target) {
//           l++;
//         }
//         array[r] = array[l];
//       }
//       array[l] = target;
//       quickSort(array, start, l - 1);
//       quickSort(array, l + 1, end);
//       return array;
//     }

