const log = function (...rest) {
  console.log(JSON.stringify(...rest))
}
console.log('-----------------------判断数组之间是否全部重叠-----------------------')
// 判断数组之间是否全部重叠
const check = arr => {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]

    if (arr.some(item => current[0] > item[1] || current[1] < item[0])) {
      return false
    }
  }
  return true
}

const check2 = arr => {
  const left = Math.max(...arr.map(item => item[0]))
  const right = Math.min(...arr.map(item => item[1]))

  return left <= right
}

var schedule = [
  [1, 4],
  [3, 5],
  [2, 8],
  [8, 10],
]

console.log(check(schedule))
console.log(check2(schedule))

console.log('-----------------------合并区间-----------------------')

// 合并重叠区间
// 示例 1:
// 输入: [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2:
// 输入: [[1,4],[4,5]]
// 输出: [[1,5]]
// 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
const merge = arr => {
  const result = []
  arr.forEach(item => {
    const current = result.at(-1)
    if (!current) return result.push(item)

    // 不重叠，直接 push
    if (item[0] <= current[1]) {
      // 重叠，合并
      current[1] = Math.max(item[1], current[1])
    } else {
      result.push(item)
    }
  })
  return result
}

log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]),
)

log(
  merge([
    [1, 4],
    [4, 5],
  ]),
)
