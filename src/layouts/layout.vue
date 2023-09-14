<template>
  <n-space vertical>
    <n-layout class="ars-layout">
      <n-layout-header>
        <div class="ars-layout-header">
          <div class="ars-layout-header-logo" :style="headerLogoWidth">
            <n-image width="40" preview-disabled :src="getWebsiteSetting.logo" />
            <span>{{ getWebsiteSetting.title }}</span>
          </div>
          <div class="ars-layout-header-breadcrumb" :style="headerBreadcrumbWidth">
            <div class="ars-layout-header-breadcrumb-left">
              <div class="pl-3" @click="handleMenuCollapse">
                <n-icon size="20" :component="List" />
              </div>
              <div v-if="getProjectSetting.header.isReload" @click="reloadPage">
                <n-icon size="20" :component="ReloadOutline" />
              </div>
              <div>
                <n-breadcrumb>
                  <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
                    <n-breadcrumb-item v-if="routeItem.breadcrumbName">
                      {{ routeItem.breadcrumbName }}
                    </n-breadcrumb-item>
                  </template>
                </n-breadcrumb>
              </div>
            </div>
            <div class="ars-layout-header-breadcrumb-right">
              <div v-if="false">
                <n-icon size="20" :component="SearchOutline" />
              </div>
              <div>
                <n-icon size="20">
                  <component :is="fullscreenIcon" @click="toggleFullScreen" />
                </n-icon>
              </div>
              <div>
                <n-dropdown
                  trigger="click"
                  :options="languages"
                  :show-arrow="true"
                  @select="handleLanguageSelect"
                >
                  <n-icon size="20" :component="LanguageOutline" />
                </n-dropdown>
              </div>
              <div>
                <n-popover trigger="click">
                  <template #trigger>
                    <n-badge :value="messageTotal" :max="50" v-if="messageTotal > 0">
                      <n-icon size="20" :component="Alert28Regular" />
                    </n-badge>
                    <n-icon size="20" :component="Alert28Regular" v-else />
                  </template>
                  <n-card placement="bottom-start" :bordered="false" content-style="padding: 0;">
                    <n-tabs type="line">
                      <n-tab-pane
                        v-for="(item, index) in messageList"
                        :key="index"
                        :name="`${item.title} (${item.total})`"
                      >
                        <template v-if="item.total > 0">
                          <n-list>
                            <n-list-item v-for="(item2, index2) in item.list" :key="index2">
                              <template #prefix>
                                <n-avatar round>
                                  {{ item2.nickname }}
                                </n-avatar>
                              </template>
                              <template #suffix>
                                <!--                                <n-button>Suffix</n-button>-->
                              </template>
                              <n-thing :title="item2.title" :description="item2.time" />
                            </n-list-item>
                            <template #footer>
                              <n-icon size="20" :component="TrashOutline" />清空{{ item.title }}
                            </template>
                          </n-list>
                        </template>
                        <n-empty description="没有可处理信息" v-else />
                      </n-tab-pane>
                    </n-tabs>
                  </n-card>
                </n-popover>
              </div>
              <div>
                <n-dropdown
                  trigger="click"
                  :show-arrow="true"
                  :options="userOptions"
                  @select="handleUserSelect"
                >
                  <n-avatar round>
                    {{ getNickname }}
                  </n-avatar>
                </n-dropdown>
              </div>
              <div class="pr-8">
                <n-icon size="20" :component="SettingsOutline" />
              </div>
            </div>
          </div>
        </div>
      </n-layout-header>
      <n-layout>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="getProjectSetting.menu.minMenuWidth"
          :width="getProjectSetting.menu.menuWidth"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <div class="ars-layout-menu">
            <AsideMenu v-model:collapsed="collapsed" />
          </div>
        </n-layout-sider>
        <n-layout-content>
          <router-view v-if="flag" />
        </n-layout-content>
        <n-layout-footer bordered> 成府路 </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/store/modules/user'
import { useApp } from '@/hooks/setting/useApp'
import { changeLocale, useI18n } from '@/hooks/web/useI18n'
import { Languages } from '@/constants/localeEnum'
import { PageEnum } from '@/constants/pageEnum'
import {
  ContractOutline,
  ExpandOutline,
  LanguageOutline,
  List,
  ReloadOutline,
  SearchOutline,
  SettingsOutline,
  TrashOutline,
} from '@vicons/ionicons5'
import { Alert28Regular } from '@vicons/fluent'
import { AsideMenu } from './components/Menu'

