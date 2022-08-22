<template>
  <a-drawer
    v-model:visible="visible"
    :width="300"
    placement="right"
    :closable="false"
    :title="i18nRender('global.setting.drawer.title')"
  >
    <template #handle>
      <div
        class="ant-pro-setting-drawer-handle"
        :style="{ background: `${modelValue.primaryColor}` }"
        @click="handleShowDrawer"
      >
        <component :is="visible ? 'CloseOutlined' : 'SettingOutlined'" />
      </div>
    </template>
    <div class="setting-drawer-index-content">
      <a-divider>主题</a-divider>
      <a-row>
        <a-col :span="8">
          <a-tooltip>
            <template #title>Light Style</template>
            <div class="setting-drawer-index-item" @click="handleNavTheme('light')">
              <img src="https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg" alt="light" />
              <div
                v-if="'light' === modelValue.navTheme"
                class="setting-drawer-index-selectIcon"
                :style="{ color: `${modelValue.primaryColor}` }"
              >
                <component :is="'CheckOutlined'" />
              </div>
            </div>
          </a-tooltip>
        </a-col>
        <a-col :span="8">
          <a-tooltip>
            <template #title>Dark Style</template>
            <div class="setting-drawer-index-item" @click="handleNavTheme('dark')">
              <img src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg" alt="dark" />
              <div
                v-if="'dark' === modelValue.navTheme"
                class="setting-drawer-index-selectIcon"
                :style="{ color: `${modelValue.primaryColor}` }"
              >
                <component :is="'CheckOutlined'" />
              </div>
            </div>
          </a-tooltip>
        </a-col>
        <a-col :span="8">
          <a-tooltip>
            <template #title>RealDark Style</template>
            <div class="setting-drawer-index-item" @click="handleNavTheme('realDark')">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg"
                alt="realDark"
              />
              <div
                v-if="'realDark' === modelValue.navTheme"
                class="setting-drawer-index-selectIcon"
                :style="{ color: `${modelValue.primaryColor}` }"
              >
                <component :is="'CheckOutlined'" />
              </div>
            </div>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-divider />
      <a-divider>主题色</a-divider>
      <div style="height: 20px">
        <a-tooltip v-for="(item, index) in colorList" :key="index" class="setting-drawer-theme-color-colorBlock">
          <template #title>
            {{ item.key }}
          </template>
          <a-tag :color="item.color" @click="handleChangeColor(item.color)">
            <component :is="'CheckOutlined'" v-if="item.color === modelValue.primaryColor" />
          </a-tag>
        </a-tooltip>
      </div>
      <a-divider />
      <a-divider>导航模式</a-divider>
      <a-row>
        <a-col :span="8">
          <a-tooltip>
            <template #title>左侧菜单布局</template>
            <div class="setting-drawer-index-item" @click="handleLayout('side')">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg"
                alt="左侧菜单布局"
              />
              <div
                v-if="'side' === modelValue.layout"
                class="setting-drawer-index-selectIcon"
                :style="{ color: `${modelValue.primaryColor}` }"
              >
                <component :is="'CheckOutlined'" />
              </div>
            </div>
          </a-tooltip>
        </a-col>
        <a-col :span="8">
          <a-tooltip>
            <template #title>顶部菜单布局</template>
            <div class="setting-drawer-index-item" @click="handleLayout('top')">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg"
                alt="顶部菜单布局"
              />
              <div
                v-if="'top' === modelValue.layout"
                class="setting-drawer-index-selectIcon"
                :style="{ color: `${modelValue.primaryColor}` }"
              >
                <component :is="'CheckOutlined'" />
              </div>
            </div>
          </a-tooltip>
        </a-col>
        <a-col :span="8">
          <a-tooltip>
            <template #title>混合菜单布局</template>
            <div class="setting-drawer-index-item" @click="handleLayout('mix')">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/x8Ob%26B8cy8/LCkqqYNmvBEbokSDscrm.svg"
                alt="混合菜单布局"
              />
              <div
                v-if="'mix' === modelValue.layout"
                class="setting-drawer-index-selectIcon"
                :style="{ color: `${modelValue.primaryColor}` }"
              >
                <component :is="'CheckOutlined'" />
              </div>
            </div>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-divider />
      <a-divider>界面功能</a-divider>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">固定Header</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.fixedHeader"
            @change="checked => handleFixedHeader(checked)"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">固定Siderbar</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.fixSiderbar"
            @change="checked => handleFixSiderbar(checked)"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">自动分割菜单</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.splitMenus"
            :disabled="modelValue.layout !== 'top'"
            @change="checked => handleSplitMenus(checked)"
          />
        </a-col>
      </a-row>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { i18nRender } from '@/locales'
// import type { CheckedType } from 'ant-design-vue/es/switch'
import { colors, updateTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store/modules/app'

// 获取appStore
const appStore = useAppStore()

// 获取父级传值
const props = defineProps<{
  modelValue: Record<string, string | boolean | undefined>
}>()
// 监听自定义函数
const emit = defineEmits(['handleSettingChange'])

// 初始化默认值
// 主题色
const colorList = colors
// 弹窗开关
const visible = ref<boolean>(false)

// 初始化函数方法
// 设置弹窗开关
const handleShowDrawer = () => {
  visible.value = !visible.value
}
// 主体
const handleNavTheme = (navTheme: string) => {
  appStore.setNavTheme(navTheme)
  updateConf(navTheme, 'navTheme')
}
// 变化主题色
const handleChangeColor = (color: string) => {
  updateTheme(color)
  appStore.setTheme(color)
  updateConf(color, 'primaryColor')
}
// 修改导航模式
const handleLayout = (layout: string) => {
  appStore.setLayout(layout)
  updateConf(layout, 'layout')
  handleSplitMenus(layout === 'top')
  handleFixSiderbar(layout !== 'top')
}
// 固定头部
const handleFixedHeader = (fixedHeader: boolean) => {
  appStore.setFixedHeader(fixedHeader)
  updateConf(fixedHeader, 'fixedHeader')
}
// 固定侧边菜单
const handleFixSiderbar = (fixSiderbar: boolean) => {
  appStore.setFixSiderbar(fixSiderbar)
  updateConf(fixSiderbar, 'fixSiderbar')
}
// 固定侧边菜单
const handleSplitMenus = (splitMenus: boolean) => {
  appStore.setSplitMenus(splitMenus)
  updateConf(splitMenus, 'splitMenus')
}

// 更新配置
const updateConf = (val: any, type: string) => {
  emit('handleSettingChange', type, val)
}

// type ConfType = 'layout' | 'fixedHeader' | 'fixSiderbar' | string
</script>

<style lang="less" scoped>
@import 'ant-design-vue/es/style/themes/default.less';

@ant-pro-setting-drawer: ~'@{ant-prefix}-pro-setting-drawer';

.@{ant-pro-setting-drawer} {
  &-handle {
    position: absolute;
    top: 240px;
    right: 300px;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 16px;
    text-align: center;
    background: @primary-color;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;
    > span {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
}
.setting-drawer-index-content {
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
  .setting-drawer-index-item {
    margin-right: 16px;
    position: relative;
    border-radius: 4px;
    cursor: pointer;

    img {
      width: 48px;
    }

    .setting-drawer-index-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      padding-top: 15px;
      padding-left: 24px;
      height: 100%;
      color: @primary-color;
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
