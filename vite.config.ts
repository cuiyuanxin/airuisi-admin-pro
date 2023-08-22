import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import * as process from 'process'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'

const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir)

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH || '/',
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          // additionalData: `@import "src/styles/var.less";`,
        },
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: false,
      https: false,
      cors: true, // 允许跨域
      proxy: createProxy(VITE_PROXY),
      hmr: true,
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  }
})
