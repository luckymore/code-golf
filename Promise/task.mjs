export const task = (timeout, type = 0) =>
  new Promise((...args) => {
    setTimeout(() => {
      args[type](timeout)
    }, timeout)
  })
