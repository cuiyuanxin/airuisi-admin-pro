<template>
  <div :class="wrpCls">
    <a-space size="middle">
      <div>
        <a-dropdown :trigger="['click']" :class="prefixCls">
          <span class="ant-dropdown-link" placement="bottomRight" @click.prevent>
            <a-badge :dot="show">
              <BellOutlined :style="{ fontSize: '16px' }" />
            </a-badge>
          </span>
          <template #overlay>
            <a-card style="width: 100%" :tab-list="tabList" :active-tab-key="inMesKey">
              <p>{{ contentList[inMesKey] }}</p>
            </a-card>
          </template>
        </a-dropdown>
      </div>
      <div>
        <a-dropdown v-if="currentUsers && currentUsers.nickname" placement="bottomRight" :class="prefixCls">
          <span class="ant-pro-account-avatar">
            <a-avatar size="small" :src="currentUsers.avatar" class="antd-pro-global-header-index-avatar" />
            <span>{{ currentUsers.nickname }}</span>
          </span>
          <template #overlay>
            <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
              <a-menu-item v-if="showMenu" key="center" @click="handleToCenter">
                <UserOutlined />
                个人中心
              </a-menu-item>
              <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
                <SettingOutlined />
                个人设置
              </a-menu-item>
              <a-menu-divider v-if="menu" />
              <a-menu-item key="logout" @click="handleLogout">
                <LogoutOutlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
          <a-avatar shape="square" size="small">
            <template #icon>
              <UserOutlined />
            </template>
            {{ currentUser.nickname }}
          </a-avatar>
        </a-dropdown>
      </div>
      <!-- <select-lang :class="prefixCls" /> -->
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, SettingOutlined, LogoutOutlined, BgColorsOutlined, BellOutlined } from '@ant-design/icons-vue'
// import { apply, randomTheme } from '../../hooks/useTheme'

// 获取父级参数
const props = withDefaults(
  defineProps<{
    prefixCls?: string
    topMenu: boolean
    isMobile?: boolean
    theme: string
    currentUser: {
      nickname: string
      avatar: string
    }
  }>(),
  {
    prefixCls: 'ant-pro-global-header-index-action',
    isMobile: false,
  },
)

// 菜单
const showMenu = ref(true)
// 头像、昵称
const currentUsers = ref(props.currentUser)

// 样式
const wrpCls = ref({
  'ant-pro-global-header-index-right': true,
  [`ant-pro-global-header-index-${props.isMobile || !props.topMenu ? 'light' : props.theme}`]: true,
})
// 消息徽章
const show = ref(true)
// 消息组件
const tabList = [
  {
    key: 'tab1',
    tab: '消息',
  },
  {
    key: 'tab2',
    tab: '通知',
  },
  {
    key: 'tab3',
    tab: '待办',
  },
]
let inMesKey = ref('tab1')
const contentList = {
  tab1: 'content1',
  tab2: 'content2',
  tab3: 'content3',
}
const onTabChange = (value: string, type: string) => {
  inMesKey = ref(value)
}

// 个人中心 退出
const handleToCenter = () => {
  // this.$router.push({ path: '/account/center' })
}
// 个人设置
const handleToSettings = () => {
  // this.$router.push({ path: '/account/settings' })
}
// 退出
const handleLogout = () => {
  // Modal.confirm({
  //   title: this.$t('layouts.usermenu.dialog.title'),
  //   content: this.$t('layouts.usermenu.dialog.content'),
  //   onOk: () => {
  //     // return new Promise((resolve, reject) => {
  //     //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
  //     // }).catch(() => console.log('Oops errors!'))
  //     return this.$store.dispatch('Logout').then(() => {
  //       this.$router.push({ name: 'login' })
  //     })
  //   },
  //   onCancel () {}
  // })
}
</script>
<style lang="less">
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
