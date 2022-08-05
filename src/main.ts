import '@ant-design-vue/pro-layout/dist/style.less'
import 'ant-design-vue/dist/antd.variable.less'

import { createApp } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'
import router from './router'
import store from './store'
import i18n from './locales'
import App from './App.vue'
import * as antIcons from '@ant-design/icons-vue'

const app = createApp(App)

const antIconsList: any = antIcons
// 注册图标组件
for (const i in antIconsList) {
  app.component(i, antIconsList[i])
}

app.use(router)
app.use(store)
app.use(i18n)
app.use(ConfigProvider)
app.use(ProLayout)
app.use(PageContainer)

app.mount('#app')
