/**
 * 深拷贝，考虑循环引用问题
 * 需要实现 Set/Map/Symbol 的拷贝
 */
const deepClone = (target, hashMap = new WeakMap()) => {
  // Check if the target is a primitive data type
  if (target === null || typeof target !== 'object') {
    return target
  }

  if (/^[Function|RegExp|Date|Error]+$/.test(target.constructor.name)) return new target.constructor(target)

  // Check if the target has already been cloned
  if (hashMap.has(target)) {
    return hashMap.get(target)
  }

  let clone

  // Clone the properties of the target
  if (target instanceof Set) {
    clone = new Set()
    target.forEach(value => {
      clone.add(deepClone(value, hashMap))
    })
  } else if (target instanceof Map) {
    clone = new Map()
    target.forEach((value, key) => {
      if (Object(value) !== value) {
        clone.set(key, value)
      } else {
        clone.set(key, deepClone(value, hashMap))
      }
    })
  } else {
    clone = Array.isArray(target) ? [] : {}
    hashMap.set(target, clone)
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        clone[key] = deepClone(target[key], hashMap)
      }
    }
  }

  return clone
}
const nest = { flag: false }
const mapCircle = new Map([[1, 2]])
const circleObj = {
  a: 1,
  nest,
  date: new Date('2020'),
  ss: Symbol(1), set: new Set([1, 2]), map: mapCircle
}
circleObj.c = circleObj
mapCircle.set(3, circleObj)

const clone = deepClone(circleObj)
nest.flag = true
circleObj.set.add(3)
mapCircle.set(4, 4)
circleObj.xxx = 'xxx'
console.log(clone)
console.log('symbol', clone.ss === circleObj.ss)
console.log('date', clone.date === circleObj.date, clone.date)
console.log('map', clone.map)
// console.log(structuredClone({circleObj, set: new Set([1, circleObj]), map: new Map([[1,2]])}))
