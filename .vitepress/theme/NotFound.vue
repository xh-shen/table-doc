<!--
 * @Author: shen
 * @Date: 2022-12-02 15:46:07
 * @LastEditors: shen
 * @LastEditTime: 2022-12-03 21:54:38
 * @Description: 
-->
<script setup lang="ts">
import { useData } from 'vitepress'

const { site } = useData()
</script>

<template>
	<div class="NotFound">
		<p class="code">404</p>
		<h1 class="title">您访问的页面不存在</h1>
		<div class="divider" />
		<blockquote class="quote">点击下方按钮，返回首页吧</blockquote>

		<div class="action">
			<a class="link" :href="(site as any).base" aria-label="go to home"> 返回首页 </a>
		</div>
	</div>
</template>

<style scoped>
.NotFound {
	padding: 64px 24px 96px;
	text-align: center;
}

@media (min-width: 768px) {
	.NotFound {
		padding: 96px 32px 168px;
	}
}

.code {
	line-height: 64px;
	font-size: 64px;
	font-weight: 600;
}

.title {
	padding-top: 12px;
	letter-spacing: 2px;
	line-height: 20px;
	font-size: 20px;
	font-weight: 700;
}

.divider {
	margin: 24px auto 18px;
	width: 64px;
	height: 1px;
	background-color: var(--vp-c-divider);
}

.quote {
	margin: 0 auto;
	max-width: 256px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-2);
}

.action {
	padding-top: 20px;
}

.link {
	display: inline-block;
	border: 1px solid var(--vp-c-brand);
	border-radius: 16px;
	padding: 3px 16px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-brand);
	transition: border-color 0.25s, color 0.25s;
}

.link:hover {
	border-color: var(--vp-c-brand-dark);
	color: var(--vp-c-brand-dark);
}
</style>
