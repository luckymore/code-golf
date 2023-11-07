function myInstanceof(left, right) {
  if (typeof left !== 'object') return false
  let up = Object.getPrototypeOf(left)
  while (up) {
    if (up === right.prototype) {
      return true
    }
    up = Object.getPrototypeOf(up)
  }
  return false
}


function Person() { };
var p = new Person();
console.log(myInstanceof(p, Object), p instanceof Object);
console.log(myInstanceof(1, Number), 1 instanceof Number);
