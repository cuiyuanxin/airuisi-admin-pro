import { Router, RouteRecordRaw } from 'vue-router'
import { useUser } from '@/store/modules/user'
import { useAsyncRoute } from '@/store/modules/asyncRoute'
import LocalStorage from '@/utils/storage'
import { PageEnum } from '@/constants/pageEnum'
import { ACCESS_TOKEN } from '@/constants/constant'
import { useApp } from '@/hooks/setting/useApp'
import { isDef, isNullOrUnDef, isUnDef } from '@/utils/is'
import { ResultEnum } from '@/constants/httpEnum'
import { Result } from '/#/axios'
import { ErrorPageRoute } from '@/router'

const { getProjectSetting } = useApp()

// 免权限
const whitelistRoute = [PageEnum.BASE_LOGIN]

export const createRouterGuards = (router: Router) => {
  const LoadingBar = window['$loading'] || null

  router.beforeEach(async (to, from, next) => {
    LoadingBar && LoadingBar.start()

    const token = LocalStorage.get(ACCESS_TOKEN)
    if (token) {
      if (to.path === PageEnum.BASE_LOGIN) {
        next(PageEnum.BASE_HOME)
        return
      } else {
        const { getInfo, getUserInfo, logout } = useUser()

        let userInfo = getInfo

        if (
          isNullOrUnDef(userInfo) ||
          isUnDef(userInfo.id) ||
          (isDef(userInfo.id) && userInfo.id === 0)
        ) {
          const res = await getUserInfo()

          const { code, result } = res as Result
          if (code === ResultEnum.SUCCESS) {
            userInfo = result
          } else {
            logout()

            const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
              path: PageEnum.BASE_LOGIN,
              replace: true,
            }
            if (to.path) {
              redirectData.query = {
                ...redirectData.query,
                redirect: to.path,
              }
            }

            next(redirectData)
            return
          }
        }

        const { generateRoutes, getIsDynamicRouteAdded, setDynamicRouteAdded } = useAsyncRoute()

        if (getIsDynamicRouteAdded) {
          next()
          return
        }

        // 开启权限管控
        if (getProjectSetting.value.permission) {
          const routes = await generateRoutes(userInfo)
          if (routes.value.length > 0) {
            // 动态添加可访问路由表
            routes.value.forEach((item) => {
              router.addRoute(item as unknown as RouteRecordRaw)
            })
          }
        }
        //添加404
        const isErrorPage = router
          .getRoutes()
          .findIndex((item) => item.name === ErrorPageRoute.name)
        if (isErrorPage === -1) {
          router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
        }

        const redirectPath = (from.query.redirect || to.path) as string
        const redirect = decodeURIComponent(redirectPath)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        setDynamicRouteAdded(true)
        next(nextData)
      }
    } else {
      // 免权限直接进入
      if (whitelistRoute.includes(to.path as PageEnum)) {
        next()
        return
      } else {
        // redirect login page
        const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
          path: PageEnum.BASE_LOGIN,
          replace: true,
        }
        if (to.path) {
          redirectData.query = {
            ...redirectData.query,
            redirect: to.path,
          }
        }

        next(redirectData)
        return
      }
    }

    LoadingBar && LoadingBar.finish()
  })
  router.afterEach((to) => {
    document.title = (to?.meta?.title as string) || document.title
    const asyncRouteStore = useAsyncRoute()
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents
    const currentComName: any = to.matched.find((item) => item.name === to.name)?.name
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
    } else if (!to.meta?.keepAlive || to.name === PageEnum.REDIRECT_NAME) {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name === currentComName)
      if (index !== -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
    LoadingBar && LoadingBar.finish()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
