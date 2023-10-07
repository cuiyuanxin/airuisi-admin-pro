<template>
  <n-layout-sider
    bordered
    position="absolute"
    show-trigger="arrow-circle"
    collapse-mode="width"
    :collapsed="false"
    :inverted="true"
    :collapsed-width="240"
    :width="64"
    :native-scrollbar="false"
    @collapse="true"
    @expand="false"
  >
    <div>logo</div>
    <!-- 左侧菜单内容 -->
    <n-menu :options="menuOptions" />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { MenuOption } from 'naive-ui'

const props = defineProps({
  menuOptions: Array<MenuOption>,
})

const { menuOptions } = toRefs(props)
</script>
