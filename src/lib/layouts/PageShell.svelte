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
	<AppHeader {navigation} />

	<main class="site-main" id="main-content" tabindex="-1">
		<div class="shell-container shell-container--page">
			{#key currentPathname}
				<div class="page-transition">{@render children()}</div>
			{/key}
		</div>
	</main>

	<AppFooter {navigation} />
</div>

<style>
	:global(.page-transition > section + section) {
		margin-top: clamp(0.25rem, 1vw, 0.75rem);
	}

	.shell-container--page {
		display: grid;
		gap: clamp(0.25rem, 1vw, 0.75rem);
	}

	.page-transition {
		animation: page-transition-enter var(--duration-page) var(--ease-expressive);
		transform-origin: center top;
	}

	@keyframes page-transition-enter {
		from {
			opacity: 0;
			filter: blur(7px);
			transform: translateY(1rem) scale(0.995);
		}

		to {
			opacity: 1;
			filter: blur(0);
			transform: translateY(0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.page-transition {
			animation: none;
		}
	}
</style>
