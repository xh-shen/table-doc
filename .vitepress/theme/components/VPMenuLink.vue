<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-05 20:20:53
 * @Description: 
-->
<script lang="ts" setup>
import { useData } from 'vitepress'
import { isActive } from '../support/utils.js'
import VPLink from './VPLink.vue'

defineProps<{
	item: any
}>()

const { page } = useData()
</script>

<template>
	<div class="VPMenuLink">
		<VPLink :class="{ active: isActive((page as any).relativePath, item.activeMatch || item.link) }" :href="item.link">
			{{ item.text }}
		</VPLink>
	</div>
</template>

<style scoped>
.VPMenuGroup + .VPMenuLink {
	margin: 12px -12px 0;
	border-top: 1px solid var(--vp-c-divider-light);
	padding: 12px 12px 0;
}

.link {
	display: block;
	border-radius: 6px;
	padding: 0 12px;
	line-height: 32px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-1);
	background-color: var(vp-c-brand);
	white-space: nowrap;
	transition: background-color 0.25s, color 0.25s;
}

.link:hover {
	color: var(--vp-c-brand);
	background-color: var(--vp-c-bg-mute);
}

.dark .link:hover {
	background-color: var(--vp-c-bg-soft);
}

.link.active {
	color: var(--vp-c-brand);
}
</style>
