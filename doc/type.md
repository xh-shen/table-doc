# TYPE

## 详细类型定义

```ts
import type { CSSProperties, HTMLAttributes, VNode, ComputedRef } from 'vue'
import type { INTERNAL_SELECTION_ITEM } from '../hooks/useRowSelection'
import type { DOWN, LEFT, RIGHT, UP } from '../utils/constant'
import type { ComponentType, SizeEnum, SNodeReturnValue } from './common'
import type { LoadingProps } from './loading'
import type { PaginationProps } from './pagination'
import type { CheckboxProps } from './checkbox'

export interface BaseTableProps<T extends TableRowData = DefaultRowData> {
	/**
	 * 表格尺寸
	 * @default default
	 */
	size?: SizeEnum
	/**
	 * 是否显示鼠标悬浮状态
	 */
	hover?: boolean
	/**
	 * 可选择是否显示选中状态
	 */
	highlightSelected?: boolean
	/**
	 * 是否显示表格边框
	 */
	bordered?: boolean
	/**
	 * 表格行 key 的取值，可以是字符串或一个函数
	 * @default key
	 */
	rowKey?: string | GetRowKey<T>
	/**
	 * 国际化配置，默认简体中文
	 */
	locale?: TableLocale
}

export interface STableProviderProps<T extends TableRowData = DefaultRowData> extends BaseTableProps<T> {
	/**
	 * 主题色，仅支持16进制颜色值
	 */
	themeColor?: string
	/**
	 * 自定义类名
	 */
	customClass?: string
}

export interface STableProps<T extends TableRowData = DefaultRowData> extends BaseTableProps<T> {
	/**
	 * 是否允许拖拽列排序，全量开启，优先级低于 `column.drag`
	 * @default false
	 */
	allowColumnDrag?: boolean
	/**
	 * 是否显示斑马纹
	 * @default false
	 */
	stripe?: boolean
	/**
	 * 是否显示表头
	 * @default true
	 */
	showHeader?: boolean
	/**
	 * 是否显示表头滚动条
	 * @default false
	 */
	showHeaderScrollbar?: boolean
	/**
	 * 列配置，泛型 T 指表格数据类型
	 * @default []
	 */
	columns?: Array<TableColumnType<T>>
	/**
	 * 数据源，泛型 T 指表格数据类型
	 * @default []
	 */
	dataSource?: Array<T>
	/**
	 * 忽略单元格唯一 key，进一步提升自定义组件复用
	 * @default false
	 */
	ignoreCellKey?: boolean
	/**
	 * 是否开启行动画
	 * @default true
	 */
	animateRows?: boolean
	/**
	 * 是否开启虚拟滚动，行和列默认全部开启
	 * @default true
	 */
	virtual?: boolean
	/**
	 * 是否开启列虚拟滚动，优先级高于 `virtual`
	 */
	xVirtual?: boolean
	/**
	 * 行列虚拟滚动伐值
	 * @default 30
	 */
	virtualThreshold?: number | TableThresholdType
	/**
	 * 配置行高，组件内部默认会根据 `size` 自动调整高度，如果需要自定义高度可使用该属性。
	 * `size='small'`时`rowHeight=39`；`size='large'`时`rowHeight=55`
	 * @default 47
	 */
	rowHeight?: TableRowHeight<T>
	/**
	 * 是否开启表头自动高度，开启时将关闭列虚拟滚动
	 * @default false
	 */
	autoHeaderHeight?: boolean
	/**
	 * 表头高度，表格分组时，可以使用数组的方式设置不同层级的高度
	 * @default false
	 */
	headerHeight?: number | number[]
	/**
	 * 表格高度，超出后会出现滚动条。示例：`100, '300'`。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight`
	 */
	height?: string | number
	/**
	 * 表格最大高度，超出后会出现滚动条。示例：`100, '300'`。值为数字类型，会自动加上单位 px
	 */
	maxHeight?: string | number
	/**
	 * 所有单元格内容强制换行，优先级低于`column.wrapText`
	 * @default false
	 */
	wrapText?: boolean
	/**
	 * 显示排序文本提示，优先级低于 `column.showSorterTooltip`
	 * @default true
	 */
	showSorterTooltip?: boolean
	/**
	 * 加载中状态。值为 `true` 会显示默认加载中样式，可以通过 Object 自定义加载状态呈现内容。值为 `false` 则会取消加载状态
	 */
	loading?: boolean | TableLoadingConfig
	/**
	 * 分页配置，默认会显示分页，值为`false`则不显示。当 `dataSource` 数据长度超过分页大小时，会自动对本地数据 `dataSource` 进行分页
	 */
	pagination?: false | TablePaginationConfig
	/**
	 * 表格默认方向控制
	 */
	direction?: 'ltr' | 'rtl'
	/**
	 * 指定树形结构的列名
	 * @default children
	 */
	childrenColumnName?: string
	/**
	 * 行类名，如果是 `string` 则所有行使用同一个类名；如果是 `function`，可以根据行数据添加不同的行类名
	 */
	rowClassName?: string | RowClassName<T>
	/**
	 * 表头吸顶，如需控制具体顶部的偏移量，可以使用对象的方式配置 `{offsetHeader: 60, topSummary: false}`，同时可以通过 `topSummary`控制表头统计行是否吸顶
	 * @default false
	 */
	sticky?: boolean | HeaderSticky
	/**
	 * 指定选中项的 key 数组，需要和 `rowSelection.onChange` 进行配合，优先级高于 `rowSelection.selectedRowKeys`
	 */
	selectedRowKeys?: Key[]
	/**
	 * 表格行序号，请参考 `TableRowSerialNumber` 文档
	 */
	rowSerialNumber?: boolean | TableRowSerialNumber<T>
	/**
	 * 表格行是否可选择，请参考 `TableRowSelection` 文档
	 */
	rowSelection?: TableRowSelection<T>
	/**
	 * 控制展开图标是否固定，如果固定在左侧，可设置 `fixed = true ｜ 'left'`。可选值 `true | 'left' | 'right'`
	 */
	expandFixed?: boolean | FixedType
	/**
	 * 展开列宽度
	 * @default 48
	 */
	expandColumnWidth?: number
	/**
	 * 展开的行，控制属性
	 */
	expandedRowKeys?: Array<Key>
	/**
	 * 默认展开的行
	 */
	defaultExpandedRowKeys?: Array<Key>
	/**
	 * 额外的展开行
	 */
	expandedRowRender?: ExpandedRowRender<T>
	/**
	 * 通过点击行来展开子行
	 * @default false
	 */
	expandRowByClick?: boolean
	/**
	 * 自定义展开图标
	 */
	expandIcon?: RenderExpandIcon<T>
	/**
	 * 初始时，是否展开所有行
	 * @default false
	 */
	defaultExpandAllRows?: boolean
	/**
	 * 展示树形数据时，每层缩进的宽度，以 px 为单位
	 * @default 15
	 */
	indentSize?: number
	/**
	 * 自定义展开按钮的列顺序，`-1` 时不展示
	 */
	expandIconColumnIndex?: number
	/**
	 * 设置是否允许行展开
	 * @default () => true
	 */
	rowExpandable?: (record: T) => boolean
	/**
	 * 表格行 hover 延时
	 * @default 50
	 */
	rowHoverDelay?: number
	/**
	 * 设置行属性
	 */
	customRow?: (data: T, index: number) => Omit<HTMLAttributes, 'style'> & { style?: CSSProperties }
	/**
	 * 设置单元格属性，优先级低于`column.customCell`
	 */
	customCell?: (params: { record: T; rowIndex: number; column: TableColumnType<T> }) => Record<string, any>
	/**
	 * 设置表头单元格属性
	 */
	customHeaderCell?: (params: TableColumnType<T>) => Record<string, any>
	/**
	 * 单元格是否允许编辑。返回值为 `true` 则表示可编辑；返回值为 `false` 则表示不可编辑，只读状态
	 */
	editableCellState?: EditableCellType<T>
	/**
	 * 可编辑表格的类型，单元格编辑或单行编辑或者多行编辑
	 * @default cell
	 */
	editableType: 'cell' | 'single' | 'multiple'
	/**
	 * 处于编辑状态的行
	 * `editableType`值为`'single' | 'multiple'`时生效
	 */
	editableRowKeys?: Array<Key>
	/**
	 * 默认编辑状态的行
	 * `editableType`值为`'single' | 'multiple'`时生效
	 */
	defaultEditableRowKeys?: Array<Key>
	/**
	 * 表格横向滚动，优先级高于 `scroll.x`
	 */
	scrollX?: number | string
	/**
	 * 表格是否可滚动，也可以指定滚动区域的宽、高，`scrollToFirstRowOnChange`表示数据变化时是否滚动到首行
	 */
	scroll?: {
		x?: number | string
		y?: number | string
		scrollToFirstRowOnChange?: boolean
	}
	/**
	 * 固定总结栏，可选值 `true | false | 'top' | 'bottom'`
	 * @default false
	 */
	summaryFixed?: boolean | SummaryFixed
	/**
	 * 设置 `contextmenuPopup` 插槽，启用右键菜单功能，不需要手动控制
	 */
	hasContextmenuPopup?: boolean
	/**
	 * 浮层渲染父节点，默认渲染到 `body` 上
	 */
	getPopupContainer?: GetPopupContainer
	/**
	 * 分页、排序、筛选变化时触发
	 */
	onChange?: (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<T> | SorterResult<T>[],
		action: TableAction
	) => void
	/**
	 * 数据变化时触发
	 */
	onDataChange: (data: T[]) => void
	/**
	 * 排序变化时触发
	 */
	onSorterChange: (params: SorterResult<T> | SorterResult<T>[]) => void
	/**
	 * 筛选变化时触发
	 */
	onFilterChange: (params: Record<string, DefaultValue>) => void
	/**
	 * 分页变化时触发
	 */
	onPaginationChange: (params: TablePaginationConfig) => void
	/**
	 * 表格内容滚动时触发
	 */
	onScroll?: (params: { e: WheelEvent }) => void
	/**
	 * 拖动列时触发, 如果不需要内部自动更改宽度，可以返回 `false`
	 */
	onResizeColumn?: (w: number, col: TableColumnType<T>, action: ResizeActionType) => boolean | void
	/**
	 * 拖拽行结束时触发
	 */
	onRowDragEnd?: (params: DragRowEventInfo<T>) => boolean | Promise<any> | void
	/**
	 * 拖拽列结束时触发
	 */
	onColumnDragEnd?: (params: DragColumnEventInfo) => boolean | void | Promise<any>
	/**
	 * 点击展开图标时触发
	 */
	onExpand?: (expanded: boolean, record: T) => void
	/**
	 * 展开的行变化时触发
	 */
	onExpandedRowsChange?: (keys: Key[]) => void
	/**
	 * 编辑行变化时触发
	 */
	onEditableRowsChange?: (keys: Key[]) => void
	/**
	 * 行编辑时触发
	 */
	onRowEdit?: (context: TableRowEditContext<T>) => void
	/**
	 * 行编辑校验完成后触发，即组件实例方法 `validateRowData` 执行结束后触发
	 */
	onRowValidate?: (context: TableRowValidateContext<T>) => void
	/**
	 * 可编辑行表格，全部数据校验完成后触发。即组件实例方法 `validateTableData` 执行结束后触发
	 */
	onValidate?: (context: TableValidateContext) => void
	/**
	 *  v-model:selectedRowKeys 时触发
	 */
	'onUpdate:selectedRowKeys'?: (selectedRowKeys: Key[], selectedRows: T[]) => void
	/**
	 *  v-model:expandedRowKeys 时触发
	 */
	'onUpdate:expandedRowKeys'?: (expandedRowKeys: Key[]) => void
	/**
	 *  v-model:editableRowKeys 时触发
	 */
	'onUpdate:editableRowKeys'?: (editableRowKeys: Key[]) => void
	/**
	 *  v-model:pagination 时触发
	 */
	'onUpdate:pagination'?: (paginationConfig: TablePaginationConfig) => void
}

