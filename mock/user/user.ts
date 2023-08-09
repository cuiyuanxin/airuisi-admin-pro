import { MockMethod } from 'vite-plugin-mock'

const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 1000000) // 生成 0 到 999999 之间的随机整数
}

const generateSixDigitCode = (): string => {
  const randomNumber = generateRandomNumber()
  const sixDigitCode = randomNumber.toString().padStart(6, '0') // 将随机数转换为字符串，并在前面补充零直到长度为 6
  return sixDigitCode
}

export default [
  {
    url: '/api/getVerificationCode',
    method: 'post',
    response: () => {
      const code: string = generateSixDigitCode()
      return {
        code: 0,
        msg: '获取验证码成功',
        data: {
          code: code,
        },
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
