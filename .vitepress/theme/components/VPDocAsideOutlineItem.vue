<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-15 13:58:51
 * @Description: 
-->
<script setup lang="ts">
import type { MenuItem } from '../composables/outline.js'

defineProps<{
	headers: MenuItem[]
	onClick: (e: MouseEvent) => void
	root?: boolean
}>()
</script>

<template>
	<ul :class="root ? 'root' : 'nested'">
		<li v-for="{ children, link, title } in headers" :key="link">
			<a class="outline-link" :href="link" data-type="outline" @click="onClick">{{ title }}</a>
			<template v-if="children?.length">
				<VPDocAsideOutlineItem :headers="children" :onClick="onClick" />
			</template>
		</li>
	</ul>
</template>

<style scoped>
.root {
	position: relative;
	z-index: 1;
}

.nested {
	padding-left: 13px;
}

.outline-link {
	display: block;
	line-height: 28px;
	color: var(--vp-c-text-2);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: color 0.5s;
	font-size: 12px;
	font-weight: 400;
}

.outline-link:hover,
.outline-link.active {
	color: var(--vp-c-text-1);
	transition: color 0.25s;
}

.outline-link.nested {
	padding-left: 13px;
}
</style>
