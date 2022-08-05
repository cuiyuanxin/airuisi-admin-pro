<template>
  <a-popover v-model:visible="noticeVisible" trigger="click" :class="prefixCls">
    <template #content>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" :tab="i18nRender('header.noticeicon.tab1')">
          <a-list>
            <a-list-item>
              <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                />
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                />
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="i18nRender('header.noticeicon.tab2')" force-render>
          <a-list>
            <a-list-item>
              <a-list-item-meta title="你收到了 14 份新周报2" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                />
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试2" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                />
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta title="这种模板可以区分多种通知类型2" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="3" :tab="i18nRender('header.noticeicon.tab3')">
          <a-list>
            <a-list-item>
              <a-list-item-meta title="你收到了 14 份新周报3" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                />
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试3" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                />
              </a-list-item-meta>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta title="这种模板可以区分多种通知类型3" description="一年前">
                <a-avatar
                  style="background-color: white"
                  src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </template>
    <span class="ant-dropdown-link" placement="bottomRight" @click.prevent>
      <a-badge :dot="show">
        <BellOutlined :style="{ fontSize: '16px' }" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script setup lang="ts">
import { i18nRender } from '@/locales'
// 获取父级参数
const props = defineProps<{
  prefixCls: string
}>()
// 消息徽章
const show = ref(true)
const noticeVisible = ref(false)
const activeKey = ref('1')
</script>

<style scoped></style>
