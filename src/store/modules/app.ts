import { defineStore } from 'pinia'
import { store } from '@/store'
import designSetting from '@/settings/designSetting'
import { darkTheme, dateEnUS, enUS, dateZhCN, zhCN } from 'naive-ui'
import { LocaleEnum } from '@/constants/localeEnum'

const { appDarkTheme, appTheme, appThemeList, locale } = designSetting

interface AppState {
  // 深色主题
  appDarkTheme: boolean
  // 系统风格
  appTheme: string
  // 系统内置风格
  appThemeList: string[]
  // 国际语言
  locale: string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    appDarkTheme,
    appTheme,
    appThemeList,
    locale,
  }),
  getters: {
    getDarkTheme(state) {
      return state.appDarkTheme ? darkTheme : undefined
    },
    getDateLocale(state) {
      switch (state.locale) {
        case LocaleEnum.EN:
          return dateEnUS
        case LocaleEnum.ZHCN:
          return dateZhCN
        default:
          break
      }
    },
    getLocale(state) {
      switch (state.locale) {
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
})

export const useApp = () => {
  return useAppStore(store)
}
