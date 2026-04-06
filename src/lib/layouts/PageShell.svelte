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
	:global(.page-transition > section + section) {
		margin-top: clamp(var(--space-4), 3vw, var(--space-8));
	}

	.page-transition {
		animation: page-transition-enter var(--duration-page) var(--ease-expressive);
		transform-origin: center top;
	}

	@keyframes page-transition-enter {
		from {
			opacity: 0;
			filter: blur(4px);
			transform: translateY(0.7rem) scale(0.998);
		}

		to {
			opacity: 1;
			filter: blur(0);
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-transition {
			animation: none;
		}
	}
</style>
