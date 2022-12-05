<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-05 20:18:30
 * @Description: 
-->
<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { computed, inject } from 'vue'
import { useData } from 'vitepress'
import { isActive } from '../support/utils.js'
import VPLink from './VPLink.vue'

withDefaults(defineProps<{ item: DefaultTheme.SidebarItem; depth?: number }>(), { depth: 1 })

const { page, frontmatter } = useData()
const maxDepth = computed<number>(() => frontmatter.value.sidebarDepth || Infinity)
const closeSideBar = inject('close-sidebar') as () => void
</script>

<template>
	<VPLink
		class="link"
		:class="{ active: isActive((page as any).relativePath, item.link) }"
		:href="item.link"
		@click="closeSideBar"
	>
		<span v-html="item.text" class="link-text" :class="{ light: depth > 1 }"></span>
	</VPLink>
	<template v-if="'items' in item && depth < maxDepth">
		<template v-for="child in item.items" :key="child.link">
			<VPSidebarLink :item="child" :depth="depth + 1" />
		</template>
	</template>
</template>

<style scoped>
.link {
	display: block;
	margin: 4px 0;
	padding: 8px 12px;
	color: var(--vp-c-text-2);
	transition: color 0.5s;
	border-radius: 4px;
}

.link:hover {
	background-color: var(--vp-c-bg-mute);
}

.link.active {
	color: var(--vp-c-white);
	background-color: var(--vp-c-brand);
}

.link :deep(.icon) {
	width: 12px;
	height: 12px;
	fill: currentColor;
}

.link-text {
	line-height: 20px;
	font-size: 14px;
	font-weight: 400;
}

.link-text.light {
	font-size: 13px;
	font-weight: 400;
}
</style>
