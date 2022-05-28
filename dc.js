function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

export function cloneDeep(data, hash = new WeakMap()) {
  if (!isObject(data) || !data || !data.constructor) {
    return data
  }
  let copyData
  const Constructor = data.constructor
  // 实际情况中，正则表达式会被以{}存储，Date对象会以时间字符串形式存储
  // 函数则变为null
  switch (Constructor) {
    case RegExp:
      copyData = new Constructor(data)
      break
    case Date:
      copyData = new Constructor(data.getTime())
      break
    default:
      // 循环引用问题解决
      if (hash.has(data)) {
        return hash.get(data)
      }
      copyData = new Constructor()
      if (Constructor === Map) {
        data.forEach((value, key) => {
          copyData.set(key, isObject(value) ? cloneDeep(value) : value)
        })
      }
      if (Constructor === Set) {
        data.forEach(value => {
          copyData.add(isObject(value) ? cloneDeep(value) : value)
        })
      }
      hash.set(data, copyData)
  }
  const symbols = Object.getOwnPropertySymbols(data)
  if (symbols && symbols.length) {
    symbols.forEach(symkey => {
      copyData[symkey] = isObject(data[symkey]) ? cloneDeep(data[symkey], hash) : data[symkey]
    })
  }
  for (var key in data) {
    copyData[key] = isObject(data[key]) ? cloneDeep(data[key], hash) : data[key]
  }
  return copyData
}