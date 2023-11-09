function getKey(obj, str) {
  str = str.replace(/\[/g, '.').replace(/\]/g, '');
  return str.split('.').reduce(function (acc, curr) {
      return acc ? acc[curr] : null
  }, obj);
}

const obj = {
  a: {
      b: 123
  },
  arr: [
      {
          demo: 'demo'
      }
  ]
}

console.log(getKey(obj, 'a.b'));
console.log(getKey(obj, 'arr[0].demo'));
