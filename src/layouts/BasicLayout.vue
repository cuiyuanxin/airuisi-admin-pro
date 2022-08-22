<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :menu-data="menuData"
    disable-content-margin
    style="min-height: 100vh"
    iconfont-url="//at.alicdn.com/t/font_2804900_2sp8hxw3ln8.js"
    v-bind="settings"
    :collapsed-button-render="false"
    :locale="i18nRender"
  >
    <!-- 左侧菜单title/logo -->
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img :src="LogoImg" class="logo" alt="logo" />
        <h1>{{ settings.title }}</h1>
      </router-link>
    </template>
    <!-- 左侧header -->
    <template #headerContentRender>
      <div>
        <a-space size="middle" :style="{ cursor: 'pointer', fontSize: '16px' }">
          <div @click="handleCollapsed">
            <component :is="state.collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
          </div>
          <div>
            <a-tooltip :title="i18nRender('header.reload')">
              <component :is="'ReloadOutlined'" @click="handleRefresh" />
            </a-tooltip>
          </div>
          <div>
            <a-breadcrumb :routes="breadcrumb">
              <template #itemRender="{ route, params, routes, paths }">
                <span v-if="routes.indexOf(route) === routes.length - 1">{{ i18nRender(route.breadcrumbName) }}</span>
                <router-link v-else :to="{ path: route.path, params }">
                  {{ i18nRender(route.breadcrumbName) }}
                </router-link>
              </template>
            </a-breadcrumb>
          </div>
        </a-space>
      </div>
    </template>
    <!-- 右侧header @handleSettingChange="handleSettingChange" -->
    <template #rightContentRender>
      <div :style="{ cursor: 'pointer' }">
        <RightContent
          :top-menu="settings.layout === 'top'"
          :is-mobile="isMobile"
          :theme="settings.navTheme"
          :current-user="currentUser"
          :settings="settings"
        />
      </div>
    </template>
    <RouterView v-if="isRouterViewShow" v-slot="{ Component, route }">
      <transition name="slide-left" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
    <SettingDrawer v-model="settings" @handleSettingChange="handleSettingChange" />

    <a-modal
      v-model:visible="langVisible"
      :title="i18nRender('global.lang.hint')"
      :ok-text="i18nRender('global.lang.okText')"
      :cancel-text="i18nRender('global.lang.cancelText')"
      @ok="headleModalLang"
    >
      <p>{{ langmsg }}</p>
    </a-modal>
  </pro-layout>
</template>

<script setup lang="ts">
import { useRouter, RouterView, RouterLink } from 'vue-router'
import { getMenuData, clearMenuItem, type RouteContextProps } from '@ant-design-vue/pro-layout'
import { useUserTheme } from '@/hooks/useTheme'
import { i18nRender } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import defaultSettings from '@/config/defaultSettings'
import LogoWhiteImg from '@/assets/logo.svg'
import LogoBlackImg from '@/assets/logo-black.svg'
// 获取appStore
const appStore = useAppStore()
const { lang, navTheme, theme, layout, fixedHeader, fixSiderbar, splitMenus, navigatorlang } = storeToRefs(appStore)
// 初始化默认值
const langVisible = ref(false)
const langmsg = ref('')
// 获取默认配置
const settings = reactive(defaultSettings)
// logo
const LogoImg = ref<string>(settings.navTheme === 'dark' ? LogoWhiteImg : LogoBlackImg)
// 是否手机模式
const isMobile = ref(false)
// 刷新视图
const isRouterViewShow = ref(true)
// 用户信息
const currentUser = reactive({
  nickname: 'cuiyuanxin',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
})

// 初始化函数方法
// 语言切换Modal
const headleModalLang = () => {
  appStore.setLang(navigator.language)
  appStore.setNavigatorlang(true)
  langVisible.value = false
}
// 更新配置
const handleSettingChange = (type: string, value: any) => {
  type &&
    Object.assign(settings, {
      [`${type}`]: value,
    })
  // switch (type) {
  //   case 'contentWidth':
  //     this.settings[type] = value
  //     break
  //   case 'layout':
  //     if (value === 'sidemenu') {
  //       this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
  //     } else {
  //       this.settings.fixSiderbar = false
  //       this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
  //     }
  //     break
  // }
}
// 点击收缩菜单
const handleCollapsed = () => {
  state.collapsed = !state.collapsed
}
// 刷新视图组件
const handleRefresh = () => {
  // 先隐藏
  isRouterViewShow.value = false
  // nextTick() 将回调延迟到下次 DOM 更新循环之后执行
  nextTick(() => {
    isRouterViewShow.value = true
  })
}
// 面包屑
const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map(item => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title || '',
    }
  }),
)
// 获取路由菜单
const router = useRouter()
const menuItem = clearMenuItem(router.getRoutes())
const { menuData } = getMenuData(menuItem)

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false, // default collapsed
  openKeys: [], // defualt openKeys
  selectedKeys: [], // default selectedKeys
})

// 载入默认配置
const init = () => {
  // 默认主题配色
  const defaultTheme = theme.value ? theme.value : settings.primaryColor
  // 主题配色
  useUserTheme(defaultTheme)
  appStore.setTheme(defaultTheme)
  handleSettingChange('primaryColor', defaultTheme)

  const defaultNavTheme = navTheme.value ? navTheme.value : settings.navTheme
  const defaultLayout = layout.value ? layout.value : settings.layout
  const defaultFixedHeader = fixedHeader.value ? fixedHeader.value : settings.fixedHeader
  const defaultFixSiderbar = fixSiderbar.value ? fixSiderbar.value : settings.fixSiderbar
  const defaultSplitMenus = splitMenus.value ? splitMenus.value : settings.splitMenus
  handleSettingChange('navTheme', defaultNavTheme)
  handleSettingChange('layout', defaultLayout)
  handleSettingChange('fixedHeader', defaultFixedHeader)
  handleSettingChange('fixSiderbar', defaultFixSiderbar)
  handleSettingChange('splitMenus', defaultSplitMenus)

  // 自动检查浏览器语言
  if (navigator.language && navigator.language !== lang.value && !navigatorlang.value) {
    langVisible.value = true
    langmsg.value = navigator.language === 'en-US' ? i18nRender('global.lang.enmsg') : i18nRender('global.lang.zhmsg')
  }
}

init()

// 监控数据变化
watch(
  router.currentRoute,
  () => {
    const matched = router.currentRoute.value.matched.concat()
    state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path)
    state.openKeys = matched.filter(r => r.path !== router.currentRoute.value.path).map(r => r.path)
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<style lang="less">
@import './BasicLayout.less';
//.spinmain .ant-spin-text {
//  font-size: 25px;
//}
</style>
