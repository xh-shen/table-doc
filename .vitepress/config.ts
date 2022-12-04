/*
 * @Author: shen
 * @Date: 2022-12-02 10:42:47
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 16:30:48
 * @Description:
 */
import { defineConfig } from 'vitepress'
import { nav } from './config/nav'
import { sidebar } from './config/sidebar'
import { theme } from './config/theme'
import { vite } from './config/vite'
import { mdPlugin } from './config/plugins'

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
	title: 'Shene Table',
	description: 'Vue3高性能表格组件',
	lastUpdated: true,
	base: BASE_URL,
	themeConfig: {
		logo: BASE_URL + '/images/logo.png',
		nav,
		sidebar,
		algolia: {
			appId: 'YSCZ4HY6BZ',
			apiKey: 'b9f4d9dd8b01ecbff97b2f1274a37a73',
			indexName: 'table'
			// searchParameters: {
			// 	facetFilters: ['tags:guide,api']
			// }
		},
		socialLinks: [{ icon: 'github', link: 'https://github.com/xh-shen/table-doc' }],
		localeLinks: {
			text: '简体中文',
			items: []
		},

		footer: {
			copyright: 'Copyright © 2022-present Shen'
		}
	},
	markdown: {
		config: md => mdPlugin(md),
		theme: theme as any
		// lineNumbers: true
	},
	vue: {
		template: {
			compilerOptions: {
				directiveTransforms: buildTransformers()
			}
		}
	},
	vite: vite as any
})
