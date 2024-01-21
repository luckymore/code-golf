// 1. 实现 (5).add(3).minus(2) 功能。
Number.prototype.add = function (num) {
  return this + num
}
Number.prototype.minus = function (num) {
  return this - num
}

console.log('(5).add(3).minus(2):', (5).add(3).minus(2))

// 2. 写一个数组去重函数

// > 1. 如传入的数组元素为`[123, "meili", "123", "mogu", 123]`，则输出：`[123, "meili", "123", "mogu"]`
// > 2. 如传入的数组元素为`[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]`，则输出：`[123, [1, 2, 3], [1, "2", 3], "meili"]`
// > 3. 如传入的数组元素为`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]`，则输出：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`

// 3. 输出一个每项都是数组，且元素随机来源于输入数组
// [1,2,3,4,6,7,7,8,9] =>[[3,7],[8,1],[9,2],[6,4]]
const toRandom2DArray = arr => {
  arr = [...new Set(arr)]
  const result = []
  let temp = []

  while (arr.length) {
    const cur = arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
    if (temp.length < 2) {
      temp.push(cur)
    }

    if (temp.length === 2 || arr.length === 0) {
      result.push(temp)
      temp = []
    }
  }
  return result
}

console.log('toRandom2DArray([1,2,3,4,6,7,7,8]):', JSON.stringify(toRandom2DArray([1, 2, 3, 4, 6, 7, 7, 8])))

// 找到和为 sum 的最小组合
Array.prototype.findMinUnitBySum = function (sum) {
  const hash = {}
  for (let i = 0; i < this.length; i++) {
    const targetIndex = this.indexOf(sum - this[i], i + 1)
    if (targetIndex > -1) {
      hash[this[i] * this[targetIndex]] = [this[i], this[targetIndex]]
    }
  }

  return hash[Math.min(...Object.keys(hash))]
}

console.log('findMinUnitBySum', [-1, -1, 0, -2, -3, -4, -5].findMinUnitBySum(-4))

// 2、用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。
// 如:输入 整型 1234，返回字符串“4321”。
// 要求必须使用递归函数调用，不能用全局变量， 输入函数必须只有一个参数传入，必须返回字符串。
function revertInt(n) {
  if (n < 10) {
    return n.toString()
  }
  let cur = n % 10
  let rest = revertInt(Math.trunc(n / 10))
  return cur + rest
}
console.log('revertInt', revertInt(1234))
console.log('revertInt', revertInt(100))

// 二维数组，对角线依次打印所有元素。
// 1 2 3 4
// 2 3 4 5
// 3 4 5 6
// 4 5 6 7
// 输入N*N的二维数组，Log打印
// 1
// 2 2
// 3 3 3
// 4 4 4 4
// 5 5 5
// 6 6
// 7
function logNN(arr) {
  const n = arr.length
  const res = []
  for (let i = 0; i < n; i++) {
    const item = []
    let row = 0,
      col = i
    while (row < n && col >= 0) {
      item.push(arr[row][col])
      row++
      col--
    }
    res.push(item)
  }
  for (let i = 1; i < n; i++) {
    const item = []
    let row = n - 1,
      col = i
    while (row >= 0 && col < n) {
      item.push(arr[row][col])
      row--
      col++
    }
    res.push(item)
  }
  return res
}
console.log(
  'logNN:',
  logNN([
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [4, 5, 6, 7],
  ]),
)

// 二叉树
//     1
//    2 3
//   4 5 6 7
//  8 9 10 11
// 要求输出顺序是1237654891011
class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

const zigzagLevelOrderTraversal = root => {
  if (!root) {
    return []
  }

  const queue = [root]
  const result = []
  let leftToRight = false

  while (queue.length > 0) {
    const levelSize = queue.length
    const levelValues = []

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      levelValues.push(node.val)

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    if (!leftToRight) {
      levelValues.reverse()
    }

    result.push(...levelValues)
    leftToRight = !leftToRight
  }

  return result
}

// Create the binary tree
const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)
root.left.left.left = new TreeNode(8)
root.left.left.right = new TreeNode(9)
root.left.right.left = new TreeNode(10)
root.left.right.right = new TreeNode(11)

console.log(zigzagLevelOrderTraversal(root))
