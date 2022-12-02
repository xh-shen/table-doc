/*
 * @Author: shen
 * @Date: 2022-12-02 15:46:07
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 15:50:39
 * @Description:
 */
import { computed } from 'vue'
import { useData } from 'vitepress'
import { isActive } from '../support/utils.js'
import { getSidebar, getFlatSideBarLinks } from '../support/sidebar.js'

export function usePrevNext() {
	const { page, theme, frontmatter } = useData()

	return computed(() => {
		const sidebar = getSidebar(theme.value.sidebar, page.value.relativePath)
		const candidates = getFlatSideBarLinks(sidebar)

		const index = candidates.findIndex(link => {
			return isActive(page.value.relativePath, link.link)
		})

		return {
			prev: frontmatter.value.prev ? { ...candidates[index - 1], text: frontmatter.value.prev } : candidates[index - 1],
			next: frontmatter.value.next ? { ...candidates[index + 1], text: frontmatter.value.next } : candidates[index + 1]
		}
	})
}
