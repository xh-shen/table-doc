<!--
 * @Author: shen
 * @Date: 2022-05-09 09:00:48
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 15:44:42
 * @Description: 
-->
<script setup lang="ts">
import { ref } from '@vue/runtime-core'
import clipboardCopy from 'clipboard-copy'
import { ElMessage } from 'element-plus'
import { DocumentCopy, Check } from '@element-plus/icons-vue'
// import BasicDemoVue from './basic-demo.vue'
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
	<div class="flex lay">
		<img src="/images/logo.png" alt="" class="logo" />
		<div class="right">
			<div class="tagline">
				<span>STable</span>
			</div>
			<div class="sub-title">基于Vue3的高性能表格组件</div>
			<div class="sub-title" style="color: #67c23a">流畅渲染百万级别数据,横向纵向虚拟滚动</div>
			<div class="actions">
				<a :href="`/guide/quickstart`">
					<el-button type="primary" class="btn" size="large">
						<span class="btn-icon"></span>
						开始使用
					</el-button>
				</a>
				<el-button class="copy" size="large" @click="handleCopy">
					<span class="tag">$ &nbsp;</span>
					<span>npm i --save @shene/table</span>
					<el-icon class="copy-icon">
						<component :is="copied ? Check : DocumentCopy" />
					</el-icon>
				</el-button>
			</div>
		</div>
	</div>
	<!-- <BasicDemoVue /> -->
</template>

<style scoped lang="scss">
.logo {
	height: 200px;
}
.flex {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 80px 0;
	flex-wrap: wrap;
	height: 2000px;
}
.right {
	padding-left: 50px;
}
.tagline {
	font-size: 30px;
	padding: 0;
	margin: 0;
	border-bottom: 0;
	font-weight: 400;
	// color: rgba(0, 0, 0, 0.85);
}
.sub-title {
	font-size: 20px;
	margin: 0.8rem 0 0;
	color: var(--vp-c-text-2);
}
.actions {
	display: flex;
	margin-top: 1.2rem;
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
@media only screen and (max-width: 767.99px) {
	.right {
		padding: 0 30px;
		text-align: center;
	}
	.actions {
		flex-wrap: wrap;
		justify-content: center;
		.copy {
			margin-top: 20px;
			margin-left: 0;
		}
	}
}
</style>
