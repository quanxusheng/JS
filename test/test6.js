//   房租水电网通勤  吃饭   加餐  
let arr  = [4000, 2000, 1000]
let Ztotal = 18000  // 工资1
let Qtotal = 15000 // 工资2
let Qtotal2 = 18000 // 工资2
let AllTotal = (Ztotal + Qtotal2) * 12
function num (arr, total) {
  let m = arr.reduce((pre, cur) => pre + cur)
  let y = m * 12
  console.log('=>', `赵的年薪：${Ztotal}/${Ztotal * 12}，全的年薪：${Qtotal}/${Qtotal * 12}，一年收入：${total}`)
  console.log('=>', `每月开销：${m}，每年开销：${y}，剩下的钱：${total - y}, 未来5年大概的存款：${(total - y) * 5}，未来10年大概的存款：${(total - y) * 10} `)
}

num(arr, AllTotal)