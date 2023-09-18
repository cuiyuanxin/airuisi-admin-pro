<template>
  <n-layout class="ars-layout" has-sider>
    <n-layout-sider
      class="ars-layout-sider"
      show-trigger="arrow-circle"
      collapse-mode="width"
      :collapsed="collapsed"
      :collapsed-width="minMenuWidth"
      :width="menuWidth"
      :native-scrollbar="false"
      :inverted="inverted"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="ars-layout-left-logo">
        <n-image width="40" preview-disabled :src="logo" />
        <span v-if="!collapsed">{{ title }}</span>
      </div>
      <div class="ars-layout-menu">
        <n-scrollbar>
          <AsideMenu v-model:collapsed="collapsed" v-model:inverted="inverted" />
        </n-scrollbar>
      </div>
    </n-layout-sider>

    <!--    <n-drawer-->
    <!--      v-model:show="showSideDrawer"-->
    <!--      :width="menuWidth"-->
    <!--      :placement="'left'"-->
    <!--      class="layout-side-drawer"-->
    <!--    >-->
    <!--      <Logo :collapsed="collapsed" />-->
    <!--      <AsideMenu @clickMenuItem="collapsed = false" />-->
    <!--    </n-drawer>-->

    <n-layout :inverted="inverted">
      <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <Header v-model:collapsed="collapsed" v-model:flag="flag" :inverted="inverted" />
      </n-layout-header>

      <n-layout-content
        class="ars-layout-content"
        :class="{ 'ars-layout-default-background': appDarkTheme === false }"
      >
        <!--        <div-->
        <!--          class="layout-content-main"-->
        <!--          :class="{-->
        <!--            'layout-content-main-fix': fixedMulti,-->
        <!--            'fluid-header': fixedHeader === 'static',-->
        <!--          }"-->
        <!--        >-->
        <!--          <TabsView v-if="isMultiTabs" v-model:collapsed="collapsed" />-->
        <!--          <div-->
        <!--            class="main-view"-->
        <!--            :class="{-->
        <!--              'main-view-fix': fixedMulti,-->
        <!--              noMultiTabs: !isMultiTabs,-->
        <!--              'mt-3': !isMultiTabs,-->
        <!--            }"-->
        <!--          >-->
        <router-view v-if="flag">
          <!--              <template #default="{ Component, route }">-->
          <!--                <transition :name="getTransitionName" mode="out-in" appear>-->
          <!--                  <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">-->
          <!--                    <component :is="Component" :key="route.fullPath" />-->
          <!--                  </keep-alive>-->
          <!--                  <component v-else :is="Component" :key="route.fullPath" />-->
          <!--                </transition>-->
          <!--              </template>-->
        </router-view>
        <!--          </div>-->
        <!--        </div>-->
      </n-layout-content>
      <!--      <n-back-top :right="100" />-->
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useApp } from '@/hooks/setting/useApp'
import { AsideMenu } from './components/Menu'
import { Header } from './components/Header'

const { getWebsiteSetting, getProjectSetting, getDesignSetting } = useApp()

// 展开收缩菜单
const collapsed = ref(false)
// 刷新组件
const flag = ref(true)
// 翻转样式
const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(getProjectSetting.value.navTheme))
})

const logo = getWebsiteSetting.value?.logo
const title = getWebsiteSetting.value?.title
// 收缩后样式
const minMenuWidth = getProjectSetting.value?.menu.minMenuWidth
// 展开后样式
const menuWidth = getProjectSetting.value?.menu.menuWidth
const appDarkTheme = getDesignSetting.value?.appDarkTheme

const fixedMenu = computed(() => {
  const { fixed } = unref(getProjectSetting.value.menu)
  return fixed ? 'absolute' : 'static'
})
const fixedHeader = computed(() => {
  const { fixed } = unref(getProjectSetting.value.header)
  return fixed ? 'absolute' : 'static'
})

const getHeaderInverted = computed(() => {
  return ['light', 'header-dark'].includes(unref(getProjectSetting.value.menu))
    ? unref(inverted)
    : !unref(inverted)
})
</script>

<style lang="less" scoped>
.ars-layout {
  @apply flex flex-row flex-auto;
  &-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
  &-left-logo {
    @apply h-16 w-full flex items-center justify-center;
    & > span {
      @apply ml-2 text-lg;
    }
  }
  &-menu {
  }
  &-content {
    @apply flex-auto;
    min-height: 100vh;
  }
  &-default-background {
    @apply bg-slate-50;
  }
}
</style>
