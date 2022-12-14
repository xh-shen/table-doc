<!--
 * @Author: shen
 * @Date: 2022-05-09 09:00:48
 * @LastEditors: shen
 * @LastEditTime: 2022-12-14 22:02:31
 * @Description: 
-->
<script setup lang="ts">
import { ref } from '@vue/runtime-core'
import clipboardCopy from 'clipboard-copy'
import { ElMessage } from 'element-plus'
import { DocumentCopy, Check } from '@element-plus/icons-vue'
import BasicDemo from './demo.vue'
const copied = ref(false)

const copyContent = async (content: any) => {
	try {
		await clipboardCopy(content)

		ElMessage({
			showClose: true,
			message: '复制成功',
			type: 'success'
		})
	} catch {
		ElMessage({
			showClose: true,
			message: '复制失败',
			type: 'error'
		})
	}
}

const handleCopy = async () => {
	await copyContent('npm i --save @shene/table')
	copied.value = true
	setTimeout(() => {
		copied.value = false
	}, 3000)
}
</script>

<template>
	<div class="home-page">
		<div class="banner">
			<div class="banner-desc">
				<h1>Shene Table</h1>
				<p>基于 Vue3 的高性能表格组件</p>
			</div>
			<div class="actions">
				<a href="/guide/">
					<el-button type="primary" round class="btn" size="large">
						<span class="btn-icon"></span>
						开始使用
					</el-button>
				</a>
				<el-button class="copy" round size="large" @click="handleCopy">
					<span class="tag">$ &nbsp;</span>
					<span>npm i --save @shene/table</span>
					<el-icon class="copy-icon">
						<component :is="copied ? Check : DocumentCopy" />
					</el-icon>
				</el-button>
			</div>
		</div>
		<div class="section">
			<div class="section-title">流畅渲染，超高性能</div>
			<div class="section-body">
				<iframe
					class="codesandbox"
					src="https://codesandbox.io/embed/shene-table-b7lf1r?fontsize=12&module=%2Fsrc%2FApp.vue&theme=dark"
					allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
					sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
				></iframe>
			</div>
		</div>
		<div class="section">
			<div class="section-title">简单易用，示例丰富</div>
			<div class="section-body">
				<BasicDemo />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.home-page {
	.banner {
		padding: 100px 0;
		text-align: center;
		background-color: var(--vp-c-bg-soft);
		&-desc {
			h1 {
				line-height: 56px;
				font-weight: 600;
				color: #45124e;
				font-size: 80px !important;
				padding-bottom: 30px;
				color: var(--vp-c-text-1);
			}
			p {
				margin: 16px 0;
				font-size: 18px;
				color: var(--vp-c-text-2);
			}
		}
		.actions {
			display: flex;
			margin-top: 2rem;
			justify-content: center;
			.btn-icon {
				position: relative;
				width: 14px;
				height: 12px;
				margin-right: 8px;
				&:before {
					position: absolute;
					content: '';
					width: 8px;
					height: 8px;
					border-top: 2px solid #fff;
					border-left: 2px solid #fff;
					box-sizing: border-box;
					transform: rotate(135deg);
					left: -2px;
					top: 50%;
					margin-top: -4px;
				}
				&:after {
					position: absolute;
					content: '';
					width: 6px;
					height: 2px;
					background-color: #fff;
					right: 0;
					bottom: 0;
				}
			}
			.copy {
				margin-left: 20px;
				.tag {
					color: #ccc;
				}
				&-icon {
					margin-left: 5px;
				}
			}
		}
	}

	.codesandbox {
		width: 100%;
		height: 500px;
		border: 0;
		border-radius: 4px;
		overflow: hidden;
		box-shadow: 0 10px 30px var(--vp-c-divider-light-1);
	}
	.section {
		padding: 100px 32px;
		max-width: calc(var(--vp-layout-max-width) - 64px);
		margin: 0 auto;
		&-title {
			font-size: 50px;
			text-align: center;
			padding-bottom: 100px;
			position: relative;
			color: var(--vp-c-brand-darker);
		}
	}
}
</style>
