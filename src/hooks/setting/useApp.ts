import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'

export function useApp() {
  const appStore = useAppStore()

  const getWebsiteSetting = computed(() => appStore.websiteSetting)
  const getDesignSetting = computed(() => appStore.designSetting)
  const getProjectSetting = computed(() => appStore.projectSetting)

  return {
    getWebsiteSetting,
    getDesignSetting,
    getProjectSetting,
  }
}
