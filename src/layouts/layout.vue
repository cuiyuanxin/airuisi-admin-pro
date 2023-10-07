<template>
  <n-layout class="ars-layout" :position="fixed" :has-sider="hasSider">
    <n-layout-header
      bordered
      :inverted="getHeaderInverted"
      v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'"
    >
      <layout-header v-model:collapsed="collapsed" v-model:inverted="inverted" />
    </n-layout-header>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :native-scrollbar="false"
      :width="menuWidth"
      :collapsed-width="minMenuWidth"
      :collapsed="collapsed"
      :inverted="inverted"
      :show-trigger="showTrigger"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      v-if="navMode === 'vertical' || navMode === 'vertical-mix'"
    >
      <div>
        <div><layout-logo v-model:collapsed="collapsed" v-show="showLogo" /></div>
        <div><layout-menu v-model:collapsed="collapsed" mode="vertical" /></div>
      </div>
    </n-layout-sider>

    <n-layout
      class="ars-layout-main"
      :class="{
        'ars-layout-main-horizontal-fixed':
          (navMode === 'horizontal' || navMode === 'horizontal-mix') && header.fixed,
        'ars-layout-main-horizontal-fixed-full': !showHeader,
      }"
      :native-scrollbar="false"
      :style="mainVerticalFull"
    >
      <n-layout-header
        class="ars-layout-header"
        :native-scrollbar="false"
        v-if="navMode === 'vertical' || navMode === 'vertical-mix'"
      >
        <layout-page-header v-model:collapsed="collapsed" v-model:isRouterAlive="isRouterAlive" />
      </n-layout-header>
      <n-layout-content
        class="ars-layout-content"
        :class="{
          'ars-layout-content-vertical-fixed':
            (navMode === 'vertical' || navMode === 'vertical-mix') && header.fixed,
        }"
        bordered
        :native-scrollbar="false"
      >
        <div class="ars-layout-content-main">
          <tags-view
            v-model:collapsed="collapsed"
            v-model:isRouterAlive="isRouterAlive"
            v-if="showMultiTabs"
          />
          <div
            :class="{
              'ars-layout-content-main-notabs': !showMultiTabs,
              'ars-layout-content-main-tabs': showMultiTabs && multiTabs.fixed,
            }"
          >
            <layout-main v-model:isRouterAlive="isRouterAlive" />
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

const { getProjectSetting } = useApp()
const {
  header,
  menu,
  multiTabs,
  navMode,
  navTheme,
  showHeader,
  showLogo,
  showMultiTabs,
  showFooter,
} = unref(getProjectSetting)

// 展开收缩菜单
const collapsed = ref(menu.collapsed)

// 收缩后宽度
const minMenuWidth = unref(menu.minMenuWidth)
// 宽度
const menuWidth = unref(menu.menuWidth)

// 刷新组件
const isRouterAlive = ref(true)

const hasSider = computed(() => {
  return navMode === 'vertical' || navMode === 'vertical-min'
})

const mainVerticalFull = computed(() => {
  if (hasSider) {
    return collapsed
      ? `width: calc(100% - ${menuWidth}px)`
      : `width: calc(100% - ${minMenuWidth}px)`
  }
  return ''
})

const showTrigger = computed((): boolean | 'bar' | 'arrow-circle' => {
  const { fixed, showTrigger } = unref(menu)
  return fixed ? false : (showTrigger as 'bar' | 'arrow-circle')
})

// 布局位置
const headerFixed = computed(() => {
  const { fixed } = unref(header)
  return fixed ? 'static' : 'absolute'
})

const menuFixed = computed(() => {
  const { fixed } = unref(menu)
  return fixed ? 'static' : 'absolute'
})

const fixed = hasSider ? menuFixed : headerFixed

const inverted = computed(() => {
  return ['dark'].includes(unref(navTheme))
})

const getHeaderInverted = computed(() => {
  return ['light', 'dark'].includes(unref(navTheme)) ? unref(inverted) : !unref(inverted)
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
      &-full {
        @apply top-0;
      }
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
