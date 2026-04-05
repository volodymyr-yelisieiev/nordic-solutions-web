<script lang="ts">
	import { base } from '$app/paths';
	import '$lib/styles/base.css';
	import PageShell from '$lib/layouts/PageShell.svelte';
	import { primaryNavigation } from '$lib/modules/site-navigation';

	let { children }: { children: import('svelte').Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href={`${base}/favicon-32x32.png`} />
	<link rel="apple-touch-icon" sizes="180x180" href={`${base}/apple-touch-icon.png`} />
	<meta name="description" content="Nordic Solutions corporate website" />
	<title>Nordic Solutions</title>
</svelte:head>

<PageShell navigation={primaryNavigation}>
	{@render children()}
</PageShell>
