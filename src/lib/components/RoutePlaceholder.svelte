<script lang="ts">
	import SectionShell from '$lib/components/SectionShell.svelte';

	type Props = {
		pageTitle: string;
		routePath: string;
		purpose: string;
	};

	let { pageTitle, routePath, purpose }: Props = $props();
	const sectionId = $derived(routePath === '/' ? 'home' : routePath.slice(1));
</script>

<SectionShell id={sectionId} eyebrow="Section Placeholder" title={pageTitle} content={purpose}>
	<p>This page is scaffolded and ready for section-specific content in the next sprint.</p>
	<p class="route-path">Route: {routePath}</p>
</SectionShell>

<style>
	.route-path {
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
	}
</style>
