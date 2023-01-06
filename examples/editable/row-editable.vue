<template>
	<div style="margin-bottom: 10px; display: flex; justify-content: space-between">
		<el-radio-group v-model="editableType">
			<el-radio-button label="single">单行编辑</el-radio-button>
			<el-radio-button label="multiple">多行编辑</el-radio-button>
		</el-radio-group>
		<el-button @click="onAddEditRecord">添加</el-button>
	</div>

	<s-table
		ref="tableRef"
		:columns="columns"
		:data-source="dataSource"
		:pagination="false"
		:editable-type="editableType"
		v-model:editable-row-keys="editableRowKeys"
	>
		<template #bodyCell="{ text, column, record, editable }">
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
					<template v-if="!editable">
						<ElLink :underline="false" @click="onEdit(record.key)">编辑</ElLink>
					</template>
					<template v-else>
						<ElLink :underline="false" @click="onSave(record.key)">保存</ElLink>
						<ElLink :underline="false" @click="onCancel(record.key)">取消</ElLink>
					</template>
				</ElSpace>
			</template>
		</template>
	</s-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElSpace, ElLink, ElMessage } from 'element-plus'
import Input from './input.vue'
import InputNumber from './input-number.vue'
import Select from './select.vue'
import DatePicker from './date-picker.vue'

import type { STableColumnsType, STableInstanceExpose } from '@shene/table'

interface DataType {
	key: string
	name: string
	age: number
	sex: string
	address: string
	date: string
	tags: string[]
}

const columns: STableColumnsType<DataType> = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
		width: 120,
		edit: {
			// 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
			// 2. 如果希望支持校验，组件还需包含 `status` 属性。具体 API 含义参考 Input 组件
			component: Input,
			// props, 透传全部属性到 Input 组件
			props: {
				clearable: true
			},
			// 校验规则，此处同 Form 表单
			rules: [
				{ required: true, message: '不能为空' },
				{ max: 10, message: '字符数量不能超过 10', type: 'error' }
			],
			onChange: (value, { updateEditedRow }) => {
				if (!value) {
					updateEditedRow({
						sex: ''
					})
				} else {
					updateEditedRow({
						sex: '男'
					})
				}
			}
		}
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
		width: 120,
		edit: {
			component: InputNumber,
			props: ({ editedRow }) => {
				return {
					disabled: !editedRow.name
				}
			},
			rules: [{ required: true, message: '不能为空' }]
		}
	},
	{
		title: '性别',
		dataIndex: 'sex',
		key: 'sex',
		width: 100,
		edit: {
			component: Select,
			props: {
				clearable: true,
				options: [
					{ text: '男', value: '男' },
					{ text: '女', value: '女' }
				]
			},
			rules: [{ required: true, message: '不能为空' }]
		}
	},
	{
		title: '毕业时间',
		dataIndex: 'date',
		key: 'date',
		width: 160,
		edit: {
			component: DatePicker,
			props: {
				clearable: true
			},
			rules: [{ required: true, message: '不能为空' }]
		}
	},
	{
		title: '职业',
		key: 'tags',
		dataIndex: 'tags',
		width: 220,
		edit: {
			component: Select,
			props: {
				clearable: true,
				multiple: true,
				collapseTags: true,
				options: [
					{ text: '前端', value: '前端' },
					{ text: '后端', value: '后端' },
					{ text: '产品', value: '产品' },
					{ text: '项目', value: '项目' },
					{ text: '测试', value: '测试' }
				]
			},
			rules: [{ required: true, message: '不能为空' }]
		}
	},
	{
		title: '地址',
		dataIndex: 'address',
		key: 'address',
		ellipsis: true,
		minWidth: 200,
		edit: {
			component: Input,
			props: {
				clearable: true
			}
		}
	},
	{
		title: '操作',
		key: 'action',
		width: 130,
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
		date: ['2014-07-01', '2012-06-25', '2018-07-01', '2002-09-11'][i % 4],
		address: ['北京', '上海', '天津', '重庆'][i % 4] + '市某某区某某大街520号',
		tags: [['前端', '后端'], ['后端'], ['前端', '产品', '项目'], ['测试']][i % 4]
	})
}

const dataSource = ref(data)

const tableRef = ref<STableInstanceExpose<DataType, string>>()
const editableType = ref('single')
const editableRowKeys = ref<any>(['0'])

const onAddEditRecord = () => {
	if (editableType.value === 'single' && editableRowKeys.value.length > 0) {
		ElMessage.error('只能同时编辑一行')
	}
	tableRef.value?.addEditRecord({ key: (Math.random() * 1000000).toFixed(0).toString() }, { position: 'top' })
}

const onEdit = (key: DataType['key']) => {
	if (editableType.value === 'single' && editableRowKeys.value.length > 0) {
		ElMessage.error('只能同时编辑一行')
	}
	tableRef.value?.startEditable(key)
}

const onCancel = (key: string) => {
	tableRef.value?.cancelEditable(key)
}

const onSave = async (key: string) => {
	try {
		const record = await tableRef.value?.saveEditRecord(key)
		console.log(record)
		ElMessage.success('保存成功')
	} catch (error: any) {
		const r = error.result[0]
		ElMessage.error(`${r.col.title} ${r.errorList[0].message}`)
	}
}
</script>
