<!--
 * @Author: shen
 * @Date: 2022-06-20 09:32:09
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 23:01:56
 * @Description: 
-->
<script lang="ts">
export default {
	name: 'Demo'
}
</script>
<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { CaretTop } from '@element-plus/icons-vue'
import {
	getCodeSandboxParams,
	packageJson,
	stackblitzmMainJs,
	stackblitzHtml,
	viteConfigJs,
	stackblitzRc
} from '../../utils/generateOnlineDemo'

import VExample from './example.vue'
import VSourceCode from './source-code.vue'

const props = defineProps<{
	demos: object
	source: string
	path: string
	rawSource: string
	description?: string
}>()

const vm = getCurrentInstance()!
const formRef = ref<any>(null)

const { copy, isSupported } = useClipboard({
	source: decodeURIComponent(props.rawSource),
	read: false
})

const [sourceVisible, toggleSourceVisible] = useToggle()

const formatPathDemos = computed(() => {
	const demos = {}
	Object.keys(props.demos).forEach(key => {
		demos[key.replace('../examples/', '').replace('.vue', '')] = props.demos[key].default
	})

	return demos
})

const decodedDescription = computed(() => decodeURIComponent(props.description!))

const handleCopyCode = async () => {
	const { $message } = vm.appContext.config.globalProperties
	if (!isSupported) {
		$message.error('不支持复制')
	}
	try {
		await copy()
		$message.success('复制成功')
	} catch (e: any) {
		$message.error(e.message)
	}
}

const handleCodeSandbox = () => {
	const title = props.path
		.split('/')
		.map(str => str.charAt(0).toUpperCase() + str.slice(1))
		.join(' ')
	const params = getCodeSandboxParams(decodeURIComponent(props.rawSource), {
		title: `${title} - @shene/table`
	})
	const div = document.createElement('div')
	div.style.display = 'none'
	div.innerHTML = `<form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
	  <input type="hidden" name="parameters" value="${params}" />
	  <input type="submit" value="Open in sandbox" />
	</form>`
	document.body.appendChild(div)
	;(div.firstElementChild as HTMLFormElement).submit()
	document.body.removeChild(div)
}

const handleStackblitz = () => {
	formRef.value?.submit()
}
</script>

<template>
	<ClientOnly>
		<p text="sm" v-html="decodedDescription" />
		<div class="example">
			<VExample :file="path" :demo="formatPathDemos[path]" />

			<div class="op-btns">
				<ElTooltip content="在 Stackblitz 中打开" :show-arrow="false">
					<form
						ref="formRef"
						method="post"
						action="https://stackblitz.com/run?file=src%2Fdemo.vue"
						target="_blank"
						@click="handleStackblitz"
					>
						<input type="hidden" name="project[files][src/demo.vue]" :value="decodeURIComponent(rawSource)" />
						<input type="hidden" name="project[files][src/main.js]" :value="stackblitzmMainJs" />
						<input type="hidden" name="project[files][index.html]" :value="stackblitzHtml" />
						<input type="hidden" name="project[files][package.json]" :value="packageJson" />
						<input type="hidden" name="project[files][vite.config.js]" :value="viteConfigJs" />
						<input type="hidden" name="project[files][.stackblitzrc]" :value="stackblitzRc" />
						<input type="hidden" name="project[template]" value="node" />

						<ElIcon :size="16" class="op-btn">
							<svg viewBox="0 0 28 28" height="20">
								<path fill="currentColor" d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z"></path>
							</svg>
						</ElIcon>
					</form>
				</ElTooltip>
				<ElTooltip content="在 CodeSandbox 中打开" :show-arrow="false">
					<ElIcon :size="16" class="op-btn" @click="handleCodeSandbox">
						<svg
							focusable="false"
							class=""
							data-icon="code-sandbox"
							width="1em"
							height="1em"
							fill="currentColor"
							aria-hidden="true"
							viewBox="64 64 896 896"
						>
							<path
								d="M709.6 210l.4-.2h.2L512 96 313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"
							></path>
						</svg>
					</ElIcon>
				</ElTooltip>
				<ElTooltip content="复制代码" :show-arrow="false">
					<ElIcon :size="16" class="op-btn" @click="handleCopyCode">
						<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-65a7fb6c="">
							<path
								fill="currentColor"
								d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
							></path>
						</svg>
					</ElIcon>
				</ElTooltip>
				<ElTooltip content="查看源代码" :show-arrow="false">
					<ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()">
						<svg viewBox="0 0 1024 1024" version="1.1">
							<path
								fill="currentColor"
								d="M375.872 810.688a46.016 46.016 0 0 1-32.832-13.504L56.768 522.88c-18.816-17.92-18.816-46.464 0-62.912l286.272-275.84c18.752-17.92 48.512-17.92 65.728 0 18.752 17.984 18.752 46.464 0 62.976l-253.44 242.816 253.44 242.816c18.752 17.92 18.752 46.464 0 62.912a39.936 39.936 0 0 1-32.896 15.04zM648.128 810.688a46.016 46.016 0 0 1-32.896-13.504c-18.752-17.984-18.752-46.464 0-62.976l253.44-242.816L613.76 247.104c-18.752-17.984-18.752-46.464 0-62.976 18.752-17.92 48.512-17.92 65.728 0l286.272 275.84c18.752 17.92 18.752 46.464 0 62.912l-284.736 274.304a48.768 48.768 0 0 1-32.832 13.44z"
							></path>
						</svg>
					</ElIcon>
				</ElTooltip>
			</div>

			<ElCollapseTransition>
				<VSourceCode v-show="sourceVisible" :source="source" />
			</ElCollapseTransition>

			<Transition name="el-fade-in-linear">
				<div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible(false)">
					<ElIcon :size="16">
						<CaretTop />
					</ElIcon>
					<span>隐藏源代码</span>
				</div>
			</Transition>
		</div>
	</ClientOnly>
</template>

<style scoped lang="scss">
.example {
	border: 1px var(--vp-c-divider-light) solid;
	border-radius: var(--el-border-radius-base);

	.op-btns {
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2.5rem;
		border-top: 1px var(--vp-c-divider-light) solid;
		form {
			display: inline-flex;
			align-items: center;
		}
		.el-icon {
			&:hover {
				color: var(--el-text-color);
			}
		}

		.op-btn {
			margin: 0 0.5rem;
			cursor: pointer;
			color: var(--el-text-color-placeholder);
			transition: 0.2s;
		}
	}

	&-float-control {
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1px solid var(--el-border-color);
		height: 44px;
		box-sizing: border-box;
		background-color: var(--el-bg-color, #fff);
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		margin-top: -1px;
		color: var(--el-text-color-secondary);
		cursor: pointer;
		position: sticky;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		span {
			font-size: 14px;
			margin-left: 10px;
		}

		&:hover {
			color: var(--el-color-primary);
		}
	}
}
</style>