export interface STableInstanceExpose<T extends TableRowData = DefaultRowData, K extends Key = DefaultValue> {
	body: ComputedRef<any>
	scrollTo: (options: Position, type?: 'auto' | 'smooth', isAnimate?: boolean) => void
	startEditable: (rowKey: K) => boolean
	cancelEditable: (rowKey: K) => boolean
	saveEditRecord: (rowKey: K) => Promise<T>
	addEditRecord: (record: Partial<T>, options?: AddLineOptions) => boolean
	validateTableData: () => Promise<Promise<TablePromiseErrorData[]>>
	validateRowData: (rowKey: K) => Promise<TableRowValidateContext<T>>
	clearValidateRowData: (rowKey: K) => void
	clearValidateData: () => void
}

export type TableColumnsType<T extends TableRowData = DefaultRowData> = TableColumnType<T>[]
export interface TableColumnType<T extends TableRowData = DefaultRowData> {
	/**
	 * 表头列类名
	 */
	className?: string
	/**
	 * 表头列类名
	 */
	class?: string
	/**
	 * 自定义表头渲染。值类型为 Function 表示以函数形式渲染表头。值类型为 string 表示直接使用，插槽headerCell优先级最高。
	 */
	title?:
		| string
		| ((props: {
				sortOrder?: SortOrder
				sortColumn?: TableColumnType<T>
				sortColumns?: {
					column: TableColumnType<T>
					order: SortOrder
				}[]
				filters?: Record<string, string[]>
		  }) => SNodeReturnValue)
	/**
	 * Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性，最好全部设置唯一的key值获取最佳体验。
	 * @default ''
	 */
	key?: Key
	/**
	 * 用于多级表头，泛型 T 指表格数据类型
	 */
	children?: Array<TableColumnType<T>>
	/**
	 * 固定列显示位置，如果固定在左侧，可设置 `fixed = true ｜ 'left'`。
	 */
	fixed?: FixedType
	/**
	 * 单元格和表头内容超出时，是否显示省略号。如果希望单元格超出省略，可设置 `ellipsis = true`，同时会使用dom title提示。
	 * 如果希望单元格超出省略同时关闭dom title提示，可设置 `ellipsis = { showTitlt: false }`。
	 * @default false
	 */
	ellipsis?: CellEllipsisType
	/**
	 * 表头内容超出时，是否显示省略号。如果希望表头超出省略，可设置 `ellipsisTitle = true`，同时会使用dom title提示。
	 * 如果希望表头超出省略同时关闭dom title提示，可设置 `ellipsisTitle = { showTitlt: false }`。
	 * 优先级高于`ellipsis`
	 * @default true
	 */
	ellipsisTitle?: CellEllipsisType
	/**
	 * 列横向对齐方式
	 * @default left
	 */
	align?: ColumnAlignType
	/**
	 * 单元格内容强制换行
	 * @default false
	 */
	wrapText?: boolean
	/**
	 * 单行表头合并列，设置为 `0` 时，不渲染。多行表头请参考「多级表头」文档示例。
	 */
	colSpan?: number
	/**
	 * 表头自动高度时使用，td、th的rowSpan。
	 */
	rowSpan?: number
	/**
	 * 列数据在数据项中对应的路径，支持通过数组查询嵌套路径。
	 */
	dataIndex?: DataIndex
	/**
	 * 列宽度
	 */
	width?: number
	/**
	 * 拖动列最小宽度，会受到表格自动调整分配宽度影响
	 */
	minWidth?: number
	/**
	 * 拖动列最大宽度，会受到表格自动调整分配宽度影响
	 */
	maxWidth?: number
	/**
	 * 是否允许调整当前列宽
	 * @default false
	 */
	resizable?: boolean
	/**
	 * 是否启用自动行高, 为`true`时，该列单元格内容将根据内容自动撑高。
	 * 但是不建议对每一列都设置，对于大多数场景，一般只有少数几列会有自动行高的需求。
	 * @default false
	 */
	autoHeight?: boolean
	/**
	 * 单元格自定义悬浮提示。
	 */
	tooltip?: boolean | TableTooltipConfig<T>
	/**
	 * 该列是否支持排序。
	 * 值为 `true` 时，该列支持排序，需要服务端配合实现排序。
	 * 值类型为函数时，表示对本地数据 `dataSource` 进行排序，返回值参考 [MDN Array.sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)。
	 * 值类型为对象时，`multiple` 多列排序优先级，`compare` 函数表示对本地数据 `dataSource` 进行排序。
	 * 泛型 T 指表格数据类型。
	 * @default false
	 */
	sorter?:
		| boolean
		| CompareFn<T>
		| {
				compare?: CompareFn<T>
				multiple?: number
		  }
	/**
	 * 排序的受控属性，外界可用此控制列的排序，可设置为 `'ascend'｜'descend'|null`。
	 */
	sortOrder?: SortOrder
	/**
	 * 默认排序顺序，可设置为 `'ascend'｜'descend'`。
	 */
	defaultSortOrder?: SortOrder
	/**
	 * 支持的排序方式
	 * @default ['ascend', 'descend']
	 */
	sortDirections?: SortOrder[]
	/**
	 * 显示排序文本提示
	 * @default false
	 */
	showSorterTooltip?: boolean
	/**
	 * 过滤规则，支持多选(multiple)、单选(single)、输入框(input) 等三种形式。想要自定义过滤组件，可通过 `filter.component` 实现，自定义过滤组件需要包含参数 value 和事件 change。更多信息请查看当前页面中 `TableColumnFilter` 的详细文档
	 */
	filter?: TableColumnFilter<T>
	/**
	 * 可编辑单元格配置项，具体属性参考文档 `TableEditableCellConfig` 描述
	 */
	edit?: TableEditableCellConfig<T>
	/**
	 * 设置单元格属性
	 */
	customCell?: (params: { record: T; rowIndex: number; column: TableColumnType<T> }) => Record<string, any>
	/**
	 * 设置头部单元格属性
	 */
	customHeaderCell?: (column: TableColumnType<T>) => Record<string, any>
	/**
	 * 自定义单元格渲染。可用于合并单元格。
	 */
	customRender?: (params: {
		value: DefaultValue
		text: DefaultValue
		record: T
		index: number
		column?: TableColumnType<T>
	}) => RenderedCell | SNodeReturnValue
	/**
	 * 当前列添加拖拽手柄
	 */
	rowDrag?: boolean | ((arg: { record: T; column: TableColumnType<T> }) => boolean)
	/**
	 * 列表头是否允许拖拽
	 */
	drag?: boolean
	/**
	 * 自定义slot插槽
	 */
	slots?: {
		filterIcon?: string
		filterDropdown?: string
		customRender?: string
		title?: string
	}
}

