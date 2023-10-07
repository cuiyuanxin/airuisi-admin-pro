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
  <layout-header-setting ref="drawerSetting" />
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'

const props = defineProps({
  collapsed: Boolean,
  isRouterAlive: Boolean,
  inverted: Boolean,
})

const emit = defineEmits(['update:collapsed', 'update:isRouterAlive'])

const { collapsed } = toRefs(props)

const { getProjectSetting } = useApp()
const { header, menu, navMode } = unref(getProjectSetting)

// 收缩后宽度
const minMenuWidth = computed(() => {
  const { minMenuWidth } = menu
  return `${minMenuWidth}px`
})
// 宽度
const menuWidth = computed(() => {
  const { menuWidth } = menu
  return `${menuWidth}px`
})

if (navMode === 'horizontal' || navMode === 'horizontal-mix') {
  header.isMenu = false
  header.isReload = false
  header.isBreadcrumb = false
}

// 项目设置
const drawerSetting = ref<any>()

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
  const { openDrawer } = drawerSetting.value
  openDrawer()
}

// watch(
//   () => props.collapsed,
//   (newVal) => {
//     collapsed.value = newVal
//   },
// )
</script>

<style scoped lang="less">
.ars-layout-page-header {
  @apply w-full h-14 flex  items-center justify-items-center;
  &-vertical-fixed {
    @apply fixed top-0 bottom-0 z-10;
    left: v-bind(menuWidth);
    width: calc(100% - v-bind(menuWidth));
  }
  &-vertical-min-fixed {
    left: v-bind(minMenuWidth);
    width: calc(100% - v-bind(minMenuWidth));
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
