<!--
 * @Author: shen
 * @Date: 2022-05-09 09:00:48
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 22:27:28
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
				<p>基于 Vue3，不依赖其他UI库的高性能表格组件</p>
			</div>
			<div class="actions">
				<a :href="`/guide/quickstart`">
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
		<div class="basic">
			<BasicDemo />
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
				font-size: 34px;
				line-height: 48px;
				font-weight: 600;
				color: var(--vp-c-text-1);
			}
			p {
				margin-top: 0.5rem;
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
	.basic {
		padding: 100px 32px;
		max-width: calc(var(--vp-layout-max-width) - 64px);
		margin: 0 auto;
	}
}
</style>
