import { defineStore } from 'pinia'
import { store } from '@/store'
import { designSetting, projectSetting, websiteSetting } from '@/config/config'
import { darkTheme, dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
import { LocaleEnum } from '@/constants/localeEnum'
import LocalStorage from '@/utils/storage'
import { LANGUAGES } from '@/constants/constant'

const { title, logo, loginImage, loginDesc } = websiteSetting
const { appDarkTheme, appTheme, appThemeList, locale } = designSetting
const {
  tokenExpire,
  permission,
  permissionMode,
  header,
  menu,
  navMode,
  navTheme,
  showFooter,
  showLogo,
} = projectSetting

interface AppState {
  websiteSetting: {
    // 网站标题
    title: string
    // 网站logo
    logo: any
    // 登录背景图
    loginImage: any
    // 登录文字描述
    loginDesc: string
  }
  designSetting: {
    // 深色主题
    appDarkTheme: boolean
    // 系统风格
    appTheme: string
    // 系统内置风格
    appThemeList: string[]
    // 国际语言
    locale: string
  }
  projectSetting: {
    // token有效期
    tokenExpire: number
    // 开启权限验证
    permission: boolean
    // 权限使用方式,菜单权限模式 FIXED 前端固定路由  Dynamic 动态获取
    permissionMode: string
    header: any
    menu: any
    navMode: string
    navTheme: string
    showFooter: boolean
    showLogo: boolean
  }
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    websiteSetting: {
      title,
      logo,
      loginImage,
      loginDesc,
    },
    designSetting: {
      appDarkTheme,
      appTheme,
      appThemeList,
      locale: LocalStorage.get(LANGUAGES) ?? locale,
    },
    projectSetting: {
      tokenExpire,
      permission,
      permissionMode,
      header,
      menu,
      navMode,
      navTheme,
      showFooter,
      showLogo,
    },
  }),
  getters: {
    getDarkTheme(state) {
      return state.designSetting.appDarkTheme ? darkTheme : undefined
    },
    getDateLocale(state) {
      switch (state.designSetting.locale) {
        case LocaleEnum.EN:
          return dateEnUS
        case LocaleEnum.ZHCN:
          return dateZhCN
        default:
          break
      }
    },
    getLocale(state) {
      switch (state.designSetting.locale) {
        case LocaleEnum.EN:
          return enUS
        case LocaleEnum.ZHCN:
          return zhCN
        default:
          break
      }
    },
    // getAppTheme(): string {
    //     return this.appTheme
    // },
    // getAppThemeList(): string[] {
    //     return this.appThemeList
    // },
    // getLocale(): string {
    //     return this.locale
    // },
  },
  actions: {
    setLocale(locale: string) {
      this.designSetting.locale = locale
      LocalStorage.set(LANGUAGES, locale)
    },
  },
})

export const useApp = () => {
  return useAppStore(store)
}
