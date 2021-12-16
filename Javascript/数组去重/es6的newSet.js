let arr = [2, '1', '2', 'a', 2, 1, 'a']

console.log('=>', new Set(arr))
// console.log('=>', Array.from(new Set(arr)))
console.log('=>', [...new Set(arr)])
