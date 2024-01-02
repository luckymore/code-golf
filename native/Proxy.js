// 实现 arr[-1] 的访问

const arr = [0, 1, 2]
const proxy = new Proxy(arr, {
  get(target, p, receiver) {
    if (p < 0) return target[+p + target.length]
    return target[p]
  }
})

console.log(proxy[-1])
console.log(proxy[0])

// a == 1 && a == 2
let a = {
  _a: 0,
  toString() {
    return ++this._a
  }
}

if (a == 1 && a == 2 && a == 3) {
  console.log('a is ok')
}
