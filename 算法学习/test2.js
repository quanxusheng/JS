let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 2},
]


function arrayToTree(items) {
  const result = []
  const itemMap = {}

  for(const item of items) {
    itemMap[item.id] = { ...item, children: [] }
  }
  console.log('=>itemMap', itemMap)
  for(const item of items) {
    const id = item.id
    const pid = item.pid
    const treeItem = itemMap[id]
    console.log('=>id', id)
    console.log('=>pid', pid)
    console.log('=>result', result)
    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

console.log('=>', arrayToTree(arr))