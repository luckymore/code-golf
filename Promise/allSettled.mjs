// import { task } from './task.mjs'
// import { get } from 'http'

const task = (timeout, type = 0) =>
  new Promise((...args) => {
    setTimeout(() => {
      args[type](timeout)
    }, timeout)
  })

Promise.allSettled = function (proms) {
  return new Promise((resolve, reject) => {
    // 该方法的参数需为一个可迭代对象
    if (proms == null || typeof proms[Symbol.iterator] !== 'function') {
      return reject(new TypeError(`${typeof proms} is not a iterable`))
    }
    const ps = []
    try {
      for (const p of proms) {
        ps.push(
          Promise.resolve(p).then(
            value => ({
              status: 'FULFILLED',
              value,
            }),
            reason => ({
              status: 'REJECTED',
              reason,
            }),
          ),
        )
      }
      Promise.all(ps).then(resolve)
    } catch (err) {
      reject(err)
    }
  })
}

Promise.allSettled([1, task(1000)]).then(data => {
  console.log(JSON.stringify(data))
}).finally(() => console.log(444))
Promise.allSettled([]).then(data => {
  console.log(JSON.stringify(data))
})
Promise.allSettled({}).finally(() => console.log(111))
