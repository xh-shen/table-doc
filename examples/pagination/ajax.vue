<template>
	<s-table
		v-model:pagination="pagination"
		:loading="loading"
		:columns="columns"
		:data-source="dataSource"
		:scroll="{ y: 300 }"
		:row-key="(record:any) => record.login.uuid"
	>
		<template #bodyCell="{ column, text }">
			<template v-if="column.dataIndex === 'name'">
				{{ `${text.first} ${text.last}` }}
			</template>
		</template>
	</s-table>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { STablePaginationConfig, STableColumnsType } from '@shene/table'

interface DataItem {
	name: string
	first: string
	last: string
	email: string
	gender: string
}

const getRandomuserParams = (params: STablePaginationConfig) => ({
	results: params.pageSize,
	page: params.current,
	...params
})

const columns: STableColumnsType<DataItem> = [
	{
		title: 'Name',
		dataIndex: 'name'
	},
	{
		title: 'Gender',
		dataIndex: 'gender'
	},
	{
		title: 'Email',
		dataIndex: 'email'
	}
]
const dataSource = ref<DataItem[]>([])
const pagination = ref<STablePaginationConfig>({
	current: 1,
	pageSize: 10
})
const loading = ref(true)

const fetch = (params: STablePaginationConfig = {}) => {
	loading.value = true

	let u = new URLSearchParams(getRandomuserParams(params) as any).toString()

	window
		.fetch(`https://randomuser.me/api?${u}`, {
			method: 'GET' // or 'PUT'
		})
		.then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
			console.log('Success:', response)
			loading.value = false
			dataSource.value = response.results
			pagination.value = {
				...params,
				total: 200
				// 200 is mock data, you should read it from server
				// total: data.totalCount,
			}
		})
}

watch(
	() => ({ ...pagination.value }),
	(cur, pre) => {
		if (cur.current !== pre.current || cur.pageSize !== pre.pageSize) {
			fetch(pagination.value)
		}
	}
)

onMounted(() => {
	fetch(pagination.value)
})
</script>
