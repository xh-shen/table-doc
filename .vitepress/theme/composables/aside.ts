/*
 * @Author: shen
 * @Date: 2022-12-02 15:46:07
 * @LastEditors: shen
 * @LastEditTime: 2022-12-02 15:49:53
 * @Description:
 */
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useSidebar } from './sidebar.js'

export function useAside() {
	const { hasSidebar } = useSidebar()
	const is960 = useMediaQuery('(min-width: 960px)')
	const is1280 = useMediaQuery('(min-width: 1280px)')

	const isAsideEnabled = computed(() => {
		if (!is1280.value && !is960.value) {
			return false
		}

		return hasSidebar.value ? is1280.value : is960.value
	})

	return {
		isAsideEnabled
	}
}
