<template>
  <n-space vertical>
    <n-layout class="ars-layout">
      <n-layout-header>
        <div class="ars-layout-header">
          <div class="ars-layout-header-logo" :style="headerLogoWidth">
            <n-image width="40" preview-disabled :src="getWebsiteSetting.logo" />
            <span>{{ getWebsiteSetting.title }}</span>
          </div>
          <div class="ars-layout-header-breadcrumb" :style="headerBreadcrumbWidth">
            <div class="ars-layout-header-breadcrumb-left">
              <div class="pl-3">
                <n-icon size="18" :component="PersonOutline" />
              </div>
              <div>
                <n-icon size="18" :component="PersonOutline" />
              </div>
              <div>
                <n-breadcrumb>
                  <n-breadcrumb-item> 北京总行</n-breadcrumb-item>
                  <n-breadcrumb-item> 天津分行</n-breadcrumb-item>
                  <n-breadcrumb-item> 平山道支行</n-breadcrumb-item>
                </n-breadcrumb>
              </div>
            </div>
            <div class="ars-layout-header-breadcrumb-right">
              <div>
                <n-icon size="18" :component="PersonOutline" />
              </div>
              <div>
                <n-icon size="18" :component="PersonOutline" />
              </div>
              <div>
                <n-icon size="18" :component="PersonOutline" />
              </div>
              <div>
                <n-dropdown trigger="click" :options="options" @select="handleSelect">
                  <n-avatar
                    round
                    size="medium"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  />
                </n-dropdown>
              </div>
              <div class="pr-4">
                <n-icon size="18" :component="PersonOutline" />
              </div>
            </div>
          </div>
        </div>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;"> 海淀桥</n-layout-sider>
        <n-layout-content content-style="padding: 24px;"> 平山道</n-layout-content>
      </n-layout>
      <n-layout-footer>成府路</n-layout-footer>

      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div class="ars-layout-menu">
          <AsideMenu v-model:collapsed="collapsed" />
        </div>
      </n-layout-sider>
      <n-layout>
        <n-layout-header>颐和园路</n-layout-header>
        <n-layout-content content-style="padding: 24px;"> 平山道</n-layout-content>
        <n-layout-footer>成府路</n-layout-footer>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useApp } from '@/hooks/setting/useApp'
import { AsideMenu } from './components/Menu'
import { PersonOutline } from '@vicons/ionicons5'

const { getWebsiteSetting, getProjectSetting } = useApp()
const collapsed = ref(false)
const minMenuWidth = getProjectSetting.value.menu.minMenuWidth
const menuWidth = getProjectSetting.value.menu.menuWidth

const headerLogoWidth = computed(() => {
  return collapsed.value ? `width: ${minMenuWidth}px` : `width: ${menuWidth}px`
})
const headerBreadcrumbWidth = computed(() => {
  return collapsed.value
    ? `min-width: calc(100% - ${minMenuWidth}px)`
    : `min-width: calc(100% - ${menuWidth}px)`
})

const options = [
  {
    label: '滨海湾金沙，新加坡',
    key: 'marina bay sands',
    disabled: true,
  },
  {
    label: '布朗酒店，伦敦',
    key: "brown's hotel, london",
  },
  {
    label: '亚特兰蒂斯巴哈马，拿骚',
    key: 'atlantis nahamas, nassau',
  },
  {
    label: '比佛利山庄酒店，洛杉矶',
    key: 'the beverly hills hotel, los angeles',
  },
]
const handleSelect = (key: string | number) => {
  console.log(key)
}
</script>

<style lang="less" scoped>
.ars-layout {
  & {
    border: 1px solid red;
    height: 100%;
  }

  & .ars-layout-header {
    @apply h-16 flex flex-nowrap items-center;

    & > .ars-layout-header-logo {
      @apply h-16 w-full flex items-center justify-center;

      & > span {
        @apply ml-2 text-lg;
      }
    }

    & > .ars-layout-header-breadcrumb {
      @apply flex justify-between;

      & > .ars-layout-header-breadcrumb-left {
        @apply flex items-center justify-center space-x-4;
      }

      & > .ars-layout-header-breadcrumb-right {
        @apply flex items-center justify-center space-x-4;
      }
    }
  }
}
</style>
