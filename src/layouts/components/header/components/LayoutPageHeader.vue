<template>
  <div
    class="ars-layout-page-header"
    :class="{
      'ars-layout-page-header-vertical-fixed':
        (navMode === 'vertical' || navMode === 'vertical-mix') && header.fixed,
      'ars-layout-page-header-vertical-min-fixed':
        (navMode === 'vertical' || navMode === 'vertical-mix') && collapsed && header.fixed,
    }"
  >
    <div
      class="ars-layout-page-header-left"
      v-if="navMode === 'vertical' || navMode === 'vertical-mix'"
    >
      <n-space justify="center" align="center">
        <div v-if="header.isMenu" @click="handleMenuCollapse">
          <n-icon size="20">
            <List />
          </n-icon>
        </div>
        <div v-if="header.isReload" @click="reloadPage">
          <n-icon size="20">
            <ReloadOutline />
          </n-icon>
        </div>
        <div v-if="header.isBreadcrumb">
          <layout-header-breadcrumb />
        </div>
      </n-space>
    </div>

    <div class="ars-layout-page-header-right">
      <n-space justify="center" align="center">
        <div v-if="false">
          <n-icon size="20">
            <SearchOutline />
          </n-icon>
        </div>
        <div>
          <layout-header-screenfull />
        </div>
        <div>
          <layout-header-languages />
        </div>
        <div>
          <layout-header-message />
        </div>
        <div>
          <layout-header-user />
        </div>
        <div @click="handleOpenSetting">
          <n-icon size="20">
            <SettingsOutline />
          </n-icon>
        </div>
      </n-space>
    </div>
  </div>
  <!--项目配置-->
  <layout-header-setting ref="drawerSettingRef" />
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'

const props = defineProps({
  collapsed: Boolean,
  isRouterAlive: Boolean,
})
// 数据更新监控
const emit = defineEmits(['update:collapsed', 'update:isRouterAlive'])
// 收缩菜单
const { collapsed } = toRefs(props)
// 项目配置
const { getProjectSetting } = useApp()
const { header, menu, navMode } = toRefs(getProjectSetting.value)
// 顶栏布局下隐藏工具
if (navMode.value === 'horizontal' || navMode.value === 'horizontal-mix') {
  header.value.isMenu = false
  header.value.isReload = false
  header.value.isBreadcrumb = false
}
// 收缩后宽度
const minMenuWidth = computed(() => {
  const { minMenuWidth } = toRefs(menu.value)
  return `${minMenuWidth.value}px`
})
// 宽度
const menuWidth = computed(() => {
  const { menuWidth } = toRefs(menu.value)
  return `${menuWidth.value}px`
})
// 项目设置
const drawerSettingRef = ref<any>()

// 收缩/展开菜单
const handleMenuCollapse = () => {
  emit('update:collapsed', !collapsed.value)
}
// 刷新页面
const reloadPage = () => {
  emit('update:isRouterAlive', false)
  nextTick(() => {
    emit('update:isRouterAlive', true)
  })
}
// 项目设置
const handleOpenSetting = () => {
  const { openDrawer } = drawerSettingRef.value
  openDrawer()
}
</script>

<style scoped lang="less">
.ars-layout-page-header {
  @apply w-full h-14 flex items-center justify-items-center;
  transition: left 0.3s;
  &-vertical-fixed {
    //@apply fixed top-0 bottom-0 z-10;
    //left: v-bind(menuWidth);
    //width: calc(100% - v-bind(menuWidth));
  }
  &-vertical-min-fixed {
    //left: v-bind(minMenuWidth);
    //width: calc(100% - v-bind(minMenuWidth));
  }
  &-left,
  &-right {
    @apply h-14 flex flex-1 items-center px-3;
  }
  &-right {
    @apply justify-end;
  }
}
</style>