export interface TableRowData {
	[key: string]: DefaultValue
	children?: TableRowData[]
}

export type TableRowHeight<T extends TableRowData = DefaultRowData> =
	| ((record: T, isExpandRow: boolean, baseHeight: number) => number | undefined)
	| number

export interface TableThresholdType {
	column?: number
	row?: number
}

export interface TableLoadingConfig extends LoadingProps {
	loading: boolean
}

export interface TablePaginationConfig extends PaginationProps {
	/**
	 * 分页器位置
	 */
	position?: Array<'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'>
}

export interface TableRowSerialNumber<T extends TableRowData = DefaultRowData> {
	/**
	 * 序号列宽度
	 * @default 48
	 */
	columnWidth?: string | number
	/**
	 * 序号列标题，支持函数渲染，可以返回jsx
	 */
	columnTitle?:
		| string
		| ((props: {
				sortOrder?: SortOrder
				sortColumn?: TableColumnType<T>
				sortColumns?: {
					column: TableColumnType<T>
					order: SortOrder
				}[]
		  }) => SNodeReturnValue)
	/**
	 * 是否把序号列固定在左边，`columns`配置中不存在固定在左侧的列时生效
	 */
	fixed?: boolean
	/**
	 * 是否当前分页内的序号
	 * @default false
	 */
	currentPage?: boolean
	/**
	 * 自定义序号列单元格渲染。
	 */
	customRender?: (params: { value: number; record: T; index: number }) => SNodeReturnValue
}

