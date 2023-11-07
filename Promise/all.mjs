import { task } from './task.mjs'

Promise.all = tasks => {
  return new Promise((resolve, reject) => {
    // 1. 参数接受可迭代对象，否则抛出错误
    let fullfilldCount = 0
    const result = []
    tasks = [...tasks]
    
    // 2. 长度为 0，直接resolve
    if (tasks.length === 0) {
      return resolve(result)
    }

    tasks.forEach((task, index) => {
      // 3. 非Promise，使用 Promise.resolve 包装
      Promise.resolve(task)
        .then(res => {
          fullfilldCount++
          result[index] = res
          if (fullfilldCount === tasks.length) {
            resolve(result)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  })
}

console.time('time')
Promise.all([
  task(1000),
  // task(2000, 1),
  task(2000),
  111
]).then(
  data => {
    // data:[1,2,3,4]
    // 传递[pro1,pro2,pro3,4]的话:内部默认处理Promise.resolve(4)
    console.timeEnd('time')
    console.log('成功', data)
  },
  reason => {
    // reason:reason2
    console.timeEnd('time')
    console.log('失败', reason)
  },
)
