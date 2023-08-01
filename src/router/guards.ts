import { Router } from 'vue-router'
import { PageEnum } from '@/config/constant/pageEnum'
import LocalStorage from '@/utils/storage'
import { ACCESS_TOKEN } from '@/config/constant/storeConst'

const whitelistRoute = [PageEnum.BASE_LOGIN]

export function createRouterGuards(router: Router) {
  const LoadingBar = window['$loading'] || null

  router.beforeEach(async (to, from, next) => {
    LoadingBar && LoadingBar.start()
    if (from.path === PageEnum.BASE_LOGIN) {
      next(PageEnum.BASE_LOGIN)
      return
    }

    if (whitelistRoute.includes(to.path as PageEnum)) {
      next()
      return
    }

    const token = LocalStorage.get(ACCESS_TOKEN)

    if (!token) {
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
    next()
    LoadingBar && LoadingBar.finish()
  })
  router.afterEach(() => {
    LoadingBar && LoadingBar.finish()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
