import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'

export function configVueI18nPlugin() {
  const vueI18nPlugin = VueI18nPlugin({
    include: [path.resolve(__dirname, '../../../src/locales/lang/**')],
  })

  return vueI18nPlugin
}
