<section id="hero" class="hero-section" aria-labelledby="hero-heading">
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
				<a class="hero-section__action hero-section__action--primary" href="#contact">Contact Us</a>
				<a class="hero-section__action hero-section__action--secondary" href="#about"
					>Learn About Nordic</a
				>
			</div>
		</div>

		<aside class="hero-section__visual" aria-label="Abstract visual placeholder">
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
	}

	.hero-section__eyebrow {
		margin: 0;
		font-size: 0.78rem;
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

	.hero-section__action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.95rem;
		padding-inline: 1.15rem;
		border-radius: var(--radius-pill);
		font-size: 0.95rem;
		font-weight: 640;
		text-decoration: none;
	}

	.hero-section__action--primary {
		border: 1px solid color-mix(in oklab, var(--color-accent) 66%, var(--color-border-soft));
		background: color-mix(in oklab, var(--color-accent-soft) 55%, var(--color-bg-elevated));
		color: color-mix(in oklab, var(--color-accent) 84%, black);
		box-shadow: var(--shadow-sm);
	}

	.hero-section__action--secondary {
		border: 1px solid var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-elevated) 88%, white);
		color: var(--color-text-primary);
	}

	.hero-section__visual {
		display: grid;
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
		font-size: 0.92rem;
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
</style>
