import type { Plugin, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { configVueI18nPlugin } from './i18n'
import { configMockPlugin } from './mock'

export const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean) => {
  const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
  const prodMock: boolean = VITE_USE_MOCK

  const vitePlugins: (Plugin | Plugin[] | PluginOption)[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      vueTemplate: true,
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),

    // 按需引入NaiveUi且自动创建组件声明
    Components({
      dirs: ['src/components', 'src/**/components'],
      extensions: ['vue', 'ts'],
      dts: true,
      resolvers: [NaiveUiResolver()],
    }),
    UnoCSS({
      configFile: 'uno.config.ts',
    }),
  ]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))
  // i18n
  vitePlugins.push(configVueI18nPlugin())

  prodMock && vitePlugins.push(configMockPlugin(isBuild, prodMock))

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    )
  }

  return vitePlugins
}
