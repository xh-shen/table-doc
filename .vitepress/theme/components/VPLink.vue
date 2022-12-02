<!--
 * @Author: shen
 * @Date: 2022-12-02 15:46:07
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 15:58:32
 * @Description: 
-->
<script lang="ts" setup>
import { computed } from 'vue'
import { normalizeLink } from '../support/utils.js'
import VPIconExternalLink from './icons/VPIconExternalLink.vue'

const EXTERNAL_URL_RE = /^[a-z]+:/i
const props = defineProps<{
	href?: string
	noIcon?: boolean
}>()

const isExternal = computed(() => props.href && EXTERNAL_URL_RE.test(props.href))
</script>

<template>
	<component
		:is="href ? 'a' : 'span'"
		class="VPLink"
		:class="{ link: href }"
		:href="href ? normalizeLink(href) : undefined"
		:target="isExternal ? '_blank' : undefined"
		:rel="isExternal ? 'noreferrer' : undefined"
	>
		<slot />
		<VPIconExternalLink v-if="isExternal && !noIcon" class="icon" />
	</component>
</template>

<style scoped>
.icon {
	display: inline-block;
	margin-top: -1px;
	margin-left: 4px;
	width: 11px;
	height: 11px;
	fill: var(--vp-c-text-3);
	transition: fill 0.25s;
}
</style>
