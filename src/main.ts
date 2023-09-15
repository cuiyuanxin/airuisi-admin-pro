import { createApp } from 'vue'
import router, { setupRouter } from './router'
import { setupNaiveDiscreteApi } from '@/plugins/naiveDiscreteApi'
import { setupDirectives } from '@/plugins/directives'
import { setupStore } from './store'
import { setupLocale } from '@/locales'
import App from './App.vue'
import '@/styles/global.less'
import 'virtual:uno.css'

async function setupApp() {
  const app = createApp(App)

  // 挂载状态管理
  setupStore(app)
  // 挂载 naive-ui 脱离上下文的 Api
  setupNaiveDiscreteApi()
  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app)
  // 挂载国际语言
  setupLocale(app)
  // 挂载路由
  setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  app.mount('#app', true)
}

void setupApp()
