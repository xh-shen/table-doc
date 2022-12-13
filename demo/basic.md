# 基本用法

下面示例介绍了组件的最基本功能，足以满足很多复杂的场景。所有示例都是配合 `Element Plus` 使用，当然你可以使用任何 UI 库。

## 基础表格

简单表格，使用分页切换数据。使用边框线、斑马纹等清晰呈现各数据单元格边界线，辅助信息区隔。

- 使用表格属性 `columns` 设置表格列
- 使用表格属性 `dataSource` 设置表格数据源

:::demo

basic/basic

:::

## 可自定义样式的表格

简单表格，使用分页切换数据。使用边框线、斑马纹等清晰呈现各数据单元格边界线，辅助信息区隔。

- 使用表格属性 `rowClassName` 设置行类名。
- 使用表格属性 `customRow` 设置行属性。
- 使用表格属性 `customCell` 设置单元格属性，优先级低于 `column.customCell`。
- 使用表格属性 `customHeaderCell` 设置表头单元格属性，优先级低于 `column.customHeaderCell`。
- 使用列属性 `customCell` 设置单元格属性。
- 使用列属性 `customHeaderCell` 设置表头单元格属性。
- 使用列属性 `class|className` 设置表头单元格类名。

:::demo

basic/custom-style

:::

## 单元格超出省略的表格

支持单元格文本超出省略、单独控制标题超出省略，可以取消`dom title`默认悬浮提示。

- 使用 `ellipsis` 设置列文本超出省略显示，默认会同时控制表头的超出省略显示；只要 `ellipsis` 为真，无论是何种数据类型都会出现超出省略。
- 使用 `ellipsisTitle` 单独设置表头超出省略显示，优先级高于 `ellipsis`。
- 使用 `ellipsis: { showTitle: false }`或 `ellipsisTitle: { showTitle: false }` 取消默认 `dom title` 提示。

:::demo

basic/ellipsis

:::

## 固定表头

纵向内容过多时，可选择固定表头。

:::demo 只要设置`scroll="{ y: 300 }"`，即可实现固定表头的表格，而不需要额外的代码。

basic/fixed-header

:::

## 固定列

横向内容过多时，可选择固定列。

:::demo 固定列需要使用列配置的 `fixed` 属性，它接受 Boolean 值 如果为 `true`, 列将被左侧固定. 它还接受传入字符串，left 或 right，表示左边固定还是右边固定。你需要设置 `scroll="{ x: 2000 }"` 或者 给每一列都设置宽度，当 `scrollX` 或 列宽总和超过表格宽度时出现滚动条。

basic/fixed-column

:::

## 固定列和表头

横纵内容过多时，可选择固定列和表头。

:::demo 固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。

basic/fixed-column-and-header

:::
