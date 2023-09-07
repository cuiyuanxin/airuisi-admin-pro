import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/constants/constant'
import { ResultEnum } from '@/constants/httpEnum'
import LocalStorage from '@/utils/storage'
import { useApp } from '@/hooks/setting/useApp'

const { getTokenExpire } = useApp()
import { login, getUserInfo } from '@/api/system/user'

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
  username: string
  welcome: string
  avatar: string
  permissions: any[]
  info: UserInfoType
}

export const useUserStore = defineStore({
  id: 'app-system',
  state: (): IUserState => ({
    token: LocalStorage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
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
    // getNickname(state): string {
    //   return state.username
    // },
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
      const { result, code } = res
      if (code === ResultEnum.SUCCESS) {
        const ex = getTokenExpire.value
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
      const { result, code } = res
      if (code === ResultEnum.SUCCESS) {
        const ex = getTokenExpire.value
        LocalStorage.set(CURRENT_USER, result, ex)
        this.setUserInfo(result)
      }

      return res
    },

    // 退出
    logout() {
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
    },
  },
})

// Need to be used outside the setup
export const useUser = () => {
  return useUserStore(store)
}
