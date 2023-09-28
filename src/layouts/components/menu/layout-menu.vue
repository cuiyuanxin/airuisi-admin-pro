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
    :expanded-keys="openKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>

<script setup lang="ts">
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useApp } from '@/hooks/setting/useApp'
import { generatorMenu } from '@/utils'

const props = defineProps({
  mode: String as PropType<'horizontal' | 'vertical'>,
  collapsed: Boolean,
  inverted: Boolean,
})
const { mode, collapsed, inverted } = toRefs(props)

// 当前路由
const currentRoute = useRoute()

const { getProjectSetting } = useApp()
const asyncRouteStore = useAsyncRouteStore()
// 布局
const { menu, navMode } = getProjectSetting.value
// 收缩后样式
const minMenuWidth = unref(menu.minMenuWidth)
const router = useRouter()

// let menuOptions: MenuOption[] = reactive([])
const menuOptions: any = ref([])
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

  console.log(menuOptions)
})

// 获取当前打开的子菜单
const matched = currentRoute.matched
const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : []
let openKeys: any = getOpenKeys

const updateSelectedKeys = () => {
  const matched = currentRoute.matched
  openKeys = matched.map((item) => item.name)
  const activeMenu: string = (currentRoute.meta?.activeMenu as string) || ''
  selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string)
}

const updateMenu = () => {
  if (!menu.mixMenu) {
    menuOptions.value = generatorMenu(asyncRouteStore.getMenus)
  } else {
    //混合菜单
    // const firstRouteName: string = (currentRoute.matched[0].name as string) || ''
    // menuOptions.value = generatorMenuMix(asyncRouteStore.getMenus, firstRouteName, props.location)
    // const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string
    // headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || ''
  }
  updateSelectedKeys()
}

// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    router.push({ name: key })
  }
  // emit('clickMenuItem' as any, key)
}

//查找是否存在子路由
function findChildrenLen(key: string) {
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
function menuExpanded(openKeys: string[]) {
  if (!openKeys) return
  const latestOpenKey = openKeys.find((key) => openKeys.indexOf(key) === -1)
  const isExistChildren = findChildrenLen(latestOpenKey as string)
  openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys
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

// 监听菜单收缩状态
// watch(
//   () => props.collapsed,
//   (newVal) => {
//   }
// );

// 跟随页面路由变化，切换菜单选中状态
// watch(
//     () => currentRoute.fullPath,
//     () => {
//       updateMenu();
//     }
// );
</script>

<style lang="less" scoped>
.ars-menu {
  @apply h-16 flex items-center justify-items-center;
  &.ars-menu-horizontal {
    & :deep(.n-menu-item-content-header) {
      @apply overflow-visible;
    }
  }
}
</style>
