<template>
	<ElCheckbox v-model="rowSelection!.checkStrictly">父子行选中独立</ElCheckbox>
	<s-table :columns="columns" :data-source="dataSource" :pagination="false" expand-row-by-click :row-selection="rowSelection">
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
import type { STableColumnsType, STableRowSelection } from '@shene/table'

interface DataType {
	key: string
	name: string
	age: number
	sex: string
	address: string
	tags: string[]
	children?: DataType[]
}

const columns: STableColumnsType<DataType> = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
		width: 200,
		fixed: true
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
		width: 120,
		fixed: 'right'
	}
]

const TOTAL = 5

function getObject(i: any) {
	return {
		key: i.toString(),
		name: ['张三', '李四', '王五', '马六'][i % 4],
		age: [18, 30, 26, 45][i % 4],
		sex: ['男', '女'][i % 2],
		address: ['北京', '上海', '天津', '重庆'][i % 4] + '市某某区某某大街520号',
		tags: [['前端', '后端'], ['后端'], ['前端', '产品', '项目'], ['测试']][i % 4]
	}
}

function getData(): DataType[] {
	const data = []
	for (let i = 0; i < TOTAL; i++) {
		const obj: any = getObject(i)
		obj.children = new Array(2).fill(null).map((t, j) => {
			const secondIndex = 100 * j + (i + 1) * 10
			const secondObj = {
				...obj,
				name: `${obj.name} ${secondIndex}`,
				key: secondIndex.toString()
			}
			secondObj.children = new Array(3).fill(null).map((m, n) => {
				const thirdIndex = secondIndex * 1000 + 100 * m + (n + 1) * 10
				return {
					...obj,
					name: `${obj.name} ${thirdIndex}`,
					key: thirdIndex.toString()
				}
			})
			return secondObj
		})
		// 第一行不设置子节点
		if (i === 0) {
			obj.children = undefined
		}
		data.push(obj)
	}
	return data
}
const dataSource = ref(getData())

const rowSelection = ref<STableRowSelection<DataType>>({
	checkStrictly: false,
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
	},
	getCheckboxProps: record => ({
		disabled: record.name.indexOf('李四') > -1,
		name: record.name
	})
})
</script>
