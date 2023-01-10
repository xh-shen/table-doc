/*
 * @Author: shen
 * @Date: 2022-05-09 12:53:21
 * @LastEditors: shen
 * @LastEditTime: 2023-01-10 09:02:41
 * @Description:
 */
import type { DefaultTheme } from 'vitepress'

const guideSidebars = [
	{
		text: '',
		items: [
			{
				text: '介绍',
				link: '/guide/introduce'
			},
			{
				text: '快速开始',
				link: '/guide/'
			},

			{
				text: '国际化',
				link: '/guide/locale'
			},
			{
				text: '动态主题',
				link: '/guide/theming'
			},
			{
				text: '暗黑模式',
				link: '/guide/dark-mode'
			},
			{
				text: '更新日志',
				link: '/guide/changelog'
			}
		]
	}
]

const docSidebars = [
	{
		text: '',
		items: [
			{
				text: 'API',
				link: '/doc/api'
			},
			{
				text: 'TYPE',
				link: '/doc/type'
			},
			{
				text: '常见问题',
				link: '/doc/questions'
			}
		]
	}
]

const demoSidebars = [
	{
		text: '',
		items: [
			{
				text: '基本用法',
				link: '/demo/basic'
			},
			{
				text: '分页展示',
				link: '/demo/pagination'
			},
			{
				text: '行列拖拽',
				link: '/demo/dragable'
			},
			{
				text: '排序和过滤',
				link: '/demo/filter'
			},
			{
				text: '多选和单选',
				link: '/demo/selection'
			},
			{
				text: '树形和展开行',
				link: '/demo/tree'
			},
			{
				text: '合并和分组',
				link: '/demo/group'
			},
			{
				text: '可编辑',
				link: '/demo/editable'
			},
			{
				text: '全局配置',
				link: '/demo/config'
			}
		]
	}
]

const getSidebars = () => {
	return {
		'/guide/': guideSidebars,
		'/doc/': docSidebars,
		'/demo/': demoSidebars
	}
}

export const sidebar: DefaultTheme.Sidebar = getSidebars()
