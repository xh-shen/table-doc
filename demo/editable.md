# 可编辑

可编辑的表格分为单元格编辑表格和行编辑表格两种。

## 可编辑单元格的表格

- `column.edit.component` 表示进行编辑的组件，示例：Input、Select、DatePicker。需保证组件包含 `value` 和 `onChange` 两个属性。如果还需要支持校验规则，则组件还需实现 `status` API，实现规则可参考 Input 组件。
- `column.edit.props` 表示传给编辑组件 `column.edit.component` 的参数。
- `column.edit.onEdited` 表示编辑完成后，退出编辑模式时触发。
- `column.edit.rules` 指校验规则。
- `column.edit.abortEditOnEvent` 表示除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态。如：单选框值变化事件 `onChange`，一般情况无需配置。
- `column.edit.defaultEditable` 默认状态是否为编辑态。
- `editableCellState` 表格全局属性，用于控制单元格是否允许编辑。返回值为 `true` 则表示可编辑；返回值为 `false` 则表示不可编辑，只读状态。

:::demo

editable/cell-editable

:::

可编辑的组件需保证组件包含 `value` 和 `onChange` 两个属性。如果还需要支持校验规则，则组件还需实现 `status` API，实现规则可参考示例。`status` 状态实现`error` 时的样式即可。

示例 `input.vue`
:::demo

editable/input

:::

## 可编辑行的表格

可对表格进行整行编辑和保存等操作。

- `editableRowKeys` 用于控制处于编辑状态的行。
- `onRowEdit` 会在行编辑时触发。
- 实例方法 `validateRowData` 用于进行表格行数据校验，`onRowValidate` 在行编辑校验完成时触发。
- 实例方法 `validateTableData` 用于进行表格全部数据校验，`onValidate` 在全部数据校验完成时触发。

:::demo

editable/row-editable

:::
