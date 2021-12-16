// src/index.js

import { initMixin } from './init.js';

// Vue是一个构造函数，通过new关键字进行实例化
function Vue(options) {
  // _init方法定义在initMixin中，挂载在Vue的原型方法中
  this._init(options)
}

initMixin(Vue)

export default Vue;
