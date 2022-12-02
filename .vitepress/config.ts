/*
 * @Author: shen
 * @Date: 2022-12-02 10:42:47
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 14:02:28
 * @Description:
 */
import { defineConfig } from 'vitepress'
// import { nav } from './config/nav'
// import { sidebar } from './config/sidebar'
import { vite } from './config/vite'
// import { mdPlugin } from './config/plugins'

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : ''

const buildTransformers = () => {
	const transformer = () => {
		return {
			props: [],
			needRuntime: true
		}
	}

	const transformers = {}
	const directives = [
		'infinite-scroll',
		'loading',
		'popover',
		'click-outside',
		'repeat-click',
		'trap-focus',
		'mousewheel',
		'resize'
	]
	directives.forEach(k => {
		transformers[k] = transformer
	})

	return transformers
}

export default defineConfig({
	lang: 'zh-CN',
	title: 'STable',
	description: 'Vue3高性能表格组件',
	lastUpdated: true,
	// appearance: false,
	base: BASE_URL,
	themeConfig: {
		logo: BASE_URL + '/images/logo.png',
		// nav,
		// sidebar,
		footer: {
			copyright: 'Copyright © 2022-present Shen'
		}
	},
	markdown: {
		// config: md => mdPlugin(md)
	},
	vue: {
		template: {
			compilerOptions: {
				directiveTransforms: buildTransformers()
			}
		}
	},
	vite
})
