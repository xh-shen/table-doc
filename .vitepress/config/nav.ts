/*
 * @Author: shen
 * @Date: 2022-12-03 18:37:31
 * @LastEditors: shen
 * @LastEditTime: 2022-12-03 18:53:26
 * @Description:
 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
	{
		text: '指南',
		link: '/guide/',
		activeMatch: '/guide/'
	},
	{
		text: '文档',
		link: '/doc/',
		activeMatch: '/doc/'
	},
	{
		text: '示例',
		link: '/demo/',
		activeMatch: '/demo/'
	}
]
