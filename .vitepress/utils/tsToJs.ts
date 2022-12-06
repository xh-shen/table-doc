/*
 * @Author: shen
 * @Date: 2022-12-05 13:45:20
 * @LastEditors: shen
 * @LastEditTime: 2022-12-06 12:17:36
 * @Description:
 */
import { transformSync } from '@babel/core'

const tsToJs = (content: string): string => {
	if (!content) {
		return ''
	}
	const { code } = transformSync(content, {
		configFile: false,
		plugins: [
			[
				require.resolve('@babel/plugin-transform-typescript'),
				{
					isTSX: true
				}
			]
		]
	}) as any
	return code || ''
}

export default tsToJs
