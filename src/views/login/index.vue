<template>
  <n-grid class="login-container login-container-maxsm" item-responsive responsive="screen">
    <n-grid-item span="9 xs:24 s:24 l:9" class="left">
      <div class="left-item">
        <div class="left-item-lt">
          <div class="left-item-logo">
            <n-image class="left-item-logo-img" :src="websiteConfig.logo" />
            <div class="left-item-logo-title">{{ websiteConfig.title }}</div>
          </div>
          <div class="left-item-title">{{ websiteConfig.loginDesc }}</div>
        </div>
        <div class="coding-img">
          <n-image :src="websiteConfig.loginImage" preview-disabled />
        </div>
      </div>
    </n-grid-item>
    <n-grid-item span="15 xs:24 s:24 l:15" class="right">
      <n-card title="登录你的账户" :bordered="false" class="right-item">
        <n-tabs
          :default-value="tagDefaultValue"
          @update:value="handleUpdateValue"
          size="large"
          pane-style="margin-top: 0.625rem;"
        >
          <n-tab-pane name="accountSignin" tab="账号密码登录">
            <n-form
              ref="formRefAccount"
              :model="formAccountValue"
              :rules="accountRules"
              label-placement="left"
            >
              <n-form-item path="username">
                <n-input v-model:value="formAccountValue.username" placeholder="请输入用户名">
                  <template #prefix>
                    <n-icon :component="PersonOutline" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item-row path="password">
                <n-input
                  v-model:value="formAccountValue.password"
                  type="password"
                  placeholder="请输入密码"
                  show-password-on="click"
                >
                  <template #prefix>
                    <n-icon :component="LockClosedOutline" />
                  </template>
                </n-input>
              </n-form-item-row>
            </n-form>
          </n-tab-pane>
          <n-tab-pane name="mobileSignin" tab="手机验证码登录">
            <n-form
              ref="formRefMobile"
              :model="formMobileValue"
              :rules="mobileRules"
              label-placement="left"
            >
              <n-form-item path="mobile">
                <n-input v-model:value="formMobileValue.mobile" placeholder="请输入手机号码">
                  <template #prefix>
                    <n-icon :component="PhonePortraitOutline" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="verification">
                <n-input v-model:value="formMobileValue.verification" placeholder="输入验证码">
                  <template #prefix>
                    <n-icon :component="ShieldCheckmarkOutline" />
                  </template>
                  <template #suffix>
                    <n-button
                      text
                      type="info"
                      :disabled="disabled"
                      @click="handleGetVerificationCode"
                      >获取验证码</n-button
                    >
                  </template>
                </n-input>
              </n-form-item>
            </n-form>
          </n-tab-pane>
        </n-tabs>
        <template #footer>
          <n-button type="primary" block strong @click="handleSubmit" :loading="loading">
            登 录
          </n-button>
        </template>
      </n-card>
      <n-space justify="center">
        <div>
          <n-divider dashed>其他登录方式</n-divider>
          <n-space justify="space-around" size="large">
            <n-button text style="font-size: 32px">
              <n-icon :component="LogoWechat" color="#0DA052"
            /></n-button>
            <n-button text style="font-size: 32px">
              <n-icon :component="LogoAlipay" color="#089EE3" />
            </n-button>
          </n-space>
        </div>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { FormInst } from 'naive-ui'
import { websiteConfig } from '@/config/website.config'
import {
  PersonOutline,
  LockClosedOutline,
  PhonePortraitOutline,
  ShieldCheckmarkOutline,
  LogoWechat,
  LogoAlipay,
} from '@vicons/ionicons5'

const tagDefaultValue = ref('accountSignin')
const loading = ref(false)
const disabled = ref(true)
const formRefAccount = ref<FormInst | null>(null)
const formRefMobile = ref<FormInst | null>(null)

const formAccountValue = ref({
  username: '',
  password: '',
})
const formMobileValue = ref({
  mobile: '',
  verification: '',
})

const accountRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '用户名不能小于5个字符', trigger: 'blur' },
    { max: 32, message: '用户名不能大于32个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能是英文、数字和_', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, message: '密码不能小于5个字符', trigger: 'blur' },
    { max: 32, message: '密码不能大于32个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能是英文、数字和_', trigger: 'blur' },
  ],
})
const mobileRules = ref({
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      pattern: /^0?(13|14|15|16|17|18|19)[0-9]{9}$/,
      message: '请输入11位手机号码',
      trigger: 'blur',
    },
  ],
  verification: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^[0-9]{6}$/, message: '请输入6位验证码', trigger: 'blur' },
  ],
})

const handleUpdateValue = (value: string) => {
  tagDefaultValue.value = value
  formAccountValue.value = {
    username: '',
    password: '',
  }
  formMobileValue.value = {
    mobile: '',
    verification: '',
  }
}

const handleGetVerificationCode = () => {
  if (!formMobileValue.value.mobile) {
    window['$message'].error('请输入手机号码')
    return false
  }
  console.log('获取验证码')
}

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault()

  const formRef = tagDefaultValue.value === 'accountSignin' ? formRefAccount : formRefMobile

  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('我被点击了')
      // message.success('Valid')
    } else {
      console.log(errors)
      // message.error('Invalid')
    }
  })
}

watch(
  formMobileValue,
  (newValue) => {
    if (newValue.mobile.length === 11) {
      const mobileRegex = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/
      const isValidMobile = mobileRegex.test(newValue.mobile)
      if (isValidMobile) {
        disabled.value = false
      }
    }
  },
  { deep: true },
)
</script>

<style scoped lang="less">
.login-container {
  & {
    @apply min-h-screen bg-login-bg;
  }

  .left,
  .right {
    @apply flex items-center justify-center;
  }

  .left {
    @apply bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200;
    & > .left-item {
      @apply py-5 px-0;
      @apply lg:max-xl:flex lg:max-xl:items-center lg:max-xl:justify-center;
      & > .left-item-lt {
        @apply lg:max-xl:basis-1/2;

        .left-item-logo {
          @apply flex items-center justify-center;
          & > .left-item-logo-img {
            @apply w-9 h-9;
            margin-right: 0.375rem;
          }
          & > .left-item-logo-title {
            @apply text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-indigo-500 to-blue-500;
          }
        }
        & > .left-item-title {
          @apply h-20 font-semibold text-2xl/20 text-center;
        }
      }
      & > .coding-img {
        @apply xs:max-sm:hidden sm:max-md:hidden md:max-lg:hidden;
        @apply lg:max-xl:basis-1/2;
      }
    }
  }

  .right {
    @apply bg-white flex-col;
    & > .right-item {
      @apply sm:max-md:w-2/4 sm:max-lg:w-2/3 md:max-lg:w-2/5 lg:max-xl:w-2/5 xl:w-2/5 2xl:w-1/3;
    }
  }
}
</style>
