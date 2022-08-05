import { defineStore } from 'pinia'
import { loadLanguageAsync } from '@/locales'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      lang: '',
      navigatorlang: false,
    }
  },
  getters: {},
  actions: {
    setLang(lang = 'zh-CN') {
      this.lang = lang
      loadLanguageAsync(lang)
    },
    setNavigatorlang(status = false) {
      this.navigatorlang = status
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['lang', 'navigatorlang'],
  },
})
