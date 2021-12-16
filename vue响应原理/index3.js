
var val = ''
var obj = {
  a: '111'
}
Object.defineProperty(obj, 'a', {
  get() {
    console.log('=>gggg')
    return val
  },
  set(n) {
    val = n
  }
})
var b = obj['a']