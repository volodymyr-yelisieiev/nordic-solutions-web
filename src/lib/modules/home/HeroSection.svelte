<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { revealOnView } from '$lib/modules/home/reveal-on-view';
</script>

<section
	id="hero"
	class="hero-section"
	aria-labelledby="hero-heading"
	style="--section-reveal-progress: 0"
	use:revealOnView
>
	<div class="hero-section__layout">
		<div class="hero-section__content">
			<p class="hero-section__eyebrow">International project structuring</p>
			<h1 class="type-hero" id="hero-heading">
				Nordic Solutions supports complex cross-border initiatives with precision and discretion.
			</h1>
			<p class="hero-section__lead">
				We align partners, execution tracks, and long-term governance for projects that require
				operational discipline from day one.
			</p>

			<div class="hero-section__actions">
				<Button href="#contact" variant="primary" size="lg">Contact Us</Button>
				<Button href="#about" variant="secondary" size="lg">Learn About Nordic</Button>
			</div>
		</div>

		<aside class="hero-section__visual" role="img" aria-label="Abstract visual placeholder">
			<div class="hero-section__placeholder">
				<span>Abstract visual placeholder</span>
			</div>
		</aside>
	</div>
</section>

<style>
	.hero-section {
		padding-block: clamp(var(--space-8), 7vw, var(--space-16));
	}

	.hero-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: clamp(var(--space-6), 4vw, var(--space-12));
		align-items: center;
		min-height: clamp(34rem, 72vh, 45rem);
	}

	.hero-section__content {
		display: grid;
		gap: var(--space-5);
		opacity: var(--section-reveal-progress, 0);
		transform: translateY(calc((1 - var(--section-reveal-progress, 0)) * 0.7rem));
		transition:
			opacity 520ms var(--ease-emphasis),
			transform 520ms var(--ease-emphasis);
	}

	.hero-section__eyebrow {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-text-muted);
	}

	.hero-section__lead {
		margin: 0;
		max-width: 58ch;
		font-size: 1.08rem;
		line-height: 1.62;
		color: var(--color-text-muted);
	}

	.hero-section__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.hero-section__visual {
		display: grid;
		opacity: var(--section-reveal-progress, 0);
		transform: translateY(calc((1 - var(--section-reveal-progress, 0)) * 0.7rem));
		transition:
			opacity 520ms var(--ease-emphasis),
			transform 520ms var(--ease-emphasis);
		transition-delay: 120ms;
	}

	.hero-section__placeholder {
		display: grid;
		place-items: center;
		aspect-ratio: 4 / 3;
		border-radius: clamp(var(--radius-md), 2vw, 1.25rem);
		border: 1px dashed color-mix(in oklab, var(--color-accent) 42%, var(--color-border-soft));
		background:
			radial-gradient(
				circle at 18% 22%,
				color-mix(in oklab, var(--color-accent-soft) 62%, white),
				transparent 58%
			),
			linear-gradient(
				155deg,
				color-mix(in oklab, var(--color-bg-elevated) 90%, white),
				var(--color-bg-subtle)
			);
		color: var(--color-text-muted);
		font-size: var(--font-size-caption);
		font-weight: 600;
	}

	@media (max-width: 900px) {
		.hero-section__layout {
			grid-template-columns: 1fr;
			min-height: auto;
		}

		.hero-section__placeholder {
			aspect-ratio: 16 / 10;
		}
	}

	@media (max-width: 768px) {
		.hero-section {
			padding-block: var(--space-10);
		}

		.hero-section__actions {
			display: grid;
			grid-template-columns: 1fr;
		}

		.hero-section__actions :global(.ui-button) {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-section__content,
		.hero-section__visual {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
