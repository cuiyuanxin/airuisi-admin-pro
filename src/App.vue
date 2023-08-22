<template>
  <n-config-provider
    :locale="getLocale"
    :date-locale="getDateLocale"
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
import { storeToRefs } from 'pinia'
import { useApp } from '@/store/modules/app'
import { lighten } from '@/utils'

const appStore = useApp()
const { appTheme, getDarkTheme, getDateLocale, getLocale } = storeToRefs(appStore)
const appThemeVal = appTheme.value

const getThemeOverrides = computed(() => {
  const lightenStr = lighten(appThemeVal, 6)
  return {
    common: {
      primaryColor: appThemeVal,
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
@import './styles/index';
</style>
