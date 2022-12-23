# 行列拖拽

拖拽是一个很酷的功能，但你要知道当用户刷新或重新获取数据后，状态会被重置，除非你做了相应的缓存。

## 列宽拖拽

给某一列设置属性 `resizable` 为 true，可以拖拽调整该列的宽度。

- 通过设置 `minWidth、maxWidth` 控制列宽的最小宽度和最大宽度。
- 拖动列宽时会触发 `@resize-column` 事件。
- 表头分组时，仅支持叶子结点拖拽。

:::demo

dragable/column-width

:::

## 列拖拽排序

通过设置表格属性 `allowColumnDrag = true`, 启用全列拖拽(选择、展开、序号列除外)。列拖拽排序场景中，必须指定列唯一标识 `key`。

- 使用列属性 `drag` 个性化配置。
- 列拖拽结束时会触发 `@column-drag-end` 事件。
- 支持自定义拖拽提示、二次确认拖拽等。

:::demo

dragable/column

:::

## 行拖拽排序

给某一列设置属性 `rowDrag` 为 true，该列将添加拖拽图标。

- 行拖拽结束时会触发 `@row-drag-end` 事件。
- 支持自定义拖拽提示、二次确认拖拽等。

:::demo

dragable/row

:::

## 二次确认拖拽

行和列拖拽排序结束 `rowDragEnd｜columnDragEnd` 事件都支持返回 promise，可以做二次确认是否移动到目标位置。

:::demo

dragable/promise

:::

## 自定义拖拽提示

组件内部默认使用当前单元格的内容显示提示，你可以使用 `rowDragGhost|columnDragGhost` 插槽自定义内容。

:::demo

dragable/custom-ghost

:::
