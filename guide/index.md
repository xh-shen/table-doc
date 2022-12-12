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

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 Shene Table，然后就可以使用全局变量 `STable` 了。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 [unpkg](https://unpkg.com) 和 [jsDelivr](https://jsdelivr.com) 举例。 你也可以使用其它的 CDN 供应商。

### unpkg

```html
<head>
	<!-- Import style -->
	<link rel="stylesheet" href="//unpkg.com/@shene/table/dist/index.min.css" />
	<!-- Import Vue 3 -->
	<script src="//unpkg.com/vue@3"></script>
	<!-- Import component library -->
	<script src="//unpkg.com/@shene/table/dist/index.min.js"></script>
</head>
```

### jsDelivr

```html
<head>
	<!-- Import style -->
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@shene/table/dist/index.min.css" />
	<!-- Import Vue 3 -->
	<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
	<!-- Import component library -->
	<script src="//cdn.jsdelivr.net/npm/@shene/table/dist/index.min.js"></script>
</head>
```

通过 CDN 的方式我们可以很容易地使用 `STable` 写出一个 Table 页面。[在线演示](https://codepen.io/xh-shen/pen/poKmdQj)

 <iframe height="410" style="width: 100%;" scrolling="no" title="poKmdQj" src="https://codepen.io/xh-shen/embed/poKmdQj?height=410&theme-id=light&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>

:::tip

我们建议使用 CDN 引入 STable 的用户在链接地址上锁定版本，以免将来 STable 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。

:::

## 在项目中使用

### 全局注册

我们建议直接在入口处导入进行全局注册，组件内部会自动注册子组件（`STableProvider`、`STableColumn`、 `STableColumnGroup`、 `STableSummary`、 `STableSummaryRow`、 `STableSummaryCell`）：

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
	<s-table :columns="columns" :data-source="dataSource" :pagination="false" />
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import type { STableColumnsType } from '@shene/table'

interface DataType {
	key: string
	name: string
	age: number
	sex: string
	address: string
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
		title: '地址',
		dataIndex: 'address',
		key: 'address'
	},
	{
		title: '操作',
		key: 'action',
		width: 120,
		customRender: () => (
			<div>
				<a style="margin-right: 10px">编辑</a>
				<a>删除</a>
			</div>
		)
	}
]

const data: DataType[] = []
for (let i = 0; i < 5; i++) {
	data.push({
		key: i.toString(),
		name: ['张三', '李四', '王五', '马六'][i % 4],
		age: [18, 30, 26, 45][i % 4],
		sex: ['男', '女'][i % 2],
		address: ['北京', '上海', '天津', '重庆'][i % 4] + '市某某区某某大街520号'
	})
}

const dataSource = ref(data)
</script>
```
