<template>
  <n-layout class="ars-layout" :position="fixed" :has-sider="hasSider">
    <n-layout-header bordered :inverted="inverted" v-if="!hasSider">
      <layout-header />
    </n-layout-header>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :native-scrollbar="false"
      :width="menuWidth"
      :collapsed-width="minMenuWidth"
      :collapsed="collapsed"
      :inverted="getMenuInverted"
      :show-trigger="showTrigger"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      v-if="hasSider"
    >
      <div>
        <div><layout-logo v-show="showLogo" /></div>
        <div><layout-menu mode="vertical" /></div>
      </div>
    </n-layout-sider>
    <n-layout
      class="ars-layout-main"
      :class="{
        'ars-layout-main-horizontal-fixed': !hasSider && header.fixed,
        'ars-layout-main-hideheader': !showHeader,
      }"
      :native-scrollbar="false"
    >
      <n-layout-header class="ars-layout-header" :native-scrollbar="false" v-if="hasSider">
        <layout-page-header v-model:collapsed="collapsed" v-model:isRouterAlive="isRouterAlive" />
      </n-layout-header>
      <n-layout-content
        class="ars-layout-content"
        :class="{
          'ars-layout-content-vertical-fixed': hasSider && header.fixed,
        }"
        bordered
        :native-scrollbar="false"
      >
        <div class="ars-layout-content-main">
          <tags-view v-model:isRouterAlive="isRouterAlive" v-if="showMultiTabs" />
          <div
            :class="{
              'ars-layout-content-main-notabs': !showMultiTabs,
              'ars-layout-content-main-tabs': showMultiTabs && multiTabs.fixed,
            }"
          >
            <layout-main />
          </div>
        </div>
      </n-layout-content>
      <n-layout-footer v-show="showFooter" bordered>
        <div class="ars-layout-footer">Copyright &copy; 2023 Airuisi</div>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'

const { getProjectSetting, getDesignSetting } = useApp()
const { header, menu, multiTabs, navMode, showHeader, showLogo, showMultiTabs, showFooter } =
  unref(getProjectSetting)

/* 布局位置 */
// 头部固定
const headerFixed = computed(() => {
  const { fixed } = unref(header)
  return fixed ? 'static' : 'absolute'
})
// 菜单固定
const menuFixed = computed(() => {
  const { fixed } = unref(menu)
  return fixed ? 'static' : 'absolute'
})
// 判断布局模式
const hasSider = computed(() => {
  return navMode === 'vertical' || navMode === 'vertical-min'
})

const fixed = hasSider ? menuFixed : headerFixed

// 主题
const inverted = computed(() => {
  const { appDarkTheme } = unref(getDesignSetting)
  return appDarkTheme
})
provide('inverted', inverted)
// 导航风格
const getMenuInverted = computed(() => {
  return inverted.value ? false : true
})
// 展开收缩菜单
const collapsed = ref(menu.collapsed)
provide('collapsed', collapsed)
// 刷新组件
const isRouterAlive = ref(true)
provide('isRouterAlive', isRouterAlive)
// 收缩后宽度
const minMenuWidth = unref(menu.minMenuWidth)
// 宽度
const menuWidth = unref(menu.menuWidth)
// 菜单bar
const showTrigger = computed((): boolean | 'bar' | 'arrow-circle' => {
  const { fixed, showTrigger } = unref(menu)
  return fixed ? false : (showTrigger as 'bar' | 'arrow-circle')
})
</script>

<style scoped lang="less">
.ars-layout {
  &-header {
    @apply h-14 relative z-10;
  }
  &-main {
    &-horizontal-fixed {
      @apply w-full fixed top-14 left-0 bottom-0;
    }
    &-hideheader {
      @apply top-0;
    }
  }
  &-content {
    &-main {
      @apply mx-2.5;
      &-tabs {
        @apply pt-12;
      }
      &-notabs {
        @apply pt-0;
      }
    }
    &-vertical-fixed {
      @apply w-full;
      height: calc(100vh - 56px);
    }
  }
  &-footer {
    @apply h-12 leading-12 text-center;
  }
}
</style>
