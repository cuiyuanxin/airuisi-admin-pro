<template>
  <div class="ars-login-container">
    <div class="ars-left">
      <div
        class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
        :style="{ backgroundImage: `url(${loginImage})` }"
      >
        <div
          class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"
        ></div>
        <div class="w-full max-w-md z-10">
          <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
            Reference site about Lorem Ipsum..
          </div>
          <div class="sm:text-sm xl:text-md text-gray-200 font-normal">
            What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting
            industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            when an unknown printer took a galley of type and scrambled it to make a type specimen
            book it has?
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
      <div
        class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white"
      >
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900">Welcom Back!</h2>
            <p class="mt-2 text-sm text-gray-500">Please sign in to your account</p>
          </div>
          <div class="flex flex-row justify-center items-center space-x-3">
            <!--                        <a-->
            <!--href="https://www.behance.net/ajeeshmon" target="_blank"-->
            <!--                           class="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"><img-->
            <!--                                class="w-4 h-4"-->
            <!--                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0xNS45OTcgMy45ODVoMi4xOTF2LTMuODE2Yy0uMzc4LS4wNTItMS42NzgtLjE2OS0zLjE5Mi0uMTY5LTMuMTU5IDAtNS4zMjMgMS45ODctNS4zMjMgNS42Mzl2My4zNjFoLTMuNDg2djQuMjY2aDMuNDg2djEwLjczNGg0LjI3NHYtMTAuNzMzaDMuMzQ1bC41MzEtNC4yNjZoLTMuODc3di0yLjkzOWMuMDAxLTEuMjMzLjMzMy0yLjA3NyAyLjA1MS0yLjA3N3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"/></span>-->
            <!--                            <a-->
            <!--href="https://twitter.com/ajeemon?lang=en" target="_blank"-->
            <!--                               class="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg text-white bg-blue-400 hover:shadow-lg cursor-pointer transition ease-in duration-300"><img-->
            <!--                                    class="w-4 h-4"-->
            <!--                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDY4MS4zMzQ2NCA2ODEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIwMC45NjQ4NDQgNTE1LjI5Mjk2OWMyNDEuMDUwNzgxIDAgMzcyLjg3MTA5NC0xOTkuNzAzMTI1IDM3Mi44NzEwOTQtMzcyLjg3MTA5NCAwLTUuNjcxODc1LS4xMTcxODgtMTEuMzIwMzEzLS4zNzEwOTQtMTYuOTM3NSAyNS41ODU5MzctMTguNSA0Ny44MjQyMTgtNDEuNTg1OTM3IDY1LjM3MTA5NC02Ny44NjMyODEtMjMuNDgwNDY5IDEwLjQ0MTQwNi00OC43NTM5MDcgMTcuNDYwOTM3LTc1LjI1NzgxMyAyMC42MzY3MTggMjcuMDU0Njg3LTE2LjIzMDQ2OCA0Ny44MjgxMjUtNDEuODk0NTMxIDU3LjYyNS03Mi40ODgyODEtMjUuMzIwMzEzIDE1LjAxMTcxOS01My4zNjMyODEgMjUuOTE3OTY5LTgzLjIxNDg0NCAzMS44MDg1OTQtMjMuOTE0MDYyLTI1LjQ3MjY1Ni01Ny45NjQ4NDMtNDEuNDAyMzQ0LTk1LjY2NDA2Mi00MS40MDIzNDQtNzIuMzY3MTg4IDAtMTMxLjA1ODU5NCA1OC42ODc1LTEzMS4wNTg1OTQgMTMxLjAzMTI1IDAgMTAuMjg5MDYzIDEuMTUyMzQ0IDIwLjI4OTA2MyAzLjM5ODQzNyAyOS44ODI4MTMtMTA4LjkxNzk2OC01LjQ4MDQ2OS0yMDUuNTAzOTA2LTU3LjYyNS0yNzAuMTMyODEyLTEzNi45MjE4NzUtMTEuMjUgMTkuMzYzMjgxLTE3Ljc0MjE4OCA0MS44NjMyODEtMTcuNzQyMTg4IDY1Ljg3MTA5MyAwIDQ1LjQ2MDkzOCAyMy4xMzY3MTkgODUuNjA1NDY5IDU4LjMxNjQwNyAxMDkuMDgyMDMyLTIxLjUtLjY2MDE1Ni00MS42OTUzMTMtNi41NjI1LTU5LjM1MTU2My0xNi4zODY3MTktLjAxOTUzMS41NTA3ODEtLjAxOTUzMSAxLjA4NTkzNy0uMDE5NTMxIDEuNjcxODc1IDAgNjMuNDY4NzUgNDUuMTcxODc1IDExNi40NjA5MzggMTA1LjE0NDUzMSAxMjguNDY4NzUtMTEuMDE1NjI1IDIuOTk2MDk0LTIyLjYwNTQ2OCA0LjYwOTM3NS0zNC41NTg1OTQgNC42MDkzNzUtOC40Mjk2ODcgMC0xNi42NDg0MzctLjgyODEyNS0yNC42MzI4MTItMi4zNjMyODEgMTYuNjgzNTk0IDUyLjA3MDMxMiA2NS4wNjY0MDYgODkuOTYwOTM3IDEyMi40MjU3ODEgOTEuMDIzNDM3LTQ0Ljg1NTQ2OSAzNS4xNTYyNS0xMDEuMzU5Mzc1IDU2LjA5NzY1Ny0xNjIuNzY5NTMxIDU2LjA5NzY1Ny0xMC41NjI1IDAtMjEuMDAzOTA2LS42MDU0NjktMzEuMjYxNzE4OC0xLjgxNjQwNyA1Ny45OTk5OTk4IDM3LjE3NTc4MSAxMjYuODcxMDkzOCA1OC44NzEwOTQgMjAwLjg4NjcxODggNTguODcxMDk0IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PC9nPjwvc3ZnPg=="/></span>-->
            <!--                                <a-->
            <!--href="https://in.linkedin.com/in/ajeeshmon" target="_blank"-->
            <!--                                   class="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300"><img-->
            <!--                                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0yMy45OTQgMjR2LS4wMDFoLjAwNnYtOC44MDJjMC00LjMwNi0uOTI3LTcuNjIzLTUuOTYxLTcuNjIzLTIuNDIgMC00LjA0NCAxLjMyOC00LjcwNyAyLjU4N2gtLjA3di0yLjE4NWgtNC43NzN2MTYuMDIzaDQuOTd2LTcuOTM0YzAtMi4wODkuMzk2LTQuMTA5IDIuOTgzLTQuMTA5IDIuNTQ5IDAgMi41ODcgMi4zODQgMi41ODcgNC4yNDN2Ny44MDF6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtLjM5NiA3Ljk3N2g0Ljk3NnYxNi4wMjNoLTQuOTc2eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIuODgyIDBjLTEuNTkxIDAtMi44ODIgMS4yOTEtMi44ODIgMi44ODJzMS4yOTEgMi45MDkgMi44ODIgMi45MDkgMi44ODItMS4zMTggMi44ODItMi45MDljLS4wMDEtMS41OTEtMS4yOTItMi44ODItMi44ODItMi44ODJ6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PC9nPjwvc3ZnPg=="-->
            <!--                                        class="w-4 h-4"/></a>-->
          </div>
          <div class="flex items-center justify-center space-x-2">
            <span class="h-px w-16 bg-gray-200"></span>
            <span class="text-gray-300 font-normal">or continue with</span>
            <span class="h-px w-16 bg-gray-200"></span>
          </div>
          <form class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="relative">
              <div class="absolute right-3 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
              <input
                class="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                type=""
                placeholder="mail@gmail.com"
                value="mail@gmail.com"
              />
            </div>
            <div class="mt-8 content-center">
              <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide"> Password </label>
              <input
                class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="Enter your password"
                value="*****|"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="text-indigo-400 hover:text-blue-500"> Forgot your password? </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Sign in
              </button>
            </div>
            <p
              class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500"
            >
              <span>Don't have an account?</span>
              <a
                href="#"
                class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                >Sign up</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  <n-grid class="ars-login-container" item-responsive responsive="screen">
    <n-grid-item span="9 xs:24 s:24 l:9" class="ars-left">
      <div class="ars-left-item">
        <div class="ars-left-item-lt">
          <div class="ars-left-item-title">{{ getWebsiteSetting.loginDesc }}</div>
        </div>
        <div class="ars-coding-img">
          <n-image :src="getWebsiteSetting.loginImage" preview-disabled />
        </div>
      </div>
    </n-grid-item>
    <n-grid-item span="15 xs:24 s:24 l:15" class="ars-right">
      <div class="ars-right-logo">
        <n-image class="ars-right-logo-img" :src="getWebsiteSetting.logo" />
        <div class="ars-right-logo-title">{{ getWebsiteSetting.title }}</div>
      </div>
      <n-card :title="$t('login.card.title')" :bordered="false" class="ars-right-item">
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

