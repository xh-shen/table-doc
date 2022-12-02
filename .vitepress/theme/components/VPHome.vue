<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 22:30:29
 * @Description: 
-->
<script setup lang="ts">
import VPHomeHero from './VPHomeHero.vue'
import VPHomeFeatures from './VPHomeFeatures.vue'
</script>

<template>
	<div class="VPHome">
		<slot name="home-hero-before" />
		<VPHomeHero />
		<slot name="home-hero-after" />

		<slot name="home-features-before" />
		<VPHomeFeatures />
		<slot name="home-features-after" />

		<Content />
	</div>
</template>

<style scoped>
.VPHome {
	/* padding-bottom: 96px; */
}

.VPHome :deep(.VPHomeSponsors) {
	margin-top: 112px;
	margin-bottom: -128px;
}

@media (min-width: 768px) {
	.VPHome {
		/* padding-bottom: 128px; */
	}
}
</style>
