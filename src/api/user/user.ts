import { http } from '@/utils/http/axios'
import { Result } from '/#/axios'
import { RequestEnum } from '@/constants/httpEnum'

enum Api {
  VerificationCode = '/getVerificationCode',
}

export interface BasicResponseModel<T = any> {
  code: number
  message: string
  result: T
}

export interface BasicPageParams {
  pageNumber: number
  pageSize: number
  total: number
}

export function getVerificationCode(params) {
  return http.request<Result>(
    {
      url: Api.VerificationCode,
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
// export function getUserInfo() {
//   return http.request({
//     url: '/admin_info',
//     method: 'get',
//   })
// }

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<BasicResponseModel>(
    {
      url: '/login',
      method: 'POST',
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
//       url: `/user/u${uid}/changepw`,
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
