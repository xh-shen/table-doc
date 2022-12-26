<template>
	<ElCheckbox v-model="showSorterTooltip">显示排序文本提示</ElCheckbox>
	<s-table
		:columns="columns"
		:data-source="dataSource"
		:max-height="300"
		:pagination="false"
		:show-sorter-tooltip="showSorterTooltip"
		@sorter-change="onSorterChange"
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
import { ElTag, ElSpace, ElCheckbox } from 'element-plus'
import type { STableColumnsType, STableProps } from '@shene/table'

interface DataType {
	key: string
	name: string
	age: number
	sex: string
	score: number
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
		sorter: {
			compare: (a, b) => a.age - b.age,
			multiple: 1
		}
	},
	{
		title: '性别',
		dataIndex: 'sex',
		key: 'sex',
		width: 100
	},
	{
		title: '分数',
		dataIndex: 'score',
		key: 'score',
		width: 100,
		sorter: {
			compare: (a, b) => a.score - b.score,
			multiple: 2
		}
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
for (let i = 0; i < 4; i++) {
	data.push({
		key: i.toString(),
		name: ['张三', '李四', '王五', '马六'][i % 4],
		age: [18, 30, 26, 45][i % 4],
		sex: ['男', '女'][i % 2],
		score: [96, 92, 92, 80][i % 4],
		address: ['北京', '上海', '天津', '重庆'][i % 4] + '市某某区某某大街520号',
		tags: [['前端', '后端'], ['后端'], ['前端', '产品', '项目'], ['测试']][i % 4]
	})
}

const dataSource = ref(data)
const showSorterTooltip = ref(true)
const onSorterChange: STableProps['onSorterChange'] = params => {
	console.log(params)
}
</script>
