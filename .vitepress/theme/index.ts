/*
 * @Author: shen
 * @Date: 2022-12-02 15:46:07
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 10:30:36
 * @Description:
 */
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/fonts.css'
import './styles/vars.css'
import './styles/base.css'
import './styles/utils.css'
import './styles/components/custom-block.css'
import './styles/components/vp-code.css'
import './styles/components/vp-doc.css'
import './styles/components/vp-sponsor.css'
import '@shene/table/dist/index.css'
import './styles/element-vars.css'

import * as STable from '@shene/table'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { globals } from '../components'
import { Theme } from 'vitepress'
import VPBadge from './components/VPBadge.vue'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'

export { default as VPHomeHero } from './components/VPHomeHero.vue'
export { default as VPHomeFeatures } from './components/VPHomeFeatures.vue'
export { default as VPHomeSponsors } from './components/VPHomeSponsors.vue'
export { default as VPDocAsideSponsors } from './components/VPDocAsideSponsors.vue'
export { default as VPTeamPage } from './components/VPTeamPage.vue'
export { default as VPTeamPageTitle } from './components/VPTeamPageTitle.vue'
export { default as VPTeamPageSection } from './components/VPTeamPageSection.vue'
export { default as VPTeamMembers } from './components/VPTeamMembers.vue'

const { setLicenseKey } = STable
setLicenseKey('95cc65b4d02a57205c17469dc1a32455RE9NQUlOPXNoZW5lLm9yZy5jbixFWFBJUlk9MTk4NTYxNjAwMDAwMA==')

const theme: Theme = {
	Layout,
	NotFound,
	enhanceApp: ({ app }) => {
		app.component('Badge', VPBadge)
		app.use(ElementPlus as any, {
			locale: zhCn
		})
		app.use(STable.default)
		globals.forEach(([name, Comp]) => {
			app.component(name, Comp as any)
		})
	}
}

export default theme
