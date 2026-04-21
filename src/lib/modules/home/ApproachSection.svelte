<script lang="ts">
	import { SectionShell } from '$lib/components/ui';
	import { approachPhases, regionalFootprint } from '$lib/modules/home/content';
</script>

<SectionShell
	id="approach"
	eyebrow="Approach"
	title="A four-part delivery rhythm built for clarity, partner fit, and controlled execution."
	description="Nordic Solutions structures each engagement from strategic framing through implementation support so complex programs move with discipline."
>
	<div class="approach-section__layout reveal-stagger">
		<ol class="approach-section__steps" aria-label="Delivery phases">
			{#each approachPhases as phase (phase.step)}
				<li class="approach-section__step">
					<span>{phase.step}</span>
					<h3>{phase.title}</h3>
					<p>{phase.description}</p>
				</li>
			{/each}
		</ol>

		<aside class="approach-section__aside">
			<p class="approach-section__aside-label">Operating footprint</p>
			<ul>
				{#each regionalFootprint as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</aside>
	</div>
</SectionShell>

<style>
	.approach-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
		gap: clamp(1.25rem, 3vw, 2rem);
	}

	.approach-section__steps {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.approach-section__step,
	.approach-section__aside {
		padding: 1.35rem;
		border-radius: 2rem;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.94), rgb(246 240 234 / 0.98));
		border: 1px solid rgb(255 255 255 / 0.9);
		box-shadow: 0 24px 48px -38px rgb(20 20 19 / 0.34);
	}

	.approach-section__step span,
	.approach-section__aside-label {
		display: inline-flex;
		margin-bottom: 0.9rem;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.approach-section__step p {
		margin-top: 0.5rem;
		color: var(--color-text-muted);
	}

	.approach-section__aside {
		align-content: start;
	}

	.approach-section__aside ul {
		display: grid;
		gap: 0.8rem;
		padding: 0;
		list-style: none;
	}

	.approach-section__aside li {
		padding: 0.9rem 1rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-bg-subtle) 72%, white);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.62);
	}

	@media (max-width: 900px) {
		.approach-section__layout,
		.approach-section__steps {
			grid-template-columns: 1fr;
		}
	}
</style>
