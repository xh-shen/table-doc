<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

import type { PropType } from 'vue'

export interface OptionData {
	text: string | number
	value: string | number
}

const props = defineProps({
	value: [String, Number, Array],
	status: String as PropType<'error' | 'warning' | 'success'>,
	onChange: Function as PropType<(value: string) => void>,
	options: Array as PropType<OptionData[]>
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
</script>

<template>
	<el-select v-bind="$attrs" v-model="innerValue" :class="{ [`is-edit-${status}`]: !!status }" @change="onChange">
		<el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value" />
	</el-select>
</template>

<style>
.is-edit-error .el-input__wrapper,
.is-edit-error:hover:not(.el-select--disabled) .el-input__wrapper {
	box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>
