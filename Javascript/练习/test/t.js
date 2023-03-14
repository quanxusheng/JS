function withValue(value) {
  var d = withValue.d || (
    withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value: null
    }
  );
  console.log('=>1111', d)
  console.log('=>value', value)
  d.value = value;
  return d;
}
var w = withValue(3)
console.log('=>w', w)

var obj = {}
var w1 = Object.defineProperty(obj, 'b', w)
console.log('=>obj', obj)
console.log('=>w1', w1)