<template>
	<el-space direction="vertical" alignment="flex-start">
		<el-radio-group v-model="size">
			<el-radio-button label="small">小尺寸</el-radio-button>
			<el-radio-button label="default">默认尺寸</el-radio-button>
			<el-radio-button label="large">大尺寸</el-radio-button>
		</el-radio-group>
		<el-space :size="20">
			<el-checkbox v-model="stripe" label="显示斑马纹" />
			<el-checkbox v-model="bordered" label="显示表格边框" />
			<el-checkbox v-model="hover" label="显示悬浮效果" />
			<el-checkbox v-model="showHeader" label="显示表头" />
		</el-space>
	</el-space>

	<s-table
		:size="size"
		:stripe="stripe"
		:bordered="bordered"
		:hover="hover"
		:showHeader="showHeader"
		:columns="columns"
		:data-source="dataSource"
		:max-height="300"
		v-model:pagination="pagination"
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
import type { STableProps, STableColumnsType, STablePaginationConfig } from '@shene/table'

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

const stripe = ref(true)
const bordered = ref(true)
const hover = ref(false)
const size = ref<STableProps['size']>('default')
const showHeader = ref(true)
const pagination = ref<STablePaginationConfig>({
	defaultPageSize: 5,
	showQuickJumper: true,
	showSizeChanger: true,
	showTotal: total => `共 ${total} 项数据`
})
</script>
