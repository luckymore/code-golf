// 互相转换
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
  },
}

var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

// entry 转成 output
const transformObject = (obj, prefix = '') => {
  let result = {};

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      let nestedKeys = transformObject(obj[key], `${prefix}${key}.`);
      result = { ...result, ...nestedKeys };
    } else {
      result[`${prefix}${key}`] = obj[key];
    }
  }

  return result;
};

console.log('transformObject(entry):', transformObject(entry))
