/**
 * 深拷贝，考虑循环引用问题
 * 需要实现 Set/Map/Symbol 的拷贝
 */
const deepClone = (target, map = new WeakMap()) => {
  // Check if the target is a primitive data type
  if (Object(target) !== target || typeof target === 'function') {
    return target
  }

  // Check if the target has already been cloned
  if (map.has(target)) {
    return map.get(target)
  }

  // Create a new empty object or array to store the cloned properties
  let clone = Array.isArray(target) ? [] : {}

  // Store the clone in the map
  map.set(target, clone)

  // Clone the properties of the target
  if (target instanceof Set) {
    const set = clone = new Set()
    target.forEach(value => {
      set.add(deepClone(value, map))
    })
  } else if (target instanceof Map) {
    const map = new Map()
    target.forEach((value, key) => {
      if (Object(value) !== value) {
        map.set(key, value)
      } else {
        map.set(key, deepClone(value, map))
      }
    })
    clone = map
  } else if (target instanceof Symbol) {
    clone = Object(Symbol.prototype.valueOf.call(target))
  } else if (target instanceof Date) {
    clone = new Date(target)
  } else {
    Object.keys(target).forEach(key => {
      clone[key] = deepClone(target[key], map)
    })
  }

  return clone
}
const nest = { flag: false }
const circleObj = { a: 1, date: new Date('2020'), ss: Symbol(1), set: new Set([1, 2]), map: new Map([[1, nest]]) }
circleObj.c = circleObj

const clone = deepClone(circleObj)
nest.flag = true
circleObj.set.add(3)
console.log(clone)
console.log('symbol', clone.ss === circleObj.ss)
console.log('date', clone.date === circleObj.date, clone.date)
console.log('map', clone.map)
// console.log(structuredClone({circleObj, set: new Set([1, circleObj]), map: new Map([[1,2]])}))
