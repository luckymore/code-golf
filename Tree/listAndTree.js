let list =[
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
];
const tree = fromList(list);
console.log(tree)
const simple = toList(tree);
console.log(simple)
const simple2 = toListRecursive(tree);
console.log(simple2)

function fromList(list) {
  const map = new Map()
  const result = []
  for (let item of list) {
    map.set(item.id, item)
    item.children = []
  }
  for (let item of list) {
    const parent = map.get(item.parentId);
    (parent ? parent.children : result).push(item)
  }
  return result
}

function toList(tree) {
  const result = [...tree]
  for (let i = 0; i < result.length; i++) {
    const item = result[i]
    result.push(...item.children)
  }
  return result
}

function toListRecursive(tree) {
  const result = []
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i]
    result.push(...toListRecursive(item.children))
    result.push(item)
  }
  return result
}
