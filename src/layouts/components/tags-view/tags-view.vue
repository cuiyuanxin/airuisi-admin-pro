<template>
  <div
    class="ars-tabs-view"
    :class="{
      'ars-tabs-view-fix': multiTabs.fixed,
      'ars-tabs-view-vertical-fix':
        (navMode === 'vertical' || navMode === 'vertical-mix') && multiTabs.fixed,
      'ars-tabs-view-vertical-fix-min':
        (navMode === 'vertical' || navMode === 'vertical-mix') && collapsed && multiTabs.fixed,
      'ars-tabs-view-default-background': appDarkTheme === false,
      'ars-tabs-view-dark-background': appDarkTheme === true,
    }"
  >
    <div class="ars-tabs-view-main">
      <div class="ars-tabs-view-main-tabs">
        <n-tabs
          type="card"
          size="small"
          class="ars-tabs-card"
          :animated="true"
          closable
          v-model:value="activeKey"
          @before-leave="handleBeforeLeave"
          @close="handleClose"
        >
          <n-tab
            v-for="(item, index) in tabsList"
            :key="index"
            :name="item.fullPath"
            :closable="item.path !== PageEnum.BASE_HOME_REDIRECT"
          >
            {{ $t(item.meta.title) }}
          </n-tab>
          <n-tab :name="1">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="2">222222222222222222222222222222222222222</n-tab>
          <n-tab :name="3">33333333333333333333333333333333</n-tab>
          <n-tab :name="4">44444444444444444444444444444</n-tab>
          <n-tab :name="5">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="6">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="7">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="8">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="9">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="10">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="11">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="12">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="13">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="14">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="15">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="16">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="17">111111111111111111111111111111111111111111</n-tab>
          <n-tab :name="18">111111111111111111111111111111111111111111</n-tab>
        </n-tabs>
      </div>
      <div class="ars-tabs-view-main-tabs-tool">
        <div class="ars-tabs-screenfull" @click="toggleFullScreen" v-if="false">
          <div class="ars-tabs-screenfull-btn">
            <n-icon size="16" color="#515a6e">
              <ExpandOutline v-if="isFullScreen" />
              <ContractOutline v-else />
            </n-icon>
          </div>
        </div>
        <div class="ars-tabs-close">
          <n-dropdown
            trigger="hover"
            @select="closeHandleSelect"
            placement="bottom-end"
            :options="TabsMenuOptions"
          >
            <div class="ars-tabs-close-btn">
              <n-icon size="16" color="#515a6e">
                <DownOutlined />
              </n-icon>
            </div>
          </n-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage, useThemeVars } from 'naive-ui'
import { RouteItem, useTabsViewStore, whiteList } from '@/store/modules/tabsView'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useApp } from '@/hooks/setting/useApp'
import { useGo } from '@/hooks/web/usePage'
import { renderIcon } from '@/utils'
import { PageEnum } from '@/constants/pageEnum'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  ReloadOutlined,
} from '@vicons/antd'

// 项目/系统配置
const { getDesignSetting, getProjectSetting } = useApp()
const { appDarkTheme, appTheme } = toRefs(getDesignSetting.value)
const { multiTabs, menu, navMode } = toRefs(getProjectSetting.value)

// 收缩菜单
const collapsed = inject('collapsed', false)

// 路由
const router = useRouter()
const route = useRoute()
const go = useGo()
const asyncRouteStore = useAsyncRouteStore()
// 当前路由name
const activeKey = ref(route.fullPath as string)
// 标签页列表
const tabsViewStore = useTabsViewStore()
const tabsList: any = computed(() => tabsViewStore.tabsList)
// 全屏
const isFullScreen = ref(true)
// tags 右侧下拉菜单
const isCurrent = ref(false)
const isLeft = ref(false)
const isRight = ref(false)
const TabsMenuOptions = computed(() => {
  const isDisabled = tabsList.value.length <= 1
  const isOther = tabsList.value.length <= 2
  return [
    {
      label: '重新加载',
      key: '1',
      icon: renderIcon(ReloadOutlined),
    },
    {
      label: `关闭当前标签页`,
      key: '2',
      disabled: isCurrent.value || isDisabled,
      icon: renderIcon(CloseOutlined),
    },
    {
      label: '关闭左侧标签页',
      key: '3',
      disabled: isDisabled || isLeft.value,
      icon: renderIcon(ArrowLeftOutlined),
    },
    {
      label: '关闭右侧标签页',
      key: '4',
      disabled: isDisabled || isRight.value,
      icon: renderIcon(ArrowRightOutlined),
    },
    {
      label: '关闭其他标签页',
      key: '5',
      disabled: isDisabled || isOther,
      icon: renderIcon(ColumnWidthOutlined),
    },
    {
      label: '关闭全部标签页',
      key: '6',
      disabled: isDisabled,
      icon: renderIcon(MinusOutlined),
    },
  ]
})
// 主题颜色
const themeVars = useThemeVars()
const getBaseColor = computed(() => {
  return themeVars.value.textColor1
})
const getCardColor = computed(() => {
  return themeVars.value.cardColor
})
// 收缩后宽度
const minMenuWidth = computed(() => {
  const { minMenuWidth } = toRefs(menu.value)
  return `${minMenuWidth.value}px`
})
// 宽度
const menuWidth = computed(() => {
  const { menuWidth } = toRefs(menu.value)
  return `${menuWidth.value}px`
})

onMounted(() => {
  tabsViewStore.addTab(getSimpleRoute(route))
  isCurrent.value = PageEnum.BASE_HOME_REDIRECT === route.path
  isLeft.value = tabsViewStore.hasTabsOnLeft(getSimpleRoute(route))
  isRight.value = tabsViewStore.hasTabsOnRight(getSimpleRoute(route))
})

