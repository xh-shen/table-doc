# API

## TableProvider Props

| 名称        | 类型   | 默认值                                            | 说明                                                                                                                                 | 必传 |
| ----------- | ------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| size        | String | 'default'                                         | 表格尺寸。可选项：small/default/large。TS 类型：`'default' \| 'small' \| 'large'`                                                    | N    |
| locale      | Object | \{filterTitle: '筛选',filterConfirm: '确定',...\} | 国际化配置，默认简体中文，具体使用查看<a href="../guide/locale" target="_blank" rel="noreferrer">国际化</a>。TS 类型：`STableLocale` | N    |
| themeColor  | String | undefined                                         | 配置 Table 主题色，仅支持十六进制颜色值，如：`#00b96b`                                                                               | N    |
| customClass | String | undefined                                         | 自定义 Table 类名                                                                                                                    | N    |

## Table Props

| 名称               | 类型              | 默认值                                            | 说明                                                                                                                                                                                             | 必传 |
| ------------------ | ----------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| bordered           | Boolean           | false                                             | 是否显示表格边框                                                                                                                                                                                 | N    |
| animateRows        | Boolean           | true                                              | 是否开启动画                                                                                                                                                                                     | N    |
| virtual            | Boolean           | true                                              | 是否开启虚拟滚动                                                                                                                                                                                 | N    |
| xVirtual           | Boolean           | true                                              | 是否开启横向虚拟滚动                                                                                                                                                                             | N    |
| columns            | Array             | undefined                                         | 列配置，泛型 T 指表格数据类型。TS 类型：`Array<STableColumnsType<T>>`                                                                                                                            | N    |
| childrenColumnName | String            | 'children'                                        | 指定树形结构的列名                                                                                                                                                                               | N    |
| dataSource         | Array             | []                                                | 数据源，泛型 T 指表格数据类型。TS 类型：`Array<T>`                                                                                                                                               | N    |
| autoHeaderHeight   | Boolean           | false                                             | 是否开启自动表头高度，开启后会全量加载表头部分                                                                                                                                                   | N    |
| loading            | Boolean / Object  | undefined                                         | 加载中状态。值为 true 会显示默认加载中样式，基于 Loading 组件开发，透传全部 Loading 组件属性。值为 false 则会取消加载状态。TS 类型：`boolean \| Partial<LoadingProps>`                           | N    |
| locale             | Object            | \{filterTitle: '筛选',filterConfirm: '确定',...\} | 国际化配置，默认简体中文，具体使用查看<a href="../guide/locale" target="_blank" rel="noreferrer">国际化</a>，支持全局配置 `STableProvider`。TS 类型：`STableLocale`                              | N    |
| pagination         | Boolean / Object  | undefined                                         | 分页配置，当 dataSource 数据长度超过分页大小时，会自动对本地数据 dataSource 进行分页，如果不希望对 dataSource 进行分页，可以设置值为`false`。TS 类型：`false \| Partial<STablePaginationConfig>` | N    |
| rowClassName       | String / Function | undefined                                         | 行类名，泛型 T 指表格数据类型。record 表示行数据；index 表示行下标；indent 表示行缩进等级。TS 类型：`string \| (record: T, index: number, indent?: number) => string`                            | N    |
| rowKey             | String / Function | 'id'                                              | 必需。使用 rowKey 唯一标识一行数据，泛型 T 指表格数据类型。TS 类型：`string \| (record: T) => string`                                                                                            | N    |
| rowSelection       | Object            | undefined                                         | 行选择配置，泛型 T 指表格数据类型。TS 类型：`STableRowSelection<T>`                                                                                                                              | N    |
