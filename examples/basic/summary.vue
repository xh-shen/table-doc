<template>
	<s-table :columns="columns" :data-source="dataSource" summary-fixed :pagination="false">
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
		<template #summary>
			<s-table-summary-row>
				<s-table-summary-cell :index="0">合计</s-table-summary-cell>
				<s-table-summary-cell :index="1">
					<template #default="{ total }">
						{{ total }}
					</template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="2">
					<template #default="{ total }">
						{{ total }}
					</template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="3">
					<template #default="{ total }">
						{{ total }}
					</template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="4">
					<template #default="{ total }">
						{{ total }}
					</template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="5">
					<template #default="{ total }">
						{{ total }}
					</template>
				</s-table-summary-cell>
			</s-table-summary-row>
			<s-table-summary-row>
				<s-table-summary-cell :index="0">平均</s-table-summary-cell>
				<s-table-summary-cell :index="1">
					<template #default="{ total, data }"> {{ total / data.length }}元 </template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="1">
					<template #default="{ total, data }"> {{ total / data.length }}元 </template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="2">
					<template #default="{ total, data }"> {{ total / data.length }}元 </template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="3">
					<template #default="{ total, data }"> {{ total / data.length }}元 </template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="4">
					<template #default="{ total, data }"> {{ total / data.length }}元 </template>
				</s-table-summary-cell>
				<s-table-summary-cell :index="5">
					<template #default="{ total, data }"> {{ total / data.length }}元 </template>
				</s-table-summary-cell>
			</s-table-summary-row>
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
	january: number
	february: number
	march: number
	april: number
	may: number
}

const columns: STableColumnsType<DataType> = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
		width: 120
	},
	{
		title: '1月',
		dataIndex: 'january',
		key: 'january'
	},
	{
		title: '2月',
		dataIndex: 'february',
		key: 'february'
	},
	{
		title: '3月',
		dataIndex: 'march',
		key: 'march'
	},
	{
		title: '4月',
		dataIndex: 'april',
		key: 'april'
	},
	{
		title: '5月',
		dataIndex: 'may',
		key: 'may'
	}
]

const data: DataType[] = []
for (let i = 0; i < 5; i++) {
	data.push({
		key: i.toString(),
		name: ['张三', '李四', '王五', '马六'][i % 4],
		january: [3430, 5674, 3690, 4689][i % 4],
		february: [4645, 3423, 5672, 4534][i % 4],
		march: [5676, 3453, 1231, 5673][i % 4],
		april: [7897, 2352, 4363, 6585][i % 4],
		may: [5756, 3452, 6854, 3463][i % 4]
	})
}

const dataSource = ref(data)
</script>
