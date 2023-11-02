<template>
  <div class="ars-layout-left-logo">
    <n-image width="40" preview-disabled :src="logo" />
    <span v-if="isTitle">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'

const collapsed = inject('collapsed', false)

const { getWebsiteSetting, getProjectSetting } = useApp()
const { logo, title } = unref(getWebsiteSetting)

const isTitle = computed(() => {
  const { navMode } = toRefs(getProjectSetting.value)
  if (navMode.value !== 'horizontal-mix' && collapsed.value) {
    return false
  }

  return true
})
</script>

<style lang="less" scoped>
.ars-layout-left-logo {
  @apply h-14 w-full flex items-center justify-center;
  & > span {
    @apply ml-2 text-lg whitespace-nowrap;
  }
}
</style>
