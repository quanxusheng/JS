  const arr = [9, 1, 2, 7, 3, 6, 4, 5, 10, 3]

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  // console.log('=>left', left)
  // console.log('=>mergeSort(left)', mergeSort(left))
  return merge(mergeSort(left), mergeSort(right))
}

function merge(l, r) {
  console.log('=>ll', l)
  console.log('=>rr', r)
  const temp = []
  while (l.length && r.length) {
    console.log('=>', 111)
    if (l[0] < r[0]) {
      temp.push(l.shift())
    } else {
      temp.push(r.shift())
    }
  }
  console.log('=>temp', temp)
  while (l.length) {
    temp.push(l.shift())
  }
  while (r.length) {
    temp.push(r.shift())
  }
  return temp
}
mergeSort(arr)