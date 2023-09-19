<template>
  <n-layout class="ars-layout" has-sider>
    <!-- 菜单sider  -->
    <template v-if="navMode === 'vertical'">
      <n-layout-sider
        bordered
        :position="fixedMenu"
        :show-trigger="showTrigger"
        collapse-mode="width"
        :collapsed="collapsed"
        :inverted="inverted"
        :collapsed-width="minMenuWidth"
        :width="menuWidth"
        :native-scrollbar="false"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div>
          <layout-logo v-model:collapsed="collapsed" />
          <layout-menu v-model:inverted="inverted" />
        </div>

        <!-- 左侧菜单内容 -->
        <n-menu :options="menuOptions" />
      </n-layout-sider>
    </template>
    <template v-if="navMode === 'vertical' || navMode === 'vertical-mix'"> </template>

    <n-layout>
      <n-layout-header>
        <!-- 顶部菜单内容 -->
        <div>顶部</div>
      </n-layout-header>
      <n-layout-content class="ars-layout-content">
        <router-view v-if="flag" />
      </n-layout-content>
      <n-layout-footer v-show="showFooter" bordered>
        <div class="ars-layout-footer">Copyright &copy; 2023 Airuisi</div>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'
import { MenuOption } from 'naive-ui'
import { renderIcon } from '@/utils'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'
import LayoutLogo from '@/layouts/components/logo/layout-logo.vue'
import LayoutMenu from '@/layouts/components/menu/layout-menu.vue'

const { getWebsiteSetting, getProjectSetting, getDesignSetting } = useApp()
const { menu, navMode, navTheme } = getProjectSetting.value

// 展开收缩菜单
const collapsed = unref(menu.collapsed)
// 收缩后样式
const minMenuWidth = unref(menu.minMenuWidth)
// 展开后样式
const menuWidth = unref(menu.menuWidth)
// 折叠菜单样式
const showTrigger = unref(menu.showTrigger)
// 翻转样式
const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(navTheme))
})
// 固定菜单
const fixedMenu = computed(() => {
  const { fixed } = unref(menu)
  return fixed ? 'absolute' : 'static'
})

// 刷新组件
const flag = ref(true)

// const appDarkTheme = getDesignSetting.value?.appDarkTheme

// 隐藏尾部
const showFooter = unref(getProjectSetting.value.showFooter)

const fixedFooter = computed(() => {
  const { fixed } = unref(getProjectSetting.value.header)
  return fixed ? 'absolute' : 'static'
})
const fixedHeader = computed(() => {
  const { fixed } = unref(getProjectSetting.value.header)
  return fixed ? 'absolute' : 'static'
})

const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
  {
    label: '寻羊冒险记2',
    key: 'a-wild-sheep-chase2',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记3',
    key: 'a-wild-sheep-chase3',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记4',
    key: 'a-wild-sheep-chase4',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记5',
    key: 'a-wild-sheep-chase5',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记6',
    key: 'a-wild-sheep-chase6',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记7',
    key: 'a-wild-sheep-chase7',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记8',
    key: 'a-wild-sheep-chase8',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记9',
    key: 'a-wild-sheep-chase9',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记10',
    key: 'a-wild-sheep-chase10',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记11',
    key: 'a-wild-sheep-chase11',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记12',
    key: 'a-wild-sheep-chase12',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记13',
    key: 'a-wild-sheep-chase13',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记14',
    key: 'a-wild-sheep-chase14',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记15',
    key: 'a-wild-sheep-chase15',
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记16',
    key: 'a-wild-sheep-chase16',
    icon: renderIcon(BookIcon),
  },
]

//
// const getHeaderInverted = computed(() => {
//   return ['light', 'header-dark'].includes(unref(getProjectSetting.value.menu))
//     ? unref(inverted)
//     : !unref(inverted)
// })
</script>

<style lang="less" scoped>
.ars-layout {
  @apply flex flex-row flex-auto;
  //&-sider {
  //  min-height: 100vh;
  //  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  //  position: relative;
  //  z-index: 13;
  //  transition: all 0.2s ease-in-out;
  //}
  //&-menu {
  //}
  //&-content {
  //  @apply flex-auto;
  //  min-height: 100vh;
  //}
  //&-default-background {
  //  @apply bg-slate-50;
  //}
  &-footer {
    @apply h-12 leading-12 text-center;
  }
}
</style>
