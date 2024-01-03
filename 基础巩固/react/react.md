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

Fiber 是虚拟dom的一种
Fiber
 - 保存着最小单元 React element 的信息，组件的类型，对应的dom节点信息
 - 元素的hooks的状态，commit阶段需要执行的标记
    return 父级fiber
    child 子fiber
    sibing 右边第一个兄弟fiber
## 双缓存
react中会存在两棵Fiber树
workInProgress Fiber 构建在内存中的
current Fiber 屏幕中显示的
diff算法的本质就是对比currentFiber和更新后的jsx转换后的fiber，然后生成workInProgressFiber

workInProgressFiber.alternate = currentFiber
currentFiber.alternate = workInProgressFiber

以alternate属性为桥梁，页面变化时就用在内存中生成的workInProgressFiber替换页面显示的currentFiber，以避免下一帧绘制时间过长可能造成白屏的问题



## diff算法
 降低diff算法的复杂度，预设了3个限制
1.只对同级元素进行diff
2.前后两次更新中，元素的类型发生了变化，由div变成了p，那么会销毁div及其子孙元素，新建p及其子孙节点
3.通过 ‘key prop’来暗示哪些子元素在不同的渲染中保持稳定，例如：
```jsx
// 更新前
<div>
  <p key="ka">ka</p>
  <h3 key="song">song</h3>
</div>

// 更新后
<div>
  <h3 key="song">song</h3>
  <p key="ka">ka</p>
</div>
```

先判断是否存在child节点 - 再判断key是否相同 k不同fiber直接标记删除，然后和下一个fiber比较 - key相同，再判断type是否相同，type不同直接卸载元素及其子孙元素 - 若相同则可以复用dom节点

```javascript
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement
): Fiber {
  const key = element.key;
  let child = currentFirstChild;
  
  // 首先判断是否存在对应DOM节点
  while (child !== null) {
    // 上一次更新存在DOM节点，接下来判断是否可复用

    // 首先比较key是否相同
    if (child.key === key) {

      // key相同，接下来比较type是否相同

      switch (child.tag) {
        // ...省略case
        
        default: {
          if (child.elementType === element.type) {
            // type相同则表示可以复用
            // 返回复用的fiber
            return existing;
          }
          
          // type不同则跳出switch
          break;
        }
      }
      // 代码执行到这里代表：key相同但是type不同
      // 将该fiber及其兄弟fiber标记为删除
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // key不同，将该fiber标记为删除
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }

  // 创建新Fiber，并返回 ...省略
}
```

oldFiber
abcd

newChildren
dacb

1. a -> d key不同，直接跳出循环
2. oldFiber转为map { key: fiber }

3. 遍历newChildren dacb
4. key === 'd' 在oldFiber中存在
5. oldIndex 3 > lastPlacedIndex 0  lastPlacedIndex = 3 d的位置不变

6. 继续遍历 acb, key === 'a'在oldFiber存在，oldIndex = 0
7. oldIndex 0 < lastPlacedIndex 3 a要往右移动 lastPlacedIndex = 3

8. 继续遍历newChild cb key === 'c'在oldFiber存在 oldIndex = 2
9. oldIndex 2 < lastPlacedIndex 3 c要往右移动 lastPlacedIndex = 3

9. 继续遍历 b key === 'b'在oldFiber存在 b = 1
10. oldIndex 1 < lastPlacedIndex 3 b往右移动
本轮遍历结束
尽量避免将节点从后面移动到前面的操作

## 优先级
export type PriorityLevel = 0 | 1 | 2 | 3 | 4 | 5;

export const NoPriority = 0;
export const ImmediatePriority = 1;
export const UserBlockingPriority = 2;
export const NormalPriority = 3;
export const LowPriority = 4;
export const IdlePriority = 5;










react中数据的不可变性： 1.能够使操作撤销/回退变得容易。
哪些场景不需要state
 - 数据是否随着时间的推移，保持不变
 - 是否可以由已存在的props或者state计算得出的
 - 从父组件传递的

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


