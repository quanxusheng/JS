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

  let flatten = (obj) => {
	let result = {};
    
    let process = (key, value) => {
    	// 首先判断是基础数据类型还是引用数据类型
        if (Object(value) !== value) {
        	// 基础数据类型\
            if (key) {
            	result[key] = value;
            }
        } else if(Array.isArray(value)){
       		for (let i = 0; i< value.length; i++) {
            	process(`${key}[${i}]`, value[i])
            }
            if (value.length === 0) {
            	result[key] = [];
            }
        } else {
            let objArr = Object.keys(value);
            objArr.forEach(item => {
                process(key?`${key}.${item}`:`${item}`, value[item])
            });
            if (objArr.length === 0 && key) {
                result[key] = {};
            }
        }
    }
    process('', obj)
    return result;
}
console.log('=>', flatten(obj))