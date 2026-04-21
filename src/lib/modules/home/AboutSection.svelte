<script lang="ts">
	import GeneratedScene from '$lib/components/GeneratedScene.svelte';
	import { SectionShell } from '$lib/components/ui';
	import { aboutSpotlights, valuePillars } from '$lib/modules/home/content';
</script>

<SectionShell
	id="about"
	eyebrow="Who We Are"
	title="A regional partner shaped for trust-heavy projects and long-range strategic coordination."
	description="Nordic Solutions brings together UAE business insight and international defense experience to support serious, high-accountability programs."
>
	<div class="about-section__layout reveal-stagger">
		<div class="about-section__intro">
			{#each aboutSpotlights as spotlight, index (spotlight.title)}
				<article
					class:about-section__spotlight--offset={index === 1}
					class="about-section__spotlight"
				>
					<div class="about-section__spotlight-image">
						<GeneratedScene variant={spotlight.art} alt={spotlight.title} />
					</div>
					<div class="about-section__spotlight-copy">
						<h3>{spotlight.title}</h3>
						<p>
							{index === 0
								? 'Nordic Solutions LLC was established by professionals who combined regional business insight with international defense experience to build a reliable and customer-focused company.'
								: 'Our role is to strengthen domestic capability growth by bringing global expertise, transfer structuring, and practical implementation discipline into one calm, credible operating model.'}
						</p>
						<span>{spotlight.description}</span>
					</div>
				</article>
			{/each}
		</div>

		<div class="about-section__values">
			{#each valuePillars as value, index (value.title)}
				<article class:about-section__value--featured={index === 0} class="about-section__value">
					<div class="about-section__value-mark" aria-hidden="true">{value.title.slice(0, 2)}</div>
					<div>
						<h3>{value.title}</h3>
						<p>{value.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</SectionShell>

<style>
	.about-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: clamp(1.5rem, 4vw, 3rem);
	}

	.about-section__intro {
		display: grid;
		gap: 1.1rem;
	}

	.about-section__spotlight {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
		gap: 1rem;
		padding: 1rem;
		border-radius: 2rem;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.86), rgb(249 245 241 / 0.92));
		border: 1px solid rgb(255 255 255 / 0.88);
		box-shadow: 0 24px 52px -42px rgb(20 20 19 / 0.3);
	}

	.about-section__spotlight--offset {
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
	}

	.about-section__spotlight-image {
		overflow: hidden;
		border-radius: 1.6rem;
		min-height: 14rem;
	}

	.about-section__spotlight-copy {
		display: grid;
		align-content: center;
		gap: 0.55rem;
		font-size: 1rem;
		color: var(--color-text-muted);
	}

	.about-section__spotlight-copy h3 {
		font-size: 1.25rem;
	}

	.about-section__spotlight-copy span {
		font-size: 0.92rem;
		color: var(--color-text-subtle);
	}

	.about-section__values {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.about-section__value {
		display: grid;
		gap: 1rem;
		align-content: start;
		padding: 1.2rem;
		border-radius: 2rem;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.94), rgb(246 239 233 / 0.98));
		border: 1px solid rgb(255 255 255 / 0.9);
		box-shadow: 0 22px 44px -36px rgb(20 20 19 / 0.34);
	}

	.about-section__value--featured {
		grid-column: span 2;
		grid-template-columns: 5rem 1fr;
		align-items: center;
	}

	.about-section__value-mark {
		display: grid;
		place-items: center;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background: linear-gradient(180deg, #f4a677, #cf4500);
		color: #fff8f2;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.about-section__value h3 {
		font-size: 1.1rem;
		margin-bottom: 0.3rem;
	}

	.about-section__value p {
		color: var(--color-text-muted);
	}

	@media (max-width: 900px) {
		.about-section__layout,
		.about-section__values {
			grid-template-columns: 1fr;
		}

		.about-section__spotlight,
		.about-section__spotlight--offset {
			grid-template-columns: 1fr;
		}

		.about-section__value--featured {
			grid-column: auto;
			grid-template-columns: 1fr;
		}
	}
</style>
