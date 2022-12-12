# 动态主题

Shene Table 提供了一套默认主题，全部通过 CSS Vars 技术实现，动态主题的能力得到了加强。

## 在 STableProvider 组件中配置主题

### 使用 `themeColor` 属性修改主题色

`themeColor`值只支持 16 进制颜色值，内部会动态生成对应的浅色主题色及深色主题色，这是最简单的一种方式。

```vue
<!-- App.vue -->
<template>
	<s-table-provider :theme-color="themeColor">
		<s-table />
		<s-table />
		<s-table />
	</s-table-provider>
</template>

<script setup lang="ts">
const themeColor = '#00b96b'
</script>
```

### 使用 `customClass` 属性修改主题色

`customClass`属性是给所有的组件添加一个自定义的类名，方便修改样式，而不是每个组件都要去单独添加类名。

```vue
<!-- App.vue -->
<template>
	<s-table-provider custom-class="custom-table-class">
		<s-table />
		<s-table />
		<s-table />
	</s-table-provider>
</template>

<script setup lang="ts"></script>
```

```css
.custom-table-class {
	--s-color-primary: green;
}
```

## 通过 CSS 变量设置

如果你不想动态修改主题色，只是想修改默认的主题色，那么可以覆盖原来的 CSS Vars 来实现。

新建一个 `styles/css-vars.css`文件

```css
:root {
	--s-color-primary: green;
}
```

在 Shene Table 的样式之后导入它

```ts
// main.ts
import '@shene/table/dist/index.css'
import './styles/css-vars.css'
```

当然你也可以通过 js 动态 控制 css 变量：

```ts
const el = document.documentElement
// get css var
getComputedStyle(el).getPropertyValue(`--s-color-primary`)
// set css var
el.style['--s-color-primary'] = 'red'
```

如果你想要更优雅的方式，请看这里。[useCssVar | VueUse](https://vueuse.org/core/usecssvar/)

## 局部主题

如果你只想自定义一个特定的表格组件，只需为某些组件单独添加内联样式。

```html
<s-table style="--s-color-primary: red" />
```

当然你也可以自定义类名。

```html
<s-table class="custom-class" />
```

```css
.custom-class {
	--s-color-primary: green;
}
```
