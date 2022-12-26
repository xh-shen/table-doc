<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { ElDatePicker } from 'element-plus'
const props = defineProps({
	value: String,
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
	<ElDatePicker v-bind="$attrs" v-model="innerValue" format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="onChange" />
</template>
