// 寄生式组合继承
function Parent() {
  this.name = '爸爸'
}
Parent.prototype.say = function () {
  console.log('我是爸爸')
}

function Child(name) {
  Parent.call(this)
  this.name = name
}

function inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child
}

inherit(Child, Parent)
new Child('小明')

// new
function myNew(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype)
  const res = Constructor.apply(instance, args)

  return res && typeof res === 'object' ? res : instance
}
