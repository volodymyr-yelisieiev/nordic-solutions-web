<script lang="ts">
	import { ProcessStep, SectionShell } from '$lib/components/ui';

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
	description="The engagement model is intentionally simple to scan: each phase has a clear function and measurable output."
>
	<ol class="approach-steps" aria-label="Delivery approach timeline">
		{#each steps as item, index (item.title)}
			<li class="approach-steps__item">
				<ProcessStep
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
		--approach-connector-color: color-mix(
			in oklab,
			var(--color-accent) 28%,
			var(--color-border-soft)
		);
		--approach-connector-gap-x: var(--space-4);
		--approach-connector-gap-y: var(--space-5);
		--approach-anchor-center: calc(var(--card-padding-md) + (var(--step-badge-size) / 2));
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: var(--approach-connector-gap-x);
	}

	.approach-steps__item {
		position: relative;
	}

	.approach-steps__item::after {
		content: '';
		position: absolute;
		top: var(--approach-anchor-center);
		left: calc(var(--card-padding-md) + var(--step-badge-size));
		width: calc(100% + var(--approach-connector-gap-x) - var(--step-badge-size));
		height: 1px;
		background: var(--approach-connector-color);
	}

	.approach-steps__item:last-child::after {
		display: none;
	}

	@media (max-width: 960px) {
		.approach-steps {
			grid-template-columns: 1fr;
			gap: var(--approach-connector-gap-y);
		}

		.approach-steps__item::after {
			top: calc(var(--card-padding-md) + var(--step-badge-size));
			left: var(--approach-anchor-center);
			width: 1px;
			height: calc(100% + var(--approach-connector-gap-y) - var(--step-badge-size));
		}
	}
</style>
