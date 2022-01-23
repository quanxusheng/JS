/*  题目
  {
    "a": {
      "b": {
        "c": {
          "d": 1
        }
      }
    },
    "aa": 2,
    "c": [
      1,
      2
    ]
  } =>
  { 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }
*/
let obj = {
    "a": {
      "b": {
        "c": {
          "d": 1
        }
      }
    },
    "aa": 2,
    "c": [
      1,
      2,
      [3, 4]
    ]
  }

  function flat(obj, key = "", res = {}, isArray = false) { 
  for (let [k, v] of Object.entries(obj)) { 
    // console.log('=>kkk', k)
    // console.log('=>vvv', v)
    if (Array.isArray(v)) {
      let tmp = isArray ? key + "[" + k + "]" : key + k
      flat(v, tmp, res, true)
    } else if (typeof v === "object") {
      let tmp = isArray ? key + "[" + k + "]." : key + k + "."
      console.log('=111>', tmp)
      console.log('=>444', isArray)
      flat(v, tmp, res)
    } else { 
      let tmp = isArray ? key + "[" + k + "]" : key + k
      console.log('=>222', tmp)
      res[tmp] = v
    } 
  } 
  return res
}
console.log('=>', flat(obj))