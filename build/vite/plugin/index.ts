import type { Plugin, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { viteMockServe } from 'vite-plugin-mock'

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
      resolvers: [NaiveUiResolver()],
    }),
  ]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  if (prodMock) {
    viteMockServe({
      ignore: /^_/,
      mockPath: 'mock',
      localEnabled: !isBuild,
      prodEnabled: isBuild && prodMock,
      watchFiles: true,
      injectCode: `
      import { setupProdMockServer } from '../mock/createProdMockServer'
      setupProdMockServer()
      `,
    })
  }

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    )
  }

  return vitePlugins
}
