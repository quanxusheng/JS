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

const container = document.getElementById('root')
let nextUnitOfWork = null
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
// console.log('=>babelTransformJsx', babelTransformJsx)
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
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element],
        },
    }
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
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
    console.log('=>performUnitOfWork-fiber', fiber)
    // fiber = babelTransformJsx
    // const node = document.createElement(fiber.dom)
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    if (fiber.parent) {
        fiber.parent.dom.append(fiber.dom)
    }
    const elements = fiber.props.children

    let index = 0
    let prevSibling = null

    while (index < elements.length) {
        const element = elements[index]
        // console.log('=element>', element)
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
            // dom: createDom(element),
        }
        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        // console.log('=>999', prevSibling)
        index++
    }
    console.log('=>222', fiber)
    if (fiber.child) {
        return fiber.child
    }
    // console.log('=>prevSibling', prevSibling)
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}

/**4. Fiber 要做3件事
 *  - 1.DOM中添加element
 *  - 2.为每一个element的children创建fiber
 *  - 3. 选择下一个单元的work
 */
