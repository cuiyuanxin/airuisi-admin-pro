<template>
  <n-grid class="login-container login-container-maxsm" item-responsive responsive="screen">
    <n-grid-item span="9 xs:24 s:24 l:9" class="left">
      <div class="left-item">
        <div class="left-item-lt">
          <div class="left-item-logo">
            <n-image class="left-item-logo-img" :src="getWebsiteSetting.logo" />
            <div class="left-item-logo-title">{{ getWebsiteSetting.title }}</div>
          </div>
          <div class="left-item-title">{{ getWebsiteSetting.loginDesc }}</div>
        </div>
        <div class="coding-img">
          <n-image :src="getWebsiteSetting.loginImage" preview-disabled />
        </div>
      </div>
    </n-grid-item>
    <n-grid-item span="15 xs:24 s:24 l:15" class="right">
      <n-card :title="$t('login.card.title')" :bordered="false" class="right-item">
        <n-tabs
          :default-value="tagDefaultValue"
          @update:value="handleUpdateValue"
          size="large"
          pane-style="margin-top: 0.625rem;"
        >
          <n-tab-pane name="accountSignin" :tab="$t('login.card.tag1')">
            <n-form
              ref="formRefAccount"
              :model="formAccountValue"
              :rules="accountRules"
              label-placement="left"
            >
              <n-form-item path="username">
                <n-input
                  v-model:value="formAccountValue.username"
                  :placeholder="$t('login.usernamePlaceholder')"
                >
                  <template #prefix>
                    <n-icon :component="PersonOutline" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item-row path="password">
                <n-input
                  v-model:value="formAccountValue.password"
                  type="password"
                  :placeholder="$t('login.passwordPlaceholder')"
                  show-password-on="click"
                >
                  <template #prefix>
                    <n-icon :component="LockClosedOutline" />
                  </template>
                </n-input>
              </n-form-item-row>
            </n-form>
          </n-tab-pane>
          <n-tab-pane name="mobileSignin" :tab="$t('login.card.tag2')">
            <n-form
              ref="formRefMobile"
              :model="formMobileValue"
              :rules="mobileRules"
              label-placement="left"
            >
              <n-form-item path="mobile">
                <n-input
                  v-model:value="formMobileValue.mobile"
                  :placeholder="$t('login.mobilePlaceholder')"
                >
                  <template #prefix>
                    <n-icon :component="PhonePortraitOutline" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="verification">
                <n-input
                  v-model:value="formMobileValue.verification"
                  :placeholder="$t('login.verificationPlaceholder')"
                >
                  <template #prefix>
                    <n-icon :component="ShieldCheckmarkOutline" />
                  </template>
                  <template #suffix>
                    <n-button
                      text
                      type="info"
                      :disabled="getCodeBtn.disabled"
                      @click="handleGetSmsCaptcha"
                      >{{ getCodeBtn.btnText }}
                    </n-button>
                  </template>
                </n-input>
              </n-form-item>
            </n-form>
          </n-tab-pane>
        </n-tabs>
        <template #footer>
          <n-button type="primary" block strong @click="handleSubmit" :loading="loading">
            {{ $t('login.signInFormTitle') }}
          </n-button>
        </template>
      </n-card>
      <n-space justify="center">
        <div>
          <n-divider dashed>{{ $t('login.otherSignIn') }}</n-divider>
          <n-space justify="space-around" size="large">
            <n-button text style="font-size: 32px">
              <n-icon :component="LogoWechat" color="#0DA052" />
            </n-button>
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
import { reactive, ref, watch } from 'vue'
import { FormInst, useMessage, useNotification } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import {
  LockClosedOutline,
  LogoAlipay,
  LogoWechat,
  PersonOutline,
  PhonePortraitOutline,
  ShieldCheckmarkOutline,
} from '@vicons/ionicons5'
import { useUser } from '@/store/modules/user'
import { useI18n } from '@/hooks/web/useI18n'
import { useApp } from '@/hooks/setting/useApp'
import { getSmsCaptcha } from '@/api/system/user'
import { GetCodeBtn } from '/#/config'
import { isChinesePhoneNumber } from '@/utils/is'
import { ResultEnum } from '@/constants/httpEnum'
import { PageEnum } from '@/constants/pageEnum'

