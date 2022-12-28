# 树形和展开行

树形结构的表格，支持展开/收起节点等丰富特性，展开行提供可收纳功能，展开后可以进一步查看详细内容。

## 可展开和收起

表格提供可收纳功能，展开后可以进一步查看详细内容。

- `expandedRowKeys` 受控属性，用于存储展开行的值，支持 `v-model:expandedRowKeys`，支持非受控属性 `defaultExpandedRowKeys`。
- `defaultExpandAllRows` 初始化是否展开所有行。
- `expandFixed` 控制展开图标是否固定，如果固定在左侧，可设置 `fixed = true ｜ 'left'`。可选值 `true | 'left' | 'right'`。
- `expandedRowRender` 函数或具名插槽， 用于定义展开行显示的具体内容，参数有 `{ record, index, indent, expanded }`。
- `expandIcon` 函数或具名插槽，用于自定义展开图标，参数有 `{ record, expandable, expanded, onExpand }`。
- `expandIconColumnIndex` 自定义展开按钮的列顺序，`-1` 时不展示。
- `rowExpandable` 函数设置是否允许行展开，参数有 `record`，返回 `boolean`。
- `expandRowByClick` 表示是否允许点击表格行时展开。

:::demo

tree/expand

:::
