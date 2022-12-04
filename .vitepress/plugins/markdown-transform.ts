/*
 * @Author: shen
 * @Date: 2022-05-10 19:45:28
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 20:38:11
 * @Description:
 */
import path from 'path'

import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
	return {
		name: 'shen-md-transform',
		enforce: 'pre',
		async transform(code, id) {
			if (!id.endsWith('.md')) return
			const componentId = path.basename(id, '.md')
			const examples = `const demos = import.meta.globEager('../examples/${componentId}/*.vue')`
			return combineMarkdown(code, combineScriptSetup(examples))
		}
	}
}

const combineScriptSetup = (code: any) =>
	`\n<script setup>
${code}
</script>
`

const combineMarkdown = (code: string, header: string) => {
	const frontmatterEnds = code.indexOf('---\n\n') === -1 ? 0 : code.indexOf('---\n\n') + 4
	const firstSubheader = code.search(/\n## \w/)
	const sliceIndex = firstSubheader < 0 ? frontmatterEnds : firstSubheader
	code = code.slice(0, sliceIndex) + header + '\n' + code.slice(sliceIndex)
	return `${code}\n`
}
