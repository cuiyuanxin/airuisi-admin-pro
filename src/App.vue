<template>
  <ConfigProvider>
    <router-view />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { lang } = storeToRefs(appStore)

// 保存国际化默认
const defauleLang = lang.value.length > 0 ? lang.value : 'zh-CN'
appStore.setLang(defauleLang)
</script>
