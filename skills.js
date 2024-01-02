// 1. 实现 (5).add(3).minus(2) 功能。
Number.prototype.add = function(num) {
  return this + num
}
Number.prototype.minus = function(num) {
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

console.log('toRandom2DArray([1,2,3,4,6,7,7,8]):', JSON.stringify(toRandom2DArray([1,2,3,4,6,7,7,8])))


Array.prototype.findMinUnitBySum = function(sum) {
  const hash = {}
  for (let i = 0; i < this.length; i++) {
    const targetIndex = this.indexOf(sum - this[i], i + 1)
    if (targetIndex > -1) {
      hash[this[i] * this[targetIndex]] = [this[i], this[targetIndex]]
    }
  }

  return hash[Math.min(...Object.keys(hash))]
}

console.log('findMinUnitBySum', [-1,-1,0,-2,-3,-4,-5].findMinUnitBySum(-4))

