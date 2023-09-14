import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { storeToRefs } from 'pinia'
import { useApp } from '@/store/modules/app'

const appStore = useApp()

const { designSetting } = storeToRefs(appStore)
const localeVal = designSetting.value.locale

export const i18n = createI18n({
  locale: localeVal,
  legacy: false,
  fallbackLocale: 'zh-CN',
  messages,
}) as I18n

export const setI18nLanguage = (locale) => {
  const htmlDom = document.querySelector('html')
  if (htmlDom) {
    htmlDom.setAttribute('lang', locale)
  }
}

// setup i18n instance with glob
export function setupLocale(app: App<Element>) {
  setI18nLanguage(localeVal)

  app.use(i18n)
}
