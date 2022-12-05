<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-05 20:24:45
 * @Description: 
-->
<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from '../composables/sidebar.js'
import VPImage from './VPImage.vue'

const { site, theme } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
	<div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
		<a class="title" :href="(site as any).base">
			<slot name="nav-bar-title-before" />
			<VPImage class="logo" :image="(theme as any).logo" />
			<template v-if="(theme as any).siteTitle">{{ (theme as any).siteTitle }}</template>
			<template v-else-if="(theme as any).siteTitle === undefined"
				><span>{{ (site as any).title }}</span></template
			>
			<slot name="nav-bar-title-after" />
		</a>
	</div>
</template>

<style scoped>
.VPNavBarTitle {
	flex-shrink: 0;
	border-bottom: 1px solid transparent;
}

@media (min-width: 960px) {
	.VPNavBarTitle.has-sidebar {
		margin-right: 32px;
		width: calc(var(--vp-sidebar-width) - 64px);
	}
}

.title {
	display: flex;
	align-items: center;
	width: 100%;
	height: var(--vp-nav-height);
	font-size: 20px;
	font-weight: 600;
	color: var(--vp-c-text-1);
	transition: opacity 0.25s;
}

.title:hover {
	/* opacity: 0.9; */
	color: var(--vp-c-brand);
}

@media (min-width: 960px) {
	.title {
		flex-shrink: 0;
	}
}

:deep(.logo) {
	margin-right: 8px;
	height: 40px;
}
</style>
