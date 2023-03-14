function P() {}
let p = new P()
// console.log('=>', p instanceof P)

function myInstanceof(left, right) {
  let proto = left.__proto__
  let prototype = right.prototype
  while(true) {
    if (proto === null || proto === undefined) {
      return false
    }
    if (proto === prototype) {
      return true
    }
    proto = proto.__proto__
  }
}
console.log('=>', myInstanceof(p, P))