<script lang="ts">
	import SectionShell from '$lib/components/SectionShell.svelte';
	import HomeCard from '$lib/modules/home/shared/HomeCard.svelte';

	const capabilities = [
		{
			title: 'Strategic Project Development',
			description:
				'Program framing, scope alignment, and delivery architecture for initiatives with multiple stakeholders.',
			icon: 'SP'
		},
		{
			title: 'Industrial Partnerships',
			description:
				'Partner selection and collaboration structures designed for long-term operational compatibility.',
			icon: 'IP'
		},
		{
			title: 'Technology Integration',
			description:
				'Coordination between technical teams and decision-makers to keep implementation practical and traceable.',
			icon: 'TI'
		},
		{
			title: 'Supply Chain Structuring',
			description:
				'Resilient planning and sequencing across vendors, timelines, and compliance-oriented checkpoints.',
			icon: 'SC'
		},
		{
			title: 'Implementation Support',
			description:
				'Ongoing cadence management, issue escalation paths, and operational follow-through until stabilization.',
			icon: 'IS'
		}
	];
</script>

<SectionShell
	id="services"
	eyebrow="Services"
	title="Capabilities built for high-accountability delivery environments."
	content="We present broad, corporate-safe capabilities that reflect practical execution depth without exposing sensitive detail."
>
	<div class="services-section__grid" aria-label="Core capabilities">
		{#each capabilities as item (item.title)}
			<HomeCard title={item.title} description={item.description} icon={item.icon} />
		{/each}
	</div>
</SectionShell>

<style>
	.services-section__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-4);
	}

	@media (max-width: 1080px) {
		.services-section__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 760px) {
		.services-section__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
