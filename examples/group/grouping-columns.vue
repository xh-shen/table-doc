<template>
	<s-table :columns="columns" :data-source="dataSource" :scroll="{ y: 300, x: 1400 }" :pagination="false" bordered>
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
import type { STableColumnsType } from '@shene/table'

interface DataType {
	key: string
	name: string
	age: number
	sex: string
	address: string
	tags: string[]
	cardNumber: string
}

const columns: STableColumnsType<DataType> = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
		width: 100,
		fixed: true
	},
	{
		title: '详情',
		key: 'detail',
		fixed: true,
		align: 'left',
		children: [
			{
				title: '信息',
				key: 'info',
				fixed: true,
				align: 'left',
				children: [
					{
						title: '年龄',
						dataIndex: 'age',
						key: 'age',
						fixed: true,
						width: 80
					},
					{
						title: '性别',
						dataIndex: 'sex',
						key: 'sex',
						fixed: true,
						width: 80
					}
				]
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
				fixed: true,
				width: 160,
				ellipsis: true
			}
		]
	},

	{
		title: '职业',
		key: 'tags',
		dataIndex: 'tags',
		minWidth: 220
	},
	{
		title: '其他信息',
		key: 'other',
		children: [
			{
				title: '身份证号',
				key: 'cardNumber',
				dataIndex: 'cardNumber',
				width: 160
			},
			{
				title: '说明',
				key: 'explain',
				children: [
					{
						title: '简介',
						key: 'introduction',
						width: 160,
						customRender: () => '我是一段简介...'
					},
					{
						title: '备注',
						key: 'desc',
						width: 160,
						customRender: () => '我是一段备注...'
					}
				]
			}
		]
	},
	{
		title: '操作',
		key: 'action',
		width: 120,
		fixed: 'right'
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
		tags: [['前端', '后端'], ['后端'], ['前端', '产品', '项目'], ['测试']][i % 4],
		cardNumber: ['230229********0901', '220219********1222', '220219********1219', '230232********0222'][i % 4]
	})
}

const dataSource = ref(data)
</script>
