<template>
	<s-table
		:columns="columns"
		:data-source="dataSource"
		:pagination="false"
		:editable-cell-state="editableCellState"
		@data-change="onDataChange"
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
		</template>
	</s-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElSpace } from 'element-plus'
import Input from './input.vue'

import type { STableColumnsType, STableProps } from '@shene/table'

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
		fixed: true,
		edit: {
			// 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
			// 2. 如果希望支持校验，组件还需包含 `status` 属性。具体 API 含义参考 Input 组件
			component: Input,
			// props, 透传全部属性到 Input 组件
			props: {
				clearable: true
			},
			// 编辑完成，退出编辑态后触发
			onEdited: context => {
				console.log(context)
			},
			// 校验规则，此处同 Form 表单
			rules: [
				{ required: true, message: '不能为空' },
				{ max: 10, message: '字符数量不能超过 10', type: 'error' }
			],
			// 默认是否为编辑状态
			defaultEditable: true
		}
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

const editableCellState: STableProps<DataType>['editableCellState'] = cellParams => {
	// name='王五' 不可以编辑
	const { row } = cellParams
	return row.name !== '王五'
}

const onDataChange: STableProps<DataType>['onDataChange'] = data => {
	console.log(data)
}
</script>
