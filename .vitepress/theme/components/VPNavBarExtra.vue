<!--
 * @Author: shen
 * @Date: 2022-12-02 16:55:05
 * @LastEditors: shen
 * @LastEditTime: 2022-12-03 19:19:07
 * @Description: 
-->
<script lang="ts" setup>
import { useData } from 'vitepress'
import VPFlyout from './VPFlyout.vue'
import VPMenuLink from './VPMenuLink.vue'
import VPSwitchAppearance from './VPSwitchAppearance.vue'
import VPSocialLinks from './VPSocialLinks.vue'
import { computed } from 'vue'

const { site, theme } = useData()

const hasExtraContent = computed(
	() => (theme as any).value.localeLinks || site.value.appearance || (theme as any).value.socialLinks
)
</script>

<template>
	<VPFlyout v-if="hasExtraContent" class="VPNavBarExtra" label="extra navigation">
		<div v-if="(theme as any).localeLinks" class="group">
			<p class="trans-title">{{ (theme as any).localeLinks.text }}</p>

			<template v-for="locale in (theme as any).localeLinks.items" :key="locale.link">
				<VPMenuLink :item="locale" />
			</template>
		</div>

		<div v-if="(site as any).appearance" class="group">
			<div class="item appearance">
				<p class="label">主题</p>
				<div class="appearance-action">
					<VPSwitchAppearance />
				</div>
			</div>
		</div>

		<div v-if="(theme as any).socialLinks" class="group">
			<div class="item social-links">
				<VPSocialLinks class="social-links-list" :links="(theme as any).socialLinks" />
			</div>
		</div>
	</VPFlyout>
</template>

<style scoped>
.VPNavBarExtra {
	display: none;
	margin-right: -12px;
}

@media (min-width: 768px) {
	.VPNavBarExtra {
		display: block;
	}
}

@media (min-width: 1280px) {
	.VPNavBarExtra {
		display: none;
	}
}

.trans-title {
	padding: 0 24px 0 12px;
	line-height: 32px;
	font-size: 14px;
	font-weight: 700;
	color: var(--vp-c-text-1);
}

.item.appearance,
.item.social-links {
	display: flex;
	align-items: center;
	padding: 0 12px;
}

.item.appearance {
	min-width: 176px;
}

.appearance-action {
	margin-right: -2px;
}

.social-links-list {
	margin: -4px -8px;
}
</style>
