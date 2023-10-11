<template>
  <n-layout class="ars-layout" :position="menuFixed" :has-sider="hasSider">
    <n-layout-header
      class="ars-layout-header"
      bordered
      :inverted="inverted"
      :position="headerFixed"
      v-if="!hasSider"
    >
      <layout-header />
    </n-layout-header>
    <!--    <n-layout-sider-->
    <!--      bordered-->
    <!--      collapse-mode="width"-->
    <!--      :native-scrollbar="false"-->
    <!--      :width="menuWidth"-->
    <!--      :collapsed-width="minMenuWidth"-->
    <!--      :collapsed="collapsed"-->
    <!--      :inverted="getMenuInverted"-->
    <!--      :show-trigger="showTrigger"-->
    <!--      @collapse="collapsed = true"-->
    <!--      @expand="collapsed = false"-->
    <!--      v-if="hasSider"-->
    <!--    >-->
    <!--      <div>-->
    <!--        <div><layout-logo v-show="showLogo" /></div>-->
    <!--        <div><layout-menu mode="vertical" /></div>-->
    <!--      </div>-->
    <!--    </n-layout-sider>-->
    <n-layout class="ars-layout-main" :native-scrollbar="false">
      <!--      <n-layout-header-->
      <!--        class="ars-layout-header"-->
      <!--        :position="headerFixed"-->
      <!--        :native-scrollbar="false"-->
      <!--        v-if="hasSider"-->
      <!--      >-->
      <!--        <layout-page-header v-model:collapsed="collapsed" v-model:isRouterAlive="isRouterAlive" />-->
      <!--      </n-layout-header>-->
      <!--      <n-layout-->
      <!--        class="ars-layout-content-layout"-->
      <!--        :class="{-->
      <!--          'ars-layout-main-hideheader': !showHeader,-->
      <!--          'ars-layout-content-main-notabs': !showMultiTabs,-->
      <!--          'ars-layout-content-main-tabs': showMultiTabs && multiTabs.fixed,-->
      <!--        }"-->
      <!--      >-->
      <!--        -->
      <!--      </n-layout>-->
      <tags-view v-model:isRouterAlive="isRouterAlive" v-if="showMultiTabs" />
      <n-layout-content class="ars-layout-content" bordered :native-scrollbar="false">
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
const { header, menu, multiTabs, showHeader, showLogo, showMultiTabs, showFooter } =
  unref(getProjectSetting)

/* 布局位置 */
// 判断布局模式
const hasSider = computed(() => {
  const { navMode } = toRefs(getProjectSetting.value)
  return navMode.value === 'vertical' || navMode.value === 'vertical-min'
})
// 头部固定
const headerFixed = computed(() => {
  const { fixed } = toRefs(header)
  return fixed.value ? 'absolute' : 'static'
})
// 菜单固定
const menuFixed = computed(() => {
  const { fixed } = toRefs(menu)
  return hasSider.value && fixed.value ? 'absolute' : 'static'
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
    //@apply h-14 relative z-10;
    @apply h-14 z-1;
  }
  &-main {
    @apply top-14;
    //&-horizontal-fixed {
    //  @apply w-full fixed top-14 left-0 bottom-0;
    //}
    //&-hideheader {
    //  @apply top-0;
    //}
  }
  &-content-layout {
    //@apply top-14;
  }
  &-content {
    //@apply mt-14;
    &-main {
      //  @apply w-full mx-2.5 relative;
      //  &-tabs {
      //    @apply pt-12;
      //  }
      &-notabs {
        //    @apply pt-0;
      }
    }
    //&-vertical-fixed {
    //  @apply w-full;
    //  //height: calc(100vh - 56px);
    //}
  }
  &-footer {
    @apply h-12 leading-12 text-center;
  }
}
</style>
