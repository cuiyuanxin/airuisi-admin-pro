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
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
] as MockMethod[]
