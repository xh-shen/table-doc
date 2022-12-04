# 快速开始

本节将介绍如何在项目中使用 Shene Table。

## 环境支持

由于 Vue 3 不再支持 IE11，Shene Table 也不再支持 IE 浏览器。

| ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Edge ≥ 79                                                              | Firefox ≥ 78                                                                      | Chrome ≥ 64                                                                    | Safari ≥ 12                                                                    |

## 使用包管理器

我们建议您使用包管理器 (npm, [yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/)) 安装 Shene Table

```shell
# 选择一个你喜欢的包管理器

# npm
$ npm install @shene/table --save

# yarn
$ yarn add @shene/table

# pnpm
$ pnpm install @shene/table
```

## 在项目中使用

### 全局注册

我们建议直接在入口处导入进行全局注册，组件内部会自动注册子组件（`STableConfigProvider`、`STableColumn`、 `STableColumnGroup`、 `STableSummary`、 `STableSummaryRow`、 `STableSummaryCell`）：

```ts
import { createApp } from 'vue'
import STable from '@shene/table'
import App from './App.vue'
import '@shene/table/dist/index.css'

const app = createApp(App)

app.use(STable)
app.mount('#app')
```

在模板中的对应使用的组件名称为下划线，如：`STable` 对应 `s-table` 等等：

```vue
<template>
	<s-table :columns="columns" :data-source="dataSource"></s-table>
</template>

<script setup lang="ts">
interface DataItem {
	key: number
	name: string
	age: number
	address: string
}

const columns = [
	{
		title: 'Name',
		dataIndex: 'name'
	},
	{
		title: 'Age',
		dataIndex: 'age'
	},
	{
		title: 'Column 3',
		dataIndex: 'address'
	},
	{
		title: 'Column 4',
		dataIndex: 'address'
	},
	{ title: 'Column 5', dataIndex: 'address' }
]
const data: DataItem[] = []
for (let i = 0; i < 1000; i++) {
	data.push({
		key: i,
		name: `Shene ${i}`,
		age: i + 1,
		address: `China changchun ${i}`
	})
}
const dataSource = ref(data)
</script>
```
