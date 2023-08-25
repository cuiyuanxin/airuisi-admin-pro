import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '../../_utils'
import { isChinesePhoneNumber } from '@/utils/is'
import Mock from 'mockjs'

interface setting {
  locale?: string
}
interface userItem {
  id: number
  username: string
  password: string
  mobile: string
  nickname: string
  setting: setting
}

const userList: userItem[] = [
  {
    id: 1,
    username: 'airuisi',
    password: '123456',
    mobile: '15811112222',
    nickname: 'airuisi',
    setting: {
      locale: 'zh-CN',
    },
  },
  {
    id: 2,
    username: 'ceshi',
    password: '123456',
    mobile: '15811112223',
    nickname: 'ceshi',
    setting: {
      locale: 'en',
    },
  },
  {
    id: 3,
    username: 'ceshi2',
    password: '123456',
    mobile: '15811112224',
    nickname: 'ceshi2',
    setting: {},
  },
]

function searchArray(array: userItem[], searchValue: string): userItem | undefined {
  for (const subArray of array) {
    if (subArray.mobile === searchValue) {
      return subArray
    }
  }
  return undefined
}

export default [
  {
    url: '/api/getVerificationCode',
    method: 'post',
    response: ({ body }) => {
      const { mobile } = body || {}

      if (mobile && isChinesePhoneNumber(mobile)) {
        if (searchArray(userList, mobile)) {
          const code = Mock.Random.integer(111111, 999999)
          return resultSuccess(
            {
              code: code,
            },
            {
              message: '获取验证码成功',
            },
          )
        }
        return resultError('手机号码不存在')
      } else {
        return resultError('请输入正确的手机号码')
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const { mobile, verification, username, password } = body || {}

      // 判断存在手机号默认为手机登录
      if (mobile && verification) {
      } else return resultError('请输入手机号或者验证码')
      // 账号登录
      if (username && password) {
      } else return resultError('请输入账号或者密码')

      if (mobile && isChinesePhoneNumber(mobile)) {
        if (searchArray(userList, mobile)) {
          const code = Mock.Random.integer(111111, 999999)
          return resultSuccess(
            {
              code: code,
            },
            {
              message: '获取验证码成功',
            },
          )
        }
        return resultError('手机号码不存在')
      } else {
        return resultError('请输入正确的手机号码')
      }
    },
  },
] as MockMethod[]
