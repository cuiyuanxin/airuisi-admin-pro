import { createI18n } from 'vue-i18n'
import zh from './lang/zh-CN'
import en from './lang/en-US'

const language = localStorage.getItem('locale') || (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
const messages = {
  en,
  zh,
}
const localeData = {
  // 如果本地有语言标识就采用本地，没有就根据浏览器语言默认标识显示语言
  locale: language,
  fallbackLocale: 'en', // 设置备用语言
  allowComposition: true, // 允许组合式ap
  messages: messages,
}

const i18n = createI18n(localeData)

export default i18n
