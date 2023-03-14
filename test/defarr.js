let arr = ['aa', 'bb']

let key = ''
Object.defineProperty(arr, 0, {
  get() {
    return key
  },
  set(newval) {
    key = newval
  }
})
arr[0] = 'ccc'