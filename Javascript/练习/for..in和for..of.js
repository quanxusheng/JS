let arr = ['yellow', 'red', 'green']
let obj = {
    0: 'yellow',
    1: 'red',
    2: 'green',
}
for(let i in arr) {
    console.log('=>11', i)
}
for(let i in obj) {
    console.log('=>222', i)
}
for(let i of arr) {
    console.log('=>33', i)
}
for(let i of Object.values(obj)) {
    console.log('=>444', i)
}
// for..in作用于数组和对象的key，for..of作用于数组的value

/* 
    =>11 0
    =>11 1
    =>11 2
    =>222 0
    =>222 1
    =>222 2
    =>33 yellow
    =>33 red
    =>33 green
    =>444 yellow
    =>444 red
    =>444 green 
*/