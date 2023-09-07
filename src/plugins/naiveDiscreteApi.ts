import { computed } from 'vue'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { useApp } from '@/hooks/setting/useApp'
import { lighten } from '@/utils'

export const setupNaiveDiscreteApi = () => {
  const { getDesignSetting } = useApp()
  const appDarkTheme = getDesignSetting.value.appDarkTheme
  const appTheme = getDesignSetting.value.appTheme

  const configProviderPropsRef = computed(() => ({
    theme: appDarkTheme ? darkTheme : undefined,
    themeOverrides: {
      common: {
        primaryColor: appTheme,
        primaryColorHover: lighten(appTheme, 6),
        primaryColorPressed: lighten(appTheme, 6),
      },
      loadingBar: {
        colorLoading: appTheme,
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
