<template>
  <n-menu
    class="ars-menu"
    mode="vertical"
    :inverted="inverted"
    v-model:value="activeKey"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'
import { renderIcon } from '@/utils'
// import { useApp } from '@/hooks/setting/useApp'

const props = defineProps({
  collapsed: Boolean,
  inverted: Boolean,
})

// const { getProjectSetting } = useApp()
const { collapsed, inverted } = toRefs(props)
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
    disabled: true,
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
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记3',
    key: 'a-wild-sheep-chase3',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记4',
    key: 'a-wild-sheep-chase4',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记5',
    key: 'a-wild-sheep-chase5',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记6',
    key: 'a-wild-sheep-chase6',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记7',
    key: 'a-wild-sheep-chase7',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记8',
    key: 'a-wild-sheep-chase8',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记9',
    key: 'a-wild-sheep-chase9',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记10',
    key: 'a-wild-sheep-chase10',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记11',
    key: 'a-wild-sheep-chase11',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记12',
    key: 'a-wild-sheep-chase12',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记13',
    key: 'a-wild-sheep-chase13',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记14',
    key: 'a-wild-sheep-chase14',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记15',
    key: 'a-wild-sheep-chase15',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    label: '寻羊冒险记16',
    key: 'a-wild-sheep-chase16',
    disabled: true,
    icon: renderIcon(BookIcon),
  },
]
// 布局
// const navMode = getProjectSetting.value.navMode
</script>

<style lang="less" scoped>
.ars-menu {
  //height: calc(100vh - 64px);
}
</style>
