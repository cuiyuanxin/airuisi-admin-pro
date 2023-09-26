<template>
  <div
    class="tabs-view"
    :class="{
      'tabs-view-fix': multiTabs.fixed,
      // 'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': appDarkTheme === false,
      'tabs-view-dark-background': appDarkTheme === true,
    }"
    :style="getChangeStyle"
  >
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card" :class="{ 'tabs-card-scrollable': scrollable }">
        <span
          class="tabs-card-prev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          @click="scrollPrev"
        >
          <n-icon size="16" color="#515a6e" :component="ChevronBackOutline" />
        </span>
        <span
          class="tabs-card-next"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          @click="scrollNext"
        >
          <n-icon size="16" color="#515a6e" :component="ChevronForwardOutline" />
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item"
                :class="{ 'active-item': activeKey === element.path }"
                @click.stop="goPage(element)"
                @contextmenu="handleContextMenu($event, element)"
              >
                <span>{{ $t(element.meta.title) }}</span>
                <n-icon
                  size="14"
                  @click.stop="closeTabItem(element)"
                  v-if="!element.meta.affix"
                  :component="CloseOutline"
                />
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown
          trigger="hover"
          @select="closeHandleSelect"
          placement="bottom-end"
          :options="TabsMenuOptions"
        >
          <div class="tabs-close-btn">
            <n-icon size="16" color="#515a6e" :component="DownOutlined" />
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        @clickoutside="onClickOutside"
        placement="bottom-start"
        @select="closeHandleSelect"
        :options="TabsMenuOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage, useThemeVars } from 'naive-ui'
import { RouteItem, useTabsViewStore } from '@/store/modules/tabsView'
import { useApp } from '@/hooks/setting/useApp'
import { useGo } from '@/hooks/web/usePage'
import { PageEnum } from '@/constants/pageEnum'
import draggable from 'vuedraggable'
import { renderIcon } from '@/utils'
import { ChevronBackOutline, ChevronForwardOutline, CloseOutline } from '@vicons/ionicons5'
import {
  CloseOutlined,
  ColumnWidthOutlined,
  DownOutlined,
  MinusOutlined,
  ReloadOutlined,
} from '@vicons/antd'

const props = defineProps({
  collapsed: Boolean,
})

const { getDesignSetting, getProjectSetting } = useApp()
const { appDarkTheme, appTheme } = getDesignSetting.value
const { multiTabs, menu, navMode } = getProjectSetting.value

const scrollable = ref(false)
const navScroll: any = ref(null)
const navWrap: any = ref(null)

const route = useRoute()
const router = useRouter()

let activeKey = route.fullPath
const isCurrent = ref(false)
const showDropdown = ref(false)
const dropdownX = ref(0)
const dropdownY = ref(0)
// const isMultiHeaderFixed = ref(false)

//动态组装样式 菜单缩进
const getChangeStyle = computed(() => {
  const { collapsed } = toRefs(props)
  const { minMenuWidth, menuWidth } = menu
  const { fixed } = multiTabs
  let lenNum =
    // navMode === 'horizontal' || !isMixMenuNoneSub.value
    //   ? '0px'
    //   : collapsed
    //   ? `${minMenuWidth}px`
    //   : `${menuWidth}px`
    navMode === 'horizontal' ? '0px' : collapsed ? `${minMenuWidth}px` : `${menuWidth}px`

  // if (isMobile.value) {
  //   return {
  //     left: '0px',
  //     width: '100%',
  //   }
  // }
  return {
    left: lenNum,
    width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
  }
})

const scrollPrev = () => {
  const containerWidth = navScroll.value.offsetWidth
  const currentScroll = navScroll.value.scrollLeft

  if (!currentScroll) return
  const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
}

const scrollNext = () => {
  const containerWidth = navScroll.value.offsetWidth
  const navWidth = navScroll.value.scrollWidth
  const currentScroll = navScroll.value.scrollLeft

  if (navWidth - currentScroll <= containerWidth) return
  const scrollLeft =
    navWidth - currentScroll > containerWidth * 2
      ? currentScroll + containerWidth
      : navWidth - containerWidth
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
}

/**
 * @param value 要滚动到的位置
 * @param amplitude 每次滚动的长度
 */
