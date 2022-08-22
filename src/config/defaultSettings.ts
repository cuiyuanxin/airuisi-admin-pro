/**
 * 项目默认配置项
 * navTheme - sidebar theme ['dark', 'light', 'realDark'] 三种主题
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * layout - 整体布局方式 ['side', 'top', 'mix']
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * splitMenus - 自动分割菜单mix模式下生效

 * contentWidth - 内容区布局： 流式 |  固定

 * title - 标题 ：string
 * colorWeak - 色盲模式
 */

export default {
  navTheme: 'dark', // 导航菜单的主题
  primaryColor: '#1890FF', // '#F5222D', // 默认主题色
  layout: 'side', // 整体布局方式
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  splitMenus: false, // 自动分割菜单

  contentWidth: 'Fluid', // 内容区布局

  // colorWeak: false,
  // menu: {
  //   locale: true,
  // },
  title: 'Airuisi Admin Pro',
  // pwa: false,
  // iconfontUrl: '',
  production: import.meta.env.MODE === 'production' && import.meta.env.VITE_APP_PREVIEW !== 'true',
}
