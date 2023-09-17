<template>
  <div class="ars-login-container">
    <div class="ars-main">
      <div class="ars-left" :style="{ backgroundImage: `url(${loginImage})` }">
        <div class="ars-left-mask"></div>
        <div class="ars-left-desc">
          <div>
            {{ loginDesc }}
          </div>
        </div>
        <!---remove custom style-->
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="ars-right">
        <div class="ars-right-item">
          <div class="ars-right-logo">
            <n-image class="ars-right-logo-img" :src="logo" />
            <div class="ars-right-logo-title">{{ title }}</div>
          </div>
          <n-card :title="$t('login.card.title')" :bordered="false" class="ars-right-card">
            <n-tabs
              :default-value="tagDefaultValue"
              @update:value="handleUpdateValue"
              size="large"
              pane-style="margin-top: 0.625rem;"
              justify-content="space-evenly"
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
              <n-button
                class="signinbtn"
                type="primary"
                strong
                block
                @click="handleSubmit"
                :loading="loading"
              >
                {{ $t('login.signInFormTitle') }}
              </n-button>
            </template>
          </n-card>
          <n-space justify="center">
            <div>
              <n-divider>{{ $t('login.otherSignIn') }}</n-divider>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { FormInst, useMessage, useNotification } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/store/modules/user'
import { useI18n } from '@/hooks/web/useI18n'
import { useApp } from '@/hooks/setting/useApp'
import { getSmsCaptcha } from '@/api/system/user'
import { GetCodeBtn } from '/#/config'
import { isChinesePhoneNumber } from '@/utils/is'
import { ResultEnum } from '@/constants/httpEnum'
import { PageEnum } from '@/constants/pageEnum'
import {
  LockClosedOutline,
  LogoAlipay,
  LogoWechat,
  PersonOutline,
  PhonePortraitOutline,
  ShieldCheckmarkOutline,
} from '@vicons/ionicons5'

const { t } = useI18n()
const { getWebsiteSetting } = useApp()
const { login } = useUser()
const $message = useMessage()
const $notification = useNotification()
const router = useRouter()
const route = useRoute()

document.body.style.overflow = 'auto'

const loginImage = getWebsiteSetting.value?.loginImage
const loginDesc = getWebsiteSetting.value?.loginDesc
const logo = getWebsiteSetting.value?.logo
const title = getWebsiteSetting.value?.title

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
.ars-login-container {
  @apply relative min-h-screen flex;
  & > .ars-main {
    @apply flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white;
    & > .ars-left {
      @apply sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center px-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative;
      & > .ars-left-mask {
        @apply absolute inset-0 z-0 from-indigo-600 to-blue-500 bg-gradient-to-b opacity-75;
      }
      & .ars-left-desc {
        @apply z-10 max-w-md w-full -mt-15;
        & > div {
          @apply mb-6 font-bold leading-tight sm:text-3xl xl:text-4xl;
        }
      }
      & .circles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      & .circles li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        animation: animate 25s linear infinite;
        bottom: -150px;
      }
      & .circles li:nth-child(1) {
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      & .circles li:nth-child(2) {
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      & .circles li:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      & .circles li:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      & .circles li:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      & .circles li:nth-child(6) {
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
      }
      & .circles li:nth-child(7) {
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
      }
      & .circles li:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      & .circles li:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      & .circles li:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
    }
    & > .ars-right {
      @apply w-2/5 w-full bg-white pt-10 sm:w-auto md:w-full md:flex md:items-center md:justify-center xl:w-2/5 xl:p-14;
      & > .ars-right-item {
        @apply md:max-w-md w-full space-y-8;
        & .ars-right-logo {
          @apply flex items-center justify-center;
          & > .ars-right-logo-img {
            @apply w-9 h-9;
            margin-right: 0.375rem;
          }
          & > .ars-right-logo-title {
            @apply text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-indigo-500 to-blue-500;
          }
        }
        & .ars-right-card {
          @apply mt-8 space-y-6 md:w-9/12 md:m-auto;
        }
        & .signinbtn {
          @apply w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500;
        }
      }
    }
  }
}
</style>
