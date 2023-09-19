<template>
  <n-icon size="20">
    <component :is="fullscreenIcon" @click="toggleFullScreen" />
  </n-icon>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
import { ContractOutline, ExpandOutline } from '@vicons/ionicons5'
// 全屏图标
const fullscreenIcon = shallowRef(ExpandOutline)
// 全屏切换
const toggleFullScreen = () => {
  fullscreenIcon.value = screenfull.isFullscreen ? ExpandOutline : ContractOutline
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
</script>
