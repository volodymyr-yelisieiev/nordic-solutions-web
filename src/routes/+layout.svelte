<script lang="ts">
	import '$lib/styles/global.css';
	import favicon from '$lib/assets/favicon.svg';
	import PageShell from '$lib/layouts/PageShell.svelte';
	import { primaryNavigation } from '$lib/modules/site-navigation';

	let { children }: { children: import('svelte').Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Nordic Solutions corporate website" />
	<title>Nordic Solutions</title>
</svelte:head>

<PageShell navigation={primaryNavigation}>
	{@render children()}
</PageShell>
