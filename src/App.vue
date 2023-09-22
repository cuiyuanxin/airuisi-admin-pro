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
import { storeToRefs } from 'pinia'
import { useApp } from '@/store/modules/app'
import { lighten } from '@/utils'

const appStore = useApp()
const { designSetting, getDarkTheme, getDateLocale, getLocale } = storeToRefs(appStore)
const appTheme = designSetting.value.appTheme

const getThemeOverrides = computed(() => {
  const lightenStr = lighten(appTheme, 6)
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
