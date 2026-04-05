<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionShell from '$lib/components/SectionShell.svelte';
	import { homeNarrativeFlow } from '$lib/modules/site-navigation';

	const resolveSectionId = (path: string) => (path === '/' ? 'hero' : path.slice(1));
</script>

{#each homeNarrativeFlow as step (step.step)}
	<SectionShell
		id={resolveSectionId(step.path)}
		eyebrow={step.step === 1 ? 'Home' : `Step ${step.step} of ${homeNarrativeFlow.length}`}
		title={step.label}
		content={step.description}
	>
		{#if step.step === 1}
			<p>Temporary hero block reserved for final messaging and CTA copy.</p>
			<a class="inline-link" href={resolve('/contact')}>Primary CTA placeholder: Contact Us</a>
		{:else}
			<p>Route placeholder created for content implementation in the next sprint.</p>
			<a class="inline-link" href={resolve(step.path)}>Open {step.label} page</a>
		{/if}
	</SectionShell>
{/each}
