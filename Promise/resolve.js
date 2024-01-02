function isThenable(obj) {
  return obj && typeof obj.then === 'function'
}

Promise.myResolve = function (value) {
  if (value instanceof Promise) return value

  return new Promise((resolve, reject) => {
    if (isThenable(value)) {
      value.then(resolve, reject)
    } else {
      resolve(value)
    }
  })
}

// Resolving a thenable object
const p1 = Promise.myResolve({
  then(onFulfill, onReject) {
    onFulfill("fulfilled!");
  },
});
console.log(p1 instanceof Promise); // true, object casted to a Promise

p1.then(
  (v) => {
    console.log(v); // "fulfilled!"
  },
  (e) => {
    // not called
  },
);

// Thenable throws
// Promise rejects
const p2 = Promise.myResolve({
  then() {
    throw new TypeError("Throwing");
  },
});
p2.then(
  (v) => {
    // not called
  },
  (e) => {
    console.log(e); // TypeError: Throwing
  },
);

// Thenable throws after callback
// Promise resolves
const p3 = Promise.myResolve({
  then(onFulfilled) {
    onFulfilled("Resolving");
    throw new TypeError("Throwing");
  },
});
p3.then(
  (v) => {
    console.log(v); // "Resolving"
  },
  (e) => {
    // not called
  },
);
