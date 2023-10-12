import loginbgImage from '@/assets/images/loginbg.png'
import logoImage from '@/assets/images/logo128.png'

const appThemeList: string[] = [
  '#2d8cf0',
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
  '#FF3D68',
  '#00C1D4',
  '#71EFA3',
  '#171010',
  '#78DEC7',
  '#1768AC',
  '#FB9300',
  '#FC5404',
]

export const websiteSetting = Object.freeze({
  // 网站标题
  title: 'Airuisi Admin Pro',
  // 网站logo
  logo: logoImage,
  // 登录背景图
  loginImage: loginbgImage,
  // 登录文字描述
  loginDesc: 'Airuisi Admin Pro中后台前端/设计解决方案',
})

export const designSetting = Object.freeze({
  //深色主题
  appDarkTheme: false,
  //系统主题色
  appTheme: '#2d8cf0',
  //系统内置主题色列表
  appThemeList,
  //国际语言
  locale: 'zh-CN',
  // 水印
  watermark: false,
})

export const projectSetting = Object.freeze({
  // token有效期
  tokenExpire: 60 * 60,
  // 开启权限验证
  permission: true,
  // 权限使用方式,菜单权限模式 static 前端固定路由 dynamic 动态获取
  permissionMode: 'dynamic',

  // 顶部
  header: {
    // 最小高度
    // minHeight: 56,
    // 高度
    // height: 56,
    // 背景色
    bgColor: '#fff',
    // 固定顶部
    fixed: true,
    // 显示重载按钮
    isReload: true,
    // 显示折叠菜单按钮
    isMenu: true,
    // 显示面包屑
    isBreadcrumb: true,
  },
  //菜单
  menu: {
    // 最小宽度
    minMenuWidth: 64,
    // 菜单宽度
    menuWidth: 200,
    // 固定菜单
    fixed: false,
    // 分割菜单
    // mixMenu: false,
    // 触发移动端侧边栏的宽度
    // mobileWidth: 800,
    // 折叠菜单
    collapsed: false,
    // 折叠菜单按钮 arrow-circle bar
    showTrigger: 'bar',
  },

  //导航模式 vertical 左侧菜单垂直模式 horizontal 顶部菜单水平模式 vertical-mix 垂直混合模式 horizontal-mix 水平混合模式
  navMode: 'horizontal',
  //导航风格 dark 暗色侧边栏 light 白色侧边栏 header-dark 暗色顶栏
  navTheme: 'dark',
  // 隐藏/显示顶栏
  showHeader: true,
  // 隐藏/显示logo
  showLogo: true,
  // 隐藏/显示多标签
  showMultiTabs: true,
  //页脚
  showFooter: true,

  // 是否处于移动端模式
  // isMobile: false,

  //多标签
  multiTabs: {
    //背景色
    // bgColor: '#fff',
    // 固定多标签
    fixed: false,
  },

  //路由动画类型 zoom-out zoom-fade slide slide-fade fade bounce
  pageAnimateType: 'bounce',
})
