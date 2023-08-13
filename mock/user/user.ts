import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '../_utils'
import { isChinesePhoneNumber } from '@/utils/is'
import Mock from 'mockjs'

export default [
  {
    url: '/api/getVerificationCode',
    method: 'post',
    response: ({ body }) => {
      console.log(body, '=--')
      const { mobile } = body || {}

      if (mobile && isChinesePhoneNumber(mobile)) {
        const code = Mock.Random.integer(111111, 999999)
        return resultSuccess(
          {
            code: code,
          },
          {
            message: '获取验证码成功',
          },
        )
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