function scrollTo(value: number, amplitude: number) {
  const currentScroll = navScroll.value.scrollLeft
  const scrollWidth =
    (amplitude > 0 && currentScroll + amplitude >= value) ||
    (amplitude < 0 && currentScroll + amplitude <= value)
      ? value
      : currentScroll + amplitude
  navScroll.value && navScroll.value.scrollTo(scrollWidth, 0)
  if (scrollWidth === value) return
  return window.requestAnimationFrame(() => scrollTo(value, amplitude))
}

const tabsViewStore = useTabsViewStore()

// 标签页列表
const tabsList: any = computed(() => tabsViewStore.tabsList)
const whiteList: string[] = [
  PageEnum.BASE_LOGIN_NAME,
  PageEnum.REDIRECT_NAME,
  PageEnum.ERROR_PAGE_NAME,
]

const themeVars = useThemeVars()

const getBaseColor = computed(() => {
  return themeVars.value.textColor1
})

const getCardColor = computed(() => {
  return themeVars.value.cardColor
})

//tags 右侧下拉菜单
const TabsMenuOptions = computed(() => {
  const isDisabled = tabsList.value.length <= 1
  return [
    {
      label: '刷新当前',
      key: '1',
      icon: renderIcon(ReloadOutlined),
    },
    {
      label: `关闭当前`,
      key: '2',
      disabled: isCurrent.value || isDisabled,
      icon: renderIcon(CloseOutlined),
    },
    {
      label: '关闭其他',
      key: '3',
      disabled: isDisabled,
      icon: renderIcon(ColumnWidthOutlined),
    },
    {
      label: '关闭全部',
      key: '4',
      disabled: isDisabled,
      icon: renderIcon(MinusOutlined),
    },
  ]
})

//tags 跳转页面
const go = useGo()
const goPage = (e) => {
  const { fullPath } = e
  if (fullPath === route.fullPath) return
  activeKey = fullPath
  go(e, true)
}

const handleContextMenu = (e, item) => {
  e.preventDefault()
  isCurrent.value = PageEnum.BASE_HOME_REDIRECT === item.path
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    dropdownX.value = e.clientX
    dropdownY.value = e.clientY
  })
}

//删除tab
const closeTabItem = (e) => {
  const { fullPath } = e
  const routeInfo = tabsList.value.find((item) => item.fullPath === fullPath)
  removeTab(routeInfo)
}

// 关闭当前页面
const $message = useMessage()
const removeTab = (route) => {
  if (tabsList.value.length === 1) {
    return $message.warning('这已经是最后一页，不能再关闭了！')
  }
  // delKeepAliveCompName()
  tabsViewStore.closeCurrentTab(route)
  // 如果关闭的是当前页
  if (activeKey === route.fullPath) {
    const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
    activeKey = currentRoute.fullPath
    router.push(currentRoute)
  }
  updateNavScroll()
}

/**
 * @param autoScroll 是否开启自动滚动功能
 */
async function updateNavScroll(autoScroll?: boolean) {
  await nextTick()
  if (!navScroll.value) return
  const containerWidth = navScroll.value.offsetWidth
  const navWidth = navScroll.value.scrollWidth

  if (containerWidth < navWidth) {
    scrollable.value = true
    if (autoScroll) {
      let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || []
      ;[...tagList].forEach((tag: HTMLElement) => {
        // fix SyntaxError
        if (tag.id === `tag${activeKey.split('/').join('/')}`) {
          tag.scrollIntoView && tag.scrollIntoView()
        }
      })
    }
  } else {
    scrollable.value = false
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
    //关闭其他
    case '3':
      closeOther(route)
      break
    //关闭所有
    case '4':
      closeAll()
      break
  }
  updateNavScroll()
  showDropdown.value = false
}

// 刷新页面
const reloadPage = () => {
  // delKeepAliveCompName()
  router.push({
    path: '/redirect' + route.fullPath,
  })
}

// 关闭其他
const closeOther = (route) => {
  tabsViewStore.closeOtherTabs(route)
  activeKey = route.fullPath
  router.replace(route.fullPath)
  updateNavScroll()
}

// 关闭全部
const closeAll = () => {
  tabsViewStore.closeAllTabs()
  router.replace(PageEnum.BASE_HOME)
  updateNavScroll()
}

const onClickOutside = () => {
  showDropdown.value = false
}

