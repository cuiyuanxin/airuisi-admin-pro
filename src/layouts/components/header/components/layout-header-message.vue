<template>
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
                    {{ item2['nickname'] }}
                  </n-avatar>
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
</template>

<script setup lang="ts">
import { Alert28Regular } from '@vicons/fluent'
import { TrashOutline } from '@vicons/ionicons5'

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
</script>
