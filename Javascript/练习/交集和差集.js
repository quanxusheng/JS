let arr = [2, 4, 3, 5, 6]
let arr2 = [5, 6, 6, 10, 4, 2]

let result = new Set(arr.filter(x => new Set(arr2).has(x)))
let result2 = new Set(arr2.filter(x => !new Set(arr2).has(x)))
console.log('=>', ...result)
console.log('=>', ...result2)