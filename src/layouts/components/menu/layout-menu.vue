<template>
  <n-menu
    class="ars-menu"
    :class="{
      'ars-menu-horizontal': navMode === 'horizontal' || navMode === 'horizontal-mix',
    }"
    :mode="mode"
    :inverted="inverted"
    :collapsed="collapsed"
    :collapsed-width="minMenuWidth"
    :collapsed-icon-size="22"
    :indent="24"
    :options="menuOptions"
    :default-expanded-keys="openKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>

<script setup lang="ts">
import { RouteLocationMatched } from 'vue-router'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useApp } from '@/hooks/setting/useApp'
import { useGo } from '@/hooks/web/usePage'
import { generatorMenu } from '@/utils'

const props = defineProps({
  mode: String as PropType<'horizontal' | 'vertical'>,
})
const { mode } = toRefs(props)

// 项目/系统配置
const { getProjectSetting, getDesignSetting } = useApp()
const { menu, navMode } = toRefs(getProjectSetting.value)

// 收缩菜单
const collapsed = inject('collapsed', false)
// 主题
const inverted = computed(() => {
  if (navMode.value === 'horizontal' || navMode.value === 'horizontal-mix') {
    return false
  }
  const { appDarkTheme } = toRefs(getDesignSetting.value)
  return !appDarkTheme.value
})
// 收缩后样式
const minMenuWidth = unref(menu.value.minMenuWidth)
// 菜单
const menuOptions: any = ref([])

// 当前路由
const currentRoute = useRoute()
// 获取当前打开的子菜单
const matched: RouteLocationMatched[] = currentRoute.matched
const getRouteName = matched && matched.length ? matched.map((item) => item.name) : []
const openKeys: any = unref(getRouteName)
// 选中菜单
const selectedKeys = ref<string>(currentRoute.name as string)
const getSelectedKeys = computed(() => {
  // let location = props.location
  // return location === 'left' || (location === 'header' && unref(navMode) === 'horizontal')
  //   ? unref(selectedKeys)
  //   : unref(headerMenuSelectKey)

  return unref(selectedKeys)
})

onMounted(() => {
  updateMenu()
})

const go = useGo()

// 点击菜单跳转
const clickMenuItem = (key: string) => {
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    go({ name: key })
  }
}

//查找是否存在子路由
const findChildrenLen = (key: string) => {
  if (!key) return false
  const subRouteChildren: string[] = []
  for (const { children, key } of unref(menuOptions)) {
    if (children && children.length) {
      subRouteChildren.push(key as string)
    }
  }
  return subRouteChildren.includes(key)
}

//展开菜单
const menuExpanded = (openKeys: string[]) => {
  if (!openKeys) return
  const latestOpenKey = openKeys.find((key) => openKeys.indexOf(key) === -1)
  const isExistChildren = findChildrenLen(latestOpenKey as string)
  openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys
}

// 更新展开菜单key
const updateSelectedKeys = () => {
  openKeys.value = matched.map((item) => item.name)
  const activeMenu: string = (currentRoute.meta?.activeMenu as string) || ''
  selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string)
}

// 更新菜单数据
const asyncRouteStore = useAsyncRouteStore()
const updateMenu = () => {
  const { getMenus } = storeToRefs(asyncRouteStore)

  if (!menu.mixMenu) {
    menuOptions.value = generatorMenu(getMenus.value)
  } else {
    //混合菜单
    // const firstRouteName: string = (currentRoute.matched[0].name as string) || ''
    // menuOptions.value = generatorMenuMix(getMenus, firstRouteName, props.location)
    // const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string
    // headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || ''
  }
  updateSelectedKeys()
}

// 监听分割菜单
// watch(
//     () => settingStore.menuSetting.mixMenu,
//     () => {
//       updateMenu();
//       if (props.collapsed) {
//         emit('update:collapsed', !props.collapsed);
//       }
//     }
// );

// 跟随页面路由变化，切换菜单选中状态
watch(
  () => currentRoute.fullPath,
  () => {
    updateMenu()
  },
)
</script>

<style lang="less" scoped>
.ars-menu {
  &.ars-menu-horizontal {
    @apply h-14 flex items-center justify-items-center;
    & :deep(.n-menu-item-content-header) {
      @apply overflow-visible;
    }
  }
}
</style>
