import '@ant-design-vue/pro-layout/dist/style.css'
import 'ant-design-vue/dist/antd.variable.min.css'

import { createApp } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'
import router from './router'
import i18n from './locales'
import App from './App.vue'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(ConfigProvider)
app.use(ProLayout)
app.use(PageContainer)

app.mount('#app')
