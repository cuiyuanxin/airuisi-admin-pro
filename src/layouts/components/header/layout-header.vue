<template>
  <div class="ars-layout-header">
    <layout-logo
      v-model:collapsed="collapsed"
      v-show="showLogo"
      :style="{ width: `${menu.menuWidth}px` }"
      v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'"
    />
    <layout-menu
      v-model:inverted="inverted"
      mode="horizontal"
      v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'"
    />
    <layout-page-header v-model:collapsed="collapsed" />
  </div>
  <!--项目配置-->
  <!--  <ArsSetting ref="drawerSetting" />-->
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'
// import ArsSetting from './components/ArsSetting.vue'
import LayoutLogo from '@/layouts/components/logo/layout-logo.vue'
import LayoutMenu from '@/layouts/components/menu/layout-menu.vue'

const props = defineProps({
  collapsed: Boolean,
  flag: Boolean,
  inverted: Boolean,
})
const emit = defineEmits(['update:collapsed', 'update:flag'])

const { collapsed, inverted } = toRefs(props)

provide('handleMenuCollapse', (val) => {
  emit('update:collapsed', val)
})
// 项目设置
// const drawerSetting = ref<InstanceType<typeof ArsSetting>>()

const { getProjectSetting } = useApp()
const { menu, navMode, showLogo } = getProjectSetting.value
</script>

<style lang="less" scoped>
.ars-layout-header {
  @apply h-16 flex flex-row;
  //  &-breadcrumb {
  //    @apply h-16 w-full flex justify-between z-10;
  //
  //    &-left,
  //    &-right {
  //      @apply h-16 flex space-x-6;
  //      & > div {
  //        @apply h-16 flex items-center justify-center;
  //      }
  //    }
  //&-left-menu {
  //  @apply h-16 flex items-center justify-center;
  //}
  //  }
}
</style>
