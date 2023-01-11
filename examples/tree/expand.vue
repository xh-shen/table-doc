<template>
	<ElCheckbox v-model="expandRowByClick">允许点击行之后展开/收起</ElCheckbox>
	<ElCheckbox v-model="hideExpandIcon">隐藏展开图标</ElCheckbox>
	<s-table
		:columns="columns"
		:data-source="dataSource"
		:scroll="{ x: 2000 }"
		:pagination="false"
		:row-expandable="rowExpandable"
		:expand-icon-column-index="expandIconColumnIndex"
		:expand-row-by-click="expandRowByClick"
		@expand="onExpand"
		@expandedRowsChange="onExpandedRowsChange"
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
		<template #expandedRowRender="{ record }">
			<div class="more-detail">
				<p class="title"><b>姓名:</b></p>
				<p class="content">{{ record.name }}</p>
				<br />
				<p class="title"><b>年龄:</b></p>
				<p class="content">{{ record.age }}</p>
				<br />
				<p class="title"><b>地址:</b></p>
				<p class="content">{{ record.address }}</p>
			</div>
		</template>
	</s-table>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElTag, ElSpace, ElCheckbox } from 'element-plus'
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

const rowExpandable = (record: DataType) => {
	return record.name !== '张三'
}
const hideExpandIcon = ref(false)
const expandRowByClick = ref(true)
const expandIconColumnIndex = ref(0)
watch(hideExpandIcon, newValue => {
	expandIconColumnIndex.value = newValue ? -1 : 0
})

const onExpand: STableProps<DataType>['onExpand'] = (expanded, record) => {
	console.log('expanded', expanded)
	console.log('record', record)
}
const onExpandedRowsChange: STableProps<DataType>['onExpandedRowsChange'] = keys => {
	console.log('keys', keys)
}
</script>

<style scope>
.more-detail {
	line-height: 22px;
}
.more-detail > p {
	display: inline-block;
	margin: 4px 0;
}
.more-detail > p.title {
	width: 120px;
}
</style>
