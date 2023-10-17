<template>
  <n-layout class="ars-layout" :position="positionFixed" :has-sider="hasSider">
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
    <n-layout-header class="ars-layout-header" v-if="showHeader && navMode === 'horizontal-mix'">
      <layout-header />
    </n-layout-header>
    <n-layout
      class="ars-layout-child"
      :class="{ 'ars-layout-child-horizontal-mix-fix': navMode === 'horizontal-mix' }"
      :position="horizontalMixPositionFixed"
      :has-sider="navMode === 'horizontal-mix'"
    >
      <n-layout-header
        class="ars-layout-header"
        :position="headerFixed"
        v-if="navMode !== 'horizontal-mix' && showHeader"
      >
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
        v-if="navMode === 'horizontal-mix'"
      >
        <layout-menu mode="vertical" />
      </n-layout-sider>

      <n-layout-content
        class="ars-layout-content"
        :class="{ 'ars-layout-content-fix': navMode !== 'horizontal-mix' && header.fixed }"
      >
        <tags-view v-model:isRouterAlive="isRouterAlive" v-if="showMultiTabs" />
        <div
          class="ars-layout-content-main"
          :class="{ 'ars-layout-content-main-fix': multiTabs.fixed }"
        >
          <div>
            <layout-main />
          </div>
        </div>
      </n-layout-content>
      <n-layout-footer v-show="showFooter" bordered v-if="navMode !== 'horizontal-mix'">
        <div class="ars-layout-footer">Copyright &copy; 2023 Airuisi</div>
      </n-layout-footer>
    </n-layout>
    <n-layout-footer
      v-show="showFooter"
      bordered
      position="absolute"
      v-if="navMode === 'horizontal-mix'"
    >
      <div class="ars-layout-footer">Copyright &copy; 2023 Airuisi</div>
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'

const { getProjectSetting, getDesignSetting } = useApp()
const { header, menu, multiTabs, showHeader, showLogo, showMultiTabs, showFooter, navMode } =
  toRefs(getProjectSetting.value)

/* 布局位置 */
// 判断布局模式
const hasSider = computed(() => {
  return navMode.value === 'vertical' || navMode.value === 'vertical-min'
})
// 头部固定
const headerFixed = computed(() => {
  const { fixed } = toRefs(header.value)
  return fixed.value ? 'absolute' : 'static'
})
const positionFixed = computed(() => {
  return navMode.value !== 'horizontal-mix' ? 'absolute' : 'static'
})
const horizontalMixPositionFixed = computed(() => {
  return navMode.value === 'horizontal-mix' ? 'absolute' : 'static'
})
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
const collapsed = ref(menu.value.collapsed)
provide('collapsed', collapsed)
// 刷新组件
const isRouterAlive = ref(true)
provide('isRouterAlive', isRouterAlive)
// 收缩后宽度
const minMenuWidth = ref(menu.value.minMenuWidth)
// 宽度
const menuWidth = ref(menu.value.menuWidth)
// 菜单bar
const showTrigger = computed((): boolean | 'bar' | 'arrow-circle' => {
  const { fixed, showTrigger } = toRefs(menu.value)
  return fixed.value ? false : (showTrigger.value as 'bar' | 'arrow-circle')
})
</script>
<style scoped lang="less">
.ars-layout {
  @apply w-full min-h-screen;
  &-header {
    @apply h-14 z-10;
  }
  &-child {
    @apply w-full h-full;
    &-horizontal-mix-fix {
      top: 3.5rem !important;
    }
  }
  &-content {
    &-fix {
      @apply mt-14;
    }
    &-main {
      &-fix {
        @apply mt-10;
      }
    }
  }
  &-footer {
    @apply h-12 leading-12 text-center;
  }
}
</style>
