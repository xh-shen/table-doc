<!--
 * @Author: shen
 * @Date: 2022-12-02 21:24:41
 * @LastEditors: shen
 * @LastEditTime: 2022-12-06 15:34:27
 * @Description: 
-->
<script lang="tsx">
import { ref } from 'vue'
import { ElSpace, ElLink } from 'element-plus'
import type { STableColumnsType } from '@shene/table'

export default {
	components: { ElSpace, ElLink },
	setup() {
		const loading = ref(false)
		const showHeader = ref(true)
		const bordered = ref(false)
		const stripe = ref(false)
		const pagination = ref(false)
		const size = ref('default')

		interface DataType {
			key: string
			name: string
			age: number
			sex: string
			address: string
			tags: string[]
		}

		const columns: STableColumnsType<DataType> = [
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
				width: 120,
				customRender: ({ text }) => <ElLink>{text}</ElLink>
			},
			{
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
				width: 100
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				width: 100
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address'
			},
			{
				title: '职业',
				key: 'tags',
				dataIndex: 'tags'
			},
			{
				title: '操作',
				key: 'action',
				width: 120
			}
		]

		const data: DataType[] = []
		for (let i = 0; i < 1000; i++) {
			data.push({
				key: i.toString(),
				name: ['张三', '李四', '王五', '马六'][i % 4],
				age: [18, 30, 26, 45][i % 4],
				sex: ['男', '女'][i % 2],
				address: ['北京', '上海', '天津', '重庆'][i % 4] + '市某某区某某大街520号',
				tags: [['前端', '后端'], ['后端'], ['前端', '产品', '项目'], ['测试']][i % 4]
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
			columns
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
					:show-header="showHeader"
					:loading="loading"
					:bordered="bordered"
					:stripe="stripe"
					:size="size"
					:pagination="pagination"
					:columns="columns"
					:scroll="{ y: 400 }"
					:data-source="dataSource"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.key === 'action'">
							<el-space wrapp>
								<el-link :underline="false" type="primary">详情</el-link>
								<el-link :underline="false" type="primary">删除</el-link>
							</el-space>
						</template>
						<template v-else-if="column.key === 'tags'">
							{{ record.tags.join('、') }}
						</template>
					</template>
				</s-table>
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
