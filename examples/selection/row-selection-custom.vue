<template>
	<s-table
		v-model:selectedRowKeys="selectedRowKeys"
		:columns="columns"
		:data-source="dataSource"
		:scroll="{ y: 300 }"
		:row-selection="rowSelection"
		highlight-selected
	>
		<template #bodyCell="{ text, column, record }">
			<template v-if="column.key === 'name'">
				<a>{{ text }}</a>
			</template>
			<template v-else-if="column.key === 'tags'">
				<ElSpace>
					<ElTag v-for="item in record.tags" :key="item" :type="item === '前端' ? 'danger' : item === '项目' ? '' : 'success'">
						{{ item }}
					</ElTag>
				</ElSpace>
			</template>
			<template v-else-if="column.key === 'action'">
				<ElSpace size="large">
					<a>编辑</a>
					<a>删除</a>
				</ElSpace>
			</template>
		</template>
	</s-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElSpace } from 'element-plus'
import { SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE } from '@shene/table'
import type { STableColumnsType, STableRowSelection } from '@shene/table'

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
		width: 120
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
		title: '职业',
		key: 'tags',
		dataIndex: 'tags',
		width: 220
	},
	{
		title: '地址',
		dataIndex: 'address',
		key: 'address',
		ellipsis: true
	},
	{
		title: '操作',
		key: 'action',
		width: 130
	}
]

const data: DataType[] = []
for (let i = 0; i < 28; i++) {
	data.push({
		key: i.toString(),
		name: ['张三', '李四', '王五', '马六'][i % 4],
		age: [18, 30, 26, 45][i % 4],
		sex: ['男', '女'][i % 2],
		address: ['北京', '上海', '天津', '重庆'][i % 4] + '市某某区某某大街520号',
		tags: [['前端', '后端'], ['后端'], ['前端', '产品', '项目'], ['测试']][i % 4]
	})
}

const dataSource = ref(data)
const rowSelection = ref<STableRowSelection<DataType>>({
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
	},
	// selections: true,
	selections: [
		SELECTION_ALL,
		SELECTION_INVERT,
		SELECTION_NONE,
		{
			key: 'odd',
			text: '选中奇数行',
			onSelect: changableRowKeys => {
				let newSelectedRowKeys = []
				newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
					if (index % 2 !== 0) {
						return false
					}
					return true
				})
				selectedRowKeys.value = newSelectedRowKeys
			}
		},
		{
			key: 'even',
			text: '选中偶数行',
			onSelect: changableRowKeys => {
				let newSelectedRowKeys = []
				newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
					if (index % 2 !== 0) {
						return true
					}
					return false
				})
				selectedRowKeys.value = newSelectedRowKeys
			}
		}
	]
})

const selectedRowKeys = ref<(string | number)[]>([])
</script>
