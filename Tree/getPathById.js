/**
 * 已知树节点，获取树的节点路径
 * @param {*} tree
 * @param {*} id
 * @returns
 */
const getPathByIdRecursive = (tree, id) => {
  let result = []
  let path = []

  const traverse = (children) => {
    if (!children) return console.log('空了')
    for (let index = 0; index < children.length; index++) {
      const element = children[index]

      path.push(element.id)
      if (element.id === id) {
        console.log('找到了', element.id)
        result = path.slice()
        return element.id
      }

      traverse(element.children)
      path.pop()
    }
  }

  traverse(tree)

  return result
}

const getPathByIdLoop = (tree, id) => {
  const path = [],
    list = [...tree],
    visitedSet = new Set()

  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node.children && list.unshift(...node.children)
      path.push(node)
      if (node.id === id) return path
    }
  }
  return null
}

const data = [
  {
    id: '1',
    name: 'test1',
    children: [
      {
        id: '11',
        name: 'test11',
        children: [
          {
            id: '111',
            name: 'test111',
          },
          {
            id: '112',
            value: '1-11-112',
            name: 'test112',
          },
        ],
      },
    ],
  },
  {
    id: '12',
    name: 'test12',
    children: [
      {
        id: '121',
        name: 'test121',
      },
      {
        id: '122',
        name: 'test122',
      },
    ],
  },
]
console.log(getPathByIdRecursive(data, '122')) // 输出 [1， 11， 112]
console.log(getPathByIdLoop(data, '122').map(v => v.id)) // 输出 [1， 11， 112]



compose函数，进阶AsyncCompose
compose(fn1, fn2, fn3)(10) //
AsyncCompose(fn1, fn2, fn3)(10).then(data => console.log(data))

isHasCircle，判读对象是否有循环引用
