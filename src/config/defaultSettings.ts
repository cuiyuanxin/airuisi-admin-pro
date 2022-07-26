/**
 * 项目默认配置项
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * layout - 整体布局方式 ['sidemenu', 'topmenu', 'mix']
 * contentWidth - 内容区布局： 流式 |  固定
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * title - 标题 ：string
 * colorWeak - 色盲模式
 */

export default {
  navTheme: 'dark', // 导航菜单的主题
  primaryColor: '#1890ff', // '#F5222D', // 默认主题色
  layout: 'sidemenu', // 整体布局方式
  contentWidth: 'Fluid', // 内容区布局
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  // colorWeak: false,
  // menu: {
  //   locale: true,
  // },
  title: 'Airuisi Admin Pro',
  // pwa: false,
  // iconfontUrl: '',
  production: import.meta.env.MODE === 'production' && import.meta.env.VITE_APP_PREVIEW !== 'true',
}
