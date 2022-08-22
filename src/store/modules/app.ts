import { defineStore } from 'pinia'
import { loadLanguageAsync } from '@/locales'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      lang: '',
      navTheme: 'dark',
      theme: '',
      layout: '',
      fixedHeader: false,
      fixSiderbar: false,
      splitMenus: true,
      navigatorlang: false,
    }
  },
  getters: {},
  actions: {
    setLang(lang = 'zh-CN') {
      this.lang = lang
      loadLanguageAsync(lang)
    },
    setNavTheme(navTheme: string) {
      this.navTheme = navTheme
    },
    setTheme(theme: string) {
      this.theme = theme
    },
    setLayout(layout: string) {
      this.layout = layout
    },
    setFixedHeader(fixedHeader = false) {
      this.fixedHeader = fixedHeader
    },
    setFixSiderbar(fixSiderbar = false) {
      this.fixSiderbar = fixSiderbar
    },
    setSplitMenus(splitMenus = true) {
      this.splitMenus = splitMenus
    },
    setNavigatorlang(status = false) {
      this.navigatorlang = status
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['lang', 'navTheme', 'theme', 'layout', 'fixedHeader', 'fixSiderbar', 'splitMenus', 'navigatorlang'],
  },
})
