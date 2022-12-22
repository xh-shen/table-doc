<template>
	<s-table :columns="columns" :data-source="dataSource" :pagination="false">
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
		<template #contextmenuPopup="args">
			<ul class="popup">
				<li class="popup-item" @click="handleContextMenuEdit(args)">编辑</li>
				<li class="popup-item" style="color: #ed4014" @click="handleContextMenuDelete(args)">删除</li>
			</ul>
		</template>
	</s-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElSpace, ElMessage } from 'element-plus'
import type { STableColumnsType, STableContextmenuPopupArg } from '@shene/table'

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

const handleContextMenuEdit = (args: STableContextmenuPopupArg) => {
	ElMessage({
		message: 'Click edit of line ' + args.index,
		type: 'success'
	})
}
const handleContextMenuDelete = (args: STableContextmenuPopupArg) => {
	ElMessage({
		message: 'Click delete of line ' + args.index,
		type: 'success'
	})
}
</script>

<style lang="scss" scope>
.popup {
	width: 120px;
	.popup-item {
		cursor: pointer;
		padding: 8px 8px 8px 20px;
		&:hover {
			background-color: #fafafa;
		}
		&.disabled {
			color: #00000040;
			cursor: not-allowed;
		}
	}
}
</style>
