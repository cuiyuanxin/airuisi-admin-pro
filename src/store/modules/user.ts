import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER, LANGUAGES } from '@/constants/constant'
import { ResultEnum } from '@/constants/httpEnum'
import LocalStorage from '@/utils/storage'
import { useApp } from '@/hooks/setting/useApp'
import { changeLocale } from '@/hooks/web/useI18n'
import { getUserInfo, login } from '@/api/system/user'
import { Result } from '/#/axios'

const { getProjectSetting } = useApp()

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
  info: UserInfoType
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
    getNickname(state): string {
      return state.info.nickname ?? state.info.username
    },
    // getPermissions(state): [any][] {
    //   return state.permissions
    // },
    getInfo(state): UserInfoType {
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
    setUserInfo(info: UserInfoType) {
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
        const ex = getProjectSetting.value.tokenExpire
        LocalStorage.set(ACCESS_TOKEN, result.token, ex)
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
        const ex = getProjectSetting.value.tokenExpire
        LocalStorage.set(CURRENT_USER, result, ex)
        this.setUserInfo(result)

        if (result?.setting?.locale) {
          changeLocale(result?.setting?.locale)
        }
      }

      return res
    },

    // 退出
    async logout() {
      const userInfo: UserInfoType = {
        id: 0,
        username: '',
        password: '',
        mobile: '',
        nickname: '',
        setting: {},
        token: '',
        role: [],
      }
      this.setUserInfo(userInfo)
      LocalStorage.remove(ACCESS_TOKEN)
      LocalStorage.remove(CURRENT_USER)
      LocalStorage.remove(LANGUAGES)
    },
  },
})

// Need to be used outside the setup
export const useUser = () => {
  return useUserStore(store)
}
