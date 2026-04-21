<script lang="ts">
	import GeneratedScene from '$lib/components/GeneratedScene.svelte';
	import { SectionShell } from '$lib/components/ui';
	import { serviceHighlights } from '$lib/modules/home/content';
</script>

<SectionShell
	id="services"
	eyebrow="How We Help"
	title="Four capability tracks built around transfer, partnerships, and disciplined market access."
	description="Nordic Solutions supports capability growth through clear program structures, practical coordination, and credible cross-border execution."
>
	<div class="services-section__grid reveal-stagger" aria-label="Core capabilities">
		{#each serviceHighlights as item (item.title)}
			<article class="services-section__card">
				<div class="services-section__image-wrap">
					<div class="orbit-line services-section__orbit"></div>
					<div class="services-section__image">
						<GeneratedScene variant={item.art} alt={item.title} />
					</div>
				</div>
				<div class="services-section__copy">
					<p>Capability</p>
					<h3>{item.title}</h3>
					<span>{item.description}</span>
				</div>
			</article>
		{/each}
	</div>
</SectionShell>

<style>
	.services-section__grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1.25rem, 3vw, 2rem);
	}

	.services-section__card {
		position: relative;
		display: grid;
		gap: 1.25rem;
		padding: 1.4rem;
		border-radius: 2.4rem;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.9), rgb(247 241 236 / 0.96));
		border: 1px solid rgb(255 255 255 / 0.88);
		box-shadow: 0 28px 56px -42px rgb(20 20 19 / 0.34);
		overflow: hidden;
	}

	.services-section__image-wrap {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 17rem;
	}

	.services-section__orbit {
		width: 17rem;
		height: 17rem;
	}

	.services-section__image {
		position: relative;
		z-index: 1;
		overflow: hidden;
		width: 12.5rem;
		height: 12.5rem;
		border-radius: 50%;
		box-shadow: var(--shadow-soft);
	}

	.services-section__image :global(svg) {
		width: 100%;
		height: 100%;
	}

	.services-section__copy {
		display: grid;
		gap: 0.4rem;
	}

	.services-section__copy p {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.services-section__copy span {
		color: var(--color-text-muted);
	}

	@media (max-width: 900px) {
		.services-section__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
