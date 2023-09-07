import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '../../_utils'
import { isChinesePhoneNumber } from '@/utils/is'
import Mock from 'mockjs'
import { UserInfoType } from '@/store/modules/user'

const userList: UserInfoType[] = [
  {
    id: 1,
    username: 'airuisi',
    password: '123456',
    mobile: '15811112222',
    nickname: 'airuisi',
    setting: {
      locale: 'zh-CN',
    },
    token: 'token1',
    role: ['super', 'admin'],
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
    token: 'token2',
    role: ['admin'],
  },
  {
    id: 3,
    username: 'ceshi2',
    password: '123456',
    mobile: '15811112224',
    nickname: 'ceshi2',
    setting: {},
    token: 'token3',
    role: ['editor'],
  },
]

const menusList = {
  '1': [
    {
      key: 1,
      id: 1,
      parentId: 0,
      path: '/dashboard',
      name: 'dashboard',
      component: 'BasicLayout',
      redirect: '/dashboard/workplace',
      meta: {
        icon: 'DashboardOutlined',
        title: 'dashboard.title',
      },
    },
    {
      key: 2,
      id: 2,
      parentId: 1,
      path: 'workplace',
      name: 'dashboard_workplace',
      component: '/dashboard/workplace',
      meta: {
        title: 'dashboard.workplace.title',
        keepAlive: true,
      },
    },
    {
      key: 3,
      id: 3,
      parentId: 0,
      path: '/system',
      name: 'system',
      component: 'BasicLayout',
      meta: {
        icon: 'DashboardOutlined',
        title: 'system.title',
      },
    },
    {
      key: 4,
      id: 4,
      parentId: 3,
      path: 'setting',
      name: 'system_setting',
      component: '/system/setting',
      meta: {
        title: 'system.setting.title',
        keepAlive: true,
      },
    },
  ],
  '2': [
    {
      key: 1,
      id: 1,
      parentId: 0,
      path: '/dashboard',
      name: 'dashboard',
      component: 'BasicLayout',
      redirect: '/dashboard/workplace',
      meta: {
        icon: 'DashboardOutlined',
        title: 'dashboard.title',
      },
    },
    {
      key: 2,
      id: 2,
      parentId: 1,
      path: 'workplace',
      name: 'dashboard_workplace',
      component: '/dashboard/workplace',
      meta: {
        title: 'dashboard.workplace.title',
        keepAlive: true,
      },
    },
    {
      key: 3,
      id: 3,
      parentId: 0,
      path: '/system',
      name: 'system',
      component: 'BasicLayout',
      meta: {
        icon: 'DashboardOutlined',
        title: 'system.title',
      },
    },
    {
      key: 4,
      id: 4,
      parentId: 3,
      path: 'setting',
      name: 'system_setting',
      component: '/system/setting',
      meta: {
        title: 'system.setting.title',
        keepAlive: true,
      },
    },
  ],
  '3': [
    {
      key: 1,
      id: 1,
      parentId: 0,
      path: '/dashboard',
      name: 'dashboard',
      component: 'BasicLayout',
      redirect: '/dashboard/workplace',
      meta: {
        icon: 'DashboardOutlined',
        title: 'dashboard.title',
      },
    },
    {
      key: 2,
      id: 2,
      parentId: 1,
      path: 'workplace',
      name: 'dashboard_workplace',
      component: '/dashboard/workplace',
      meta: {
        title: 'dashboard.workplace.title',
        keepAlive: true,
      },
    },
  ],
}

function searchArray(
  array: UserInfoType[],
  searchFiler: string,
  searchValue: string | number,
): UserInfoType | undefined {
  for (const subArray of array) {
    if (subArray[searchFiler] === searchValue) {
      return subArray
    }
  }
  return undefined
}

export default [
  {
    url: '/api/getSmsCaptcha',
    method: 'post',
    response: ({ body }) => {
      const { mobile } = body || {}

      if (mobile && isChinesePhoneNumber(mobile)) {
        if (searchArray(userList, 'mobile', mobile)) {
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
        if (mobile && isChinesePhoneNumber(mobile)) {
          const userInfo: UserInfoType | undefined = searchArray(userList, 'mobile', mobile)
          if (userInfo) {
            return resultSuccess(
              {
                token: userInfo.token,
              },
              {
                message: '获取token成功',
              },
            )
          }
          return resultError('账号不存在')
        } else {
          return resultError('请输入正确的手机号码')
        }
      } else if (username && password) {
        const userInfo: UserInfoType | undefined = searchArray(userList, 'username', username)
        if (userInfo) {
          return resultSuccess(
            {
              token: userInfo.token,
            },
            {
              message: '获取token成功',
            },
          )
        }
        return resultError('账号不存在')
      } else return resultError('缺少正确参数')
    },
  },
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: ({ headers }) => {
      const { authorization } = headers

      if (authorization) {
        const userId = authorization.match(/\d+/g)
        const userInfo: UserInfoType | undefined = searchArray(userList, 'id', Number(userId[0]))
        if (userInfo) {
          return resultSuccess(userInfo, {
            message: '获取用户信息成功',
          })
        } else {
          return resultError('用户不存在')
        }
      }

      return resultError('缺少token')
    },
  },
  {
    url: '/api/getCurrentUserMenu',
    method: 'get',
    response: ({ headers }) => {
      const { authorization } = headers

      if (authorization) {
        const userId = authorization.match(/\d+/g)

        const userMenu = menusList[userId[0]]
        if (userMenu) {
          return resultSuccess(userMenu, {
            message: '获取用户权限菜单成功',
          })
        } else {
          return resultError('用户不存在')
        }
      }

      return resultError('缺少token')
    },
  },
] as MockMethod[]
