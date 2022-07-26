<template>
  <div :class="wrpCls">
    <a-dropdown v-if="currentUsers && currentUsers.nickname" placement="bottomRight" :class="prefixCls">
      <span class="ant-pro-account-avatar">
        <a-avatar
          size="small"
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          class="antd-pro-global-header-index-avatar"
        />
        <span>{{ currentUsers.nickname }}</span>
      </span>
      <template #overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <a-menu-item v-if="showMenu" key="center" @click="handleToCenter">
            <a-icon type="user" />
            {{ $t('menu.account.center') }}
          </a-menu-item>
          <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
            <a-icon type="setting" />
            {{ $t('menu.account.settings') }}
          </a-menu-item>
          <a-menu-divider v-if="menu" />
          <a-menu-item key="logout" @click="handleLogout">
            <a-icon type="logout" />
            {{ $t('menu.account.logout') }}
          </a-menu-item>

          <!--            <a-menu-item>-->
          <!--              <template #icon>-->
          <!--                <SettingOutlined />-->
          <!--              </template>-->
          <!--              <span>个人设置</span>-->
          <!--            </a-menu-item>-->
          <!--            <a-menu-item>-->
          <!--              <template #icon>-->
          <!--                <LogoutOutlined />-->
          <!--              </template>-->
          <!--              <span>退出登录</span>-->
          <!--            </a-menu-item>-->
        </a-menu>
      </template>
      <a-avatar shape="square" size="small">
        <template #icon>
          <UserOutlined />
        </template>
        {{ currentUser.nickname }}
      </a-avatar>
    </a-dropdown>

    <a-space>
      <select-lang :class="prefixCls" />
    </a-space>
  </div>

  <!--  <div style="margin-right: 12px">-->
  <!--    <a-space>-->
  <!--      <a style="padding: 0 12px; display: inline-block; user-select: none" @click="handleClick"><BgColorsOutlined /></a>-->
  <!--  <a-dropdown>-->
  <!--    <template #overlay>-->
  <!--      <a-menu>-->
  <!--        <a-menu-item>-->
  <!--          <template #icon>-->
  <!--            <SettingOutlined />-->
  <!--          </template>-->
  <!--          <span>个人设置</span>-->
  <!--        </a-menu-item>-->
  <!--        <a-menu-item>-->
  <!--          <template #icon>-->
  <!--            <LogoutOutlined />-->
  <!--          </template>-->
  <!--          <span>退出登录</span>-->
  <!--        </a-menu-item>-->
  <!--      </a-menu>-->
  <!--    </template>-->
  <!--    <a-avatar shape="square" size="small">-->
  <!--      <template #icon>-->
  <!--        <UserOutlined />-->
  <!--      </template>-->
  <!--      {{ currentUser.nickname }}-->
  <!--    </a-avatar>-->
  <!--  </a-dropdown>-->
  <!--    </a-space>-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import { UserOutlined, SettingOutlined, LogoutOutlined, BgColorsOutlined } from '@ant-design/icons-vue'
// import { apply, randomTheme } from '../../hooks/useTheme'

import Avatar from '@/assets/avatar.png'

// 获取父级参数
const props = withDefaults(
  defineProps<{
    prefixCls?: string
    topMenu: {
      type: boolean
      required: true
    }
    isMobile: {
      type: boolean
      required: false
    }
    theme: {
      type: string
      required: true
    }
    currentUser: {
      nickname: string
      avatar: string
    }
  }>(),
  {
    prefixCls: 'ant-pro-global-header-index-action',
  },
)

// 菜单
const showMenu = ref(true)
// 头像、昵称
const currentUsers = ref(props.currentUser)

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

// 样式
const wrpCls = ref({
  'ant-pro-global-header-index-right': true,
  [`ant-pro-global-header-index-${props.isMobile || !props.topMenu ? 'light' : props.theme}`]: true,
})
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
