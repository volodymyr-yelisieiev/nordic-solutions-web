<script lang="ts">
	import { page } from '$app/state';
	import AppFooter from '$lib/components/AppFooter.svelte';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import type { NavigationItem } from '$lib/modules/site-navigation';

	type Props = {
		navigation: NavigationItem[];
		children: import('svelte').Snippet;
	};

	let { navigation, children }: Props = $props();

	const currentPathname = $derived(page.url.pathname);
</script>

<div class="site-shell">
	<a class="skip-link" href="#main-content">Skip to main content</a>

	<AppHeader {navigation} />

	<main class="site-main" id="main-content" tabindex="-1">
		<div class="shell-container">
			{#key currentPathname}
				<div class="page-transition">{@render children()}</div>
			{/key}
		</div>
	</main>

	<AppFooter {navigation} />
</div>

<style>
	.page-transition {
		animation: page-transition-enter 420ms var(--ease-emphasis);
	}

	@keyframes page-transition-enter {
		from {
			opacity: 0;
			transform: translateY(0.6rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-transition {
			animation: none;
		}
	}
</style>
