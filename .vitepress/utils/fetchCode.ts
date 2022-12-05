/*
 * @Author: shen
 * @Date: 2022-12-05 13:41:46
 * @LastEditors: shen
 * @LastEditTime: 2022-12-05 15:14:14
 * @Description:
 */
const scriptRE = /<script[^>]*>([\s\S]*)<\/script>/
const scriptContentRE = /(?<=<script[^>]*>)([\s\S]*)(?=<\/script>)/
const scriptSetupRE = /<script[^>]*>/
const templateRE = /<template[^>]*>([\s\S]*)<\/template>/
const styleRE = /<style[^>]*>([\s\S]*)<\/style>/
const docsRE = /(?<=<docs>)([\s\S]*)(?=<\/docs>)/
const reObj = {
	script: scriptRE,
	style: styleRE,
	docs: docsRE,
	template: templateRE,
	scriptContent: scriptContentRE
}

export function replaceScriptCode(src: string, target: string): string {
	const scriptStr = src.match(scriptSetupRE)?.[0] || ''
	const setup = scriptStr.indexOf('setup') > -1 ? ' setup' : ''
	// const jsx = scriptStr.indexOf('tsx') > -1 ? ' lang="jsx"' : ''
	const newCode = src.replace(
		scriptRE,
		`
<scrip${setup ? 't' + setup : 't'}>
${target}
</script>`
	)
	return newCode
}

export default function fetchCode(src: string, type: string): string {
	if (type === 'template') {
		src = src.split('<script')[0]
	}
	const matches = src.match(reObj[type])
	return matches ? matches[0] : ''
}