export interface TableRowSelection<T extends TableRowData = DefaultRowData> {
	/**
	 * 数据被删除时是否仍然保留选项的Key
	 * @default false
	 */
	preserveSelectedRowKeys?: boolean
	/**
	 * 多选还是单选，控制显示单选框或复选框
	 * @default checkbox
	 */
	type?: RowSelectionType
	/**
	 * 单选时是否允许取消选择
	 * @default false
	 */
	allowCancelRadio?: boolean
	/**
	 * 指定选中项的 key 数组，需要和 `onChange` 进行配合，优先级低于 `props.selectedRowKeys`
	 */
	selectedRowKeys?: Key[]
	/**
	 * 指定默认选中项的 key 数组
	 */
	defaultSelectedRowKeys?: Key[]
	/**
	 * 自定义选择项 配置项, 设为 `true` 时使用默认选择项
	 */
	selections?: INTERNAL_SELECTION_ITEM[] | boolean
	/**
	 * 隐藏表头全选勾选框与自定义选择项
	 */
	hideSelectAll?: boolean
	/**
	 * 是否把选择框列固定在左边，`columns`配置中不存在固定在左侧的列时生效
	 */
	fixed?: boolean
	/**
	 * 选择列宽度
	 * @default 48
	 */
	columnWidth?: string | number
	/**
	 * 选择列标题，支持函数渲染，可以返回jsx
	 */
	columnTitle?:
		| string
		| ((props: {
				sortOrder?: SortOrder
				sortColumn?: TableColumnType<T>
				sortColumns?: {
					column: TableColumnType<T>
					order: SortOrder
				}[]
		  }) => SNodeReturnValue)
	/**
	 * checkable 状态下节点选择完全受控（父子数据选中状态不再关联）
	 * @default true
	 */
	checkStrictly?: boolean
	/**
	 * 选择框的默认属性配置
	 */
	getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>
	// renderCell?: (value: boolean, record: T, index: number, originNode: any) => any
	/**
	 * 选中项发生变化时的回调
	 */
	onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void
	/**
	 * 用户手动选择/取消选择某行的回调
	 */
	onSelect?: SelectionSelectFn<T>
	/**
	 * 用户使用键盘 shift 选择多行的回调
	 */
	onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void
	/**
	 * 用户手动选择/取消选择所有行的回调
	 */
	onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void
	/**
	 * 用户手动选择反选的回调
	 */
	onSelectInvert?: (selectedRowKeys: Key[]) => void
	/**
	 * 用户清空选择的回调
	 */
	onSelectNone?: () => void
}

