import { toRaw, unref } from 'vue'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { asyncRoutes, constantRoutes } from '@/router'
import { generatorDynamicRouter } from '@/router/generator'
import { cloneDeep } from 'lodash-es'
import { useApp } from '@/hooks/setting/useApp'
import { isNullOrUnDef } from '@/utils/is'
import LocalStorage from '@/utils/storage'
import { ASYNC_ROUTE } from '@/constants/constant'

export interface IAsyncRouteState {
  routers: RouteRecordRaw[]
  addRouters: RouteRecordRaw[]
  keepAliveComponents: string[]
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
  return routerMap.filter((route) => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    routers: constantRoutes,
    addRouters: [],
    keepAliveComponents: [],
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.routers
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    // 设置动态路由
    setRouters(routers: RouteRecordRaw[]) {
      this.addRouters = routers
      this.routers = constantRoutes.concat(routers)
    },
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames
    },
    async generateRoutes(data) {
      const accessedRouters = ref<any[]>([])
      const { getProjectSetting } = useApp()
      if (unref(getProjectSetting.value.permissionMode) === 'dynamic') {
        // 动态获取菜单
        const res = await generatorDynamicRouter()

        console.log('generateRoutes->generatorDynamicRouter data:', res)
        accessedRouters.value = unref(res)
        LocalStorage.set(ASYNC_ROUTE, accessedRouters.value)
      } else {
        const { role } = data
        const routerMap = cloneDeep(asyncRoutes)
        accessedRouters.value = filterAsyncRouter(routerMap, role)
      }

      if (accessedRouters.value.length > 0) {
        this.setRouters(accessedRouters.value)
      }
      return toRaw(accessedRouters)
    },
  },
})

export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}
