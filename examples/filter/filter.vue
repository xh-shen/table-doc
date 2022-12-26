<template>
	<s-table :columns="columns" :data-source="dataSource" :max-height="300" :pagination="false" @filter-change="onFilterChange">
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
import DatePicker from './DatePicker.vue'
import type { STableColumnsType, STableProps } from '@shene/table'

interface DataType {
	key: string
	name: string
	age: number
	sex: string
	score: number
	date: string
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
		width: 100,
		sorter: (a, b) => a.age - b.age
	},
	{
		title: '性别',
		dataIndex: 'sex',
		key: 'sex',
		width: 100,
		filter: {
			type: 'multiple',
			list: [
				{
					text: '男',
					value: '男'
				},
				{
					text: '女',
					value: '女'
				}
			],
			onFilter: (value, record) => value.includes(record.sex)
		}
	},
	{
		title: '分数',
		dataIndex: 'score',
		key: 'score',
		width: 100,
		sorter: (a, b) => a.score - b.score
	},
	{
		title: '毕业时间',
		dataIndex: 'date',
		key: 'date',
		width: 120,
		filter: {
			component: DatePicker,
			props: {
				placeholder: '请选择毕业时间',
				style: {
					width: '160px'
				}
			},
			onFilter: (value, record) => record.date === value
		}
	},
	{
		title: '职业',
		key: 'tags',
		dataIndex: 'tags',
		width: 220,
		filter: {
			type: 'single',
			list: [
				{
					text: '前端',
					value: '前端'
				},
				{
					text: '后端',
					value: '后端'
				},
				{
					text: '产品',
					value: '产品'
				},
				{
					text: '项目',
					value: '项目'
				},
				{
					text: '测试',
					value: '测试'
				}
			],
			onFilter: (value, record) => record.tags.includes(value)
		}
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
for (let i = 0; i < 4; i++) {
	data.push({
		key: i.toString(),
		name: ['张三', '李四', '王五', '马六'][i % 4],
		age: [18, 30, 26, 45][i % 4],
		sex: ['男', '女'][i % 2],
		score: [96, 92, 92, 80][i % 4],
		date: ['2014-07-01', '2012-06-25', '2018-07-01', '2002-09-11'][i % 4],
		address: ['北京', '上海', '天津', '重庆'][i % 4] + '市某某区某某大街520号',
		tags: [['前端', '后端'], ['后端'], ['前端', '产品', '项目'], ['测试']][i % 4]
	})
}

const dataSource = ref(data)
const onFilterChange: STableProps['onFilterChange'] = params => {
	console.log(params)
}
</script>
