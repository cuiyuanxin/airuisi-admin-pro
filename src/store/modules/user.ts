import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/constants/constant'
import { ResultEnum } from '@/constants/httpEnum'
import LocalStorage from '@/utils/storage'
import { loginConf } from '@/config/config'

import { login } from '@/api/user/user'

export type UserInfoType = {
  // TODO: add your own data
  name: string
  email: string
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
  id: 'app-user',
  state: (): IUserState => ({
    token: LocalStorage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: LocalStorage.get(CURRENT_USER, {}),
  }),
  getters: {
    // getToken(): string {
    //   return this.token
    // },
    // getAvatar(): string {
    //   return this.avatar
    // },
    // getNickname(): string {
    //   return this.username
    // },
    // getPermissions(): [any][] {
    //   return this.permissions
    // },
    // getUserInfo(): UserInfoType {
    //   return this.info
    // },
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
    // setUserInfo(info: UserInfoType) {
    //   this.info = info
    // },
    // 登录
    async login(params: any) {
      const response = await login(params)
      const { result, code } = response
      if (code === ResultEnum.SUCCESS) {
        const ex = loginConf.expire
        LocalStorage.set(ACCESS_TOKEN, result.token, ex)
        this.setToken(result.token)
      }
      return response
    },

    // 获取用户信息
    // async getInfo() {
    //   const result = await getUserInfoApi()
    //   if (result.permissions && result.permissions.length) {
    //     const permissionsList = result.permissions
    //     this.setPermissions(permissionsList)
    //     this.setUserInfo(result)
    //   } else {
    //     throw new Error('getInfo: permissionsList must be a non-null array !')
    //   }
    //   this.setAvatar(result.avatar)
    //   return result
    // },

    // 退出
    // async logout() {
    //   this.setPermissions([])
    //   this.setUserInfo({ name: '', email: '' })
    //   LocalStorage.remove(ACCESS_TOKEN)
    //   LocalStorage.remove(CURRENT_USER)
    // },
  },
})

// Need to be used outside the setup
export const useUser = () => {
  return useUserStore(store)
}
