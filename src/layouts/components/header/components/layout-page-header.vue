<template>
  <div class="ars-layout-page-header">
    <div @click="handleMenuCollapse">
      <n-icon size="20" :component="List" />
    </div>
    <div v-if="header.isReload" @click="reloadPage">
      <n-icon size="20" :component="ReloadOutline" />
    </div>
    <div>
      <layout-header-breadcrumb />
    </div>

    <div v-if="false">
      <n-icon size="20" :component="SearchOutline" />
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
    <div>
      <n-icon size="20" :component="SettingsOutline" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { List, ReloadOutline, SearchOutline, SettingsOutline } from '@vicons/ionicons5'
import { useApp } from '@/hooks/setting/useApp'
import LayoutHeaderScreenfull from '@/layouts/components/header/components/layout-header-screenfull.vue'
import LayoutHeaderMessage from '@/layouts/components/header/components/layout-header-message.vue'
import LayoutHeaderUser from '@/layouts/components/header/components/layout-header-user.vue'

const props = defineProps({
  collapsed: Boolean,
  flag: Boolean,
  inverted: Boolean,
})

// const emit = defineEmits(['update:collapsed', 'update:flag'])

const { collapsed } = toRefs(props)

const { getProjectSetting } = useApp()
const { header, menu, navMode, showLogo } = getProjectSetting.value

// 收缩/展开菜单
const handleMenuCollapse = () => {
  const handleMenuCollapse = inject('handleMenuCollapse')
  console.log(handleMenuCollapse)
  // handleMenuCollapse(!collapsed.value)
}
// 刷新页面
const reloadPage = () => {
  // emit('update:flag', false)
  // nextTick(() => {
  //   emit('update:flag', true)
  // })
}
// 项目设置
// const handleOpenSetting = () => {
//     const { openDrawer } = drawerSetting.value
//     openDrawer()
// }
</script>

<style scoped lang="less">
.ars-layout-page-header {
  @apply h-16 flex flex-row;
  & div {
    @apply z-10;
  }
}
</style>
