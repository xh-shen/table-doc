/*
 * @Author: shen
 * @Date: 2022-06-06 17:04:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 10:52:27
 * @Description:
 */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<any, any, any>
	export default component
}
