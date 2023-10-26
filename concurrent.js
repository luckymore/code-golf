// 处理高并发, 100 条数据，带宽为 10， 跑满带宽

function task() {
  return new Promise(resolve => {
    setTimeout(() => {
      const timestamp = Date.now() / 1000 | 0
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

concurrent([task, task, task, task, task, task, task, task, task], 2)
  .then(res => {
    console.log(res)
  })
