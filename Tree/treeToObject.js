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
const fromTree = (tree, prefix = '') => {
  let result = {};

  for (let key in tree) {
    if (typeof tree[key] === 'object') {
      let nestedKeys = fromTree(tree[key], `${prefix}${key}.`);
      result = { ...result, ...nestedKeys };
    } else {
      result[`${prefix}${key}`] = tree[key];
    }
  }

  return result;
};

// output 转 entry
const fromObj = (output) => {
  return Object.entries(output).reduce((acc, [key, value]) => {
    const keys = key.split('.');
    let currentObj = acc

    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];

      if (i === keys.length - 1) {
        currentObj[currentKey] = value;
      } else {
        if (!currentObj[currentKey]) {
          currentObj[currentKey] = {};
        }
        currentObj = currentObj[currentKey];
      }
    }

    return acc
  }, {})
}

console.log('fromTree(entry):', fromTree(entry))
const outputRes = fromObj(output)
console.log('fromObj(output):', outputRes)
