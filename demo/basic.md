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

## 自定义悬浮提示的表格

支持自定义单元格悬浮提示，需要设置列属性 `tooltip=true|TableTooltipConfig`，默认使用 `row[dataIndex]` 渲染悬浮内容，自定义渲染悬浮内容有以下 3 种方式：

- 使用 `tooltip.title` 作为渲染函数，函数参数为：`{record, column, text, value, index, recordIndexs}`，参考`职业`列。
- 使用 `tooltip.title` 作为字符串，`tooltip.title` 的值可以直接作为渲染内容也可以作为插槽名称，如果插槽存在，则渲染插槽内容，否则直接渲染字符串，插槽参数为：`{record, column, text, value, index, recordIndexs}`，参考 `性别｜地址`列。
- 当 `tooltip.title` 不存在时，使用 `tooltipTitle` 插槽渲染悬浮内容，插槽参数为：`{record, column, text, value, index, recordIndexs}`，参考`姓名|年龄`列。

:::demo

basic/tooltip

:::

## 固定表头的表格

表格内容高度超出后，滚动时表头会自动固定。可通过 `scroll.y` 或 `height` 或 `maxHeight` 设置表格高度。

- 建议使用 `scroll.y` 或 `maxHeight` 自适应高度。
- 使用 `height` 时，表格高度将固定，适合固定区域时使用。

:::demo

basic/fixed-header

:::

## 固定列的表格

列的数量过多时，使用固定列方便表格数据内容呈现，支持固定左侧列和固定右侧列。可通过给列属性设置 `fixed: 'left'|true` 或 `fixed: 'right'` 以达成固定列效果。

- 使用 `scroll.x|scrollX` 或者 给每一列都设置宽度，当 `scrollX` 或 列宽总和超过表格可见宽度时出现滚动条。

:::demo

basic/fixed-column

:::

## 固定列和表头的表格

支持同时固定表头和固定列，参考`固定表头`和`固定列`即可。

:::demo

basic/fixed-column-and-header

:::

## 自定义单元格的表格

单元格默认使用 `row[dataIndex]` 渲染数据内容，自定义单元格有以下 2 种方式：

- 使用列属性 `customRender` 作为渲染函数，函数参数为：`{value, text, record, index, column}`。
- 使用具名插槽 `bodyCell` 渲染，插槽参数为：`{value, text, record, index, column}`。
- 插槽 `bodyCell` 优先级高于列属性 `customRender`。

:::demo

basic/custom-cell

:::
