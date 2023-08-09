import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './constants'
import { createRouterGuards } from './guards'

export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw
}

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true })

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
  const mod = modules[key].default ?? {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  return [...list, ...modList]
}, [])

const sortRoute = (a, b) => {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
}

routeModuleList.sort(sortRoute)
//需要验证权限
// export const asyncRoutes = [...routeModuleList]

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [...constantRoutes, ...routeModuleList]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
