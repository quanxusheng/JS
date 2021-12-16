var value = 2;

var foo = {
  value: 1
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';
// var bindFoo = bar.bind(foo, 'daisy');

// Function.prototype.bind2 = function(context, ...args) {
//   console.log('=>context', context)
//   console.log('=>this', this)
//   var result = (res) => {
//     return this.apply(this, args.concat(res))
//   }
//   return result
// }
Function.prototype.bind2 = function (context) {

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

var bindFoo = bar.bind2(foo, 'daisy');
var obj = new bindFoo('18');
bar.prototype.friend = 'kevin222'
console.log(obj);
console.log(obj.habit);
console.log(obj.friend);
