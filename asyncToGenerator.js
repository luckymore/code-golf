function asyncToGenerator(generatorFun) {
  const gen = generatorFun.apply(this, arguments)

  return function() {
    return new Promise((resolve, reject) => {

      function step(next, ...args) {
        let obj = gen[next](args)

        if (obj.done) resolve(obj)
        else {
          Promise.resolve(obj.value).then(res => {
            step('next', res)
          }, err => {
            step('throw', err)
          })
        }
      }
      
      step('next')
    })
  }
}

function fn(nums) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nums * 2);
    }, 1000);
  });
}
function* gen() {
  const num1 = yield fn(1);
  console.log(num1); // 2
  const num2 = yield fn(num1);
  console.log(num2); // 4
  const num3 = yield fn(num2);
  console.log(num3); // 8
  return num3;
}
const testGAsync = asyncToGenerator(gen);
// 返回的是一个函数,函数调用返回一个promise
testGAsync().then(res => {
    console.log(res);
});
