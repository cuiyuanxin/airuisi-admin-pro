<template>
  <n-breadcrumb>
    <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
      <n-breadcrumb-item v-if="routeItem.breadcrumbName">
        {{ routeItem['breadcrumbName'] }}
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
// 面包屑
const breadcrumbList = computed(() => {
  const route = useRoute()
  const { t } = useI18n()

  let breadcrumbs = [] as any
  route.matched.concat().map((item: any) => {
    breadcrumbs.push({
      path: item.path,
      name: item.name,
      breadcrumbName: t(item.meta.title) || '',
    })
  })

  return breadcrumbs
})
</script>
