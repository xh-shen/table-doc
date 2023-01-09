# 全局配置

`STableProvider` 被用来提供全局的配置选项，为组件提供统一的全局化配置。

## 使用

`STableProvider` 使用了 vue 的 [provide](https://cn.vuejs.org/api/composition-api-dependency-injection.html) 方法，只需在应用外围包裹一次即可全局生效。

### 1. 全局注册

如果你全局注册了 `STable` 组件，那么会自动全局注册 `STableProvider` 组件，可以直接使用，不需要导入。

```vue
<template>
	<s-table-provider size="small">
		<app />
	</s-table-provider>
</template>
```

### 2. 局部注册

```vue
<template>
	<s-table-provider size="small">
		<app />
	</s-table-provider>
</template>

<script setup lang="ts">
import { STableProvider } from '@shene/table'
</script>
```

## 基本配置

包含边框、悬浮、选中等常用配置，减少了每个 `STable` 都要设置一遍的麻烦。

:::demo

config/basic

:::

## 国际化

`STable` 使用到国际化的地方主要有分页、排序、过滤、选中等，**列配置及数据**等国际化需自行实现。

:::demo

config/locale

:::

## 主题色

通过 `themeColor` 修改主题色，仅支持 16 进制`颜色值`。

:::demo

config/theme-color

:::

## 组件尺寸

通过 `size` 修改默认组件尺寸，当然你可以通过组件自己的 `size` 个性化设置。

:::demo

config/size

:::
