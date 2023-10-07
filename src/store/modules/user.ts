import { defineStore } from 'pinia'
import { store } from '@/store'
// import { useApp } from '@/hooks/setting/useApp'
import { changeLocale } from '@/hooks/web/useI18n'
import { getUserInfo, login } from '@/api/system/user'
import { Result } from '/#/axios'
import {
  ACCESS_TOKEN,
  ASYNC_ROUTE,
  CURRENT_USER,
  LANGUAGES,
  TABS_ROUTES,
} from '@/constants/constant'
import { ResultEnum } from '@/constants/httpEnum'
import LocalStorage from '@/utils/storage'

// const { getProjectSetting } = useApp()

interface settingType {
  locale?: string
}

export type UserInfoType = {
  id: number
  username: string
  password: string
  mobile: string
  nickname: string
  setting: settingType
  token: string
  role: string[]
}

export interface IUserState {
  token: string
  permissions: any[]
  info: UserInfoType | undefined
}

export const useUserStore = defineStore({
  id: 'app-system',
  state: (): IUserState => ({
    token: LocalStorage.get(ACCESS_TOKEN, ''),
    permissions: [],
    info: LocalStorage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(state): string {
      return state.token
    },
    // getAvatar(state): string {
    //   return state.avatar
    // },
    getNickname(state): string | undefined {
      return state.info?.nickname ?? state.info?.username
    },
    // getPermissions(state): [any][] {
    //   return state.permissions
    // },
    getInfo(state): UserInfoType | undefined {
      return state.info
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    // setAvatar(avatar: string) {
    //   this.avatar = avatar
    // },
    // setPermissions(permissions) {
    //   this.permissions = permissions
    // },
    setUserInfo(info: UserInfoType | undefined) {
      this.info = info
    },
    // 登录
    async login(params: any) {
      const res = await login(params).catch((err) => {
        console.log(err)
      })
      console.log('login data:', res)
      const { result, code } = res as Result
      if (code === ResultEnum.SUCCESS) {
        // const ex = getProjectSetting.value.tokenExpire
        LocalStorage.set(ACCESS_TOKEN, result.token)
        this.setToken(result.token)
      }

      return res
    },

    // 获取用户信息
    async getUserInfo() {
      const res = await getUserInfo().catch((err) => {
        // throw new Error('getInfo: permissionsList must be a non-null array !')
        console.log(err)
      })
      console.log('getUserInfo data:', res)
      const { result, code } = res as Result
      if (code === ResultEnum.SUCCESS) {
        // const ex = getProjectSetting.value.tokenExpire
        LocalStorage.set(CURRENT_USER, result)
        this.setUserInfo(result)

        if (result?.setting?.locale) {
          changeLocale(result?.setting?.locale)
        }
      }

      return res
    },

    // 退出
    async logout() {
      this.setUserInfo(undefined)
      LocalStorage.remove(ACCESS_TOKEN)
      LocalStorage.remove(CURRENT_USER)
      LocalStorage.remove(LANGUAGES)
      LocalStorage.remove(TABS_ROUTES)
      LocalStorage.remove(ASYNC_ROUTE)
    },
  },
})

// Need to be used outside the setup
export const useUser = () => {
  return useUserStore(store)
}
