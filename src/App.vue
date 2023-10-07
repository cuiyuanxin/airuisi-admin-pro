<template>
  <n-config-provider
    :locale="getLocale"
    :date-locale="getDateLocale"
    :theme-overrides="getThemeOverrides"
    :theme="getDarkTheme"
  >
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <!--          <n-watermark-->
          <!--            v-if="isWatermark"-->
          <!--            :content="watermarkTitle"-->
          <!--            cross-->
          <!--            fullscreen-->
          <!--            :font-size="16"-->
          <!--            :line-height="16"-->
          <!--            :width="384"-->
          <!--            :height="384"-->
          <!--            :x-offset="12"-->
          <!--            :y-offset="60"-->
          <!--            :rotate="-15"-->
          <!--          />-->
          <router-view />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import type { GlobalTheme } from 'naive-ui'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { useAppStore } from '@/store/modules/app'
import { lighten } from '@/utils' // const osThemeRef = useOsTheme()

// const osThemeRef = useOsTheme()

// console.log(osThemeRef.value)
const appStore = useAppStore()
const { getLocale, getDateLocale } = storeToRefs(appStore)

// 主题模式
const getDarkTheme: ComputedRef<GlobalTheme | undefined> = computed(() => {
  const { appDarkTheme } = toRefs(appStore.designSetting)
  // osThemeRef.value === 'dark' ? darkTheme : null
  return appDarkTheme.value ? darkTheme : undefined
})

// 主题颜色
const getThemeOverrides: ComputedRef<GlobalThemeOverrides> = computed(() => {
  const { appTheme } = toRefs(appStore.designSetting)
  const lightenStr = lighten(appTheme.value, 6)
  return {
    common: {
      primaryColor: appTheme.value,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
    },
  }
})

// 全局水印
// const isWatermark = ref(appStore.designSetting.watermark)
// const watermarkTitle = unref(appStore.websiteSetting.title)
//
// const handleWatermarkShow = () => {
//   isWatermark.value = !isWatermark.value
// }
// provide('handleWatermarkShow', handleWatermarkShow)
</script>
