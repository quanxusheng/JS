


let obj = {
    info: {
        age: 18,
        name: 'alex',
        colors: ['yellow', 'red'],
        first: null,
        second: undefined,
        three: Number(33),
        four: new Date()
    },
    height: 100
}

function deep(obj) {
    if (obj === null || obj === undefined) return obj
    if (typeof obj != 'object') return obj
    if (obj instanceof Date) return
    let result = Array.isArray(obj) ? [] : {}
    for(let [key, value] of Object.entries(obj)) {
        result[key] = typeof value === 'object' ? deep(value) : result[key] = value
    }
    return result
}
let obj2 = deep(obj)
obj.height = 110
obj.info.width = 200
obj.info.colors = 1
console.log('=>', obj)
console.log('=>', obj2)