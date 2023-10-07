import { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/router/constant'
import { PageEnum } from '@/constants/pageEnum'
import { renderIcon } from '@/utils'
import { DashboardOutlined } from '@vicons/antd'

const routeName = 'dashboard'

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
    path: '/dashboard',
    name: routeName,
    redirect: PageEnum.BASE_HOME_REDIRECT,
    component: BasicLayout,
    meta: {
      title: 'dashboard.title',
      icons: renderIcon(DashboardOutlined),
      permissions: ['super', 'admin', 'editor'],
    },
    children: [
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        meta: {
          title: 'dashboard.workplace.title',
          keepAlive: true,
          permissions: ['super', 'admin', 'editor'],
        },
        component: () => import('@/views/dashboard/workplace.vue'),
      },
    ],
  },
]

export default routes
