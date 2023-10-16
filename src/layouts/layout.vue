<template>
  <n-layout class="ars-layout" position="absolute" has-sider>
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
    <n-layout>
      <n-layout-header class="ars-layout-header" :position="headerFixed">
        <layout-page-header
          v-if="hasSider"
          v-model:collapsed="collapsed"
          v-model:isRouterAlive="isRouterAlive"
        />
        <layout-header v-if="!hasSider" />
      </n-layout-header>

      <n-layout-content
        class="ars-layout-content"
        :class="{ 'ars-layout-content-fix': header.fixed }"
      >
        <tags-view v-model:isRouterAlive="isRouterAlive" v-if="showMultiTabs" />
        <div class="ars-layout-content-main">
          <div>
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
const { header, menu, multiTabs, showHeader, showLogo, showMultiTabs, showFooter } = toRefs(
  getProjectSetting.value,
)

/* 布局位置 */
// 判断布局模式
const hasSider = computed(() => {
  const { navMode } = toRefs(getProjectSetting.value)
  return navMode.value === 'vertical' || navMode.value === 'vertical-min'
})
// 头部固定
const headerFixed = computed(() => {
  const { fixed } = toRefs(header.value)
  return fixed.value ? 'absolute' : 'static'
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
  &-header {
    @apply h-14 z-10;
  }
  &-content {
    &-fix {
      @apply mt-14;
    }
  }
  &-footer {
    @apply h-12 leading-12 text-center;
  }
}
</style>
