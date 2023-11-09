const add = x => x + 10
const fn2 = x => x * 2
const fn3 = x => new Promise(resolve => setTimeout(() => resolve(x + 1), 1000))

const compose = (...fns) => {
  if (fns.length === 0) {
    return x => x
  }
  // return async val => {
  //   let res = val
  //   for (let i = 0; i < fns.length; i++) {
  //     res = await fns[i](res)
  //   }
  //   return res
  // }
  return async val => {
    const p = fns.reduce(async (acc, curr) => {
      return curr(await acc)
    }, val)
    console.log(p)
    return p
  }
}

console.log('start...')
compose(add, fn2, fn3, fn3)(10).then(console.log)
