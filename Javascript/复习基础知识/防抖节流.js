// function debounce(fn, wait = 1000) {
//   let timer = null
//   clearTimeout(timer)
//   timer = setTimeout(() => {
//     fn.apply(this, ...arguments)
//   }, wait)
// }

function throttle(fn, wait) {
  let now, last = 0
  return function () {
    now = +new Date()
    if (now - last > wait) {
      fn.apply(this, ...arguments)
      last = now
    }
  }
}

function throttle2(fn, wait) {
  let timer = null
  if (!timer) {
    timer = setTimeout(() => {
      fn.apply(this, ...arguments)
      timer = null
    }, wait)
  }
}