const array = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3]

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const front = array.slice(0, mid);
  const end = array.slice(mid);
  return merge(mergeSort(front), mergeSort(end));
}

function merge(front, end) {
  console.log('=>front',front )
  console.log('=>end',end )
  const temp = [];
  while (front.length && end.length) {
    if (front[0] < end[0]) {
      temp.push(front.shift());
    } else {
      temp.push(end.shift());
    }
  }
  while (front.length) {
    temp.push(front.shift());
  }
  while (end.length) {
    temp.push(end.shift());
  }
  return temp;
}
console.log(mergeSort(array))