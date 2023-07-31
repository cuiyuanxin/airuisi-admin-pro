import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constants'
import { PageEnum } from '@/config/constant/pageEnum'
// import { DashboardOutlined } from '@vicons/antd'
// import { renderIcon } from '@/utils/index'

const routeName = 'dashboard'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icons 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: PageEnum.BASE_HOME_REDIRECT,
    component: Layout,
    meta: {
      title: 'Dashboard',
      // icons: renderIcon(DashboardOutlined),
      // permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      // sort: 0,
    },
    children: [
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        meta: {
          title: '工作台',
          keepAlive: true,
          // permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/workplace.vue'),
      },
    ],
  },
]

export default routes