const { getNickname, logout } = useUser()
const { getWebsiteSetting, getProjectSetting, getDesignSetting } = useApp()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 展开收缩菜单
const collapsed = ref(false)
// 全屏图标
const fullscreenIcon = shallowRef(ExpandOutline)
// 国际化语言
const languages = reactive([])
// 刷新组件
const flag = ref(true)
// 消息通知总数
const messageTotal = ref(0)
// 消息通知数据列表
const messageList = reactive([
  {
    title: '通知',
    total: 1,
    list: [
      {
        nickname: '张龙',
        title: '张龙回复了你的邮件',
        time: '2023-09-10 18:14:30',
      },
      {
        nickname: '赵虎',
        title: '赵虎邀请您参加会议',
        time: '2023-09-10 18:15:30',
      },
      {
        nickname: '王五',
        title: '王五邀请您头脑风暴',
        time: '2023-09-10 18:16:30',
      },
      {
        nickname: '艾迪森',
        title: '艾迪森给您发送了信息',
        time: '2023-09-10 18:17:30',
      },
    ],
  },
  { title: '关注', total: 0, list: [] },
  { title: '待办', total: 0, list: [] },
])
// 用户信息
const userOptions = [
  {
    label: '个人设置',
    key: 'personalSettings',
  },
  {
    label: '修改密码',
    key: 'changePassword',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]
// 收缩后样式
const minMenuWidth = getProjectSetting.value.menu.minMenuWidth
// 展开后样式
const menuWidth = getProjectSetting.value.menu.menuWidth

const headerLogoWidth = computed(() => {
  return collapsed.value ? `width: ${minMenuWidth}px` : `width: ${menuWidth}px`
})
const headerBreadcrumbWidth = computed(() => {
  return collapsed.value
    ? `min-width: calc(100% - ${minMenuWidth}px)`
    : `min-width: calc(100% - ${menuWidth}px)`
})

// dom渲染后初始化数据和组件
onMounted(() => {
  // 国际化语言
  for (let key in Languages) {
    languages.push({
      label: Languages[key],
      key: key,
      disabled: getDesignSetting.value.locale === key,
    })
  }
})

// 收缩/展开菜单
const handleMenuCollapse = () => {
  collapsed.value = !collapsed.value
}

// 刷新页面
const reloadPage = () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
}

// 面包屑
const breadcrumbList = computed(() => {
  let breadcrumbs = []
  route.matched.concat().map((item: any) => {
    breadcrumbs.push({
      path: item.path,
      name: item.name,
      breadcrumbName: t(item.meta.title) || '',
    })
  })

  return breadcrumbs
})

// 切换全屏图标
const toggleFullscreenIcon = () =>
  (fullscreenIcon.value = document.fullscreenElement !== null ? ContractOutline : ExpandOutline)

// 监听全屏切换事件
document.addEventListener('fullscreenchange', toggleFullscreenIcon)

// 全屏切换
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

// 国际化语言切换
const handleLanguageSelect = (key: string) => {
  changeLocale(key)
  router.go(0)
}

// 用户中心
const handleUserSelect = (key: string) => {
  switch (key) {
    case 'personalSettings':
      console.log('个人中心')
      break
    case 'changePassword':
      console.log('修改密码')
      break
    case 'logout':
      logout()
      router.push(PageEnum.BASE_LOGIN)
      break
  }
}
</script>

<style lang="less" scoped>
.ars-layout {
  height: 100%;

  & .ars-layout-header {
    @apply h-16 flex flex-nowrap items-center;

    & > .ars-layout-header-logo {
      @apply h-16 w-full flex items-center justify-center;

      & > span {
        @apply ml-2 text-lg;
      }
    }

    & > .ars-layout-header-breadcrumb {
      @apply h-16 flex justify-between;

      & > .ars-layout-header-breadcrumb-left,
      & > .ars-layout-header-breadcrumb-right {
        @apply h-16 flex space-x-6;
        & > div {
          @apply h-16 flex items-center justify-center;
        }
      }
    }
  }
}
</style>
