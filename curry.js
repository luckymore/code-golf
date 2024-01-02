function add(a, b, c) {
  return a + b + c
}

function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}




let addCurry = curry(add)
const res1 = addCurry(1)
console.log(res1);
const res2 = res1(2)
console.log(res2);
const res3 = res2(3)
console.log(res3);
