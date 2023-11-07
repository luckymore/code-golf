/**
 * 
 * @param {*} tpl 
 * @param {*} model 
 * @memberof 东方优选
 * @returns 
 */
function resolveStr(tpl, model) {
  const reg = /{{\s*(.+?)\s*}}/g
  return tpl.replace(reg, (str, key) => {
    if (key.startsWith('#')) {
      key = key.slice(1)
      return eval(key)
    }
    console.log(str, key)
    return eval(`model.${key}`)
  })
}

const tpl = `
{{c}}
v{{a.b}}`

const model = {
  c: 5,
  a: {
    b: 1,
  },
}

// console.log(resolveStr(tpl, model))

const data = {
  name: '小明',
  age: 16,
  school: '第三中学',
  classroom: '教室2',
}

console.log(
  resolveStr(
    "{{ name }} 今年 {{ age }} 岁，就读于 {{ school }} 今天在 {{ classroom }} 上课，{{ name }} {{ #data.age >= 18 ? '成年了' : '未成年' }}",
    data,
  ),
)
console.log(resolveStr(`{{name}}说了句{{#
  if (data.age >= 18) {
      "我已经成年了！"
  } else {
      "我还没有成年！"
  }
}}`, data))
