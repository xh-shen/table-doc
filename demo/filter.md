# 排序和过滤

排序和过滤功能是表格一个非常常见并实用的功能，下面将介绍基本的排序和过滤以及多列排序和自定义过滤组件。

## 单字段排序

本地单字段排序，表示组件内部会对参数 dataSource 进行数据排序。

- 将需要排序的列属性 `sorter` 设置为排序函数，示例：`sorter: (a, b) => a.age - b.age`。
- 排序发生变化时，监听事件 `onSorterChange`，在事件处理程序中添加业务逻辑。

:::demo

filter/single-sorter

:::

## 多字段排序

本地多字段排序，表示组件内部会对参数 dataSource 进行数据排序。

- 将需要排序的列属性 `sorter` 设置为对象，示例：`sorter: { compare: (a, b) => a.score - b.score, multiple: 2 }`。
- `sorter.multiple` 字段以配置多字段排序优先级，值越大优先级越高。
- 排序发生变化时，监听事件 `onSorterChange`，在事件处理程序中添加业务逻辑。

:::demo

filter/multiple-sorter

:::

## 服务端排序

当使用服务端数据排序时，组件只处理排序交互状态，不处理数据逻辑。

- 单字段排序，设置列属性 `sorter: true` 即可。
- 多字段排序，设置列属性 `sorter: { multiple: 1 }` 即可。
- 排序发生变化时，监听事件 `onSorterChange`，在事件处理程序中添加服务端数据逻辑。

:::demo

filter/request-sorter

:::

## 本地过滤

组件默认内置：复选框、单选按钮等类型的筛选器。同时，也可以自定义任何筛选器，如示例中的日期选择器。

- 列配置 `filter.type` 决定使用哪一种筛选器，可选值有：`single/multiple`，分别表示：单选按钮筛选器、复选框筛选器。也可以使用 `filter.component` 自定义筛选组件。
- 列配置 `filter.list` 用于配置当前筛选器可选值有哪些，仅当 `filter.type` 等于 single 或 multiple 时有效。
- 列配置 `filter.props` 用于透传筛选器属性，可以对筛选器进行任何原组件支持的属性配置.
- 列配置 `filter.component` 用于自定义筛选器，只要保证自定义筛选器包含 `value` 属性 和 `change` 事件，即可像内置筛选器一样正常使用。
- 列配置 `filter.showConfirmAndReset` 用于控制是否显示“确认”“重置”按钮.
- 列配置 `filter.resetValue` 用于设置点击“重置”按钮时的重置值，并非每个场景都会重置为 `''` 或 `[]` `null`，默认重置为 `''`。
- 列配置 `filter.filterIcon` 用于设置自定义过滤图标。
- 列配置 `filter.onFilter` 用于本地过滤执行函数，函数为：`(value, record) => boolean`。
- 过滤发生变化时，监听事件 `onFilterChange`，在事件处理程序中添加业务逻辑。

:::demo

filter/filter

:::

使用 `filter.component` 自定义筛选组件时，需要自定义筛选器包含 `value` 属性 和 `change` 事件。

下面是以 `Element Plus`中的 `ElDatePicker`组件为示例的自定义筛选组件。

当然你可以自定义任何筛选组件，只要满足条件即可。

:::demo

filter/DatePicker

:::

## 服务端过滤

服务端过滤和服务端排序基本类似，不需要配置 `filter.onFilter` 本地过滤执行函数，只展示过滤交互。

:::demo

filter/request-filter

:::