const { t } = useI18n()
const { getWebsiteSetting } = useApp()
const { login } = useUser()
const $message = useMessage()
const $notification = useNotification()
const router = useRouter()
const route = useRoute()

const tagDefaultValue = ref('accountSignin')
const loading = ref(false)
const getCodeBtn = reactive<GetCodeBtn>({
  timer: null,
  seconds: 60,
  btnText: t('login.verificationBtn'),
  disabled: true,
})
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
    { required: true, message: t('login.usernamePlaceholder'), trigger: 'blur' },
    { min: 5, message: t('login.usernameRulesMin'), trigger: 'blur' },
    { max: 32, message: t('login.usernameRulesMax'), trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: t('login.usernameRulesRepg'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('login.passwordPlaceholder'), trigger: 'blur' },
    { min: 5, message: t('login.passwordRulesMin'), trigger: 'blur' },
    { max: 32, message: t('login.passwordRulesMax'), trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: t('login.passwordRulesRepg'), trigger: 'blur' },
  ],
})
const mobileRules = ref({
  mobile: [
    { required: true, message: t('login.mobilePlaceholder'), trigger: 'blur' },
    {
      pattern: /^0?(13|14|15|16|17|18|19)[0-9]{9}$/,
      message: t('login.mobileRulesRepg'),
      trigger: 'blur',
    },
  ],
  verification: [
    { required: true, message: t('login.verificationPlaceholder'), trigger: 'blur' },
    { pattern: /^[0-9]{6}$/, message: t('login.verificationRulesRepg'), trigger: 'blur' },
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

const handleGetSmsCaptcha = () => {
  if (!formMobileValue.value.mobile) {
    $message.error(t('login.mobilePlaceholder'))
    return false
  }
  if (!isChinesePhoneNumber(formMobileValue.value.mobile)) {
    $message.error(t('login.mobileRules'))
    return false
  }

  getSmsCaptcha({
    mobile: formMobileValue.value.mobile,
  }).then((res) => {
    const { code, result } = res
    if (code === ResultEnum.SUCCESS) {
      initgetCodeTimer()
      // 对接正式程序可删除该程序
      $notification.info({
        content: t('sys.common.infoTip'),
        meta: t('login.smsCode') + `: ${result.code}`,
        duration: 2500,
        keepAliveOnHover: true,
      })
    }
  })
}

const initgetCodeTimer = () => {
  if (getCodeBtn.timer) {
    window.clearInterval(getCodeBtn.timer)
    getCodeBtn.timer = null
  }
  let count = getCodeBtn.seconds
  getCodeBtn.btnText = t('login.verificationNewBtn') + `(${count})`
  getCodeBtn.timer = window.setInterval(() => {
    count--
    if (count === 0) {
      if (getCodeBtn.timer) {
        window.clearInterval(getCodeBtn.timer)
        getCodeBtn.timer = null
        getCodeBtn.btnText = t('login.verificationBtn')
      }
      return
    }
    getCodeBtn.btnText = t('login.verificationNewBtn') + `(${count})`
  }, 1000)
}

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault()

  const formRef = tagDefaultValue.value === 'accountSignin' ? formRefAccount : formRefMobile

  formRef.value?.validate((errors) => {
    if (!errors) {
      const params =
        tagDefaultValue.value === 'accountSignin' ? formAccountValue.value : formMobileValue.value

      login(params).then((res) => {
        const { code, message } = res
        if (code === ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
          $message.success(t('login.loginSuccess'))
          if (route.name === PageEnum.BASE_LOGIN_NAME) {
            router.replace('/')
          } else router.replace(toPath)
        } else {
          $message.error(message || t('login.loginError'))
        }
      })
    } else {
      console.log(errors)
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
        getCodeBtn.disabled = false
      }
    }
  },
  { deep: true },
)
</script>

<style lang="less" scoped>
@import '@/styles/login';
</style>
