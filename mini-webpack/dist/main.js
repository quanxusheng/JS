
      (() => {
        var modules = {
          
            "./src/name.js": (module) => {
              const name = 'alex';
module.exports = name;
aaaloader1的注视;
            }
          ,
            "./src/sub.js": (module) => {
              module.exports = 'aaa';
aaaloader1的注视;
            }
          ,
            "./src/age.js": (module) => {
              const sub = require("./src/sub.js");
const age = 99;
module.exports = age;
aaaloader1的注视;
            }
          ,
            "./src/index.js": (module) => {
              const name = require("./src/name.js");
const age = require("./src/age.js");
console.log('=>age', age);
console.log('=>name', name);
aaaloader1的注视;
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
aaaloader1的注视;
      })();
 