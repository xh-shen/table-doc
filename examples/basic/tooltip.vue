<template>
	<s-table :columns="columns" :data-source="dataSource" stripe :pagination="false">
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
		<template #tooltipTitle="{ value, column }">
			<template v-if="column.key === 'name'"> ###{{ value }} </template>
		</template>
		<template #tooltip-address="{ value }">{{ value }}</template>
	</s-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElSpace } from 'element-plus'
import type { STableColumnsType } from '@shene/table'

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
		tooltip: { placement: 'topLeft' }
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
		width: 100,
		tooltip: true
	},
	{
		title: '性别',
		dataIndex: 'sex',
		key: 'sex',
		width: 100,
		tooltip: { title: '测试数据', placement: 'topLeft' }
	},
	{
		title: '职业',
		key: 'tags',
		dataIndex: 'tags',
		width: 220,
		tooltip: { title: ({ record }) => record.tags.join('/') + ' ' + record.tags.length + '职业', placement: 'topLeft' }
	},
	{
		title: '地址',
		dataIndex: 'address',
		key: 'address',
		tooltip: {
			title: 'tooltip-address',
			color: '#f50',
			placement: 'topLeft'
		},
		ellipsis: { showTitle: false }
	},
	{
		title: '操作',
		key: 'action',
		width: 120
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
</script>
