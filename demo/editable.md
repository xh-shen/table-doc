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

- `editableType` 可编辑表格的类型，单元格、单行、多行编辑，支持 `'cell' | 'single' | 'multiple'`，行编辑时需要设置为 `'single' | 'multiple'`。
- `editableRowKeys` 受控属性，用于控制处于编辑状态的行，支持 `v-model:editableRowKeys`，支持非受控属性 `defaultEditableRowKeys`。
- 编辑的行发生变化时，监听事件 `onEditableRowsChange`，在事件处理程序中添加业务逻辑。
- 编辑的行数据发生变化时，监听事件`onRowEdit` 在事件处理程序中添加业务逻辑。
- 实例方法 `startEditable` 用于进入编辑状态，参数为 `rowKey`, 受 `editableType` 限制，自定控制单行多行提示。
- 实例方法 `cancelEditable` 用于取消编辑状态。
- 实例方法 `saveEditRecord` 用于保存当前编辑数据，内部会进行表单验证，验证通过会更新数据并返回最新的数据 `Promise<EditedRow>`。
- 实例方法 `addEditRecord` 添加编辑行，受 `editableType` 限制，自定控制单行多行提示。

:::demo

editable/row-editable

:::
