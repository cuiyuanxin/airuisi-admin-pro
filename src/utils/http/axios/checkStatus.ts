import { t } from '@/hooks/web/useI18n'

export function checkStatus(status: number, msg: string): void {
  // const { t } = useI18n()
  const $message = window['$message']

  switch (status) {
    case 400:
      $message.error(msg)
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      $message.error(t('system.api.errMsg401'))
      break
    case 403:
      $message.error(t('system.api.errMsg403'))
      break
    // 404请求不存在
    case 404:
      $message.error(t('system.api.errMsg404'))
      break
    case 405:
      $message.error(t('system.api.errMsg405'))
      break
    case 408:
      $message.error(t('system.api.errMsg408'))
      break
    case 500:
      $message.error(t('system.api.errMsg500'))
      break
    case 501:
      $message.error(t('system.api.errMsg501'))
      break
    case 502:
      $message.error(t('system.api.errMsg502'))
      break
    case 503:
      $message.error(t('system.api.errMsg503'))
      break
    case 504:
      $message.error(t('system.api.errMsg504'))
      break
    case 505:
      $message.error(t('system.api.errMsg505'))
      break
    default:
      $message.error(msg)
  }
}
