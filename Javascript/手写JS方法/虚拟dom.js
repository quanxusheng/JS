function Element(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
  }
  function el(tagName, props, children) {
    return new Element(tagName, props, children)
  }
  var ul = el('ul', {id: 'list'}, [
    el('li', {class: 'item'}, ['Item 1']),
    el('li', {class: 'item'}, ['Item 2']),
    el('li', {class: 'item'}, ['Item 3']),
  ])
  Element.prototype.render = function() {
    var el = document.createElement(this.tagName)
    var props = this.props

    for(var propName in props) {
      var propValue = props[propName]
      el.setAttribute(propName, propValue)
    }

    var children = this.children || []
    children.forEach(child => {
      console.log('=>', child)
      var childEl = child instanceof Element
        ? child.render() // 如果子节点也是虚拟dom，递归构建DOM节点
        : document.createTextNode(child) // 如果字符串，只构建文本节点
      el.appendChild(childEl)
    })
    return el
  }
  
  var ulRoot = ul.render()
  document.body.appendChild(ulRoot)

  // diff函数，对比两棵树
  function diff(oldTree, newTree) {
    var index = 0
    var patches = {}
    dfsWalk(oldTree, newTree, index, patches)
    return patches
  }

  // 对两棵树进行深度优化遍历
  function dfsWalk(oldNode, newNode, index, patches) {
    // 对比oldNode和newNode的不同，记录下来
    var currentPatches = patches[walker.index] // 从patches中拿出当前节点的差异
    var len = node.childNodes
     ? node.childNodes.length
     :0
    for(var i = 0; i < len; i++) {
      var child = node.childNodes[i]
      walker.index++
      dfsWalk(child, walker, patches)
    }
    if (currentPatches) {
      applyPatches(node, currnentPatches) // 对当前节点进行DOM操作
    }

    diffChildren(oldNode.children, newNode.children, index, patches)
  }
function applyPatches (node, currentPatches) {
  currentPatches.forEach(function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node)
        break
      case REORDER:
        reorderChildren(node, currentPatch.moves)
        break
      case PROPS:
        setProps(node, currentPatch.props)
        break
      case TEXT:
        node.textContent = currentPatch.content
        break
      default:
        throw new Error('Unknown patch type ' + currentPatch.type)
    }
  })
}

  // 遍历子节点
  function diffChildren(oldChildren, newChildren, index, patches) {
    var letNode = null
    var currentNodeIndex = index
    oldChildren.forEach((child, i) => {
      var newChild = newChildren[i]
      currentNodeIndex = (leftNode && leftNode.count) // 计算节点的标识
       ? currentNodeIndex + leftNode.count + 1
       : currentNodeIndex + 1
      dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
      leftNode = child
    })
  }
  var replace = 0
  var reorder = 1
  var props = 2
  var text = 3

  function patch(node, patches) {
    var walker = {index: 0}
    dfsWalk(node, walker, patches)
  }
