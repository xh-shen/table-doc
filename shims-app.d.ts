/*
 * @Author: shen
 * @Date: 2022-06-06 17:04:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-03 22:16:14
 * @Description:
 */
declare const __VP_HASH_MAP__: Record<string, string>
declare const __ALGOLIA__: boolean
declare const __CARBON__: boolean
declare const __VUE_PROD_DEVTOOLS__: boolean

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<any, any, any>
	export default component
}

declare module '@siteData' {
	import type { SiteData } from 'vitepress'
	const data: SiteData
	export default data
}

declare module '@theme/index' {
	import type { Theme } from 'vitepress'
	const theme: Theme
	export default theme
}
