<script lang="ts">
	import SectionShell from '$lib/components/SectionShell.svelte';
	import ApproachStep from '$lib/modules/home/shared/ApproachStep.svelte';

	const steps = [
		{
			title: 'Assessment',
			description:
				'Clarify objectives, constraints, and the operating context before execution planning.'
		},
		{
			title: 'Structuring',
			description:
				'Translate priorities into an actionable framework with roles, milestones, and ownership.'
		},
		{
			title: 'Partner Coordination',
			description:
				'Align delivery participants through clear governance routines and communication loops.'
		},
		{
			title: 'Implementation Support',
			description:
				'Guide execution in real conditions with practical oversight and issue management.'
		},
		{
			title: 'Ongoing Engagement',
			description:
				'Maintain continuity through follow-up cycles, reporting cadence, and adaptation checkpoints.'
		}
	];
</script>

<SectionShell
	id="approach"
	eyebrow="Approach"
	title="A transparent process designed for operational confidence."
	content="The engagement model is intentionally simple to scan: each phase has a clear function and measurable output."
>
	<ol class="approach-steps" aria-label="Delivery approach timeline">
		{#each steps as item, index (item.title)}
			<li class="approach-steps__item">
				<ApproachStep
					step={`${index + 1}`.padStart(2, '0')}
					title={item.title}
					description={item.description}
				/>
			</li>
		{/each}
	</ol>
</SectionShell>

<style>
	.approach-steps {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: var(--space-4);
	}

	.approach-steps__item {
		position: relative;
	}

	.approach-steps__item::after {
		content: '';
		position: absolute;
		top: 1.1rem;
		left: calc(50% + 1.4rem);
		width: calc(100% - 2.8rem);
		height: 1px;
		background: color-mix(in oklab, var(--color-accent) 28%, var(--color-border-soft));
	}

	.approach-steps__item:last-child::after {
		display: none;
	}

	@media (max-width: 960px) {
		.approach-steps {
			grid-template-columns: 1fr;
			gap: var(--space-5);
		}

		.approach-steps__item::after {
			top: calc(100% + 0.55rem);
			left: 1.12rem;
			width: 1px;
			height: var(--space-4);
		}
	}
</style>
