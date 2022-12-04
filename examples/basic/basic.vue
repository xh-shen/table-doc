<template>
	<s-table :columns="columns" bordered :scroll="{ y: 400 }" :pagination="false" :data-source="dataSource" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

interface DataItem {
	key: number
	name: string
	age: number
	address: string
}

export default defineComponent({
	setup() {
		const columns = [
			{
				title: 'Full Name',
				dataIndex: 'name'
			},
			{
				title: 'Age',
				dataIndex: 'age'
			},
			{
				title: 'Column 1',
				dataIndex: 'address'
			},
			{
				title: 'Column 2',
				dataIndex: 'address'
			},
			{
				title: 'Column 3',
				dataIndex: 'address'
			},
			{
				title: 'Column 4',
				dataIndex: 'address'
			},
			{ title: 'Column 5', dataIndex: 'address' }
		]
		const data: DataItem[] = []
		for (let i = 0; i < 1000; i++) {
			data.push({
				key: i,
				name: `Edrward ${i}`,
				age: i + 1,
				address: `London Park no. ${i}`
			})
		}
		return {
			dataSource: ref(data),
			columns: ref(columns)
		}
	}
})
</script>
