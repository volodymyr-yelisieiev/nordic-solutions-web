<script lang="ts">
	import { Card, SectionShell } from '$lib/components/ui';

	const regions = ['Gulf Region', 'Wider MENA', 'European Partner Network'];
	const clientProfiles = [
		'Institutional stakeholders',
		'Industrial partners',
		'Multi-party project teams'
	];
</script>

<SectionShell
	id="presence"
	eyebrow="Presence"
	title="Regional footprint with a multi-market execution perspective."
	description="This block is intentionally high-level: enough substance for credibility, without exposing confidential operational details."
>
	<div class="presence-section__layout">
		<div class="presence-section__content">
			<p>
				Nordic Solutions coordinates projects through a networked operating model that combines
				local presence, regional awareness, and partner-based delivery capability.
			</p>

			<div class="presence-section__columns">
				<div>
					<h3>Regions</h3>
					<ul>
						{#each regions as region (region)}
							<li>{region}</li>
						{/each}
					</ul>
				</div>

				<div>
					<h3>Client Types</h3>
					<ul>
						{#each clientProfiles as profile (profile)}
							<li>{profile}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<div class="presence-section__visual" role="img" aria-label="Map or diagram placeholder">
			<Card as="div" variant="subtle" class="presence-section__map">
				<p>Map / diagram placeholder</p>
				<p>Future layer: footprint and market indicators</p>
			</Card>
		</div>
	</div>
</SectionShell>

<style>
	.presence-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
		gap: clamp(var(--space-6), 4vw, var(--space-12));
		align-items: start;
	}

	.presence-section__content {
		display: grid;
		gap: var(--space-5);
		color: var(--color-text-muted);
	}

	.presence-section__columns {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-4);
	}

	.presence-section__columns h3 {
		margin: 0 0 var(--space-2);
		font-family: var(--font-family-body);
		font-size: var(--font-size-small);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.presence-section__columns ul {
		padding-inline-start: var(--space-5);
	}

	.presence-section__columns li {
		font-size: var(--font-size-body-sm);
		line-height: 1.55;
		color: var(--color-text-primary);
	}

	.presence-section__visual {
		display: grid;
	}

	:global(.presence-section__map) {
		display: grid;
		align-content: center;
		gap: var(--space-2);
		min-height: 19rem;
		border-style: dashed;
		border-color: color-mix(in oklab, var(--color-accent) 42%, var(--color-border-soft));
		background:
			linear-gradient(
				150deg,
				color-mix(in oklab, var(--color-bg-elevated) 88%, white),
				color-mix(in oklab, var(--color-accent-soft) 55%, white)
			),
			repeating-linear-gradient(
				-32deg,
				transparent,
				transparent 0.72rem,
				color-mix(in oklab, var(--color-border-soft) 52%, transparent) 0.72rem,
				color-mix(in oklab, var(--color-border-soft) 52%, transparent) 0.82rem
			);
	}

	:global(.presence-section__map p) {
		margin: 0;
		font-size: var(--font-size-caption);
		font-weight: 600;
		color: var(--color-text-muted);
	}

	@media (max-width: 900px) {
		.presence-section__layout,
		.presence-section__columns {
			grid-template-columns: 1fr;
		}

		:global(.presence-section__map) {
			min-height: 15rem;
		}
	}
</style>
