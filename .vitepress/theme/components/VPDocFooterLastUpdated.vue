<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 08:15:41
 * @Description: 
-->
<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useData } from 'vitepress'

const { theme, page } = useData()

const date = computed(() => new Date(page.value.lastUpdated!))
const isoDatetime = computed(() => date.value.toISOString())
const datetime = ref('')

// set time on mounted hook because the locale string might be different
// based on end user and will lead to potential hydration mismatch if
// calculated at build time
onMounted(() => {
	watchEffect(() => {
		datetime.value = date.value.toLocaleString(window.navigator.language)
	})
})
</script>

<template>
	<p class="VPLastUpdated">
		{{ (theme as any).lastUpdatedText ?? '最后修改时间' }}:
		<time :datetime="isoDatetime">{{ datetime }}</time>
	</p>
</template>

<style scoped>
.VPLastUpdated {
	line-height: 24px;
	font-size: 14px;
	font-weight: 500;
	color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
	.VPLastUpdated {
		line-height: 32px;
		font-size: 14px;
		font-weight: 500;
	}
}
</style>
