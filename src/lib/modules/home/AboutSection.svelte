<script lang="ts">
	import { SectionShell, StatCard } from '$lib/components/ui';

	const stats = [
		{
			value: '12+ years',
			label: 'Cross-border programs',
			detail: 'Project and partnership support across multiple regulatory and business contexts.'
		},
		{
			value: 'UAE base',
			label: 'Regional coordination',
			detail: 'Operational center in Abu Dhabi with active collaboration across MENA and Europe.'
		},
		{
			value: 'Partner-first',
			label: 'Execution model',
			detail:
				'Built for long-term coordination between institutions, suppliers, and implementation teams.'
		},
		{
			value: 'Disciplined',
			label: 'Governance approach',
			detail:
				'Clear milestones, reporting cadence, and practical oversight from assessment to delivery.'
		}
	];
</script>

<SectionShell
	id="about"
	eyebrow="About"
	title="A discreet corporate partner for complex international initiatives."
	description="Nordic Solutions combines strategic framing with hands-on implementation support for organizations operating in demanding environments."
>
	<div class="about-section__layout">
		<div class="about-section__text">
			<p>
				We work with stakeholders who require structured communication, credible planning, and
				reliable execution through multi-party project cycles.
			</p>
			<p>
				Our role is to align objectives, process discipline, and partner coordination while keeping
				engagement measured, professional, and bank-friendly.
			</p>
		</div>

		<div class="about-section__stats" aria-label="Key company facts">
			{#each stats as stat (stat.label)}
				<StatCard value={stat.value} label={stat.label} detail={stat.detail} />
			{/each}
		</div>
	</div>
</SectionShell>

<style>
	.about-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: clamp(var(--space-6), 4vw, var(--space-12));
		align-items: start;
	}

	.about-section__text {
		display: grid;
		gap: var(--space-4);
		color: var(--color-text-muted);
	}

	.about-section__text p {
		margin: 0;
		line-height: 1.65;
	}

	.about-section__stats {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-3);
	}

	@media (max-width: 900px) {
		.about-section__layout,
		.about-section__stats {
			grid-template-columns: 1fr;
		}
	}
</style>
