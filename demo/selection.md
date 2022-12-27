# 多选和单选

在涉及到表单选择、或批量操作场景中，可在数据行前直接单选或多选操作对象。

## 单选

只能选择一行，默认不支持点击行触发，需要额外配置。

- 表格属性 `selectedRowKeys` 与 `rowSelection.selectedRowKeys` 为受控属性，表示当前选中行的唯一标识数组，支持 `v-model:selectedRowKeys`。
- 表格属性 `selectedRowKeys` 优先级高于 `rowSelection.selectedRowKeys`。
- `rowSelection.type` 值为 `'radio'` 表示单选，默认为多选。
- `rowSelection.defaultSelectedRowKeys` 非受控属性，默认选中行的唯一标识数组。
- `rowSelection.allowCancelRadio` 可以配置是否允许取消选择 Radio，根据 HTML 标准规范， Radio 选择后是不可以置空的，但的确有置空这类业务需求，我们提供了 allowCancelRadio。
- `rowSelection.onChange` 会在选中行发生变化时触发。

:::demo

selection/row-selection-radio

:::

## 多选

允许选中多行，默认不支持点击行触发，需要额外配置。

- 表格属性 `selectedRowKeys` 与 `rowSelection.selectedRowKeys` 为受控属性，表示当前选中行的唯一标识数组，支持 `v-model:selectedRowKeys`。
- 表格属性 `selectedRowKeys` 优先级高于 `rowSelection.selectedRowKeys`。
- `rowSelection.defaultSelectedRowKeys` 非受控属性，默认选中行的唯一标识数组。
- `rowSelection.hideSelectAll` 隐藏表头全选勾选框与自定义选择项。
- `rowSelection.onChange` 会在选中行发生变化时触发。

:::demo

selection/row-selection-checkbox

:::

## 选择与操作

使用受控属性 `selectedRowKeys` 或 `rowSelection.selectedRowKeys`时， 可以进行选择与操作。

- `v-model:selectedRowKeys` 双向绑定。
- `selectedRowKeys` 配合 `rowSelection.onChange` 使用，手动赋值。
- `rowSelection.selectedRowKeys` 配合 `rowSelection.onChange` 使用，手动赋值。

:::demo

selection/row-selection-and-operation

:::

## 自定义选择项

通过 `rowSelection.selections` 自定义选择项，默认不显示下拉选项，设为 `true` 时显示默认选择项。

:::demo

selection/row-selection-custom

:::

## 点击行选中

通过给行添加自定义属性 `customRow` 配合受控属性 `selectedRowKeys` 实现行点击选中。

:::demo

selection/row-selection-click-row

:::
