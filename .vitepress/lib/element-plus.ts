/*
 * @Author: shen
 * @Date: 2022-12-04 15:51:59
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 21:27:45
 * @Description:
 */
import { App } from 'vue'

import {
	ElAutocomplete,
	ElButton,
	ElButtonGroup,
	ElCalendar,
	ElCascader,
	ElCascaderPanel,
	ElCheckbox,
	ElCheckboxButton,
	ElCheckboxGroup,
	ElColorPicker,
	ElDatePicker,
	ElInput,
	ElInputNumber,
	ElOption,
	ElOptionGroup,
	ElRadio,
	ElRadioButton,
	ElRadioGroup,
	ElSelect,
	ElSwitch,
	ElTimePicker,
	ElTimeSelect,
	ElMessage,
	ElMessageBox,
	ElNotification,
	ElIcon,
	ElTooltip,
	ElCollapseTransition
} from 'element-plus'

const components = [
	ElIcon,
	ElAutocomplete,
	ElButton,
	ElButtonGroup,
	ElCalendar,
	ElCascader,
	ElCascaderPanel,
	ElCheckbox,
	ElCheckboxButton,
	ElCheckboxGroup,
	ElColorPicker,
	ElDatePicker,
	ElInput,
	ElInputNumber,
	ElOption,
	ElOptionGroup,
	ElRadio,
	ElRadioButton,
	ElRadioGroup,
	ElSelect,
	ElSwitch,
	ElTimePicker,
	ElTimeSelect,
	ElTooltip,
	ElCollapseTransition
]

const plugins = [ElMessage, ElMessageBox, ElNotification]

export function setupElement(app: App<Element>): void {
	components.forEach((component: any) => {
		app.component(component.name, component)
	})

	plugins.forEach((plugin: any) => {
		app.use(plugin)
	})
}
