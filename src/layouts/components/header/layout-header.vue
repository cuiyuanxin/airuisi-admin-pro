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
          <div class="ars-layout-header-left-horizontal-menu" :style="horizontalMenu">
            <div class="px-1" @click="handleScrollbar('left')">
              <n-icon size="22" :component="ChevronBackOutline" />
            </div>
            <n-scrollbar
              ref="scrollbar"
              x-scrollable
              v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'"
            >
              <layout-menu v-model:inverted="inverted" mode="horizontal" />
            </n-scrollbar>
            <div class="px-1" @click="handleScrollbar('right')">
              <n-icon size="22" :component="ChevronForwardOutline" />
            </div>
          </div>
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
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5'

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

// 控制菜单宽度
const horizontalMenu = computed(() => {
  const { menuWidth } = menu
  return showLogo ? `width: calc(100% - ${menuWidth}px)` : ''
})

// 控制菜单滚动条
const scrollbar: any = ref(null)
const left = ref(0)
const isScrollToLeft = ref(false)
const isScrollToRight = ref(false)
const handleScrollbar = (position: string) => {
  const scrollLeft = scrollbar.value.scrollbarInstRef.containerRef.scrollLeft
  const scrollWidth = scrollbar.value.scrollbarInstRef.containerRef.scrollWidth
  const clientWidth = scrollbar.value.scrollbarInstRef.containerRef.clientWidth

  const isScroll = ref(false)

  // 判断是否滚动到左头
  isScrollToLeft.value = scrollLeft === 0
  // 判断是否滚动到右头
  isScrollToRight.value = scrollLeft + clientWidth === scrollWidth

  if (position === 'right' && !isScrollToRight.value) {
    left.value += 100
    isScroll.value = true
  }
  if (position === 'left' && !isScrollToLeft.value) {
    left.value -= 100
    isScroll.value = true
  }

  if (isScroll.value) {
    scrollbar.value.scrollTo({ left: left.value, behavior: 'smooth' })
  }
}
</script>

<style lang="less" scoped>
.ars-layout-header {
  @apply w-full h-16;
  &-left,
  &-right {
    @apply h-16 flex;
  }
  &-left {
    &-horizontal-menu {
      @apply w-full flex items-center justify-center;
    }
  }
  &-right {
    @apply justify-end;
  }
}
:deep(.n-scrollbar-content) {
  width: auto !important;
}
</style>
