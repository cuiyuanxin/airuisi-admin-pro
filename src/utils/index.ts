import { isObject } from '@/utils/is'

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
const addLight = (color: string, amount: number) => {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export const lighten = (color: string, amount: number) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount,
  )}${addLight(color.substring(4, 6), amount)}`
}

/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export const setObjToUrlParams = (baseUrl: string, obj: object): string => {
  let parameters = ''
  let url = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters
  }
  return url
}
