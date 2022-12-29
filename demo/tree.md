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
- 点击展开图标时，监听事件 `onExpand`，在事件处理程序中添加业务逻辑。
- 展开的行发生变化时，监听事件 `onExpandedRowsChange`，在事件处理程序中添加业务逻辑。

:::demo

tree/expand

:::

## 树形结构显示

表格支持树形数据的展示，当数据中有 `children` 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 `childrenColumnName` 进行配置，支持树形拖拽。

- `expandedRowKeys` 受控属性，用于存储展开行的值，支持 `v-model:expandedRowKeys`，支持非受控属性 `defaultExpandedRowKeys`。
- `defaultExpandAllRows` 初始化是否展开所有行。
- `expandedRowRender` 函数或具名插槽， 用于定义展开行显示的具体内容，参数有 `{ record, index, indent, expanded }`。
- `expandIcon` 函数或具名插槽，用于自定义展开图标，参数有 `{ record, expandable, expanded, onExpand }`。
- `expandIconColumnIndex` 自定义展开按钮的列顺序，`-1` 时不展示。
- `rowExpandable` 函数设置是否允许行展开，参数有 `record`，返回 `boolean`。
- `expandRowByClick` 表示是否允许点击表格行时展开。
- `indentSize` 控制每一层的缩进宽度。
- `childrenColumnName` 指定树形结构的字段，默认是 `children`。
- 点击展开图标时，监听事件 `onExpand`，在事件处理程序中添加业务逻辑。
- 展开的行发生变化时，监听事件 `onExpandedRowsChange`，在事件处理程序中添加业务逻辑。

:::demo

tree/tree-data

:::

## 树形结构行选中

由于表格数据的特殊性，父节点选中或者取消选中，会影响子节点；但子节点选中或取消不影响父元素，可以取消**父子行选中关联**关系。

- `rowSelection.checkStrictly` 值为 `true`时父子数据选中状态不再关联。

:::demo

tree/tree-selection

:::
