<template>
  <n-dropdown trigger="click" :show-arrow="true" :options="userOptions" @select="handleUserSelect">
    <n-avatar round>
      {{ getNickname }}
    </n-avatar>
  </n-dropdown>
</template>

<script setup lang="ts">
import { useUser } from '@/store/modules/user'
import { PageEnum } from '@/constants/pageEnum'

const { getNickname, logout } = useUser()
const router = useRouter()

// 用户信息
const userOptions = [
  {
    label: '个人设置',
    key: 'personalSettings',
  },
  {
    label: '修改密码',
    key: 'changePassword',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

// 用户中心
const handleUserSelect = (key: string) => {
  switch (key) {
    case 'personalSettings':
      console.log('个人中心')
      break
    case 'changePassword':
      console.log('修改密码')
      break
    case 'logout':
      logout()
      router.push(PageEnum.BASE_LOGIN)
      break
  }
}
</script>
