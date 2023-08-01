

事件处理程序
 - 在react中，所有的事件都会向上传播，除了scroll，它仅适用于附加的jsx标签

react中组件的渲染
 -导致组件渲染
  -组件初次渲染，初次渲染调用根组件
    客人点单到厨房 -> 厨房烹饪 -> 菜品到桌上
    触发一次渲染 -> 渲染组件 -> 生成dom

    import { createRoot } from 'react-dom/client'
    const root = createRoot(document.getElementById('root'))
    root.render(<Div />)

  -组件祖先及自身状态 state 变化，会引起该组件及其子孙组件的重新渲染，这个过程是递归的，直到没有返回（return）组件为止
   客人又陆续点了奶茶，甜品

如果渲染的结果相同，react将不会更新dom（猜测对比两颗虚拟dom树，只更新标记了需要更改的虚拟dom节点）

state 如同一次快照
  -每次state的变更，会重新生成一个渲染函数并把变更的state值传进去