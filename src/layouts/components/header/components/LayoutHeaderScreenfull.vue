<template>
  <n-icon size="20" @click="toggleFullScreen">
    <ExpandOutline v-if="isFullScreen" />
    <ContractOutline v-else />
  </n-icon>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'

// 全屏
const isFullScreen = ref(true)
// 全屏切换
const toggleFullScreen = () => {
  isFullScreen.value = screenfull.isFullscreen
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
</script>
