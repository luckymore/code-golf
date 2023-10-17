// 把上诉虚拟Dom转化成下方真实Dom
// <div id="app">
//   <span>
//     <a></a>
//   </span>
//   <span>
//     <a></a>
//     <a></a>
//   </span>
// </div>

const render = vnode => {
  if (Object(vnode) !== vnode) {
    return document.createTextNode(vnode + '')
  }
  const dom = document.createElement(vnode.tag)
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(attrName => {
      dom.setAttribute(attrName, vnode.attrs[attrName])
    })
  }

  vnode.children.forEach(child => dom.appendChild(render(child)))

  return dom
}

const app = render({
  tag: 'DIV',
  attrs: {
    id: 'app',
  },
  children: [
    {
      tag: 'DIV',
      children: [{ tag: 'A', children: [1] }],
      attrs: {
        style: 'color: red;'
      }
    },
    {
      tag: 'DIV',
      children: [
        { tag: 'A', children: [2] },
        { tag: 'A', children: [] },
      ],
    },
  ],
})
console.dir(app)

document.body.appendChild(app)
