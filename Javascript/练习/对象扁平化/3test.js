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

  function flat(obj){
    let result = {}
    handle = (key, value) => {
      // 判断是引用类型还是普通类型
      if (Object(value) !== value) {
        result[key] = value
      } else if (Array.isArray(value)) {
        for(let i = 0; i < value.length; i++) {
          handle(`${key}[${i}]`, value[i])
        }
        if (!value.length){
          result[key] = []
        }
      } else {
        let keys = Object.keys(value)
        keys.map(item => {
          handle(key ? `${key}.${item}` : `${item}`, value[item])
        })
        if (!keys.length) {
          return[key] = {}
        }
      }
    }
    handle('', obj)
    return result
  }
  console.log('=>', flat(obj))

  // let result = {}
  // function handle(temp = '', obj, key = '', isArray = false) {
  //   for (let [k, v] of Object.entries(obj)) {
  //     if (Array.isArray(obj[k])) {
  //       console.log('=>key', key)
  //       // console.log('=>k', k)
  //       // console.log('=>v', v)
  //       // let t = isArray ? `${temp}[${k}]` : key 
  //       handle(key, obj[k], k, true)
  //     } else if (typeof obj[k] === 'object') {
  //       let t = temp + k + '.'
  //       handle(t, obj[k], k)
  //     } else {
  //       // console.log('=>temp', temp)
  //       // console.log('=>obj', obj)
  //       // console.log('=>key', key)
  //       // console.log('=>k', k)
  //       result[temp + k] = obj[k]
  //     }
  //   }
  // }
  // handle('', obj)
  // console.log('=>result', result)

  // let key = ''
  // function handle(obj) {
  //   let lastKey = ''
  //   let res = Object.keys(obj).reduce((cur, last) => {
  //     lastKey = last
  //     if (typeof obj[last] === 'object') {
  //       for(let k in obj[last]) {
  //         console.log('=>kkk', k)
  //       }
  //       key =  key ? key + ('.' + last) : key + last
  //       handle(obj[last])
  //     } else {
  //       cur[key] = obj[last]
  //       console.log('=>cccc', cur)
  //     }
  //     return cur
  //   }, {})
  //   console.log('=>res', res)
  // }
  // handle(obj)