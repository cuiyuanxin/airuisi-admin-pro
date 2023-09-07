import { toRaw, unref } from 'vue'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { asyncRoutes, constantRoutes } from '@/router'
import { generatorDynamicRouter } from '@/router/generator'
import { cloneDeep } from 'lodash-es'
import { useApp } from '@/hooks/setting/useApp'
import { isNullOrUnDef } from '@/utils/is'

// asyncRoutes

// interface TreeHelperConfig {
//   id: string
//   children: string
//   pid: string
// }

// const DEFAULT_CONFIG: TreeHelperConfig = {
//   id: 'id',
//   children: 'children',
//   pid: 'pid',
// }

// const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export interface IAsyncRouteState {
  // menus: RouteRecordRaw[]
  routers: RouteRecordRaw[]
  addRouters: RouteRecordRaw[]
  // routersAdded: any[]
  // keepAliveComponents: string[]
  isDynamicRouteAdded: boolean
}

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param role
 * @param route
 * @returns {boolean}
 */
function hasPermission(role: string[], route: any): boolean {
  if (route.meta && route.meta.permissions) {
    if (isNullOrUnDef(role)) {
      return false
    }
    if (role.length === 0) {
      return false
    }
    let flag = false
    for (let i = 0, len = role.length; i < len; i++) {
      flag = route.meta.permissions.includes(role[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

function filterAsyncRouter(routerMap: any[], role: string[]): any[] {
  const accessedRouters = routerMap.filter((route) => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    // menus: [],
    routers: constantRoutes,
    addRouters: [],
    // routersAdded: [],
    // keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicRouteAdded: false,
  }),
  getters: {
    // getMenus(): RouteRecordRaw[] {
    //   return this.menus
    // },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    // getRouters() {
    //   return toRaw(this.routersAdded)
    // },
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    // 设置动态路由
    setRouters(routers: RouteRecordRaw[]) {
      this.addRouters = routers
      this.routers = constantRoutes.concat(routers)
    },
    // setMenus(menus: RouteRecordRaw[]) {
    //   // 设置动态路由
    //   this.menus = menus
    // },
    // setKeepAliveComponents(compNames: string[]) {
    //   // 设置需要缓存的组件
    //   this.keepAliveComponents = compNames
    // },
    async generateRoutes(data) {
      let accessedRouters
      // const permissionsList = data.permissions ?? []

      // const routeFilter = (route) => {
      //   const { meta } = route
      //   const { permissions } = meta || {}
      //   if (!permissions) return true
      //   return permissionsList.some((item) => permissions.includes(item.value))
      // }
      const { getProjectSetting } = useApp()
      if (unref(getProjectSetting.value.permissionMode) === 'dynamic') {
        // 动态获取菜单
        const res = await generatorDynamicRouter()

        console.log('generateRoutes->generatorDynamicRouter data:', res)
        accessedRouters = res
      } else {
        const { role } = data
        const routerMap = cloneDeep(asyncRoutes)
        accessedRouters = filterAsyncRouter(routerMap, role)
      }

      accessedRouters.length > 0 && this.setRouters(accessedRouters)
      return toRaw(accessedRouters)
    },
  },
})

export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
