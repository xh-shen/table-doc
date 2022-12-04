<!--
 * @Author: shen
 * @Date: 2022-05-10 16:42:21
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 18:33:31
 * @Description: 
-->
<script setup lang="ts">
defineProps({
	file: {
		type: String,
		required: true
	},
	demo: {
		type: Object,
		required: true
	}
})
</script>

<template>
	<div class="example-showcase">
		<ClientOnly>
			<component :is="demo" v-if="demo" v-bind="$attrs" />
		</ClientOnly>
	</div>
</template>

<style lang="scss" scoped>
.example-showcase {
	padding: 1.5rem;
	margin: 0.5px;
	background-color: var(--bg-color);
}
</style>
