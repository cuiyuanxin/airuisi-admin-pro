import { getCurrentUserMenu } from '@/api/system/user'
import { ResultEnum } from '@/constants/httpEnum'
import { renderIcon } from '@/utils'
import { rootRoutes } from '@/router'
import { AppRouteRecordRaw } from '/#/route'

enum layoutEnum {
  BasicLayout = 'layout',
  ParentLayout = 'ParentLayout',
  IframeLayout = 'iframe',
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = async () => {
  const res = await getCurrentUserMenu().catch((err) => {
    console.log(err)
  })

  console.log('generatorDynamicRouter data:', res)
  const { code, result } = res
  if (code === ResultEnum.SUCCESS) {
    const menus: any = []
    const childrenMenu = []
    //      后端数据, 根级树数组,  根级 PID
    listToTree(result, childrenMenu, 0)
    rootRoutes.children = childrenMenu
    menus.push(rootRoutes)
    const routers = generator(childrenMenu)
    asyncImportRoute(routers)

    return routers
  }

  return []
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent?): any[] => {
  return routerMap.map((item) => {
    const { title, icon, keepAlive, permissions } = item.meta || {}
    const currentRouter: any = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon ? renderIcon(icon) : null,
        keepAlive: keepAlive ?? false,
        permissions: permissions ?? null,
      },
      // 该路由对应页面的 组件
      component: item.component,
    }
    //   // 是否设置了隐藏菜单
    //   if (show === false) {
    //     currentRouter.hidden = true
    //   }
    //   // 是否设置了隐藏子菜单
    //   if (hideChildren) {
    //     currentRouter.hideChildrenInMenu = true
    //   }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }

    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach((item) => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: [],
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}

let dynamicViewsModules: Record<string, () => Promise<Recordable>>
let layoutModules: Record<string, () => Promise<Recordable>>

// Dynamic introduction
const asyncImportRoute = (routes: AppRouteRecordRaw[] | undefined) => {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../views/**/*.{vue,tsx}')
  layoutModules = layoutModules || import.meta.glob('../layouts/*.vue')
  if (!routes) return
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IframeLayout'
    }
    const { component, name } = item
    const { children } = item
    if (component) {
      const keys = Object.keys(layoutModules)
      const matchKeys = keys.filter((key) => {
        let k = key.replace('../layouts/', '')
        const lastIndex = k.lastIndexOf('.')
        k = k.substring(0, lastIndex)
        return k === layoutEnum[component as string]
      })
      if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0]
        item.component = layoutModules[matchKey]
      } else {
        item.component = dynamicImport(dynamicViewsModules, component as string)
      }
    } else if (name) {
      // item.component = ParentLayout
    }
    children && asyncImportRoute(children)
  })
}

/**
 * 动态导入
 * */
const dynamicImport = (
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) => {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../views', '')
    const lastIndex = k.lastIndexOf('.')
    k = k.substring(0, lastIndex)
    return k === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    )
    return undefined
  }
}
