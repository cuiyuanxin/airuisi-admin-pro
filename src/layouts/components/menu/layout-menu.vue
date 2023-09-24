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
    :options="menuOptions"
    v-model:value="activeKey"
  />
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'
import { renderIcon } from '@/utils'
import { useApp } from '@/hooks/setting/useApp'

const props = defineProps({
  mode: String as PropType<'horizontal' | 'vertical'>,
  collapsed: Boolean,
  inverted: Boolean,
})
const { mode, collapsed, inverted } = toRefs(props)

const { getProjectSetting } = useApp()
// 布局
const { menu, navMode } = getProjectSetting.value
// 收缩后样式
const minMenuWidth = unref(menu.minMenuWidth)

const activeKey = ref<string | null>(null)
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