const loginImage = getWebsiteSetting.value?.loginImage

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
  //@apply min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500;
  //
  & > .ars-left {
    @apply flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white;
    //  @apply flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200;
    //  .ars-left-item {
    //    @apply py-5 px-0 lg:max-xl:flex lg:max-xl:items-center lg:max-xl:justify-center;
    //    .ars-left-item-lt {
    //      @apply lg:max-xl:basis-1/2;
    //      & .ars-left-item-title {
    //        @apply h-20 font-semibold text-2xl/20 text-center;
    //      }
    //    }
    //& .ars-coding-img {
    //  @apply xs:max-sm:hidden sm:max-md:hidden md:max-lg:hidden;
    //  @apply lg:max-xl:basis-1/2;
    //}
    //}
  }

  //& > .ars-right {
  //  @apply flex items-center justify-center bg-white flex-col;
  //  & > .ars-right-logo {
  //    @apply flex items-center justify-center;
  //    & > .ars-right-logo-img {
  //      @apply w-9 h-9;
  //      margin-right: 0.375rem;
  //    }
  //    & > .ars-right-logo-title {
  //      @apply text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-indigo-500 to-blue-500;
  //    }
  //  }
  //  & > .ars-right-item {
  //    @apply sm:max-md:w-2/4 sm:max-lg:w-2/3 md:max-lg:w-2/5 lg:max-xl:w-2/5 xl:w-2/5 2xl:w-1/3;
  //  }
  //}
}
</style>
