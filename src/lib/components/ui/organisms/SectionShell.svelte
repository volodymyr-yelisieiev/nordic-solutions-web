<script lang="ts">
	import { revealOnView } from '$lib/modules/home/reveal-on-view';

	type Props = {
		title: string;
		eyebrow?: string;
		id?: string;
		description?: string;
		showDivider?: boolean;
		children?: import('svelte').Snippet;
	};

	let { title, eyebrow, id, description, showDivider = true, children }: Props = $props();
</script>

<section
	class="section-shell glass-panel"
	{id}
	style="--section-reveal-progress: 0"
	use:revealOnView={{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }}
>
	<header class="section-shell__header reveal-item">
		{#if eyebrow}
			<p class="section-shell__eyebrow">{eyebrow}</p>
		{/if}

		<h2 class="section-shell__title">{title}</h2>

		{#if description}
			<p class="section-shell__description">{description}</p>
		{/if}
	</header>

	{#if children}
		<div
			class:section-shell__slot--with-divider={showDivider}
			class="section-shell__slot reveal-item reveal-item--delay-1"
		>
			{@render children()}
		</div>
	{/if}
</section>

<style>
	.section-shell {
		padding: clamp(var(--space-8), 5.5vw, var(--space-12))
			clamp(var(--space-4), 3.8vw, var(--space-8));
		border-radius: clamp(var(--radius-lg), 2vw, var(--radius-xl));
	}

	.section-shell__header {
		display: grid;
		gap: var(--space-4);
		max-width: var(--section-heading-max-width);
	}

	.section-shell__eyebrow {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.09em;
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.section-shell__title {
		margin: 0;
	}

	.section-shell__description {
		margin: 0;
		max-width: var(--section-copy-max-width);
		color: var(--color-text-muted);
	}

	.section-shell__slot {
		margin-top: clamp(var(--space-6), 4vw, var(--space-8));
		display: grid;
		gap: var(--space-4);
	}

	.section-shell__slot--with-divider {
		padding-top: var(--space-6);
		border-top: 1px solid color-mix(in oklab, var(--glass-border) 90%, transparent);
	}

	@media (max-width: 768px) {
		.section-shell {
			padding: var(--space-8) var(--space-4);
		}
	}
</style>
