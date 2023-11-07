/**
 * 去除连续重复的字符串 
 * @memberof 百度
 * @example
 * 'aaabc' -> 'bc'
 * 'daaadbc' -> 'bc'， 因为 'daaadbc' -> 'ddbc' -> 'bc'
 */
const deRepeatRegExp = str => {
  let last = str

  while(1) {
    str = str.replace(/(.)\1+/gm, '')
    if (last === str) {
      return str
    } else {
      last = str
    }
  }

  return result
}
const deRepeat = str => {
  let result = str
  let repeat = true
  
  while (repeat) {
    repeat = false
    for (let i = 0; i < result.length; i++) {
      if (result[i] === result[i + 1]) {
        result = result.slice(0, i) + result.slice(i + 2)
        repeat = true
        break
      }
    }
  }
  
  return result
}

console.log(deRepeat('aaabcdd'), 'bc')
console.log(deRepeat('abbccdde'), 'ae')
console.log(deRepeat('daaadbc'), 'bc')

console.log(deRepeatRegExp('aaabcdd'), 'bc')
console.log(deRepeatRegExp('abbccdde'), 'ae')
console.log(deRepeatRegExp('daaadbc'), 'bc')

