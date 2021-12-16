let arr = [
  {
    id: 'alex',
    age: 12
  },
  {
    id: 'yiyuan',
    age: 12
  },
  {
    id: 'fang',
    age: 12
  },
  {
    id: 'alex',
    age: 12
  },
  {
    id: 'fang',
    age: 12
  }
]

// 1.对象访问属性的方法
// let obj = {}
// let arr2 = []
// for (let i = 0; i < arr.length; i++) {
//   if (!obj[arr[i].id]){
//     obj[arr[i].id] = arr[i].id
//     arr2.push(arr[i])
//   }
// }
// console.log('=>', obj)
// console.log('=>', arr2)

// 2.reduce
let obj = {}
let arr1 = arr.reduce((item, next) => {
  console.log('=>1', item)
  console.log('=>22', next)
  obj[next.id] ? '' : obj[next.id] = true && item.push(next)
  return item
}, [])
console.log('=>aa', arr1)
console.log('=>bbb', obj)
