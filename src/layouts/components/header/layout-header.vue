<template>
  <div class="ars-layout-header" v-if="showHeader">
    <n-grid :x-gap="24">
      <n-grid-item span="20">
        <div class="ars-layout-header-left">
          <layout-logo
            v-model:collapsed="collapsed"
            v-show="showLogo"
            :style="{ width: `${menu.menuWidth}px` }"
            v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'"
          />
          <n-scrollbar x-scrollable v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'">
            <layout-menu v-model:inverted="inverted" mode="horizontal" />
          </n-scrollbar>
        </div>
      </n-grid-item>
      <n-grid-item span="4">
        <div class="ars-layout-header-right">
          <layout-page-header v-model:collapsed="collapsed" />
        </div>
      </n-grid-item>
    </n-grid>
  </div>
  <!--项目配置-->
  <!--  <ArsSetting ref="drawerSetting" />-->
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp' // import ArsSetting from './components/ArsSetting.vue'
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
const { menu, navMode, showHeader, showLogo } = getProjectSetting.value
</script>

<style lang="less" scoped>
.ars-layout-header {
  @apply w-full h-16;
  &-left,
  &-right {
    @apply h-16 flex;
  }
  &-right {
    @apply h-16 flex justify-end;
  }
}
:deep(.n-scrollbar-content) {
  width: auto !important;
}
</style>
