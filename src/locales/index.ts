import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useApp } from '@/store/modules/app'

const appStore = useApp()

const { locale } = storeToRefs(appStore)
const localeVal = locale.value

const options = {
  locale: localeVal,
  legacy: false,
  fallbackLocale: 'zh-CN',
}

const i18n = createI18n(options) as I18n

const setI18nLanguage = (locale) => {
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale)
}

async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(`./lang/${locale}.json`)
  const defaultMessage = messages ?? (await import(`./lang/${i18n.global.fallbackLocale}.json`))

  return defaultMessage.default
}

// setup i18n instance with glob
export function setupLocale(app: App<Element>) {
  setI18nLanguage(localeVal)

  const messages = loadLocaleMessages(i18n, localeVal)

  // set locale and locale message
  i18n.global.setLocaleMessage(localeVal, messages)

  app.use(i18n)
}

export default i18n
