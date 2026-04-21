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

	let { title, eyebrow, id, description, showDivider = false, children }: Props = $props();
</script>

<section
	class="section-shell"
	{id}
	style="--section-reveal-progress: 0"
	use:revealOnView={{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }}
>
	<div class="section-shell__frame">
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
	</div>
</section>

<style>
	.section-shell {
		position: relative;
		padding-block: clamp(1.5rem, 2vw, 2rem);
	}

	.section-shell__frame {
		position: relative;
		overflow: hidden;
		padding: clamp(1.75rem, 4vw, 3rem);
		border-radius: clamp(2rem, 4vw, 3rem);
		border: 1px solid rgb(255 255 255 / 0.7);
		background:
			linear-gradient(180deg, rgb(255 255 255 / 0.52), rgb(255 255 255 / 0.24)),
			color-mix(in srgb, var(--color-bg-elevated) 88%, white);
		box-shadow: var(--shadow-soft);
	}

	.section-shell__frame::before {
		content: '';
		position: absolute;
		inset: -38% auto auto -8%;
		width: 18rem;
		height: 18rem;
		border-radius: 50%;
		background: rgb(243 115 56 / 0.08);
		filter: blur(10px);
	}

	.section-shell__header {
		position: relative;
		display: grid;
		gap: var(--space-4);
		max-width: var(--section-heading-max-width);
	}

	.section-shell__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.section-shell__eyebrow::before {
		content: '';
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 50%;
		background: var(--color-accent);
	}

	.section-shell__title {
		max-width: 14ch;
	}

	.section-shell__description {
		max-width: var(--section-copy-max-width);
		color: var(--color-text-muted);
	}

	.section-shell__slot {
		position: relative;
		margin-top: clamp(1.75rem, 4vw, 2.5rem);
		display: grid;
		gap: var(--space-4);
	}

	.section-shell__slot--with-divider {
		padding-top: var(--space-6);
		border-top: 1px solid rgb(20 20 19 / 0.08);
	}

	@media (max-width: 700px) {
		.section-shell__frame {
			padding: 1.5rem;
			border-radius: 2rem;
		}

		.section-shell__title {
			max-width: unset;
		}
	}
</style>
