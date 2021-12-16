 const array = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3]
 
 function quickSort(array, start, end) {
    if (end - start < 1) {
      return;
    }
    const target = array[start];
    let l = start;
    let r = end;
    while (l < r) {
      while (l < r && array[r] >= target) {
        r--;
      }
      // console.log('=>left', l)
      // console.log('=>right', r)
      array[l] = array[r];
      // console.log('=>l', array)
      // console.log('=>l', array[l])
      while (l < r && array[l] < target) {
        // console.log('=>00', l)
        // console.log('=>00', r)
        // console.log('=>11', array[l])
        // console.log('=>22', target)
        // console.log('=>33', array)
        l++;
      }
      // console.log('=>left22', l)
      // console.log('=>right22', r)
      console.log('=>11', array[l])
      console.log('=>22', array[r])
      array[r] = array[l];
      // console.log('=>r', array[r])
    }
    array[l] = target;
    // console.log('=>00', l)
    // console.log('=>00', r)
    // console.log('=>11', start)
    // console.log('=>11', end)
    // console.log('=>array', array)
    // quickSort(array, start, l - 1);
    // quickSort(array, l + 1, end);
    return array;
}
 console.log('=>', quickSort(array, 0, array.length-1))