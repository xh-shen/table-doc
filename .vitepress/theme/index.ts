/*
 * @Author: shen
 * @Date: 2022-12-02 15:46:07
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 21:08:09
 * @Description:
 */
import '@shene/table/dist/index.css'
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
import './styles/element-vars.css'
import './styles/code.css'

import STable, { setLicenseKey } from '@shene/table'
import VPBadge from './components/VPBadge.vue'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import { setupElement } from '../lib/element-plus'
import { globals } from '../components'

import type { Theme } from 'vitepress'

export { default as VPHomeHero } from './components/VPHomeHero.vue'
export { default as VPHomeFeatures } from './components/VPHomeFeatures.vue'
export { default as VPHomeSponsors } from './components/VPHomeSponsors.vue'
export { default as VPDocAsideSponsors } from './components/VPDocAsideSponsors.vue'
export { default as VPTeamPage } from './components/VPTeamPage.vue'
export { default as VPTeamPageTitle } from './components/VPTeamPageTitle.vue'
export { default as VPTeamPageSection } from './components/VPTeamPageSection.vue'
export { default as VPTeamMembers } from './components/VPTeamMembers.vue'

setLicenseKey('95cc65b4d02a57205c17469dc1a32455RE9NQUlOPXNoZW5lLm9yZy5jbixFWFBJUlk9MTk4NTYxNjAwMDAwMA==')

const theme: Theme = {
	Layout,
	NotFound,
	enhanceApp: ({ app }) => {
		app.component('Badge', VPBadge)
		setupElement(app as any)
		app.use(STable)
		globals.forEach(([name, Comp]) => {
			app.component(name, Comp as any)
		})
	}
}

export default theme
