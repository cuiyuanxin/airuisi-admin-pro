<template>
  <n-layout class="ars-layout" :position="fixedMenu" has-sider>
    <template v-if="navMode === 'vertical'">
      <n-layout-sider
        bordered
        collapse-mode="width"
        v-model:collapsed="collapsed"
        :show-trigger="showTrigger"
        :inverted="inverted"
        :collapsed-width="minMenuWidth"
        :width="menuWidth"
        :native-scrollbar="false"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div>
          <layout-logo v-model:collapsed="collapsed" v-show="showLogo" />
          <layout-menu v-model:inverted="inverted" mode="vertical" />
        </div>
      </n-layout-sider>
    </template>
    <template v-if="navMode === 'vertical' || navMode === 'vertical-mix'"> </template>

    <n-layout>
      <n-layout-header :position="fixedHeader">
        <template v-if="navMode === 'vertical'">
          <layout-header v-model:collapsed="collapsed" />
        </template>
      </n-layout-header>
      <n-layout-content class="ars-layout-content">
        <router-view v-if="flag" />
      </n-layout-content>
      <n-layout-footer v-show="showFooter" bordered>
        <div class="ars-layout-footer">Copyright &copy; 2023 Airuisi</div>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'
import LayoutLogo from '@/layouts/components/logo/layout-logo.vue'
import LayoutMenu from '@/layouts/components/menu/layout-menu.vue'
import LayoutHeader from '@/layouts/components/header/layout-header.vue'

const { getProjectSetting } = useApp()
const { header, menu, navMode, navTheme, showLogo } = getProjectSetting.value

// 展开收缩菜单
const collapsed = ref(menu.collapsed)
// 收缩后样式
const minMenuWidth = unref(menu.minMenuWidth)
// 展开后样式
const menuWidth = unref(menu.menuWidth)
// 折叠菜单样式
const showTrigger = ref(menu.showTrigger)
// 翻转样式
const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(navTheme))
})
// 固定菜单
const fixedMenu = computed(() => {
  const { fixed } = unref(menu)
  return fixed ? 'absolute' : 'static'
})
// 固定头部
const fixedHeader = computed(() => {
  const { fixed } = unref(header)
  return fixed ? 'absolute' : 'static'
})

// 刷新组件
const flag = ref(true)

// const appDarkTheme = getDesignSetting.value?.appDarkTheme

// 隐藏尾部
const showFooter = unref(getProjectSetting.value.showFooter)

// const fixedFooter = computed(() => {
//   const { fixed } = unref(getProjectSetting.value.header)
//   return fixed ? 'absolute' : 'static'
// })

//
// const getHeaderInverted = computed(() => {
//   return ['light', 'header-dark'].includes(unref(getProjectSetting.value.menu))
//     ? unref(inverted)
//     : !unref(inverted)
// })
</script>

<style lang="less" scoped>
.ars-layout {
  @apply flex flex-row flex-auto;
  //&-sider {
  //  min-height: 100vh;
  //  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  //  position: relative;
  //  z-index: 13;
  //  transition: all 0.2s ease-in-out;
  //}
  //&-menu {
  //}
  //&-content {
  //  @apply flex-auto;
  //  min-height: 100vh;
  //}
  //&-default-background {
  //  @apply bg-slate-50;
  //}
  &-footer {
    @apply h-12 leading-12 text-center;
  }
}
</style>
