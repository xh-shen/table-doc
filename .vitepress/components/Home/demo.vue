<!--
 * @Author: shen
 * @Date: 2022-12-02 21:24:41
 * @LastEditors: shen
 * @LastEditTime: 2022-12-03 16:22:34
 * @Description: 
-->
<script lang="tsx">
import { ref } from 'vue'

export default {
	setup() {
		const loading = ref(false)
		const showHeader = ref(true)
		const bordered = ref(false)
		const stripe = ref(false)
		const pagination = ref(false)
		const size = ref('default')

		const cols = [
			{
				dataIndex: 'index',
				key: 'index',
				title: '序号',
				width: 80,
				fixed: 'left',
				resizable: true,
				customRender: (record: any) => record.index + 1
			},
			{
				dataIndex: 'platform',
				key: 'platform',
				title: '平台',
				width: 80,
				fixed: 'left',
				resizable: true
			},
			{
				dataIndex: 'type',
				key: 'type',
				title: '类型'
			},
			{
				dataIndex: 'default',
				key: 'default',
				title: '默认值'
			},
			{
				dataIndex: 'description',
				key: 'description',
				title: '说明'
			},
			{
				dataIndex: 'needed',
				key: 'needed',
				title: '是否必传'
			},
			{
				dataIndex: 'detail.position',
				key: 'detail.position',
				title: '详情信息',
				width: 120,
				fixed: 'right',
				ellipsis: { showTitle: false },
				tooltip: { title: ({ value }: any) => value }
			}
		]

		const data = []
		for (let i = 0; i < 1000; i++) {
			data.push({
				index: i,
				platform: i % 2 === 0 ? '共有' : '私有',
				type: ['String', 'Number', 'Array', 'Object'][i % 4],
				default: ['-', '0', '[]', '{}'][i % 4],
				detail: {
					position: `读取 ${i} 个数据的嵌套信息值`
				},
				needed: i % 4 === 0 ? '是' : '否',
				description: '数据源'
			})
		}

		return {
			showHeader,
			stripe,
			bordered,
			loading,
			pagination,
			size,
			dataSource: ref(data),
			columns: ref(cols)
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
					rowKey="index"
					:show-header="showHeader"
					:loading="loading"
					:bordered="bordered"
					:stripe="stripe"
					:size="size"
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
					<span>showHeader</span>
					<el-switch size="small" v-model="showHeader" />
				</div>
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
				<div class="demo-config-item">
					<span>size</span>
					<el-select size="small" v-model="size" style="width: 80px">
						<el-option value="small" label="small" />
						<el-option value="default" label="default" />
						<el-option value="large" label="large" />
					</el-select>
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
