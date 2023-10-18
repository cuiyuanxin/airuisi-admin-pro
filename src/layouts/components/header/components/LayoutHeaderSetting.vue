<template>
  <n-drawer v-model:show="isDrawer" width="280" placement="right">
    <n-drawer-content title="项目配置" :native-scrollbar="false" closable>
      <div class="ars-drawer">
        <n-divider title-placement="center">主题</n-divider>

        <div class="ars-drawer-setting-item dark-switch">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-switch v-model:value="appDarkTheme" class="dark-theme-switch">
                <template #checked>
                  <n-icon size="14" color="#ffd93b">
                    <SunnySharp />
                  </n-icon>
                </template>
                <template #unchecked>
                  <n-icon size="14" color="#ffd93b">
                    <Moon />
                  </n-icon>
                </template>
              </n-switch>
            </template>
            <span>{{ appDarkTheme ? '深' : '浅' }}色主题</span>
          </n-tooltip>
        </div>

        <n-divider title-placement="center">系统配色</n-divider>

        <div class="ars-drawer-setting-item align-items-top">
          <span
            class="theme-item"
            v-for="(item, index) in appThemeList"
            :key="index"
            :style="{ 'background-color': item }"
            @click="togTheme(item)"
          >
            <n-icon size="12" v-if="item === appTheme">
              <CheckOutlined />
            </n-icon>
          </span>
        </div>

        <n-divider title-placement="center">导航栏模式</n-divider>
        <div class="ars-drawer-setting-item align-items-top">
          <div class="align-items-top ars-drawer-setting-item-style">
            <n-grid x-gap="10" y-gap="10" :cols="2">
              <n-gi>
                <div class="light-green">1</div>
              </n-gi>
              <n-gi>
                <div class="green">2</div>
              </n-gi>
              <n-gi>
                <div class="light-green">3</div>
              </n-gi>
              <n-gi>
                <div class="green">4</div>
              </n-gi>
            </n-grid>
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="@/assets/images/nav-vertical.svg"
                  @click="togNavMode('vertical')"
                  alt="左侧菜单模式"
                />
              </template>
              <span>左侧菜单模式</span>
            </n-tooltip>
            <n-icon-wrapper :size="18" :border-radius="10" v-show="navMode === 'vertical'">
              <n-icon :size="18">
                <Checkmark16Filled />
              </n-icon>
            </n-icon-wrapper>
          </div>
          <div class="ars-drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="@/assets/images/nav-horizontal.svg"
                  alt="顶部菜单模式"
                  @click="togNavMode('horizontal')"
                />
              </template>
              <span>顶部菜单模式</span>
            </n-tooltip>
            <n-icon-wrapper :size="18" :border-radius="10" v-show="navMode === 'horizontal'">
              <n-icon :size="18">
                <Checkmark16Filled />
              </n-icon>
            </n-icon-wrapper>
          </div>
          <div class="ars-drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="@/assets/images/nav-horizontal-mix.svg"
                  @click="togNavMode('horizontal-mix')"
                  alt="顶部菜单混合模式"
                />
              </template>
              <span>顶部菜单混合模式</span>
            </n-tooltip>
            <n-icon-wrapper :size="18" :border-radius="10" v-show="navMode === 'horizontal-mix'">
              <n-icon :size="18">
                <Checkmark16Filled />
              </n-icon>
            </n-icon-wrapper>
          </div>
        </div>

        <!--        <n-divider title-placement="center">导航栏风格</n-divider>-->

        <!--        <div class="ars-drawer-setting-item align-items-top">-->
        <!--          <div class="ars-drawer-setting-item-style align-items-top">-->
        <!--            <n-tooltip placement="top">-->
        <!--              <template #trigger>-->
        <!--                <img-->
        <!--                  src="~@/assets/images/nav-theme-dark.svg"-->
        <!--                  alt="暗色侧边栏"-->
        <!--                  @click="togNavTheme('dark')"-->
        <!--                />-->
        <!--              </template>-->
        <!--              <span>暗色侧边栏</span>-->
        <!--            </n-tooltip>-->
        <!--            <n-badge dot color="#19be6b" v-if="settingStore.navTheme === 'dark'" />-->
        <!--          </div>-->

        <!--          <div class="ars-drawer-setting-item-style">-->
        <!--            <n-tooltip placement="top">-->
        <!--              <template #trigger>-->
        <!--                <img-->
        <!--                  src="~@/assets/images/nav-theme-light.svg"-->
        <!--                  alt="白色侧边栏"-->
        <!--                  @click="togNavTheme('light')"-->
        <!--                />-->
        <!--              </template>-->
        <!--              <span>白色侧边栏</span>-->
        <!--            </n-tooltip>-->
        <!--            <n-badge dot color="#19be6b" v-if="settingStore.navTheme === 'light'" />-->
        <!--          </div>-->

        <!--          <div class="ars-drawer-setting-item-style">-->
        <!--            <n-tooltip placement="top">-->
        <!--              <template #trigger>-->
        <!--                <img-->
        <!--                  src="~@/assets/images/header-theme-dark.svg"-->
        <!--                  @click="togNavTheme('header-dark')"-->
        <!--                  alt="暗色顶栏"-->
        <!--                />-->
        <!--              </template>-->
        <!--              <span>暗色顶栏</span>-->
        <!--            </n-tooltip>-->
        <!--            <n-badge dot color="#19be6b" v-if="settingStore.navTheme === 'header-dark'" />-->
        <!--          </div>-->
        <!--                </div>-->
        <!--        <n-divider title-placement="center">界面功能</n-divider>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">分割菜单</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch-->
        <!--              :disabled="settingStore.navMode !== 'horizontal-mix'"-->
        <!--              v-model:value="settingStore.menuSetting.mixMenu"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">固定顶栏</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.headerSetting.fixed" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">-->
        <!--            固定侧边栏-->
        <!--          </div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.menuSetting.fixed" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">固定多页签</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.multiTabsSetting.fixed" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <n-divider title-placement="center">界面显示</n-divider>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">显示重载页面按钮</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.headerSetting.isReload" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">显示面包屑导航</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.crumbsSetting.show" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">显示面包屑显示图标</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.crumbsSetting.showIcon" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">显示多页签</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.multiTabsSetting.show" />-->
        <!--          </div>-->
        <!--        </div>-->
        <!--1.15废弃，没啥用，占用操作空间-->
        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title"> 显示页脚 </div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.showFooter" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <n-divider title-placement="center">动画</n-divider>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">禁用动画</div>-->
        <!--          <div class="ars-drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.isPageAnimate" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <div class="ars-drawer-setting-item-title">动画类型</div>-->
        <!--          <div class="ars-drawer-setting-item-select">-->
        <!--            <n-select v-model:value="settingStore.pageAnimateType" :options="animateOptions" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="ars-drawer-setting-item">-->
        <!--          <n-alert type="warning" :showIcon="false">-->
        <!--            <p>{{ alertText }}</p>-->
        <!--          </n-alert>-->
        <!--        </div>-->
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApp } from '@/store/modules/app' // import { useProjectSettingStore } from '@/store/modules/projectSetting'
// import { useProjectSettingStore } from '@/store/modules/projectSetting'
// import { useDesignSettingStore } from '@/store/modules/designSetting'
// import { darkTheme } from 'naive-ui'
// import { animates as animateOptions } from '@/settings/animateSetting'

