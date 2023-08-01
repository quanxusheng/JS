var obj = {
    a: 111,
}
var obj2 = {
    a: 111,
}

var s = new WeakMap()
s.set(obj, obj)
console.log('=>sss', s)
