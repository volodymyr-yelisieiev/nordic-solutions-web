<script lang="ts">
	import GeneratedScene from '$lib/components/GeneratedScene.svelte';
	import { SectionShell } from '$lib/components/ui';
	import { whyChooseNordic } from '$lib/modules/home/content';
</script>

<SectionShell
	id="why-nordic"
	eyebrow="Why Nordic"
	title="Six practical reasons organizations rely on Nordic Solutions for sensitive, long-horizon defense work."
	description="The company combines regional commercial understanding, international defense exposure, and a delivery style built around accountability."
>
	<div class="why-nordic-section__grid reveal-stagger">
		{#each whyChooseNordic as item (item.title)}
			<article class="why-nordic-section__card">
				<div class="why-nordic-section__image">
					<GeneratedScene variant={item.art} alt={item.title} />
				</div>
				<div class="why-nordic-section__copy">
					<h3>{item.title}</h3>
					<p>{item.description}</p>
				</div>
			</article>
		{/each}
	</div>
</SectionShell>

<style>
	.why-nordic-section__grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.why-nordic-section__card {
		display: grid;
		gap: 1rem;
		padding: 1rem;
		border-radius: 2rem;
		background: rgb(255 255 255 / 0.76);
		box-shadow: var(--shadow-soft);
		transition: transform var(--duration-base) var(--ease-standard);
	}

	.why-nordic-section__image {
		overflow: hidden;
		border-radius: 1.7rem;
		aspect-ratio: 4 / 3;
	}

	.why-nordic-section__image :global(svg) {
		width: 100%;
		height: 100%;
		transition: transform var(--duration-slow) var(--ease-expressive);
	}

	.why-nordic-section__copy p {
		margin-top: 0.45rem;
		color: var(--color-text-muted);
	}

	@media (hover: hover) {
		.why-nordic-section__card:hover {
			transform: translateY(-4px);
		}

		.why-nordic-section__card:hover :global(svg) {
			transform: scale(1.04);
		}
	}

	@media (max-width: 900px) {
		.why-nordic-section__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
