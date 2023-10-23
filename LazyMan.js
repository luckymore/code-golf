function LazyMan(name) {
  const tasks = []
  let timer = null
  const run = async () => {
    while (tasks.length) {
      await tasks.shift()()
      console.log(tasks.length)
    }
  }

  function eat(food) {
    tasks.push(() => {
      console.log(`eat ${food}`)
    })
    clearTimeout(timer)
    timer = setTimeout(run)
    return this
  }

  function sleep(time) {
    tasks.push(
      () =>
        new Promise(resolve => {
          console.log(`sleep ${time}s`)
          setTimeout(resolve, time * 1000)
        }),
    )
    return this
  }
  
  function sleepFirst(time) {
    tasks.unshift(
      () =>
        new Promise(resolve => {
          console.log(`sleepFirst ${time}s`)
          setTimeout(resolve, time * 1000)
        })
    )
    return this
  }

  return {
    name,
    eat,
    sleep,
    sleepFirst,
    run
  }
}

console.log(
  "LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(3).eat('junk food'):",
  LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(3).eat('junk food'),
)
