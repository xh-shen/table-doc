/*
 * @Author: shen
 * @Date: 2022-06-20 08:57:01
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 14:14:13
 * @Description:
 */
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
// import Inspect from 'vite-plugin-inspect'
// import mkcert from 'vite-plugin-mkcert'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { MarkdownTransform } from '../plugins/markdown-transform'

const projRoot = resolve(__dirname, '../../')

export const vite = {
	server: {
		host: true,
		port: 9999,
		fs: {
			allow: [projRoot]
		}
	},
	plugin: [
		vueJsx(),
		UnoCSS()
		// MarkdownTransform(),
		// Inspect(),
		// mkcert(),
	]
}
