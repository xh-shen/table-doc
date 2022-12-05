# 国际化

Shene Table **默认** 使用 **简体中文**, 如果你希望使用其他语言，你可以参考下面的方案。

## 在 ConfigProvider 组件中配置

```vue
<template>
	<s-table-config-provider :locale="locale">
		<app />
	</s-table-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import en from '@shene/table/dist/locale/en'

const locale = ref(en)
</script>
```

## 在 Table 组件中单独配置

当然这种场景基本不存在，但是它的优先级是最高的。

```vue
<template>
	<s-table :locale="locale" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import en from '@shene/table/dist/locale/en'

const locale = ref(en)
</script>
```

## 自定义国际化配置

Shene Table 默认提供了 **简体中文** 和 **英文** 两种国际化配置。

```ts
import en from '@shene/table/dist/locale/en'
import zhCN from '@shene/table/dist/locale/zh_CN'
```

如果你只需要 **简体中文** 和 **英文** 的切换，那么动态切换他们就可以了，如果你的项目不只这两种国际化配置，那么你就需要自定义添加国际化配置了。

像这样，新建一个 `locale/zh_TW.ts`文件:

```ts
import type { STableLocale } from '@shene/table'

const localeValues: STableLocale = {
	filterTitle: '篩選',
	filterConfirm: '確定',
	filterReset: '重置',
	filterEmptyText: '無篩選項',
	selectAll: '全選當頁',
	selectInvert: '反選當頁',
	selectNone: '清空所有',
	selectionAll: '全選所有',
	sortTitle: '排序',
	expand: '展開行',
	collapse: '關閉行',
	triggerDesc: '點擊降序',
	triggerAsc: '點擊升序',
	cancelSort: '取消排序',
	emptyText: '取消排序',
	itemsPerPage: '條/頁',
	jumpTo: '跳至',
	page: '頁',
	prevPage: '上一頁',
	nextPage: '下一頁',
	prev5: '向前 5 頁',
	next5: '向後 5 頁',
	prev3: '向前 3 頁',
	next3: '向後 3 頁'
}

export default localeValues
```

在 组件中导入并使用

```vue
<template>
	<s-table-config-provider :locale="locale">
		<app />
	</s-table-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import zhTW from './lcoale/zh_TW.ts'

const locale = ref(zhTW)
</script>
```
