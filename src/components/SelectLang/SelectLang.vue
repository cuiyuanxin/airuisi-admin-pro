<template>
  <a-tooltip :title="i18nRender('header.language')">
    <a-dropdown :trigger="['click']" placement="bottom" :class="prefixCls">
      <span>
        <component :is="'TranslationOutlined'" />
      </span>
      <template #overlay>
        <a-menu v-model:selectedKeys="selectedKeys" @click="handleChangeLang">
          <a-menu-item v-for="(item, index) in languageLabels" :key="index">
            {{ item }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-tooltip>
</template>

<script setup lang="ts">
import { i18nRender } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'

// 获取父级参数
const props = defineProps<{
  prefixCls: string
}>()
const languageLabels = {
  'zh-CN': '简体中文',
  'en-US': 'English',
}

const appStore = useAppStore()
const { lang } = storeToRefs(appStore)
const selectedKeys = ref([lang.value])
const handleChangeLang = e => {
  appStore.setLang(e.key)
}
</script>
