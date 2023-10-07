import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'
import LocalStorage from '@/utils/storage'
import { TABS_ROUTES } from '@/constants/constant'
import { PageEnum } from '@/constants/pageEnum'

// 不需要出现在标签页中的路由
export const whiteList = ['Redirect', 'login']

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string
  path: string
  name: string
  hash: string
  meta: object
  params: object
  query: object
}

export type ITabsViewState = {
  tabsList: RouteItem[] // 标签页
}

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: LocalStorage.get(TABS_ROUTES) ?? [],
  }),
  getters: {},
  actions: {
    addTab(route: RouteItem): boolean {
      // 添加标签页
      if (whiteList.includes(route.name)) return false
      const isExists = this.tabsList.some((item) => item.fullPath === route.fullPath)
      if (!isExists) {
        this.tabsList.push(route)
        LocalStorage.set(TABS_ROUTES, this.tabsList)
      }
      return true
    },
    closeCurrentTab(route: RouteItem) {
      // 关闭当前页
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)

      if (index !== -1) {
        this.tabsList.splice(index, 1)
        LocalStorage.set(TABS_ROUTES, this.tabsList)
      }
    },
    closeLeftTabs(route: RouteItem) {
      // 关闭左侧
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      if (index !== -1) {
        this.tabsList = this.tabsList.filter(
          (item, i) => i >= index || item.path === PageEnum.BASE_HOME_REDIRECT,
        )
        LocalStorage.set(TABS_ROUTES, this.tabsList)
      }
    },
    closeRightTabs(route: RouteItem) {
      // 关闭右侧
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      if (index !== -1) {
        this.tabsList = this.tabsList.filter(
          (item, i) => i <= index || item.path === PageEnum.BASE_HOME_REDIRECT,
        )
        LocalStorage.set(TABS_ROUTES, this.tabsList)
      }
    },
    closeOtherTabs(route: RouteItem) {
      // 关闭其他
      this.tabsList = this.tabsList.filter(
        (item) => item.fullPath === route.fullPath || item.path === PageEnum.BASE_HOME_REDIRECT,
      )
      LocalStorage.set(TABS_ROUTES, this.tabsList)
    },
    closeAllTabs() {
      // 关闭全部
      this.tabsList = this.tabsList.filter((item) => item.path === PageEnum.BASE_HOME_REDIRECT)
      LocalStorage.set(TABS_ROUTES, this.tabsList)
    },
    hasTabsOnLeft(route: RouteItem): boolean {
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      if (index !== -1) {
        return index - 1 <= 0 ?? false
      }
      return true
    },
    hasTabsOnRight(route: RouteItem): boolean {
      const index = this.tabsList.findIndex((item) => item.fullPath === route.fullPath)
      if (index !== -1) {
        return this.tabsList[index + 1] === undefined
      }
      return true
    },
  },
})
