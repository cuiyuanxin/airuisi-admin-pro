<template>
  <n-dropdown
    trigger="click"
    :options="languages"
    :show-arrow="true"
    @select="handleLanguageSelect"
  >
    <n-icon size="20">
      <LanguageOutline />
    </n-icon>
  </n-dropdown>
</template>

<script setup lang="ts">
import { useApp } from '@/hooks/setting/useApp'
import { changeLocale } from '@/hooks/web/useI18n'
import { Languages } from '@/constants/localeEnum'
// 国际化语言
const languages = reactive([] as any)

const router = useRouter()
const { getDesignSetting } = useApp()

// dom渲染后初始化数据和组件
onMounted(() => {
  // 国际化语言
  const locale = getDesignSetting.value?.locale
  for (let key in Languages) {
    languages.push({ label: Languages[key], key: key, disabled: locale === key })
  }
})

// 国际化语言切换
const handleLanguageSelect = (key: string) => {
  changeLocale(key)
  router.go(0)
}
</script>
