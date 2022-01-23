//          房租  吃饭   加餐  水电网通勤
let arr  = [2800, 1200, 1000, 700]
let arr2 = [2000, 1200, 500, 500]
let total = 15000 * 13  // 工资1
let total2 = 16000 * 13 // 工资2
let total3 = 18000 * 13 // 工资3
function num (arr, total) {
  let m = arr.reduce((pre, cur) => pre + cur)
  let y = m * 12
  console.log('=>', `每月开销：${m}，每年开销：${y}，剩下的钱：${total - y}, 未来5年大概的存款：${(total - y) * 5}, 一年收入：${total}`)
}

num(arr, total)
num(arr, total2)
num(arr, total3)
num(arr2, total)
num(arr2, total2)
num(arr2, total3)