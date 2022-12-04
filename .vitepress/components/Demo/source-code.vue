<!--
 * @Author: shen
 * @Date: 2022-05-10 16:42:44
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 21:24:59
 * @Description: 
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	source: {
		type: String,
		required: true
	}
})

const decoded = computed(() => {
	return decodeURIComponent(props.source)
})
</script>

<template>
	<div class="example-source-wrapper">
		<div class="example-source language-vue" v-html="decoded" />
	</div>
</template>

<style scoped lang="scss">
.example-source-wrapper {
	.example-source {
		margin: 0;
		border-radius: 0;
	}
}
</style>
