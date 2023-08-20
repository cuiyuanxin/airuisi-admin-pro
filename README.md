# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.


build/  
├── vite/  
│   ├── plugin/		        	# vite 插件封装  
│   ├── proxy.ts      			# vite 代理封装  
├── constant.ts       			# 常量配置  
├── getConfigFileName.ts    	# 获取配置文件变量名  
├── utils.styles				# 获取所有环境变量配置文件到process.env  
mock/  
├── modules/					# 不同模块的封装  
├── _createProdMockServer.ts 	# 生产环境中使用。需要手动导入所有模块  
├── _utils.ts 					# mock工具函数  
public/  
├── favicon.ico					# ico图标  
src/  
├── api/              			# API 请求封装  
├── assets/           			# 静态资源文件夹  
├── components/       			# 通用组件文件夹  
├── config/           			# 配置文件夹  
├── constants/        			# 常量和枚举  
├── directives/ 				# 指令  
├── hooks/ 						# 钩子  
├── layouts/          			# 布局组件文件夹  
├── locales/          			# 国际化语言资源文件夹  
│   ├── lang/ 					# 国际化语言配置文件  
│   ├── index.ts 			# vue app导入国际化语言模块  
├── plugins/ 					# vue app导入其他模块  
├── router/           			# 路由配置文件夹  
│   ├── modules/ 				# 路由不同模块封装  
│   ├── index.ts      			# 主路由配置  
├── stetings/ 					# 设置配置文件  
├── store/            			# 状态管理文件夹  
│   ├── modules/      			# 不同模块的状态管理  
│   ├── index.ts      			# 主状态管理配置  
├── styles/           			# 全局样式文件夹  
├── utils/            			# 工具函数文件夹  
├── views/            			# 页面组件文件夹  
├── App.vue           			# 根组件  
└── main.ts           			# 主入口文件  
types/            				# 自定义类型声明文件夹  