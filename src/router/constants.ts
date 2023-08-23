import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/constants/pageEnum'

export const RedirectName = 'Redirect'

export const ErrorPage = () => import('@/views/exception/404.vue')

export const Layout = () => import('@/layouts/layout.vue')

export const ParentLayout = () => import('@/layouts/parentLayout.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
      title: 'login.title',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: PageEnum.BASE_HOME_REDIRECT,
    component: Layout,
    meta: {
      title: 'dashboard.title',
      // icons: renderIcon(DashboardOutlined),
      // permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      // sort: 0,
    },
    children: [
      {
        path: 'workplace',
        name: 'dashboard_workplace',
        meta: {
          title: 'dashboard.workplace.title',
          keepAlive: true,
          // permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/workplace.vue'),
      },
    ],
  },
  {
    path: '/redirect',
    name: RedirectName,
    component: Layout,
    meta: {
      hidden: true,
      hideBreadcrumb: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: RedirectName,
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          hidden: true,
          hideBreadcrumb: true,
          title: RedirectName,
        },
      },
    ],
  },
  {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: Layout,
    meta: {
      title: 'ErrorPage',
      hidden: true,
      hideBreadcrumb: true,
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'ErrorPageSon',
        component: ErrorPage,
        meta: {
          title: 'ErrorPage',
          hidden: true,
          hideBreadcrumb: true,
        },
      },
    ],
  },
]
