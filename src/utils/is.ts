/**
 * @description: 判断值是否未某个类型
 */
export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为字符串
 */
export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}

/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

/**
 * @description:  是否为函数
 */
export const isFunction = <T = Function>(val: unknown): val is T => {
  return is(val, 'Function') || is(val, 'AsyncFunction')
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}

export const isNull = (val: unknown): val is null => {
  return val === null
}

export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val)
}

export const isEmpty = <T = unknown>(val: T): val is T => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export const isChinesePhoneNumber = (phoneNumber: string): boolean => {
  // 定义中国大陆手机号的正则表达式
  const regex = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/
  return regex.test(phoneNumber)
}

/**
 * 判断是否 url
 * */
export const isUrl = (url: string) => {
  return /^(http|https):\/\//g.test(url)
}
