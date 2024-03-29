import { App } from 'vue'
// import noSideSpace from '@/directives/form'

// import { permission } from '@/directives/permission'
// import copy from '@/directives/copy'
// import debounce from '@/directives/debounce'
// import throttle from '@/directives/throttle'
// import draggable from '@/directives/draggable'

/**
 * 注册全局自定义指令
 * @param app
 */
export const setupDirectives = (app: App<Element>) => {
  console.log(app)
  // 权限控制指令（演示）
  // app.directive('permission', permission)
  // 复制指令
  // app.directive('copy', copy)
  // 防抖指令
  // app.directive('debounce', debounce)
  // 节流指令
  // app.directive('throttle', throttle)
  // 拖拽指令
  // app.directive('draggable', draggable)
  // app.directive('trim', noSideSpace)
}