// 移除缓存组件名称
// const asyncRouteStore = useAsyncRouteStore()
// const delKeepAliveCompName = () => {
//   if (route.meta.keepAlive) {
//     const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
//       ?.components?.default.name
//     if (name) {
//       asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
//         (item) => item != name,
//       )
//     }
//   }
// }

// const isMixMenuNoneSub = computed(() => {
//   const mixMenu = settingStore.menuSetting.mixMenu
//   const currentRoute = useRoute()
//   if (navMode.value != 'horizontal-mix') return true
//   return !(navMode.value === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot)
// })

// 初始化标签页
let cacheRoutes: RouteItem[] = []
// 将最新的路由信息同步到 localStorage 中
const routes = router.getRoutes()
cacheRoutes.forEach((cacheRoute) => {
  const route = routes.find((route) => route.path === cacheRoute.path)
  if (route) {
    cacheRoute.meta = route.meta || cacheRoute.meta
    cacheRoute.name = (route.name || cacheRoute.name) as string
  }
})

tabsViewStore.initTabs(cacheRoutes)
// 获取简易的路由对象
const getSimpleRoute = (route): RouteItem => {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}

watch(
  () => route.fullPath,
  (to) => {
    if (whiteList.includes(route.name as string)) return
    activeKey = to
    tabsViewStore.addTab(getSimpleRoute(route))
    updateNavScroll(true)
  },
  { immediate: true },
)
// 注入刷新页面方法
provide('reloadPage', reloadPage)

// 关闭左侧
// const closeLeft = (route) => {
//   tabsViewStore.closeLeftTabs(route)
//   activeKey = route.fullPath
//   router.replace(route.fullPath)
//   updateNavScroll()
// }

// 关闭右侧
// const closeRight = (route) => {
//   tabsViewStore.closeRightTabs(route)
//   activeKey = route.fullPath
//   router.replace(route.fullPath)
//   updateNavScroll()
// }
</script>

<style lang="less" scoped>
.tabs-view {
  @apply w-full flex box-border;
  padding: 6px 0;
  transition: all 0.2s ease-in-out;
  &-fix {
    @apply fixed z-[5] py-1.5 px-1.5 left-[200px];
  }
  &-default-background {
    @apply bg-[#f5f7f9];
  }
  &-dark-background {
    @apply bg-[#101014];
  }

  &-main {
    @apply h-8 flex min-w-full max-w-full;
    & .tabs-card {
      @apply grow shrink overflow-hidden relative;
      -webkit-box-flex: 1;
      &-scrollable {
        @apply py-0 px-8 overflow-hidden;
      }
      &-prev,
      &-next {
        @apply w-8 text-center absolute leading-8 cursor-pointer;

        //
        //      .n-icon {
        //        display: flex;
        //        align-items: center;
        //        justify-content: center;
        //        height: 32px;
        //        width: 32px;
        //      }
      }
      &-next-hide,
      &-prev-hide {
        @apply hidden;
      }
      //
      //    .tabs-card-prev {
      //      left: 0;
      //    }
      //
      //    .tabs-card-next {
      //      right: 0;
      //    }
      //

      &-scroll {
        @apply whitespace-nowrap overflow-hidden;
        &-item {
          @arscolor: v-bind(getBaseColor);
          @arsbackground: v-bind(getCardColor);
          @apply h-8 pt-1.5 px-4 pb-1 rounded-sm mr-1.5
            cursor-pointer inline-block relative flex-[0_0_auto] text-[ @arscolor] bg-[
            @arsbackground];

          //        span {
          //          float: left;
          //          vertical-align: middle;
          //        }
          //
          //        &:hover {
          //          color: #515a6e;
          //        }
          //
          //        .n-icon {
          //          height: 22px;
          //          width: 21px;
          //          margin-right: -6px;
          //          position: relative;
          //          vertical-align: middle;
          //          text-align: center;
          //          color: #808695;
          //
          //          &:hover {
          //            color: #515a6e !important;
          //          }
          //
          //          svg {
          //            height: 21px;
          //            display: inline-block;
          //          }
        }
        & .active-item {
          color: v-bind(appTheme);
        }
      }
    }
    & .tabs-close {
      @apply min-w-8 w-8 h-8 leading-8 text-center rounded-sm cursor-pointer;
      background: var(--color);

      &-btn {
        @apply h-full flex items-center justify-center;
        color: var(--color);
      }
    }
  }
}

//
//.tabs-view-fixed-header {
//  top: 0;
//}
</style>
