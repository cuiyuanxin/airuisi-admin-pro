import { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/router/constant'
import { renderIcon } from '@/utils/index'
import { SettingsOutline } from '@vicons/ionicons5'

const routeName = 'system'

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
    path: '/system',
    name: routeName,
    component: BasicLayout,
    meta: {
      title: 'system.title',
      icons: renderIcon(SettingsOutline),
      permissions: ['super', 'admin'],
    },
    children: [
      {
        path: 'setting',
        name: `${routeName}_setting`,
        meta: {
          title: 'system.setting.title',
          keepAlive: true,
          permissions: ['super', 'admin'],
        },
        component: () => import('@/views/system/setting.vue'),
      },
    ],
  },
]

export default routes
