<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
  >
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <router-view />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { lighten } from '@/utils'

const designSettingStore = useDesignSettingStore()

const getDarkTheme = computed(() => (designSettingStore.darkTheme ? darkTheme : undefined))
const getThemeOverrides = computed(() => {
  const appTheme = designSettingStore.appTheme
  const lightenStr = lighten(designSettingStore.appTheme, 6)
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
    },
    loadingBar: {
      colorLoading: appTheme,
    },
  }
})
</script>

<style lang="less">
@import './styles/index.less';
</style>
