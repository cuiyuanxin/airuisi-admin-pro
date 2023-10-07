<template>
  <router-view v-if="isRouterAlive" v-slot="{ Component, route }">
    <transition :name="pageAnimateType" mode="out-in" appear>
      <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useApp } from '@/hooks/setting/useApp'

const props = defineProps({
  isRouterAlive: Boolean,
})

const { isRouterAlive } = toRefs(props)

const { getProjectSetting } = useApp()
const { pageAnimateType } = unref(getProjectSetting)

const asyncRouteStore = useAsyncRouteStore()
// 需要缓存的路由组件
const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents)
</script>

<style scoped lang="less"></style>
