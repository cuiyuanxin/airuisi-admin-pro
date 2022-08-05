<template>
  <div :class="wrpCls">
    <a-space size="middle">
      <div class="ant-pro-global-header-notice">
        <NoticeIcon :prefix-cls="prefixCls" />
      </div>
      <div class="ant-pro-global-header-screenfull">
        <a-tooltip :title="i18nRender('header.screenfull')">
          <span @click="handleFullscreenToggle">
            <component :is="isFullscreen ? 'CompressOutlined' : 'ExpandOutlined'" />
          </span>
        </a-tooltip>
      </div>
      <div class="ant-pro-global-header-language">
        <SelectLang :prefix-cls="prefixCls" />
      </div>
      <div class="ant-pro-global-header-usercenter">
        <a-dropdown v-if="currentUsers && currentUsers.nickname" placement="bottomRight" :class="prefixCls">
          <span class="ant-pro-account-avatar">
            <a-avatar size="small" :src="currentUsers.avatar" class="antd-pro-global-header-index-avatar" />
            <span>{{ currentUsers.nickname }}</span>
          </span>
          <template #overlay>
            <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
              <a-menu-item v-if="showMenu" key="center" @click="handleToCenter">
                <component :is="'UserOutlined'" />
                {{ i18nRender('header.usercenter.center') }}
              </a-menu-item>
              <a-menu-item key="settings" @click="handleToSettings">
                <component :is="'SettingOutlined'" />
                {{ i18nRender('header.usercenter.settings') }}
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="handleLogout">
                <component :is="'LogoutOutlined'" />
                {{ i18nRender('header.usercenter.logout') }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-avatar shape="square" size="small">
            <template #icon>
              <component :is="'UserOutlined'" />
            </template>
            {{ currentUser.nickname }}
          </a-avatar>
        </a-dropdown>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
import { i18nRender } from '@/locales'
import SelectLang from '@/components/SelectLang'
import NoticeIcon from '@/components/NoticeIcon'

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

// 全屏
const isFullscreen = ref(false)

// 监听变化
const fullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const handleFullscreenToggle = () => {
  screenfull.toggle()
}

// 设置监听器
onMounted(() => {
  screenfull.on('change', fullscreenChange)
})

// 删除监听器
onUnmounted(() => {
  screenfull.off('change', fullscreenChange)
})

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
