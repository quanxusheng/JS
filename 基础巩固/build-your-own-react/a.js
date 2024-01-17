// const element = <h1 title="foo">hello</h1>
// const container =document.getElementById('root')
// ReactDom.render(element, container)

// const element = React.createElement('h1', { title: 'foo' }, 'hello')

const element = {
    type: 'h1',
    props: {
        title: 'foo',
        children: 'hello',
    },
}

let container = document.getElementById('root')

const node = document.createElement(element.type)
const text = document.createTextNode(element.props.children)

node.appendChild(text)
container.append(node)
