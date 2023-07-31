import type { Plugin, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { configHtmlPlugin } from './html'

// rollup打包分析插件
import visualizer from 'rollup-plugin-visualizer'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  // const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

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

  // vite-plugin-mock
  // VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild, prodMock));

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    )
  }

  return vitePlugins
}
