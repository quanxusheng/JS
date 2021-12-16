//1.typeof
function a(){}
let arr = [1, '1', a, false, {name: 'alex'}, [], null, undefined]

// arr.map(item => {
//   console.log('=>', typeof item)
// })
/* 
=> number
=> string
=> function
=> boolean
=> object
=> object
=> object
=> undefined
*/

// 2.Object.prototype.toString
arr.map(item => {
  console.log('=>', Object.prototype.toString.call(item).toLowerCase())
})

/* 
=> [object number]
=> [object string]
=> [object function]
=> [object boolean]
=> [object object]
=> [object array]
=> [object null]
=> [object undefined]
*/
