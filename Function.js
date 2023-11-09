/**
 * myCall
 */
Function.prototype.myCall = function (context, ...args) {
  context = context === undefined || context === null ? globalThis : context
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
var factories = {}

var construct = function (C, argsLength, args) {
  // 每个参数长度生成的内容是一样的，这相当于缓存了结果
  if (!factories[argsLength]) {
    factories[argsLength] = Function('C,a', 'return new C(...a)')
  }
  /**
   * 上面一堆逻辑，只是相当于一个扩展运算符
   * (function anonymous(C,a) {
   *  return new C(a[0],a[1],a[2],a[3])
   * })(C, args)
   */
  return factories[argsLength](C, args)
}

Function.prototype.myBind = function (that, ...partArgs) {
  var F = this
  var Prototype = F.prototype
  var boundFunction = function bound(...newArgs) {
    var args = [...partArgs, ...newArgs]
    /**
     * this 为 new 即将生成的实例 bound
     * true 则代表为 new 调用
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