const isDrawer = ref(false)

const useAppStore = useApp()

const { designSetting, projectSetting } = useAppStore

const { appDarkTheme, appThemeList, appTheme } = toRefs(designSetting)
const { navMode } = toRefs(projectSetting)

// 展开抽屉
const openDrawer = () => {
  isDrawer.value = true
}
// 更新颜色主题
const togTheme = (color) => {
  appTheme.value = color
}
// 更新布局
const togNavMode = (mode) => {
  navMode.value = mode
  // menu.mixMenu = false
}

// 导出展开方法
defineExpose({ openDrawer })

// export default defineComponent({
//   name: 'ProjectSetting',
//   components: { CheckOutlined, Moon, SunnySharp },
//   props: {
//     title: {
//       type: String,
//       default: '项目配置',
//     },
//     width: {
//       type: Number,
//       default: 280,
//     },
//   },
//   setup(props) {
//     const settingStore = useProjectSettingStore()
//     const designStore = useDesignSettingStore()
//     const state = reactive({
//       width: props.width,
//       title: props.title,

//       alertText:
//         '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',
//
//     })
//
//     watch(
//       () => designStore.darkTheme,
//       (to) => {
//         settingStore.navTheme = to ? 'header-dark' : 'dark'
//       },
//     )
//
//     const directionsOptions = computed(() => {
//       return animateOptions.find((item) => item.value == unref(settingStore.pageAnimateType))
//     })
//
//
//
//     function closeDrawer() {
//       state.isDrawer = false
//     }
//
//     function togNavTheme(theme) {
//       settingStore.navTheme = theme
//       if (settingStore.navMode === 'horizontal' && ['light'].includes(theme)) {
//         settingStore.navTheme = 'dark'
//       }
//     }
//

//

//
//     return {
//       ...toRefs(state),
//       settingStore,
//       designStore,
//       togNavTheme,
//       togNavMode,
//       togTheme,
//       darkTheme,
//       openDrawer,
//       closeDrawer,
//       animateOptions,
//       directionsOptions,
//     }
//   },
// })
</script>

<style lang="less" scoped>
.ars-drawer {
  .n-divider:not(.n-divider--vertical) {
    @apply my-2.5 mx-0;
  }
  &-setting-item {
    @apply flex items-center justify-center py-2.5 px-0 flex-wrap;
    &-style {
      @apply inline-block relative mr-3.5 cursor-pointer text-center;
    }
    &-title,
    &-select {
      @apply flex-1;
    }
    &-action {
      @aapply flex-[0_0_auto];
    }
    .theme-item {
      @apply w-5 min-w-5 h-5 cursor-pointer border border-slate-200 rounded-sm mt-0 ml-1 mb-1 mr-0 text-center leading-5;
      .n-icon {
        @apply text-white;
      }
    }
  }
  .align-items-top {
    @apply items-start py-0.5 px-0;
  }
  .dark-switch .n-switch {
    ::v-deep(.n-switch__rail) {
      @apply bg-[#000e1c];
    }
  }
}
</style>
