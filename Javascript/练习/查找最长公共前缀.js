let arr = ['flow', 'flower', 'flight']
// let arr = ['flow', 'flower', 'flight', '']

function handle(arr) {
  if (arr.includes('')) return ''
  let a = arr.sort()
  let first = a[0]
  let last = a[a.length - 1]
  let res = ''
  for(let i = 0, len = first.length; i < len; i++) {
    if (first[i] === last[i]) {
      res += last[i]
    } else {
      return res
    }
  }
  return res
}
console.log('=>', handle(arr))