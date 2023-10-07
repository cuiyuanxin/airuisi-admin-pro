import { Result } from '/#/axios'
import { http } from '@/utils/http/axios'
import { RequestEnum } from '@/constants/httpEnum'

enum Api {
  SmsCaptcha = '/getSmsCaptcha',
  Login = '/login',
  UserInfo = '/getUserInfo',
  CurrentUserMenu = '/getCurrentUserMenu',
}

export function getSmsCaptcha(params) {
  return http.request<Result>(
    {
      url: Api.SmsCaptcha,
      method: RequestEnum.POST,
      params,
    },
    {
      isTransformResponse: false,
    },
  )
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request(
    {
      url: Api.UserInfo,
      method: RequestEnum.GET,
    },
    {
      isTransformResponse: false,
    },
  )
}

/**
 * @description: 获取用户权限菜单
 */
export function getCurrentUserMenu() {
  return http.request(
    {
      url: Api.CurrentUserMenu,
      method: RequestEnum.GET,
    },
    {
      isTransformResponse: false,
    },
  )
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<Result>(
    {
      url: Api.Login,
      method: RequestEnum.POST,
      params,
    },
    {
      isTransformResponse: false,
    },
  )
}

/**
 * @description: 用户修改密码
 */
// export function changePassword(params, uid) {
//   return http.request(
//     {
//       url: `/system/u${uid}/changepw`,
//       method: 'POST',
//       params,
//     },
//     {
//       isTransformResponse: false,
//     },
//   )
// }

/**
 * @description: 用户登出
 */
// export function logout(params) {
//   return http.request({
//     url: '/login/logout',
//     method: 'POST',
//     params,
//   })
// }
