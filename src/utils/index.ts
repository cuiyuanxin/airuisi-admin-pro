import { Component, h } from 'vue'
import { NIcon } from 'naive-ui'
import { useI18n } from '@/hooks/web/useI18n'
import { isObject } from '@/utils/is'
import { PageEnum } from '@/constants/pageEnum'

interface obj {
  [idx: string]: any
}

/**
 * render 图标
 * */
export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

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
  let url: string
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

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<any>) {
  return routerMap.filter((item) => {
    return (
      (item.meta?.hidden || false) != true &&
      !['/:pathMatch(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
    )
  })
}

/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
  const { t } = useI18n()

  return filterRouter(routerMap).map((item) => {
    const currentMenu: obj = {
      label: t(item.meta?.title),
      key: item.name,
      // icon: item.meta?.icon ? renderIcon(item.meta?.icon as Component) : null,
      icon: item.meta?.icon ?? null,
      show: item?.hidden || item.meta?.hidden,
      meta: item.meta,
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentMenu.children = generatorMenu(item.children)
    }
    return currentMenu
  })
}

/**
 * 递归组装子菜单
 * */
export function getChildrenRouter(routerMap: Array<any>) {
  console.log(routerMap, 'getChildrenRouter')
  // const { t } = useI18n()
  //
  // return filterRouter(routerMap).map((item) => {
  //   const isRoot = isRootRouter(item)
  //   const info = isRoot ? item.children[0] : item
  //   const currentMenu = {
  //     ...info,
  //     ...info.meta,
  //     label: t(info.meta?.title),
  //     key: info.name,
  //   }
  //   // 是否有子菜单，并递归处理
  //   if (info.children && info.children.length > 0) {
  //     // Recursion
  //     currentMenu.children = getChildrenRouter(info.children)
  //   }
  //   return currentMenu
  // })
}

/**
 * 混合菜单
 * */
export function generatorMenuMix(routerMap: Array<any>, routerName: string, location: string) {
  console.log(routerMap, routerName, location, 'generatorMenuMix')
  // const { t } = useI18n()
  //
  // const cloneRouterMap = cloneDeep(routerMap)
  // const newRouter = filterRouter(cloneRouterMap)
  // if (location === 'header') {
  //   const firstRouter: any[] = []
  //   newRouter.forEach((item) => {
  //     const isRoot = isRootRouter(item)
  //     const info = isRoot ? item.children[0] : item
  //     info.children = undefined
  //     const currentMenu = {
  //       ...info,
  //       ...info.meta,
  //       label: t(info.meta?.title),
  //       key: info.name,
  //     }
  //     firstRouter.push(currentMenu)
  //   })
  //   return firstRouter
  // } else {
  //   return getChildrenRouter(newRouter.filter((item) => item.name === routerName))
  // }
}
