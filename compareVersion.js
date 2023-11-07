function compareVersion(version1, version2) {
  const stack1 = version1.split('.').map(Number)
  const stack2 = version2.split('.').map(Number)
  const len = Math.max(stack1.length, stack2.length)
  let i = 0
  for (; i < len; i++) {
    const v1 = stack1[i] || 0
    const v2 = stack2[i] || 0
    
    if (v1 > v2) {
      return 1
    } else if (v1 < v2) {
      return -1
    }
  }

  return 0
}


console.log(compareVersion('1.2.3', '1.2.4'))
console.log(compareVersion('1.2.3', '1.2.3'))
console.log(compareVersion('1.2.4', '1.2.4.0'))
