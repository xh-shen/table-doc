<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElDatePicker } from 'element-plus'
import type { PropType } from 'vue'

const props = defineProps({
	value: String,
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
</script>

<template>
	<ElDatePicker
		v-bind="$attrs"
		v-model="innerValue"
		:class="{ [`is-edit-${status}`]: !!status }"
		format="YYYY-MM-DD"
		value-format="YYYY-MM-DD"
		:placeholder="placeholder || '请选择'"
		@change="onChange"
	/>
</template>

<style>
.is-edit-error .el-input__wrapper {
	box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>