export interface TableLocale {
	filterTitle?: string
	filterConfirm?: string
	filterReset?: string
	filterEmptyText?: string
	emptyText?: string
	selectAll?: string
	selectNone?: string
	selectInvert?: string
	selectionAll?: string
	serialNumberTitle?: string
	sortTitle?: string
	expand?: string
	collapse?: string
	triggerDesc?: string
	triggerAsc?: string
	cancelSort?: string
	itemsPerPage?: string
	jumpTo?: string
	page?: string
	prevPage?: string
	nextPage?: string
	prev5?: string
	next5?: string
	prev3?: string
	next3?: string
}

export interface TableTooltipConfig<T extends TableRowData = DefaultRowData> {
	placement?:
		| 'top'
		| 'left'
		| 'right'
		| 'bottom'
		| 'topLeft'
		| 'topRight'
		| 'bottomLeft'
		| 'bottomRight'
		| 'leftTop'
		| 'leftBottom'
		| 'rightTop'
		| 'rightBottom'
	color?: String
	overlayStyle?: CSSProperties
	overlayClassName?: String
	openClassName?: String
	title?: string | ((args: CellRenderArgs<T>) => SNodeReturnValue)
	align?: {
		points?: [string, string]
		offset?: [number | string, number | string]
		targetOffset?: [number | string, number | string]
		overflow?: {
			adjustX: boolean
			adjustY: boolean
		}
		useCssRight?: boolean
		useCssBottom?: boolean
		useCssTransform?: boolean
	}
}

