<template>
  <div class="ars-layout-header">
    <ArsLogo
      v-model:collapsed="collapsed"
      :style="{ width: `${menu.menuWidth}px` }"
      v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'"
    />
    <div class="ars-layout-header-breadcrumb">
      <div
        class="ars-layout-header-breadcrumb-left-menu"
        v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'"
      >
        <ArsMenu v-model:collapsed="collapsed" v-model:inverted="inverted" />
      </div>
      <div class="ars-layout-header-breadcrumb-left" v-else>
        <div class="pl-3" @click="handleMenuCollapse">
          <n-icon size="20" :component="List" />
        </div>
        <div v-if="header.isReload" @click="reloadPage">
          <n-icon size="20" :component="ReloadOutline" />
        </div>
        <div>
          <ArsBreadcrumb />
        </div>
      </div>
      <div class="ars-layout-header-breadcrumb-right">
        <div v-if="false">
          <n-icon size="20" :component="SearchOutline" />
        </div>
        <div>
          <ArsScreenfull />
        </div>
        <div>
          <ArsLanguages />
        </div>
        <div>
          <ArsMessage />
        </div>
        <div>
          <ArsUser />
        </div>
        <div class="pr-8">
          <n-icon size="20" :component="SettingsOutline" @click="handleOpenSetting" />
        </div>
      </div>
    </div>
  </div>
  <!--项目配置-->
  <ArsSetting ref="drawerSetting" />
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'
import ArsSetting from './components/ArsSetting.vue'
import { List, ReloadOutline, SearchOutline, SettingsOutline } from '@vicons/ionicons5'

const props = defineProps({
  collapsed: Boolean,
  flag: Boolean,
  inverted: Boolean,
})
const emit = defineEmits(['update:collapsed', 'update:flag'])

const { collapsed, inverted } = toRefs(props)
// 项目设置
const drawerSetting = ref<InstanceType<typeof ArsSetting>>()

const { getProjectSetting } = useApp()
const { header, menu, navMode } = getProjectSetting.value

// 收缩/展开菜单
const handleMenuCollapse = () => {
  emit('update:collapsed', !collapsed.value)
}
// 刷新页面
const reloadPage = () => {
  emit('update:flag', false)
  nextTick(() => {
    emit('update:flag', true)
  })
}

const handleOpenSetting = () => {
  const { openDrawer } = drawerSetting.value
  openDrawer()
}
</script>

<style lang="less" scoped>
.ars-layout-header {
  @apply h-16 flex flex-row;
  &-breadcrumb {
    @apply h-16 w-full flex justify-between z-10;

    &-left,
    &-right {
      @apply h-16 flex space-x-6;
      & > div {
        @apply h-16 flex items-center justify-center;
      }
    }
    &-left-menu {
      @apply h-16 flex items-center justify-center;
    }
  }
}
</style>
