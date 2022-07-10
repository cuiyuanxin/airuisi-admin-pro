import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';

const app = createApp(App)

app.config.globalProperties.$message = message
app.use(router)
app.use(createPinia())

app.mount('#app')











