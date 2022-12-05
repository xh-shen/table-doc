# 暗黑模式

所有的主题样式全部通过 CSS Vars 技术实现，所以很容易实现动态变更。

## 如何启用？

我们内置了 暗黑模式 的所有样式，所以你只需要在 html 上添加一个名为 `dark` 的类名，就可以打开它，而不需要额外引入任何样式。

> 如果您只需要暗色模式，只需在 html 上添加一个名为 `dark` 的类.

```html
<html class="dark">
	<head></head>
	<body></body>
</html>
```

> 如果您想动态切换，建议使用 [useDark | VueUse](https://vueuse.org/core/useDark/).

## 自定义变量

直接覆盖对应的 css 变量即可

像这样，新建一个 `styles/dark/css-vars.css`文件:

```css
html.dark {
	/* 自定义深色背景颜色 */
	--s-bg-color: #626aef;
}
```

在 Shene Table 的样式之后导入它

```ts
// main.ts
import '@shene/table/dist/index.css'
import './styles/dark/css-vars.css'
```
