let arr = [1,2,3, [1,2,[1.4], [1,2,3]]]
let newArr = []
function flat(arr) {
    arr.map(item => {
        Array.isArray(item) ? flat(item) : newArr.push(item)
    })
}
flat(arr)
console.log('=>', newArr)