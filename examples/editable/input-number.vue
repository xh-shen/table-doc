<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElInputNumber } from 'element-plus'

import type { PropType } from 'vue'

const props = defineProps({
	value: Number,
	placeholder: String,
	status: String as PropType<'error' | 'warning' | 'success'>,
	onChange: Function as PropType<(value: string) => void>
})

const emit = defineEmits(['change'])
const innerValue = ref(props.value)

const onChange = (value: string) => {
	emit('change', value)
}

watch(
	() => props.value,
	newValue => {
		if (newValue !== innerValue.value) {
			innerValue.value = newValue
		}
	}
)
watch(innerValue, newValue => {
	if (newValue === null || newValue === undefined) {
		emit('change', newValue)
	}
})
</script>

<template>
	<el-input-number
		v-bind="$attrs"
		v-model="innerValue"
		controls-position="right"
		:placeholder="placeholder || '请输入'"
		:class="{ 'edit-input-number': true, [`is-edit-${status}`]: !!status }"
		@change="onChange"
	/>
</template>

<style>
.is-edit-error .el-input__wrapper {
	box-shadow: 0 0 0 1px var(--el-color-danger) inset !important;
}
.edit-input-number .el-input__inner {
	text-align: left;
}
</style>
