## react 设计理念
react -> 构建快速响应的web应用 -> 受限于cpu和io瓶颈
 - cpu瓶颈 -> 浏览器的刷新率 1000ms/60hz 16.6ms浏览器刷新一次
    16.6ms 要完成 js执行 -> 样式布局和绘制
    js线程和浏览器GUI渲染线程是互斥的，所以js线程执行时间过长，导致16.6ms内无法进行样式布局绘制，就是页面掉帧，卡顿
    解决方案： 时间切片，将长任务拆分到每一帧中去。每一帧预留时间（初始时间为5ms）给js线程执行，若是预留时间不够用，就把线程控制权交还给浏览器渲染ui

## v15 -> v16
v15版本的架构
 - reconciler：协调器 负责找出变化
 - renderer：渲染器 负责将 变化 渲染到页面
 react 使用 this.setState() this.forceUpdata() ReactDom.render() 触发更新

 每当有更新发生，reconciler要做如下工作

 调用render()方法，jsx会被转化为虚拟dom
 对比虚拟dom，找出需要更新的组件
 调用renderer()将变更的虚拟dom渲染到页面
reconciler和renderer是交替工作的，比如受数据变化影响的两个li，第一个li在页面变化后，第二个li再进入reconciler
创建和更新都得递归执行而且无法中断，层级很深时，执行超过16ms，用户交互就会卡顿

v16
 - scheduler: 调度器，调度任务优先级，高优任务先进入 reconciler
 - reconciler：协调器
 - renderer: 渲染器

scheduler 实现了requestIdleCallback的polyfill，能够在浏览器空闲时间触发回调，还能提供多种调度优先级任务设置
reconciler 更新工作从递归变成了可以中断循环的过程，每次循环都会使用shouldYield判断当前是否还有剩余时间

reconciler和renderer不再交替工作，schduler把任务交给reconciler之后，reconciler会把所有组件变化对应的虚拟dom打上标记，renderer会根据被标记完的虚拟dom，同步执行对应的dom操作











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

flushSync() 同步更新dom


jsx经过babel编译为react.createElement()


react 批处理 事务机制

ReactElement.createElement()