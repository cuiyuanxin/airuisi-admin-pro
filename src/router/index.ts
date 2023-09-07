import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/router/constant'
import { PageEnum } from '@/constants/pageEnum'
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

const exceptionRoute: RouteRecordRaw = {
  path: '/exception',
  name: 'exception',
  component: BasicLayout,
  meta: {
    title: 'error.title',
  },
  children: [
    {
      path: '/404',
      name: 'ErrorPage404',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: 'error.errorPage404',
      },
    },
    {
      path: '/403',
      name: 'ErrorPage403',
      component: () => import('@/views/exception/403.vue'),
      meta: {
        title: 'error.errorPage403',
      },
    },
    {
      path: '/502',
      name: 'ErrorPage502',
      component: () => import('@/views/exception/502.vue'),
      meta: {
        title: 'error.errorPage502',
      },
    },
  ],
}

export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}

// 需要权限验证
export const asyncRoutes: RouteRecordRaw[] = routeModuleList

// meta: {
// title:string              标题
// icon:string|svg           图标
// keepAlive:bool            缓存路由
// hidden:bool               隐藏菜单
// hideBreadcrumb:bool       隐藏面包屑
// hiddenHeaderContent:bool  特殊 隐藏组件中的页面带的 面包屑和页面标题栏
// permission:[]             权限
// sort:number               排序
// }

export const rootRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    hidden: true,
    title: 'Root',
  },
}

const redirectRoutes: RouteRecordRaw = {
  path: '/redirect',
  name: 'Redirect',
  component: BasicLayout,
  meta: {
    hidden: true,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        hidden: true,
        hideBreadcrumb: true,
        title: 'redirect.title',
      },
    },
  ],
}

const loginRoutes: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  meta: {
    hidden: true,
    title: 'login.title',
  },
  component: () => import('@/views/login/index.vue'),
}

//普通路由 无需验证权限
export const constantRoutes: RouteRecordRaw[] = [
  loginRoutes,
  rootRoutes,
  redirectRoutes,
  exceptionRoute,
]

// 异步路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
