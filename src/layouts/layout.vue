<template>
  <n-layout class="ars-layout" :position="fixed">
    <n-layout>
      <n-layout-header bordered>
        <layout-header v-model:collapsed="collapsed" />
      </n-layout-header>
      <n-layout
        class="ars-layout-main"
        :class="{
          'ars-layout-main-fixed': header.fixed,
          'ars-layout-main-fixed-full': !showHeader,
        }"
      >
        <n-layout-content class="ars-layout-content" bordered>
          <div class="ars-layout-content-main">
            <tags-view v-model:collapsed="collapsed" />
            <div>
              <router-view v-if="flag" />
            </div>
          </div>
        </n-layout-content>
        <n-layout-footer v-show="showFooter" bordered>
          <div class="ars-layout-footer">Copyright &copy; 2023 Airuisi</div>
        </n-layout-footer>

        <n-back-top :bottom="50" />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'

const { getProjectSetting } = useApp()
const { header, menu, navMode, navTheme, showLogo, showHeader, showFooter } =
  getProjectSetting.value

// 展开收缩菜单
const collapsed = ref(menu.collapsed)
// 刷新组件
const flag = ref(true)
// header.fixed

// 布局位置
const fixed = computed(() => {
  const { fixed } = unref(header)
  return fixed ? 'static' : 'absolute'
})
</script>

<style scoped lang="less">
.ars-layout {
  @apply flex flex-row flex-auto;
  &-main {
    &-fixed {
      @apply w-full fixed top-16 left-0 bottom-0;
      &-full {
        @apply top-0;
      }
    }
  }
  &-content {
    &-main {
      @apply mx-2.5;
    }
  }
  &-footer {
    @apply h-12 leading-12 text-center;
  }
}
</style>
