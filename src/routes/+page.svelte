<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionShell from '$lib/components/SectionShell.svelte';
	import { homeNarrativeFlow } from '$lib/modules/site-navigation';
</script>

{#each homeNarrativeFlow as step (step.step)}
	<SectionShell
		id={step.id}
		eyebrow={step.step === 1 ? 'Home' : `Step ${step.step} of ${homeNarrativeFlow.length}`}
		title={step.title}
		content={step.description}
	>
		{#if step.id === 'hero'}
			<p>Temporary hero block reserved for final messaging and CTA copy.</p>
			<a class="inline-link" href="#contact">Primary CTA placeholder: Contact Us</a>
		{:else if step.id === 'presence'}
			<p>
				Presence section placeholder for international footprint, market focus, and compact
				credibility indicators.
			</p>
		{:else}
			<p>Route placeholder created for content implementation in the next sprint.</p>
			{#if step.routePath}
				<a class="inline-link" href={resolve(step.routePath)}>Open {step.title} page</a>
			{/if}
		{/if}
	</SectionShell>
{/each}
