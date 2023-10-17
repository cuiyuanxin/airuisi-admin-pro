<template>
  <div class="ars-layout-page-header">
    <div
      class="ars-layout-page-header-left"
      v-if="navMode === 'vertical' || navMode === 'vertical-mix' || navMode === 'horizontal-mix'"
    >
      <n-space justify="center" align="center">
        <div class="ars-space-item" v-if="header.isMenu" @click="handleMenuCollapse">
          <n-icon size="20">
            <List />
          </n-icon>
        </div>
        <div class="ars-space-item" v-if="header.isReload" @click="reloadPage">
          <n-icon size="20">
            <ReloadOutline />
          </n-icon>
        </div>
        <div class="ars-space-item" v-if="header.isBreadcrumb">
          <layout-header-breadcrumb />
        </div>
      </n-space>
    </div>

    <div class="ars-layout-page-header-right">
      <n-space justify="center" align="center">
        <div class="ars-space-item" v-if="false">
          <n-icon size="20">
            <SearchOutline />
          </n-icon>
        </div>
        <div class="ars-space-item">
          <layout-header-screenfull />
        </div>
        <div class="ars-space-item">
          <layout-header-languages />
        </div>
        <div class="ars-space-item">
          <layout-header-message />
        </div>
        <div class="ars-space-item">
          <layout-header-user />
        </div>
        <div class="ars-space-item" @click="handleOpenSetting">
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
const { header, navMode } = toRefs(getProjectSetting.value)
// 顶栏布局下隐藏工具
if (navMode.value === 'horizontal') {
  header.value.isMenu = false
  header.value.isReload = false
  header.value.isBreadcrumb = false
}
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

  & .ars-space-item {
    @apply h-14 flex items-center;
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
