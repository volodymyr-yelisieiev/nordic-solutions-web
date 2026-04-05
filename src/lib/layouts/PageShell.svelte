<script lang="ts">
	import AppFooter from '$lib/components/AppFooter.svelte';
	import AppHeader from '$lib/components/AppHeader.svelte';
	import type { NavigationItem } from '$lib/modules/site-navigation';

	type Props = {
		navigation: NavigationItem[];
		children: import('svelte').Snippet;
	};

	let { navigation, children }: Props = $props();
</script>

<div class="site-shell">
	<AppHeader {navigation} />

	<main class="site-main">
		<div class="shell-container">{@render children()}</div>
	</main>

	<AppFooter {navigation} />
</div>
