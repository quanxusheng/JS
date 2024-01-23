// const element = (
//     <div id="foo">
//         <a>
//             bar
//             <h2 className="标题">Animal</h2>
//         </a>
//         <b />
//     </div>
// )
// ReactDOM.render(element, container)

// React.createElement(
//     'div',
//     { id: 'foo' },
//     React.createElement('a', null, 'bar', React.createElement('h2', { className: '标题' }, 'Animal')),
//     React.createElement('b')
// )

let nextUnitOfWork = null
let wipRoot = null
let currentRoot = null
let deletions = null

// 是否为事件属性
const isEvent = key => key.startsWith('on')

// 除了children和事件属性之外的属性
const isProperty = key => key !== 'children' && !isEvent(key)

// 是否为新增属性
const isNew = (prev, next) => key => prev[key] !== next[key]

// 是否要移除属性
const isGone = (prev, next) => key => !(key in next)

const container = document.getElementById('root')
const selfReact = {
    createElement,
    render,
}

// JSX
const element = `
    <div id="foo" style="background: red" title="远智" className="grid" person="9999">
        <a>
            bar
            <h2 title="云之智" person="99">Animal</h2>
        </a>
        <b />
    </div>
`

// babel 编译完jsx后
const babelTransformJsx = selfReact.createElement(
    'div',
    { id: 'foo', title: '远智', className: 'grid', person: 9999, style: 'background: pink' },
    selfReact.createElement('a', null, 'bar', selfReact.createElement('h2', { title: '云之智', person: 99 }, 'Animal')),
    selfReact.createElement('b')
)
console.log('=>babelTransformJsx', babelTransformJsx)
/** babelTransformJsx
 * {
    "type": "div",
    "props": {
        "id": "foo",
        "title": "远智",
        "className": "grid",
        "person": 9999,
        "style": "background: pink",
        "children": [
            {
                "type": "a",
                "props": {
                    "children": [
                        {
                            "type": "TEXT_ELEMENT",
                            "props": {
                                "nodeValue": "bar",
                                "children": []
                            }
                        },
                        {
                            "type": "h2",
                            "props": {
                                "title": "云之智",
                                "person": 99,
                                "children": [
                                    {
                                        "type": "TEXT_ELEMENT",
                                        "props": {
                                            "nodeValue": "Animal",
                                            "children": []
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "b",
                "props": {
                    "children": []
                }
            }
        ]
    }
}
 */
// selfReact.render(element, container)
selfReact.render(babelTransformJsx, container)

//  createElement 将babel转换完的jsx代码转换为虚拟dom
function createElement(type, props, ...children) {
    // console.log('=>props', props)
    // console.log('=>children', children)
    // console.log('=>', type, props, children)
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                if (typeof child === 'object') {
                    return child
                } else {
                    console.log('=>childchild', child)
                    return createTextElement(child)
                }
            }),
        },
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    }
}

// 2. render 将虚拟dom转换为真实dom
function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
        // 初始为null， 之后的更新和上次commit完成保存的fiber树建立连接
        alternate: currentRoot,
    }
    deletions = []
    nextUnitOfWork = wipRoot

    console.log('=>nextUnitOfWork', nextUnitOfWork)
}

function createDom(fiber) {
    // console.log('=>createDom', fiber)
    const { type, props } = fiber
    let node = type === 'TEXT_ELEMENT' ? document.createTextNode(props.nodeValue) : document.createElement(type)

    Object.entries(props).forEach(([key, val]) => {
        // console.log('=>333', key, val)
        if (key !== 'children') {
            // console.log('=>key', key, val)
            // node[key] = val
            // console.log('=>node', node)
        } else {
            // console.log('=>sub', props)
            val.forEach(sub => {
                createDom(sub, node)
            })
        }
    })
    return node

    // console.log('=>node', node)
    //  container.append(node)
}

// 3.concurrent mode 并发模式 可中断渲染

// let nextUnitOfWork = null
function workLoop(deadline) {
    let shouldYield = false
    // console.log('=>nextUnitOfWork', nextUnitOfWork)
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }
    // console.log('=>11', nextUnitOfWork)
    // console.log('=>22', wipRoot)
    while (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function commitRoot() {
    console.log('=>wipRoot', wipRoot)
    //  处理收集的需要删除的旧节点
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    // commit完成 保存当前的fiber的树
    currentRoot = wipRoot
    wipRoot = null
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }
    const domParent = fiber.parent.dom

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    } else if (fiber.effectTag === 'DELETION') {
        domParent.removeChild(fiber.dom)
    }

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function updateDom(dom, prevProps, nextProps) {
    console.log('=>updateDom-prevProps', prevProps)

    // 移除旧事件
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(name in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach(name => {
            const eventName = name.toLowerCase().substring(2)
            dom.removeEventListener(eventName, prevProps[name])
        })

    // 移除旧属性 找到新props中有而旧props中没有的
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = ''
        })

    // 新增新属性
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name]
        })

    // 新增新事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventName = name.toLowerCase().substring(2)
            dom.addEventListener(eventName, nextProps[name])
        })
}

function performUnitOfWork(fiber) {
    console.log('=>performUnitOfWork-fiber', fiber)
    // fiber = babelTransformJsx
    // const node = document.createElement(fiber.dom)
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }

    const elements = fiber.props.children

    reconcileChildren(fiber, elements)
}

function reconcileChildren(wipFiber, elements) {
    let index = 0
    let prevSibling = null
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child

    while (index < elements.length || !oldFiber) {
        const element = elements[index]
        console.log('=>elementelement', element)

        let newFiber = null

        const sameType = oldFiber && element && oldFiber.type === element.type
        /* 
            这里的比较规则如下：
            如果旧的 fiber 元素 和新元素具有相同的类型，那么再进一步进行比较 他们的 属性
            如果类型不同，并且有一个新元素，则需要创建一个新的DOM节点
            如果类型不同，并且有一个旧 fiber 元素，则移除旧的节点
            这里React也使用 key 进行比较。例如，它检测到子元素在元素数组中的位置发生了变化。
        */
        // 1 UPDATE
        if (sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
            }
        }

        // 2 PLACEMENT
        if (!sameType && element) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: 'PLACEMENT',
            }
        }

        // 3 DELETION
        if (!sameType && oldFiber) {
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }

        // console.log('=element>', element)
        // const newFiber = {
        //     type: element.type,
        //     props: element.props,
        //     parent: fiber,
        //     dom: null,
        //     // dom: createDom(element),
        // }

        // 如果是第一个子元素，就把newFiber赋值给wipFiber的child
        if (index === 0) {
            wipFiber.child = newFiber
        } else if (element) {
            console.log('=>index', index)
            console.log('=>prevSibling', prevSibling)
            console.log('=>element', element)
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        // console.log('=>999', prevSibling)
        index++
    }
    console.log('=>222', fiber)
    // if (fiber.child) {
    //     return fiber.child
    // }
    // // console.log('=>prevSibling', prevSibling)
    // let nextFiber = fiber
    // while (nextFiber) {
    //     if (nextFiber.sibling) {
    //         return nextFiber.sibling
    //     }
    //     nextFiber = nextFiber.parent
    // }
}

/**4. Fiber 要做3件事
 *  - 1.DOM中添加element
 *  - 2.为每一个element的children创建fiber
 *  - 3. 选择下一个单元的work
 */
