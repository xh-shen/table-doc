<template>
	<s-table
		:columns="columns"
		:data-source="dataSource"
		:pagination="false"
		:row-class-name="getRowClassName"
		:custom-row="customRow"
		:custom-cell="customCell"
		:custom-header-cell="customHeaderCell"
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
		<template #footer>
			<div style="text-align: center">你可以随意自定义样式</div>
		</template>
	</s-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElSpace } from 'element-plus'
import type { STableProps, STableColumnsType } from '@shene/table'

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
		width: 100,
		className: 'custom-sex-class'
	},
	{
		title: '职业',
		key: 'tags',
		dataIndex: 'tags',
		width: 220,
		customCell: ({ rowIndex }) => {
			if (rowIndex === 3) {
				return {
					style: {
						background: '#fff1e9'
					}
				}
			}
			return {}
		}
	},
	{
		title: '地址',
		dataIndex: 'address',
		key: 'address',
		customCell: ({ rowIndex }) => {
			if (rowIndex === 3) {
				return {
					style: {
						background: '#fff1e9'
					}
				}
			}
			return {}
		}
	},
	{
		title: '操作',
		key: 'action',
		width: 120,
		customHeaderCell: column => {
			return {
				style: {
					color: 'blue'
				}
			}
		}
	}
]

const data: DataType[] = []
for (let i = 0; i < 5; i++) {
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

const getRowClassName: STableProps<DataType>['rowClassName'] = (record, index, indent) => {
	if (record.key === '0') {
		return 'custom-row-class'
	}
	return 'custom-other-row-class'
}

const customRow: STableProps<DataType>['customRow'] = (record, index) => {
	return index % 2 === 1 ? { style: { color: '#ffa39e' } } : { style: { color: '#91d5ff' } }
}
const customCell: STableProps<DataType>['customCell'] = ({ rowIndex, column }) => {
	if (column.dataIndex === 'name') {
		return rowIndex < 3 ? { style: { background: '#f5222d' } } : { style: { background: '#87e8de' } }
	} else if (column.key === 'action') {
		return { style: { background: '#fffb8f' } }
	}
	return { class: 'custom-class' }
}
const customHeaderCell: STableProps<DataType>['customHeaderCell'] = column => {
	return column.dataIndex === 'tags' ? { style: { background: '#b7eb8f' } } : {}
}
</script>
