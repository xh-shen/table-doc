/*
 * @Author: shen
 * @Date: 2022-06-20 08:57:01
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 18:49:37
 * @Description:
 */
import Inspect from 'vite-plugin-inspect'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { MarkdownTransform } from '../plugins/markdown-transform'
import type { Alias } from 'vite'

const projRoot = resolve(__dirname, '../../')

const alias: Alias[] = []
if (process.env.NODE_ENV !== 'production') {
	alias.push(
		{
			find: /^@shene\/table$/,
			replacement: resolve(projRoot, './core/src')
		},
		{
			find: /^@shene\/table\/dist\/index.css$/,
			replacement: resolve(projRoot, './core/src/style/index.scss')
		}
	)
}

export const vite = {
	server: {
		host: true,
		port: 9999,
		fs: {
			allow: [projRoot]
		}
	},
	resolve: {
		alias
	},
	plugins: [vueJsx(), MarkdownTransform(), Inspect()]
}
