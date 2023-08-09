import designSetting from '@/config/settings/designSetting'
import { defineStore } from 'pinia'
import { store } from '@/store'

const { darkTheme, appTheme, appThemeList } = designSetting

interface DesignSettingState {
  //深色主题
  darkTheme: boolean
  //系统风格
  appTheme: string
  //系统内置风格
  appThemeList: string[]
}

export const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme,
    appTheme,
    appThemeList,
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeList(): string[] {
      return this.appThemeList
    },
  },
})

export const useDesignSetting = () => {
  return useDesignSettingStore(store)
}
