/*
 * @Author: shen
 * @Date: 2022-12-04 21:39:30
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 22:55:32
 * @Description:
 */
import { getParameters } from 'codesandbox/lib/api/define'

export const packageJson = JSON.stringify({
	name: 'shene-table-demo',
	version: '0.0.0',
	private: true,
	scripts: {
		dev: 'vite',
		build: 'vite build',
		serve: 'vite preview'
	},
	dependencies: {
		vue: '^3.2.40',
		'@shene/table': 'npm:@shene/table@latest'
	},
	devDependencies: {
		vite: '^2.9.5',
		'@vue/compiler-sfc': '^3.2.26',
		'@vitejs/plugin-vue': '^2.3.1',
		'@vitejs/plugin-vue-jsx': '^1.3.3'
	}
})

export const viteConfigJs = `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
	plugins: [vue(), vueJsx()],
});
`

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "turbo && turbo dev"
  }
`

export const stackblitzHtml = `
	<div id="app"></div>
	<script type="module" src="/src/main.js"></script>
`

export const stackblitzmMainJs = `
	import { createApp } from "vue";
	import STable from "@shene/table";
	import Demo from './demo.vue';
	import "@shene/table/dist/index.css";

	const app = createApp(Demo);
  app.use(STable).mount('#app');
`

export const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Shene Table Demo</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`

export const appVue = `<template>
<Demo />
</template>

<script>
import { defineComponent } from "vue";
import Demo from "./demo.vue";

export default defineComponent({
components: {
  Demo,
},
});
</script>`

export const mainJs = `
	import { createApp } from "vue";
	import STable from "@shene/table";
	import App from "./App.vue";
	import "@shene/table/dist/index.css";

	createApp(App).use(STable).mount("#app");
`

type Meta = {
	title: string
}

export function getCodeSandboxParams(code: string, meta: Meta): string {
	return getParameters({
		files: {
			'package.json': {
				content: JSON.stringify({
					title: meta.title,
					dependencies: {
						vue: 'next',
						'@shene/table': 'npm:@shene/table@latest'
					},
					devDependencies: {
						'@vue/cli-plugin-babel': '~4.5.0',
						typescript: '^4.0.5'
					},
					browserslist: ['> 0.2%', 'not dead']
				}),
				isBinary: false
			},
			'index.html': {
				content: indexHtml,
				isBinary: false
			},
			'src/demo.vue': {
				content: code,
				isBinary: false
			},
			'src/App.vue': {
				content: appVue,
				isBinary: false
			},
			'src/main.js': {
				content: mainJs,
				isBinary: false
			}
		}
	})
}
