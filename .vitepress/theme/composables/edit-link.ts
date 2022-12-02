/*
 * @Author: shen
 * @Date: 2022-12-02 15:46:07
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 15:49:56
 * @Description:
 */
import { computed } from 'vue'
import { useData } from 'vitepress'

export function useEditLink() {
	const { theme, page } = useData()

	return computed(() => {
		const { text = 'Edit this page', pattern } = theme.value.editLink || {}
		const { relativePath } = page.value
		const url = pattern.replace(/:path/g, relativePath)

		return { url, text }
	})
}
