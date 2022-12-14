<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-14 20:43:47
 * @Description: 
-->
<script lang="ts" setup>
import { useData } from 'vitepress'
import VPNavBarMenuLink from './VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from './VPNavBarMenuGroup.vue'

const { theme } = useData()
</script>

<template>
	<nav v-if="(theme as any).nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
		<span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
		<template v-for="item in (theme as any).nav" :key="item.text">
			<VPNavBarMenuLink v-if="'link' in item" :item="item" />
			<VPNavBarMenuGroup v-else :item="item" />
		</template>
	</nav>
</template>

<style scoped>
.VPNavBarMenu {
	display: none;
}

@media (min-width: 768px) {
	.VPNavBarMenu {
		display: flex;
	}
}
</style>
