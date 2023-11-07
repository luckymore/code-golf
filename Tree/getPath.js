const obj = {
  a: {
    b: {
      c: {
        d: 'd',
        dd: 'dd'
      },
    },
  },
  a1: {
    b1: {
      c1: {
        d1: 'd1',
      },
    },
  },
}

console.log(getPath(obj, 'dd'))

// 找到属性值等于 value 的对象路径
function getPath(obj, value) {
  let result = []
  const path = []

  const traverse = (obj) => {
    if (typeof obj !== 'object') return
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const item = obj[key]
  
      path.push(key)
      if (item === value) {
        result = path.slice()
        return
      }
  
      traverse(item)
      path.pop()
    }
  }

  traverse(obj)

  return result
}
