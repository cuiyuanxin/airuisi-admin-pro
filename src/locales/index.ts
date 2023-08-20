import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const { locale } = storeToRefs(appStore)
const localeVal = locale.value

const defaultLocal = import(`./lang/${localeVal}.json`)
const message = defaultLocal ?? {}

const i18n = createI18n({
  locale: localeVal,
  messages: {
    [localeVal]: message,
  },
  legacy: false,
  fallbackLocale: 'zh-CN',
}) as I18n

// setup i18n instance with glob
export function setupLocale(app: App<Element>) {
  app.use(i18n)
}

export default i18n
