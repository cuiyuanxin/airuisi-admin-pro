import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import WelcomePage from '@/views/Page1.vue'

// only githubpages preview site used, if use template please remove this check
// and use `createWebHistory` is recommend
const hasGithubPages = import.meta.env.VITE_GHPAGES

export default createRouter({
  history: hasGithubPages ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: 'menu.index' },
      component: BasicLayout,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          meta: { title: 'menu.index.welcome', icon: 'icon-icon-test' },
          component: WelcomePage,
        },
        {
          path: '/admins',
          name: 'admins',
          meta: { title: 'menu.index.admins', icon: 'icon-tuijian', flat: true },
          component: BlankLayout,
          redirect: () => ({ name: 'page1' }),
          children: [
            {
              path: 'page-1',
              name: 'page1',
              meta: { title: 'menu.index.admins.page1' },
              component: () => import('../views/admins/PageInfo.vue'),
            },
            {
              path: 'page-2',
              name: 'page2',
              meta: { title: 'menu.index.admins.page2' },
              component: () => import('../views/admins/PageTypography.vue'),
            },
            {
              path: 'dynamic-match/:id(\\d+)',
              name: 'dynamic-match',
              // 路由 path 默认参数再 meta.params 里
              meta: { title: 'menu.index.admins.dynamic-match', params: { id: 1 } },
              component: () => import('../views/admins/DynamicMatch.vue'),
            },
          ],
        },
        {
          path: '/version',
          name: 'version',
          meta: { title: 'menu.version', icon: 'icon-antdesign' },
          component: () => import('../views/Detail.vue'),
        },
      ],
    },
  ],
})
