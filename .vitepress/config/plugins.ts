/*
 * @Author: shen
 * @Date: 2022-12-04 16:11:46
 * @LastEditors: shen
 * @LastEditTime: 2022-12-05 15:16:02
 * @Description:
 */
import path from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import fetchCode, { replaceScriptCode } from '../utils/fetchCode'
import tsToJs from '../utils/tsToJs'
import { highlight } from '../utils/highlight'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'

const localMd = MarkdownIt()

interface ContainerOpts {
	marker?: string | undefined
	validate?(params: string): boolean
	render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string
}

export const mdPlugin = (md: MarkdownIt) => {
	md.use(mdContainer, 'demo', {
		validate(params) {
			return !!params.trim().match(/^demo\s*(.*)$/)
		},

		render(tokens, idx) {
			const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
			if (tokens[idx].nesting === 1 /* means the tag is opening */) {
				const description = m && m.length > 1 ? m[1] : ''
				const sourceFileToken = tokens[idx + 2]
				let source = ''
				const sourceFile = sourceFileToken.children?.[0].content ?? ''

				if (sourceFileToken.type === 'inline') {
					source = fs.readFileSync(path.resolve(__dirname, '../../examples', `${sourceFile}.vue`), 'utf-8')
				}
				if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
				const scriptContent = fetchCode(source, 'scriptContent')
				const jsCode = tsToJs(scriptContent)?.trim()
				const sourceJs = replaceScriptCode(source, jsCode)
				return `<Demo :demos="demos" source="${encodeURIComponent(highlight(source, 'vue'))}" source-js="${encodeURIComponent(
					highlight(sourceJs, 'vue')
				)}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}" raw-source-js="${encodeURIComponent(
					sourceJs
				)}" description="${encodeURIComponent(localMd.render(description))}">`
			} else {
				return '</Demo>'
			}
		}
	} as ContainerOpts)
}
