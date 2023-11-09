/**
 * myCall
 */
Function.prototype.myCall = function (context, ...args) {
  // null and undefined will be replaced with the global object
  context = context === undefined || context === null ? globalThis : context
  // primitive values will be converted to objects
  if (Object(context) !== context) {
    context = Object(context)
  }
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

function add(params) {
  return this.a + params
}
console.log(add.myCall(0, 2))
console.log(add.call(0, 2, 3, 4))

/**
 * myApply
 */
Function.prototype.myApply = function (context, args = []) {
  // An array-like object, or null or undefined
  args = args === null ? [] : args
  if (!Array.isArray(args)) {
    args = Array.from(args)
  }
  
  return this.myCall(context, ...args)
}

const array = ['a', 'b']
const elements = [0, 1, 2]
array.push.myApply(array, elements)
console.log('myApply', array)
console.log('myApply', Math.max.myApply(null, elements))
console.log('apply', Math.max.apply(null, elements))

/**
 * myBind
 * 参考：https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/function-bind.js
 */
Function.prototype.myBind = function (that, ...partArgs) {
  var F = this
  var Prototype = F.prototype
  var boundFunction = function bound(...newArgs) {
    var args = [...partArgs, ...newArgs]
    /**
     * 若被 new 调用时，this 为即将生成的实例 bound，走 new F(...)
     */
    return this instanceof boundFunction ? new F(...args) : F.myApply(that, args)
  }
  if (Prototype && typeof Prototype === 'object') boundFunction.prototype = Prototype
  return boundFunction
}

class Base {
  constructor(...args) {
    console.log('constructor', args)
  }
}

const BoundBase = Base.myBind(null, 1, 2)

console.log('myBind', new BoundBase(3, 4)) // true, [1, 2, 3, 4]
