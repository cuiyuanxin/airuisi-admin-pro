<template>
  <a-drawer
    v-model:visible="visible"
    :width="300"
    placement="right"
    :closable="false"
    :title="i18nRender('global.setting.drawer.title')"
  >
    <template #handle>
      <div class="ant-pro-setting-drawer-handle" @click="handleShowDrawer">
        <SettingOutlined v-if="!visible" />
        <CloseOutlined v-else />
      </div>
    </template>
    <div class="margin-bottom: 24px">
      <a-divider>主题</a-divider>

      <h3>导航模式</h3>
      <a-radio-group :value="modelValue.layout" @change="e => updateConf(e.target.value, 'layout')">
        <a-radio value="side">左侧菜单布局</a-radio>
        <a-radio value="top">顶部菜单布局</a-radio>
        <a-radio value="mix">混合菜单布局</a-radio>
      </a-radio-group>
      <a-divider />
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">固定 Header</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.fixedHeader"
            @change="checked => updateConf(checked, 'fixedHeader')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">固定 左侧菜单</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.fixSiderbar"
            @change="checked => updateConf(checked, 'fixSiderbar')"
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
            @change="checked => updateConf(checked, 'splitMenus')"
          />
        </a-col>
      </a-row>

      <a-divider />
      <h3>内容区域</h3>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">顶栏</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.headerRender === undefined"
            @change="checked => updateConf(checked === true && undefined, 'headerRender')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">页脚</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.footerRender === undefined"
            @change="checked => updateConf(checked === true && undefined, 'footerRender')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">菜单</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            disabled
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.menu === undefined"
            @change="checked => updateConf(checked === true && undefined, 'menu')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">菜单头</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.menuHeaderRender === undefined"
            @change="checked => updateConf(checked === true && undefined, 'menuHeaderRender')"
          />
        </a-col>
      </a-row>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { i18nRender } from '@/locales'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue'
import type { CheckedType } from 'ant-design-vue/es/switch'

type ConfType = 'layout' | 'fixedHeader' | 'fixSiderbar' | string

const props = defineProps<{
  modelValue: Record<string, string | boolean | undefined>
}>()
const emit = defineEmits(['update:modelValue'])

const visible = ref<boolean>(false)
const handleShowDrawer = () => {
  visible.value = !visible.value
}

const updateConf = (val: string | CheckedType | undefined, type: ConfType) => {
  const newVal = {
    ...toRaw(props.modelValue),
    [`${type}`]: val,
  }
  emit('update:modelValue', newVal)
}
</script>

<style lang="less">
@import 'ant-design-vue/es/style/themes/default.less';

@ant-pro-setting-drawer: ~'@{ant-prefix}-pro-setting-drawer';

.@{ant-pro-setting-drawer} {
  &-content {
    position: relative;
    min-height: 100%;

    .ant-list-item {
      span {
        flex: 1;
      }
    }
  }

  &-block-checbox {
    display: flex;

    &-item {
      position: relative;
      margin-right: 16px;
      // box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
      border-radius: @border-radius-base;
      cursor: pointer;

      img {
        width: 48px;
      }
    }

    &-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      padding-left: 24px;
      color: @primary-color;
      font-weight: bold;
      font-size: 14px;

      .action {
        color: @primary-color;
      }
    }
  }

  &-color_block {
    display: inline-block;
    width: 38px;
    height: 22px;
    margin: 4px;
    margin-right: 12px;
    vertical-align: middle;
    border-radius: 4px;
    cursor: pointer;
  }

  &-title {
    margin-bottom: 12px;
    color: @heading-color;
    font-size: 14px;
    line-height: 22px;
  }

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
  &-production-hint {
    margin-top: 16px;
    font-size: 12px;
  }
}
</style>
