<!--
 * @Author: shen
 * @Date: 2022-12-02 21:24:41
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 22:44:25
 * @Description: 
-->
<script lang="tsx">
import { ref } from 'vue'

interface DataItem {
	key: number
	name: string
	age: number
	address: string
}

export default {
	setup() {
		const loading = ref(false)
		const bordered = ref(false)
		const stripe = ref(false)
		const pagination = ref(false)

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

		const dataSource = ref(data)

		return {
			stripe,
			bordered,
			loading,
			pagination,
			columns,
			dataSource
		}
	}
}
</script>

<template>
	<div class="demo">
		<div class="demo-comp">
			<div class="demo-title">示例</div>
			<div class="demo-content">
				<s-table
					:loading="loading"
					:bordered="bordered"
					:stripe="stripe"
					:pagination="pagination"
					:columns="columns"
					:scroll="{ y: 400 }"
					:data-source="dataSource"
				></s-table>
			</div>
		</div>
		<div class="demo-config">
			<div class="demo-title">配置</div>
			<div class="demo-content">
				<div class="demo-config-item">
					<span>bordered</span>
					<el-switch size="small" v-model="bordered" />
				</div>
				<div class="demo-config-item">
					<span>stripe</span>
					<el-switch size="small" v-model="stripe" />
				</div>
				<div class="demo-config-item">
					<span>loading</span>
					<el-switch size="small" v-model="loading" />
				</div>
				<div class="demo-config-item">
					<span>pagination</span>
					<el-switch size="small" v-model="pagination" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.demo {
	display: flex;
	border-radius: 6px;
	border: 1px solid var(--vp-c-divider-light);
	overflow: hidden;
	&-title {
		padding: 16px;
		min-height: 48px;
		border-bottom: 1px solid var(--vp-c-divider-light);
		background-color: var(--vp-c-bg-soft);
	}
	&-comp {
		flex: 1;
		border-right: 1px solid var(--vp-c-divider-light);
		overflow: hidden;
	}
	&-config {
		width: 240px;
		&-item {
			display: flex;
			justify-content: space-between;
			color: var(--vp-c-text-2);
			padding: 5px 0;
		}
	}
	&-content {
		padding: 16px;
	}
}
</style>
