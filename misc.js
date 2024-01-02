function compareVersion(version1, version2) {
  const stack1 = version1.split('.').map(Number)
  const stack2 = version2.split('.').map(Number)
  const len = Math.max(stack1.length, stack2.length)
  let i = 0
  for (; i < len; i++) {
    const v1 = stack1[i] || 0
    const v2 = stack2[i] || 0

    if (v1 > v2) {
      return 1
    } else if (v1 < v2) {
      return -1
    }
  }

  return 0
}

console.log(compareVersion('1.2.3', '1.2.4'))
console.log(compareVersion('1.2.3', '1.2.3'))
console.log(compareVersion('1.2.4', '1.2.4.0'))

// 1,2,3,5,7,8,10 -> 1~3, 5, 7~8, 10
function getRange(arr) {
  const stack = []
  let i = 0,
    j = 1

  while (i < arr.length) {
    if (arr[j - 1] + 1 !== arr[j]) {
      if (j - i === 1) stack.push(arr[i])
      else stack.push(`${arr[i]}~${arr[j - 1]}`)
      i = j
    }
    j++
  }

  return stack
}

console.log(getRange([1, 2, 3, 5, 7, 8, 10]))

// 题目：实现一个 proxyObj 方法，输出符合预期
const a = {
  b: 1,
  c: {
    d: 2,
  }
};

function proxyObj(obj) {
  // code here
  new Proxy(obj, )
}

const proxyA = proxyObj(a);

console.log(proxyA.b);
// 输出 ‘b’

console.log(proxyA.c.d);
// 输出 ’c.d‘
