import { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/router/constant'
import { renderIcon } from '@/utils'
import { AlertCircleOutline } from '@vicons/ionicons5'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icons 菜单图标
 * @param meta.keepAlive 缓存该路由
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/exception',
    name: 'exception',
    component: BasicLayout,
    meta: {
      title: 'error.title',
      icon: renderIcon(AlertCircleOutline),
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
  },
]

export default routes
