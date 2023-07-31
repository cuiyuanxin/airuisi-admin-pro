import { computed } from 'vue'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { lighten } from '@/utils'

export function setupNaiveDiscreteApi() {
  const designSettingStore = useDesignSettingStore()
  const configProviderPropsRef = computed(() => ({
    theme: designSettingStore.darkTheme ? darkTheme : undefined,
    themeOverrides: {
      common: {
        primaryColor: designSettingStore.appTheme,
        primaryColorHover: lighten(designSettingStore.appTheme, 6),
        primaryColorPressed: lighten(designSettingStore.appTheme, 6),
      },
      loadingBar: {
        colorLoading: designSettingStore.appTheme,
      },
    },
  }))

  const { message, dialog, notification, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef,
    },
  )

  window['$message'] = message
  window['$dialog'] = dialog
  window['$notification'] = notification
  window['$loading'] = loadingBar
}
