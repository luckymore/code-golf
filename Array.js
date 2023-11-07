// 实现一个 Array.prototype.reduce
Array.prototype.reduce = function(callback, initialValue) {
  if (initialValue === undefined && this.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value')
  }
  let acc = initialValue, i = 0

  if (initialValue === undefined) {
    acc = this[0]
    i = 1
  }
  for (; i < this.length; i++) {
    acc = callback(acc, this[i], i, this)
  }

  return acc
};

console.log([1,2,3].reduce((a,b) => a + b), 6)
console.log([1,2,3].reduce((a,b) => a + b, 6), 12)
console.log([].reduce((a,b) => a + b, 6), 6)
console.log([6].reduce((a,b) => a + b), 6)
// console.log([].reduce((a,b) => a + b))

Array.prototype.flat = function(depth = 1) {
  if (depth === 0) {
    return this
  }
  const result = []
  this.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...item.flat(depth - 1))
    } else {
      result.push(item)
    }
  })
  return result
}

// console.log([].flat(2))
console.log([1,[2,[3,[4]]]].flat(3))