// 获取路由对象
const getSimpleRoute = (route): RouteItem => {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}
// 全屏切换
const toggleFullScreen = () => {
  // const ele = document.getElementById('log') //指定全屏区域元素
  // if (screenfull.isEnabled) {
  //   screenfull.request(ele)
  // }
}
// tag切换跳转
const handleBeforeLeave = (tabName: string): boolean => {
  //tags 跳转页面
  const fullPath = route.fullPath as string

  if (fullPath === tabName) return false
  activeKey.value = tabName
  go(tabName, true)

  return true
}
// tag关闭
const handleClose = (fullPath: string) => {
  const routeInfo = tabsList.value.find((item) => item.fullPath === fullPath)
  removeTab(routeInfo)
}
// 移除缓存组件名称
const delKeepAliveCompName = () => {
  if (route.meta.keepAlive) {
    const name = router.currentRoute.value.matched.find((item) => item.name === route.name)
      ?.components?.default.name
    if (name) {
      asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
        (item) => item !== name,
      )
    }
  }
}
//tab 操作
const closeHandleSelect = (key) => {
  switch (key) {
    //刷新
    case '1':
      reloadPage()
      break
    //关闭
    case '2':
      removeTab(route)
      break
    case '3':
      closeLeftTabs(route)
      break
    case '4':
      closeRightTabs(route)
      break
    //关闭其他
    case '5':
      closeOther(route)
      break
    //关闭所有
    case '6':
      closeAll()
      break
  }
}
// 关闭当前页面
const removeTab = (route) => {
  const $message = useMessage()
  if (tabsList.value.length === 1) {
    return $message.warning('这已经是最后一页，不能再关闭了！')
  }
  delKeepAliveCompName()
  tabsViewStore.closeCurrentTab(route)
  // 如果关闭的是当前页
  if (activeKey.value === route.fullPath) {
    const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
    activeKey.value = currentRoute.fullPath

    go(currentRoute, true)
  }
}
// 刷新页面
const emit = defineEmits(['update:isRouterAlive'])
const reloadPage = () => {
  delKeepAliveCompName()
  emit('update:isRouterAlive', false)
  nextTick(() => {
    emit('update:isRouterAlive', true)
  })
}
// 关闭左侧标签页
const closeLeftTabs = (route) => {
  tabsViewStore.closeLeftTabs(route)
}
// 关闭右侧标签页
const closeRightTabs = (route) => {
  tabsViewStore.closeRightTabs(route)
}
// 关闭其他
const closeOther = (route) => {
  tabsViewStore.closeOtherTabs(route)
  activeKey.value = route.fullPath
  go(route.fullPath, true)
}
// 关闭全部
const closeAll = () => {
  tabsViewStore.closeAllTabs()
  delKeepAliveCompName()
  go(PageEnum.BASE_HOME, true)
}

watch(
  () => route.fullPath,
  (to) => {
    if (whiteList.includes(route.fullPath as string)) return
    activeKey.value = to as string
    tabsViewStore.addTab(getSimpleRoute(route))
    isCurrent.value = PageEnum.BASE_HOME_REDIRECT === route.path
    isLeft.value = tabsViewStore.hasTabsOnLeft(getSimpleRoute(route))
    isRight.value = tabsViewStore.hasTabsOnRight(getSimpleRoute(route))
  },
  { immediate: true },
)
watch(
  () => tabsList,
  () => {
    isCurrent.value = PageEnum.BASE_HOME_REDIRECT === route.path
    isLeft.value = tabsViewStore.hasTabsOnLeft(getSimpleRoute(route))
    isRight.value = tabsViewStore.hasTabsOnRight(getSimpleRoute(route))
  },
  { deep: true },
)
</script>

<style lang="less" scoped>
.ars-tabs-view {
  @apply w-full m-0;
  &-fix {
    @apply fixed left-0;
    //@apply fixed left-0 z-10;
    transition: all 1s ease-in-out;
    //transition: width 0.3s ease;
  }
  &-vertical-fix {
    //width: calc(100% - v-bind(menuWidth));
    //left: v-bind(menuWidth);
    padding-left: v-bind(menuWidth);
  }
  &-vertical-fix-min {
    //width: calc(100% - v-bind(minMenuWidth));
    //left: v-bind(minMenuWidth);
    padding-left: v-bind(minMenuWidth);
  }
  &-default-background {
    @apply bg-[#f5f7f9];
  }
  &-dark-background {
    @apply bg-[#101014];
  }

  &-main {
    @apply w-full h-10 flex items-center justify-between;
    &-tabs {
      @apply h-10;
    }
    &-tabs-tool {
      @apply min-w-8 w-8 h-10 flex items-center justify-center py-1;
      & .ars-tabs-screenfull,
      & .ars-tabs-close {
        background: v-bind(getCardColor);
        @apply w-full h-full cursor-pointer;
        &-btn {
          @apply w-full h-full flex items-center justify-center;
        }
      }
    }
    & .ars-tabs-card {
      @apply w-full h-10 flex justify-center;
      & .n-tabs-tab-wrapper {
        & :deep(.n-tabs-tab) {
          border-bottom-left-radius: var(--n-tab-border-radius);
          border-bottom-right-radius: var(--n-tab-border-radius);
          @apply flex-1 text-center border-none px-2.5 py-1.5 transition duration-200;
          color: v-bind(getBaseColor);
          background: v-bind(getCardColor);
        }
        & :deep(.n-tabs-tab--active) {
          color: v-bind(appTheme) !important;
          background: v-bind(getCardColor) !important;
        }
      }
      & :deep(.n-tabs-tab-pad) {
        @apply w-2.5;
        border: none !important;
      }
      & :deep(.n-tabs-pad) {
        border: none !important;
      }
    }
  }
}
</style>