export interface FinallyColumnType<T extends TableRowData = DefaultRowData> extends TableColumnType<T> {
	finallyWidth?: number
	rowSpan?: number
	height?: number
	left?: number
	top?: number
	type?: 'checkbox' | 'expand' | 'serialNumber' | 'draggable'
	columnKey: Key
	columnIndex: number
	children?: FinallyColumnType<T>[]
	originColumn?: TableColumnType<T>
	__Internal__Column__?: boolean
	showTitle: boolean
	fixed?: 'left' | 'right'
}

export interface SorterResult<T extends TableRowData = DefaultRowData> {
	column?: TableColumnType<T>
	order?: SortOrder
	field?: Key | readonly Key[]
	columnKey?: Key
}
export interface TableCurrentDataSource<T extends TableRowData = DefaultRowData> {
	currentDataSource: T[]
	action: TableAction
}

export type GetRowKey<T extends TableRowData = DefaultRowData> = (record: T, index?: number) => Key
export type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void
export type RowSelectionType = 'checkbox' | 'radio'
export type ExpandedRowRender<T> = (params: { record: T; index: number; indent: number; expanded: boolean }) => SNodeReturnValue
export type RenderExpandIcon<T> = (props: RenderExpandIconProps<T>) => SNodeReturnValue
export interface RenderExpandIconProps<T> {
	prefixCls: string
	expanded: boolean
	record: T
	expandable: boolean
	onExpand: TriggerEventHandler<T>
}
export type TriggerEventHandler<T> = (record: T, key: Key, event: MouseEvent) => void

export type CellEllipsisType =
	| {
			showTitle?: boolean
	  }
	| boolean

export interface DragRowEventInfo<T extends TableRowData = DefaultRowData> {
	top: number
	height: number
	dir: typeof DOWN | typeof UP
	rowKey: Key
	record: T
	event: MouseEvent | Touch
	column: TableColumnType<T>
	preTargetInfo: DragRowsHandleInfo<T> | null
	nextTargetInfo: DragRowsHandleInfo<T> | null
	fromIndexs: number[]
	insertToRowKey: Key
}
export interface DragRowsHandleInfo<T extends TableRowData = DefaultRowData> {
	y: number
	top: number
	height: number
	rowKey: Key
	centerY: number
	record: T
	indexs: number[]
}
export interface DragColumnEventInfo<T extends TableRowData = DefaultRowData> {
	event: MouseEvent | Touch
	column: TableColumnType<T>
	targetColumn: TableColumnType<T>
	dir: typeof LEFT | typeof RIGHT
}
export interface RowDragGhostArg<T extends TableRowData = DefaultRowData> {
	record: T
	column: TableColumnType
	icon: VNode
	allowed: boolean
	dragging: boolean
	event: MouseEvent | Touch
	preTargetInfo: DragRowsHandleInfo | null
	nextTargetInfo: DragRowsHandleInfo | null
}
export interface ColumnDragGhostArg {
	column: TableColumnType
	icon: VNode
	allowed: boolean
	dragging: boolean
	event: MouseEvent | Touch
	targetColumn: TableColumnType
}
export interface ContextmenuPopupArg<T extends TableRowData = DefaultRowData>
	extends Omit<Partial<CellRenderArgs>, 'column' | 'record'> {
	column?: TableColumnType
	record?: T
	event: MouseEvent
	isExpand?: boolean
}

export type ColumnAlignType = 'left' | 'center' | 'right'

export type ResizeActionType = 'start' | 'move' | 'end'
export type SummaryFixed = boolean | 'top' | 'bottom'
export type FixedType = 'left' | 'right' | boolean
export type SortOrder = 'descend' | 'ascend' | null
export type CompareFn<T extends TableRowData = DefaultRowData> = (a: T, b: T, sortOrder?: SortOrder) => number

export type FilterValue = (Key | boolean)[]
export type FilterKey = Key[] | null
export interface OptionData {
	text: string | number
	value: string | number | boolean
}
export interface FilterConfirmProps {
	closeDropdown: boolean
}
export interface FilterDropdownProps {
	prefixCls: string
	confirm: (param?: FilterConfirmProps) => void
	clearFilters?: () => void
	filters?: OptionData[]
	visible: boolean
}

export interface TableColumnFilter<T extends TableRowData = DefaultRowData> {
	/**
	 * 用于自定义筛选器，只要保证自定义筛选器包含 value 属性 和 change 事件，即可像内置筛选器一样正常使用。示例：`component: DatePicker`
	 */
	component?: ComponentType
	/**
	 * 哪些事件触发后会进行过滤搜索（确认按钮无需配置，会默认触发搜索）。输入框组件示例：`confirmEvents: ['onEnter']`
	 */
	confirmEvents?: string[]
	/**
	 * 用于配置当前筛选器可选值有哪些，仅当 `filter.type` 等于 `single` 或 `multiple` 时有效
	 */
	list?: Array<OptionData>
	/**
	 * 用于透传筛选器属性，可以对筛选器进行任何原组件支持的属性配置
	 */
	props?: { [key: string]: any }
	/**
	 * 重置时设置的值，示例：'' 或 []
	 */
	resetValue?: DefaultValue
	/**
	 * 初始化默认值
	 */
	defaultValue?: DefaultValue
	/**
	 * 是否显示重置和确认。值为真，过滤事件（filter-change）会在确定时触发；值为假，则数据变化时会立即触发过滤事件
	 * @default true
	 */
	showConfirmAndReset?: boolean
	/**
	 * 用于设置筛选器类型：单选按钮筛选器、复选框筛选器、输入框筛选器
	 * @default ''
	 */
	type?: FilterType
	/**
	 * 浮层渲染父节点，默认渲染到 `body` 上
	 */
	getPopupContainer?: GetPopupContainer
	/**
	 * 自定义过滤图标
	 */
	filterIcon?: ({ filtered }: { filtered: Boolean }) => SNodeReturnValue
	/**
	 * 本地模式下，确定筛选的运行函数
	 */
	onFilter?: (value: DefaultValue, record: T) => boolean
}

