<script lang="ts">
	import { Button } from '$lib/components/ui';
	import { revealOnView } from '$lib/modules/home/reveal-on-view';
</script>

<section
	id="hero"
	class="hero-section glass-panel glass-panel--strong"
	aria-labelledby="hero-heading"
	style="--section-reveal-progress: 0"
	use:revealOnView
>
	<div class="hero-section__layout">
		<div class="hero-section__content reveal-item">
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

		<aside
			class="hero-section__visual reveal-item reveal-item--delay-2"
			role="img"
			aria-label="Abstract visual placeholder"
		>
			<div class="hero-section__placeholder glass-panel">
				<span>Abstract visual placeholder</span>
			</div>
		</aside>
	</div>
</section>

<style>
	.hero-section {
		--hero-frame-height: calc(100svh - var(--header-height) - (var(--page-frame-space) * 2));
		position: relative;
		overflow: hidden;
		border-radius: clamp(var(--radius-lg), 2.2vw, var(--radius-xl));
		box-shadow: var(--glass-shadow-sm);
		padding-inline: clamp(var(--space-4), 4vw, var(--space-12));
		padding-block: clamp(var(--space-6), 7vh, var(--space-12));
		block-size: var(--hero-frame-height);
	}

	.hero-section::before {
		content: '';
		position: absolute;
		inset: -18% -8% auto auto;
		width: clamp(16rem, 42vw, 32rem);
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			color-mix(in oklab, var(--color-accent-soft) 74%, white),
			transparent 68%
		);
		filter: blur(4px);
		opacity: 0.58;
		pointer-events: none;
	}

	.hero-section::after {
		content: '';
		position: absolute;
		inset: auto auto -38% -16%;
		width: clamp(14rem, 34vw, 26rem);
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, oklch(0.95 0.021 238 / 0.64), transparent 70%);
		pointer-events: none;
	}

	.hero-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: clamp(var(--space-6), 4vw, var(--space-12));
		align-items: center;
		block-size: 100%;
	}

	.hero-section__content {
		display: grid;
		gap: var(--space-4);
	}

	.hero-section :global(.type-hero) {
		font-size: clamp(2.2rem, 4.4vw, 3.9rem);
		line-height: 1.08;
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
	}

	.hero-section__placeholder {
		display: grid;
		place-items: center;
		aspect-ratio: 4 / 3;
		border-radius: clamp(var(--radius-md), 2vw, var(--radius-xl));
		border-style: dashed;
		border-color: color-mix(in oklab, var(--color-accent) 40%, var(--glass-border));
		background:
			radial-gradient(
				circle at 20% 18%,
				color-mix(in oklab, var(--color-accent-soft) 70%, white),
				transparent 58%
			),
			linear-gradient(
				152deg,
				color-mix(in oklab, var(--glass-surface-strong) 84%, white),
				color-mix(in oklab, var(--glass-surface-soft) 88%, var(--color-bg-subtle))
			);
		color: var(--color-text-muted);
		font-size: var(--font-size-caption);
		font-weight: 600;
		backdrop-filter: var(--glass-blur-sm);
		-webkit-backdrop-filter: var(--glass-blur-sm);
	}

	@media (max-width: 900px) {
		.hero-section__layout {
			grid-template-columns: 1fr;
		}

		.hero-section__visual {
			display: none;
		}

		.hero-section__placeholder {
			aspect-ratio: 16 / 10;
		}
	}

	@media (max-width: 1200px) {
		.hero-section :global(.type-hero) {
			font-size: clamp(2.05rem, 6vw, 3.3rem);
		}
	}

	@media (max-height: 760px) and (min-width: 901px) {
		.hero-section {
			padding-block: var(--space-4);
		}

		.hero-section :global(.type-hero) {
			font-size: clamp(1.95rem, 3.6vw, 3.1rem);
		}

		.hero-section__lead {
			font-size: 1rem;
			line-height: 1.55;
		}
	}

	@media (max-width: 768px) {
		.hero-section {
			padding-block: clamp(var(--space-5), 5vh, var(--space-8));
		}

		.hero-section__actions {
			display: grid;
			grid-template-columns: 1fr;
		}

		.hero-section__actions :global(.ui-button) {
			width: 100%;
		}
	}

	@media (max-width: 520px) {
		.hero-section {
			padding-block: clamp(var(--space-4), 4.2vh, var(--space-6));
		}
	}
</style>
