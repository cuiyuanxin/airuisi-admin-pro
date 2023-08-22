import { computed } from 'vue'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useApp } from '@/store/modules/app'
import { lighten } from '@/utils'

export const setupNaiveDiscreteApi = () => {
  const appStore = useApp()
  const { appDarkTheme, appTheme } = storeToRefs(appStore)
  const appDarkThemeVal = appDarkTheme.value
  const appThemeVal = appTheme.value

  const configProviderPropsRef = computed(() => ({
    theme: appDarkThemeVal ? darkTheme : undefined,
    themeOverrides: {
      common: {
        primaryColor: appThemeVal,
        primaryColorHover: lighten(appThemeVal, 6),
        primaryColorPressed: lighten(appThemeVal, 6),
      },
      loadingBar: {
        colorLoading: appThemeVal,
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
