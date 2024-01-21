// 处理高并发, 100 条数据，带宽为 10， 跑满带宽

function task() {
  return new Promise(resolve => {
    setTimeout(() => {
      const timestamp = (Date.now() / 1000) | 0
      console.log(timestamp)
      resolve(timestamp)
    }, 1000)
  })
}

async function concurrent(tasks, max = 10) {
  const results = []
  const poolList = new Set()

  for (const task of tasks) {
    if (poolList.size === max) {
      await Promise.race(poolList).catch(console.log)
    }

    const p = task()
    const cb = () => poolList.delete(p)

    p.then(cb, cb)
    poolList.add(p)
    results.push(p)
  }

  return Promise.allSettled(results)
}

// concurrent([task, task, task, task, task, task, task, task, task], 2)
//   .then(res => {
//     console.log(res)
//   })

// 3、小程序早期只能同时发起 10 个请求，实现一个对 fetch 的封装，在业务层无需感知到这个限制即可无限发起请求
function fetch(i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success ' + i)
    }, i * 1000)
  })
}
function toConcurrent(fetch, limit = 10) {
  const taskQueue = []
  let num = 0 // 当前任务数量
  const withCallback = (options, resolve, reject) => {
    fetch(options)
      .then(resolve, reject)
      .finally(() => {
        --num
        if (taskQueue.length > 0) {
          taskQueue.shift()()
        }
      })
    ++num
  }
  return function (options) {
    return new Promise((resolve, reject) => {
      if (num >= limit) {
        taskQueue.push(() => withCallback(options, resolve, reject))
      } else {
        withCallback(options, resolve, reject)
      }
    })
  }
}
const request = toConcurrent(fetch, 3)
for (let i = 1; i <= 11; i++) {
  request(i).then(res => console.log(res))
}
