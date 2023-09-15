import type { Plugin, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import ViteIconsResolver from 'unplugin-icons/resolver'
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

    // 按需引入NaiveUi且自动创建组件声明
    Components({
      dts: true,
      resolvers: [
        NaiveUiResolver(),
        ViteIconsResolver({
          // 添加需要的图标集
          validSets: ['ionicons5', 'fluent'],
          // 将 @vicons 中的图标名转换为 PascalCase 形式
          transformer: (name) => `V${name.replace(/(^\w|-\w)/g, (_, c) => c.toUpperCase())}`,
        }),
      ],
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
