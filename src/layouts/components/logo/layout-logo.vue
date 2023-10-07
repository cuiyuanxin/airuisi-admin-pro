<template>
  <div class="ars-layout-left-logo">
    <n-image width="40" preview-disabled :src="logo" />
    <span v-show="!collapsed">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'

const props = defineProps({
  collapsed: Boolean,
})

const { collapsed } = toRefs(props)

const { getWebsiteSetting } = useApp()
const { logo, title } = unref(getWebsiteSetting)
</script>

<style lang="less" scoped>
.ars-layout-left-logo {
  @apply h-14 w-full flex items-center justify-center;
  & > span {
    @apply ml-2 text-lg;
  }
}
</style>
