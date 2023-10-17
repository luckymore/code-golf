// 输出 id 属性等于 target 的路径上的 id
const fn = (arr, target) => {
  const result = []

  const findById = (children, pid) => {
    if (!children)  return pid
    for (let index = 0; index < children.length; index++) {
      const element = children[index]
      
      if (element.id === target) {
        console.log('找到了', element.id)
        // return element.id
      }
      
      findById(element.children, element.id)
      result.push(element.id)
    }
  }

  findById(arr)

  return result
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
console.log(fn(data, '122')) // 输出 [1， 11， 112]
