
      (() => {
        var modules = {
          
            "./src/name.js": (module) => {
              const name = 'alex';
module.exports = name;
经过了loader2的处理loader1的注释;
            }
          ,
            "./src/age.js": (module) => {
              // const sub = require('./sub')
// import sub1 from './sub'
const age = 99;
// console.log('=>', sub)
module.exports = age;
经过了loader2的处理loader1的注释;
            }
          ,
            "./src/index.js": (module) => {
              const name = require("./src/name.js");
const age = require("./src/age.js");
console.log('=>age', age);
console.log('=>name', name);
经过了loader2的处理loader1的注释;
            }
            
        };
        var cache = {};
        function require(moduleId) {
          var cachedModule = cache[moduleId];
          if (cachedModule !== undefined) {
            return cachedModule.exports;
          }
          var module = (cache[moduleId] = {
            exports: {},
          });
          modules[moduleId](module, module.exports, require);
          return module.exports;
        }
        var exports ={};
        const name = require("./src/name.js");
const age = require("./src/age.js");
console.log('=>age', age);
console.log('=>name', name);
经过了loader2的处理loader1的注释;
      })();
 