export interface TableCellParams<T extends TableRowData = DefaultRowData> {
	row: T
	rowIndex: number
	col: FinallyColumnType<T>
	colIndex: number
}

export interface TableEditableCellPropsParams<T extends TableRowData = DefaultRowData> extends TableCellParams<T> {
	editedRow: T
}

export interface TablePlainObject {
	[key: string]: DefaultValue
}

export type ErrorListObjectType = TableRowEditContext<TableRowData> & { errorList: AllValidateResult[] }

export interface TablePromiseErrorData {
	errors: ErrorListObjectType[]
	errorMap: TableErrorListMap
}
export type EditableCellType<T extends TableRowData = DefaultRowData> = (params: TableCellParams<T>) => boolean

export type TableEditableCellProps<T extends TableRowData = DefaultRowData> =
	| TablePlainObject
	| ((params: TableEditableCellPropsParams<T>) => TablePlainObject)

export type TableEditableCellRules<T extends TableRowData = DefaultRowData> =
	| EditRule[]
	| ((params: TableCellParams<T>) => EditRule[])

export interface TableEditableCellConfig<T extends TableRowData = DefaultRowData> {
	slots?: Record<string, any>
	/**
	 * 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态。示例：`abortEditOnEvent: ['onChange']`
	 */
	abortEditOnEvent?: string[]
	/**
	 * 组件定义，如：`Input` `Select`。对于完全自定义的组件（非组件库内的组件），组件需要支持 `value` 和 `onChange` ；如果还需要支持校验规则，则组件还需实现 `status` api，实现规则可参考 `Input` 组件
	 */
	component?: ComponentType
	/**
	 * 单元格默认状态是否为编辑态
	 * @default false
	 */
	defaultEditable?: boolean
	/**
	 * 编辑完成后，退出编辑模式时触发
	 */
	onEdited?: (context: TableOnEditedContext<T>) => void
	/**
	 * 透传给组件 `edit.component` 的属性
	 */
	props?: TableEditableCellProps<T>
	/**
	 * 校验规则
	 */
	rules?: TableEditableCellRules<T>
	/**
	 * 是否显示编辑图标
	 * @default true
	 */
	showEditIcon?: boolean
	/**
	 * 数据变化时触发
	 */
	onChange?: (value: DefaultValue, rest: { editedRow: T; updateEditedRow: (newRow: Partial<T>) => void }) => void
}

export interface IsDateOptions {
	format: string
	strictMode: boolean
	delimiters: string[]
}

export interface IsEmailOptions {
	allow_display_name?: boolean | undefined
	require_display_name?: boolean | undefined
	allow_utf8_local_part?: boolean | undefined
	require_tld?: boolean | undefined
	ignore_max_length?: boolean | undefined
	allow_ip_domain?: boolean | undefined
	domain_specific_validation?: boolean | undefined
	host_blacklist?: string[] | undefined
	blacklisted_chars?: string | undefined
}

export interface IsURLOptions {
	protocols?: string[] | undefined
	require_tld?: boolean | undefined
	require_protocol?: boolean | undefined
	require_host?: boolean | undefined
	require_port?: boolean | undefined
	require_valid_protocol?: boolean | undefined
	allow_underscores?: boolean | undefined
	host_whitelist?: Array<string | RegExp> | undefined
	host_blacklist?: Array<string | RegExp> | undefined
	allow_trailing_dot?: boolean | undefined
	allow_protocol_relative_urls?: boolean | undefined
	disallow_auth?: boolean | undefined
	allow_fragments?: boolean | undefined
	allow_query_components?: boolean | undefined
}

export type CustomValidator = (val: DefaultValue) => CustomValidateResolveType | Promise<CustomValidateResolveType>

export type CustomValidateResolveType = boolean | CustomValidateObj

export interface CustomValidateObj {
	result: boolean
	message: string
	type?: 'error' | 'warning' | 'success'
}

