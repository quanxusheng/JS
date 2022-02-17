var str = 'abaasdffggghhjjkkgfddsssss3444343';

let arr = [...str]
let obj = {}
let max = 0
let name = ''
for(let k of arr) {
    console.log('=>', k)
    if (k in obj) {
        obj[k] += 1
    } else {
        obj[k] = 0
    }
    if (obj[k] > max) {
        max = obj[k]
        name = k
    }
}
console.log('=>', obj)
console.log('=>max', `${name}出现了 ${max}次`)