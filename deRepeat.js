/**
 * 去除连续重复的字符串
 * @example
 * 'aaabc' -> 'bc'
 * 'daaadbc' -> 'bc'， 因为 'daaadbc' -> 'ddbc' -> 'bc'
 */
const deRepeat = (str) => {
  
}


const deRepeat = str => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if ((str[i - 1] ? str[i - 1] !== str[i] : true) && (str[i + 1] ? str[i] !== str[i + 1] : true)) {
      result += str[i]
    }
  }
  return result
}

console.log(deRepeat('aaabcdd'), 'bc')
console.log(deRepeat('abbccdde'), 'ae')
console.log(deRepeat('daaadbc'), 'bc')
