<script setup lang="ts">
import { provide, watch, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import { ElConfigProvider } from 'element-plus'
import { isClient } from '@vueuse/core'
import { useSidebar, useCloseSidebarOnEscape } from './composables/sidebar.js'
import nprogress from 'nprogress'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import VPSkipLink from './components/VPSkipLink.vue'
import VPBackdrop from './components/VPBackdrop.vue'
import VPNav from './components/VPNav.vue'
import VPLocalNav from './components/VPLocalNav.vue'
import VPSidebar from './components/VPSidebar.vue'
import VPContent from './components/VPContent.vue'
import VPFooter from './components/VPFooter.vue'

const { isOpen: isSidebarOpen, open: openSidebar, close: closeSidebar } = useSidebar()

const route = useRoute()
watch(() => route.path, closeSidebar)

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

provide('close-sidebar', closeSidebar)

const { frontmatter } = useData()

onMounted(() => {
	if (!isClient) return
	window.addEventListener(
		'click',
		e => {
			const link = (e.target as HTMLElement).closest('a')
			if (!link) return
			const { protocol, hostname, pathname, target, dataset } = link
			if (dataset.type === 'outline') return
			if (!pathname) return
			const currentUrl = window.location
			const extMatch = pathname.match(/\.\w+$/)
			if (
				!e.ctrlKey &&
				!e.shiftKey &&
				!e.altKey &&
				!e.metaKey &&
				target !== `_blank` &&
				protocol === currentUrl.protocol &&
				hostname === currentUrl.hostname &&
				!(extMatch && extMatch[0] !== '.html')
			) {
				// e.preventDefault()
				if (pathname !== route.path) {
					nprogress.start()
				}
			}
		},
		{ capture: true }
	)
})
if (isClient) {
	nprogress.start()
}
</script>

<template>
	<el-config-provider :locale="locale">
		<div v-if="(frontmatter as any).layout !== false" class="Layout">
			<slot name="layout-top" />
			<VPSkipLink />
			<VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
			<VPNav>
				<template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
				<template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
				<template #nav-bar-content-before><slot name="nav-bar-content-before" /></template>
				<template #nav-bar-content-after><slot name="nav-bar-content-after" /></template>
				<template #nav-screen-content-before><slot name="nav-screen-content-before" /></template>
				<template #nav-screen-content-after><slot name="nav-screen-content-after" /></template>
			</VPNav>
			<VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />

			<VPSidebar :open="isSidebarOpen">
				<template #sidebar-nav-before><slot name="sidebar-nav-before" /></template>
				<template #sidebar-nav-after><slot name="sidebar-nav-after" /></template>
			</VPSidebar>

			<VPContent>
				<template #home-hero-before><slot name="home-hero-before" /></template>
				<template #home-hero-after><slot name="home-hero-after" /></template>
				<template #home-features-before><slot name="home-features-before" /></template>
				<template #home-features-after><slot name="home-features-after" /></template>

				<template #doc-footer-before><slot name="doc-footer-before" /></template>
				<template #doc-before><slot name="doc-before" /></template>
				<template #doc-after><slot name="doc-after" /></template>

				<template #aside-top><slot name="aside-top" /></template>
				<template #aside-bottom><slot name="aside-bottom" /></template>
				<template #aside-outline-before><slot name="aside-outline-before" /></template>
				<template #aside-outline-after><slot name="aside-outline-after" /></template>
				<template #aside-ads-before><slot name="aside-ads-before" /></template>
				<template #aside-ads-after><slot name="aside-ads-after" /></template>
			</VPContent>

			<VPFooter />
			<slot name="layout-bottom" />
		</div>
		<Content v-else />
	</el-config-provider>
</template>

<style scoped>
.Layout {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
</style>
