export function mountComponent(vm, el) {
  /* 
    上一步模板编译解析生成了render函数
    下一步就是执行vm.render()方法 调用生成的render函数 生成虚拟dom
    最后使用vm._update()方法把虚拟dom渲染到页面
  */
 // 真实的el选项赋值给实例的$el属性 为之后的虚拟dom产生的新dom替换老 的dom做铺垫
 vm.$el = el
 // _update和_render方法都是挂在在vue原型的方法 类似_init
 vm._update(vm._render())
}
/* 
  lifecycle.js文件 表示生命周期相关功能 核心导出mountComponent函数
  主要使用vm._update(vm._render())方法进行实例挂载
*/