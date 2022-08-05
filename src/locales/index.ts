import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'

// 默认 lang
const defaultLang = 'zh-CN'

const modules = import.meta.globEager('./lang/*.ts')

const messages = {
  'zh-CN': {
    ...zhCN,
  },
}

const localeData = {
  silentTranslationWarn: true,
  allowComposition: true, // 允许组合式ap
  // 如果本地有语言标识就采用本地，没有就根据浏览器语言默认标识显示语言
  locale: defaultLang,
  fallbackLocale: defaultLang, // 设置备用语言
  messages: messages,
}

const i18n = createI18n(localeData)

const loadedLanguages = [defaultLang]

function setI18nLanguage(lang: string) {
  i18n.global.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    if (i18n.global.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        for (const path in modules) {
          if (path === `./lang/${lang}.ts`) {
            const locale = modules[path].default
            i18n.global.setLocaleMessage(lang, locale)
            loadedLanguages.push(lang)
            return setI18nLanguage(lang)
          }
        }
        return true
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

export function i18nRender(key: string) {
  return i18n.global.t(`${key}`)
}

export default i18n