export interface EditRule {
	boolean?: boolean
	date?: boolean | IsDateOptions
	email?: boolean | IsEmailOptions
	enum?: Array<string>
	idcard?: boolean
	len?: number | boolean
	max?: number | boolean
	message?: string
	min?: number | boolean
	number?: boolean
	pattern?: RegExp
	required?: boolean
	telnumber?: boolean
	trigger?: 'change' | 'blur'
	type?: 'error' | 'warning'
	url?: boolean | IsURLOptions
	validator?: CustomValidator
}

export type AllValidateResult = CustomValidateObj | ValidateResultType

export interface ValidateResultType extends EditRule {
	result: boolean
}

export type TableRowEditContext<T extends TableRowData = DefaultRowData> = TableCellParams<T> & {
	value: DefaultValue
	editedRow: T
	rowKey: Key
}

export type TableRowValidateContext<T extends TableRowData = DefaultRowData> = {
	result: TableRowValidateResult<T>[]
	trigger: TableValidateTrigger
}

export type TableValidateTrigger = 'self' | 'parent'

export type TableRowValidateResult<T extends TableRowData = DefaultRowData> = TableCellParams<T> & {
	errorList: AllValidateResult[]
	value: DefaultValue
}

export type TableOnEditedContext<T extends TableRowData = DefaultRowData> = TableCellParams<T> & {
	trigger: string
	newRowData: T
}

export type TableErrorListMap = { [key: string]: AllValidateResult[] }

export interface TableValidateContext {
	result: TableErrorListMap
}

export type AlignPoint = string

export interface AlignType {
	points?: AlignPoint[]
	offset?: number[]
	targetOffset?: number[]
	overflow?: {
		adjustX?: boolean | number
		adjustY?: boolean | number
	}
	useCssRight?: boolean
	useCssBottom?: boolean
	useCssTransform?: boolean
}

export interface AlignResult {
	points: AlignPoint[]
	offset: number[]
	targetOffset: number[]
	overflow: {
		adjustX: boolean | number
		adjustY: boolean | number
	}
}

export interface TargetPoint {
	clientX?: number
	clientY?: number
	pageX?: number
	pageY?: number
}

export type TargetType = (() => HTMLElement) | TargetPoint

export type BuildInPlacements = Record<string, AlignType>

export type StretchType = string

export type AnimationType = string

export type TransitionNameType = string

export interface Point {
	pageX: number
	pageY: number
}

export interface CellType {
	key?: Key
	class?: string
	style?: CSSProperties
	colSpan?: number
	rowSpan?: number
}
export interface RenderedCell {
	props?: CellType
	children?: SNodeReturnValue
}

export interface HeaderSticky {
	offsetHeader?: number
	topSummary?: boolean
}
export interface StickyOffsets {
	left: readonly number[]
	right: readonly number[]
	isSticky?: boolean
}
export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void
export interface SelectionItem {
	key: string
	text: DefaultValue
	onSelect?: SelectionItemSelectFn
}
export type FlatRecord<T extends TableRowData = DefaultRowData> = {
	record: T
	indent: number
	rowKey: Key
	isExpandRow?: boolean
	rowIndex: number
	pos: string
	flattenIndex: number
	level: number
}
export type CellRenderArgs<T extends TableRowData = DefaultRowData> = {
	record: T
	column: TableColumnType<T>
	text: DefaultValue
	value: DefaultValue
	index: number
	recordIndexs: number[]
	editable?: boolean
}
export interface HeaderCellType {
	key?: Key
	class?: string
	style?: CSSProperties
	column?: FinallyColumnType
	colSpan?: number
	rowSpan?: number
	hasSubColumns?: boolean
	colStart?: number
	colEnd?: number
}
export interface Position {
	left?: number
	top?: number
	columnIndex?: number
	columnKey?: Key
	rowKey?: Key
}
export interface AddLineOptions {
	position: 'top' | 'bottom'
}
export type FilterType = 'single' | 'multiple'
export type RowType = 'left' | 'center' | 'right'
export type TableAction = 'paginate' | 'sort' | 'filter'
export type ExpandType = null | 'row' | 'nest'
export type RowClassName<T extends TableRowData = DefaultRowData> = (record: T, index: number, indent?: number) => string
export type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement
export type DefaultRowData = any
export type DefaultValue = any
export type DataIndex = string | number | readonly (string | number)[]
export type Key = string | number
```

## 通用类型定义

```ts
// common.ts
type VNode = import('vue').VNode
export type ScopedSlot = () => SlotReturnValue
export type SlotReturnValue = VNode | string | boolean | null | undefined | SlotReturnArray
export type SlotReturnArray = Array<SlotReturnValue>
export interface SVNode extends VNode {
	name: string
}
export type SNodeReturnValue = SlotReturnValue

// 严格执行是否有参数，不允许出现 props?:T
export type SNode<T = undefined> = T extends undefined
	? (h: typeof import('vue').h) => SNodeReturnValue
	: (h: typeof import('vue').h, props: T) => SNodeReturnValue

export type ComponentType = any

export type SizeEnum = 'small' | 'default' | 'large'
```
