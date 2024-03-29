<!--
 * @Author: shen
 * @Date: 2022-06-20 09:32:09
 * @LastEditors: shen
 * @LastEditTime: 2023-01-16 10:03:20
 * @Description: 
-->
<script lang="ts">
export default {
	name: 'Demo'
}
</script>
<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { isClient, useClipboard, useToggle } from '@vueuse/core'
import { CaretTop } from '@element-plus/icons-vue'
import {
	getCodeSandboxParams,
	packageJson,
	mainJs,
	stackblitzHtml,
	viteConfigJs,
	stackblitzRc
} from '../../utils/generateOnlineDemo'

import VExample from './example.vue'
import VSourceCode from './source-code.vue'

const props = defineProps<{
	demos: object
	source: string
	sourceJs: string
	path: string
	rawSource: string
	rawSourceJs: string
	description?: string
}>()

const vm = getCurrentInstance()!
const stackblitzformRef = ref<any>(null)
const tabActive = ref('ts')

const rawSource = computed(() => (tabActive.value === 'ts' ? props.rawSource : props.rawSourceJs))
const { copy, isSupported } = useClipboard({
	source: computed(() => {
		return decodeURIComponent(rawSource.value)
	})
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
	const params = getCodeSandboxParams(decodeURIComponent(rawSource.value), {
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
	stackblitzformRef.value?.submit()
}

const handlePlayground = () => {
	const MAIN_FILE_NAME = 'App.vue'
	const code = decodeURIComponent(rawSource.value)
	const originCode = {
		[MAIN_FILE_NAME]: code
	}

	const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(originCode))))
	const link = `https://table.shene.org.cn/playground/#${encoded}`
	if (!isClient) return
	window.open(link)
}
</script>

<template>
	<ClientOnly>
		<p text="sm" v-html="decodedDescription" />
		<div class="example">
			<VExample :file="path" :demo="formatPathDemos[path]" />

			<div class="op-btns">
				<ElTooltip content="在 Playground 中打开" :show-arrow="false">
					<ElIcon :size="16" class="op-btn" @click="handlePlayground">
						<svg viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a8.777 8.777 0 0 1-.021-.364L13 7.243V4h-2v3.243z"
							></path>
						</svg>
					</ElIcon>
				</ElTooltip>
				<ElTooltip content="在 Stackblitz 中打开" :show-arrow="false">
					<form
						ref="stackblitzformRef"
						method="post"
						action="https://stackblitz.com/run?file=src%2Fdemo.vue"
						target="_blank"
						@click="handleStackblitz"
					>
						<input type="hidden" name="project[files][src/demo.vue]" :value="decodeURIComponent(rawSource)" />
						<input type="hidden" name="project[files][src/main.js]" :value="mainJs" />
						<input type="hidden" name="project[files][index.html]" :value="stackblitzHtml" />
						<input type="hidden" name="project[files][package.json]" :value="packageJson" />
						<input type="hidden" name="project[files][vite.config.js]" :value="viteConfigJs" />
						<input type="hidden" name="project[files][.stackblitzrc]" :value="stackblitzRc" />
						<input type="hidden" name="project[template]" value="node" />

						<ElIcon :size="14" class="op-btn">
							<svg
								viewBox="64 64 896 896"
								focusable="false"
								data-icon="thunderbolt"
								width="1em"
								height="1em"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7zM378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211L378.2 732.5z"
								></path>
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
					<ElIcon :size="14" class="op-btn" @click="handleCopyCode">
						<svg
							viewBox="64 64 896 896"
							focusable="false"
							data-icon="snippets"
							width="1em"
							height="1em"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M832 112H724V72c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v40H500V72c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v40H320c-17.7 0-32 14.3-32 32v120h-96c-17.7 0-32 14.3-32 32v632c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32v-96h96c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM664 888H232V336h218v174c0 22.1 17.9 40 40 40h174v338zm0-402H514V336h.2L664 485.8v.2zm128 274h-56V456L544 264H360v-80h68v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h152v32c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-32h68v576z"
							></path>
						</svg>
					</ElIcon>
				</ElTooltip>
				<ElTooltip :content="sourceVisible ? '收起代码' : '显示代码'" :show-arrow="false">
					<ElIcon :size="16" class="op-btn" @click="toggleSourceVisible()">
						<svg v-if="!sourceVisible" viewBox="0 0 1024 1024">
							<path
								d="M682.666667 810.666667c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733334l226.133333-226.133333-226.133333-226.133333c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334l-256 256c-8.533333 8.533333-17.066667 12.8-29.866666 12.8zM341.333333 810.666667c-12.8 0-21.333333-4.266667-29.866666-12.8l-256-256c-17.066667-17.066667-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733334L145.066667 512l226.133333 226.133333c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z"
								p-id="2576"
							></path>
						</svg>
						<svg viewBox="0 0 1024 1024" v-else>
							<path
								d="M298.900577 778.338974c-7.070023 7.070023-17.974373 7.070023-25.043373 0L20.039405 524.521175c-7.070023-7.070023-7.070023-17.974373 0-25.043373l253.8178-253.8178c7.070023-7.070023 17.974373-7.070023 25.043373 0l27.242458 27.242458c7.070023 7.070023 7.070023 17.974373 0 25.043373L112.089891 512l214.053144 214.053144c7.070023 7.070023 7.070023 17.974373 0 25.043373L298.900577 778.338974zM444.87316 873.098151c-2.726088 9.269108-12.522198 14.702863-21.24486 11.995195l-33.767058-9.269108c-9.250688-2.726088-14.702863-12.522198-11.976776-21.790282l203.148793-703.132108c2.726088-9.269108 12.522198-14.702863 21.24486-11.995195l33.767058 9.269108c9.250688 2.726088 14.702863 12.522198 11.976776 21.790282L444.87316 873.098151zM752.049215 778.338974c-7.070023 7.070023-17.974373 7.070023-25.043373 0l-27.242458-27.242458c-7.070023-7.070023-7.070023-17.974373 0-25.043373l214.053144-214.053144L699.763384 297.946856c-7.070023-7.070023-7.070023-17.974373 0-25.043373l27.242458-27.242458c7.070023-7.070023 17.974373-7.070023 25.043373 0l253.8178 253.8178c7.070023 7.070023 7.070023 17.974373 0 25.043373L752.049215 778.338974z"
								p-id="2313"
							></path>
						</svg>
					</ElIcon>
				</ElTooltip>
			</div>
			<div></div>

			<ElCollapseTransition>
				<ElTabs v-model="tabActive" v-show="sourceVisible" class="example-tabs">
					<ElTabPane label="TypeScript" name="ts"><VSourceCode :source="source" /></ElTabPane>
					<ElTabPane label="JavaScript" name="js"><VSourceCode :source="sourceJs" /></ElTabPane>
				</ElTabs>
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
		border-top: 1px var(--vp-c-divider-light) dashed;
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

	&-tabs {
		border-top: 1px var(--vp-c-divider-light) dashed;
		:deep(.el-tabs__header) {
			display: flex;
			justify-content: center;
			margin: 0;
			border-bottom: 1px var(--vp-c-divider-light) solid;
		}
		:deep(.el-tabs__nav-wrap) {
			&:after {
				display: none;
			}
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
