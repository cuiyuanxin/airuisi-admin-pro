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
import { lighten } from '@/utils'

// const osThemeRef = useOsTheme()
const appStore = useAppStore()
const { getLocale, getDateLocale } = storeToRefs(appStore)

const getDarkTheme: ComputedRef<GlobalTheme | undefined> = computed(() => {
  const { appDarkTheme } = toRefs(appStore.designSetting)
  // osThemeRef.value === 'dark' ? darkTheme : null
  return appDarkTheme.value ? darkTheme : undefined
})

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

// watch(getThemeOverrides, (newVal, oldVal) => {
//   console.log(newVal, oldVal, 'watch=getThemeOverrides')
// })
//
// watch(getDarkTheme, (newVal, oldVal) => {
//   console.log(newVal, oldVal, getThemeOverrides, 'watch=getDarkTheme')
// })
</script>
