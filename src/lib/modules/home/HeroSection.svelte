<script lang="ts">
	import GeneratedScene from '$lib/components/GeneratedScene.svelte';
	import { Button } from '$lib/components/ui';
	import { companyStats, heroSlides } from '$lib/modules/home/content';
	import { revealOnView } from '$lib/modules/home/reveal-on-view';
</script>

<section
	id="hero"
	class="hero-section"
	aria-labelledby="hero-heading"
	style="--section-reveal-progress: 0"
	use:revealOnView
>
	<div class="hero-section__shell">
		<div class="hero-section__copy reveal-item">
			<p class="hero-section__eyebrow">Strategic defense partnerships</p>
			<h1 class="type-hero" id="hero-heading">
				Global defense partnerships shaped with warmth, clarity, and operational gravity.
			</h1>
			<p class="hero-section__lead">
				Nordic Solutions supports the UAE with capability transfer, industrial partnership design,
				and implementation models built for long-term strategic value.
			</p>

			<div class="hero-section__actions">
				<Button href="#contact" variant="primary" size="lg">Start a Conversation</Button>
				<Button href="#services" variant="secondary" size="lg">Explore Capabilities</Button>
			</div>

			<div class="hero-section__stats reveal-stagger" aria-label="Company signals">
				{#each companyStats as stat (stat.label)}
					<div class="hero-section__stat">
						<span>{stat.label}</span>
						<strong>{stat.value}</strong>
					</div>
				{/each}
			</div>
		</div>

		<div class="hero-section__visual reveal-item reveal-item--delay-1">
			<div class="orbit-line hero-section__orbit hero-section__orbit--one"></div>
			<div class="orbit-line hero-section__orbit hero-section__orbit--two"></div>

			<div class="hero-section__visual-frame">
				<div class="hero-section__slide-stack">
					{#each heroSlides as slide, index (slide.title)}
						<article class:hero-section__slide--offset={index === 1} class="hero-section__slide">
							<div class="hero-section__slide-image">
								<GeneratedScene variant={slide.art} alt={slide.title} />
							</div>
							<div class="hero-section__slide-copy">
								<h2>{slide.title}</h2>
								<p>{slide.description}</p>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		padding-top: clamp(1rem, 2vw, 1.5rem);
		padding-bottom: clamp(2rem, 5vw, 3rem);
	}

	.hero-section__shell {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
		gap: clamp(2rem, 4vw, 3.5rem);
		align-items: center;
		padding: clamp(1.8rem, 4vw, 3rem);
		border-radius: clamp(2.4rem, 4vw, 3.2rem);
		background:
			linear-gradient(180deg, rgb(255 255 255 / 0.54), rgb(255 255 255 / 0.18)),
			var(--color-bg-subtle);
		box-shadow: var(--shadow-md);
		overflow: hidden;
	}

	.hero-section__shell::before {
		content: 'NORDIC';
		position: absolute;
		right: clamp(-1rem, 4vw, 2rem);
		top: clamp(0.75rem, 2vw, 1.5rem);
		font-size: clamp(4rem, 16vw, 10rem);
		font-weight: 700;
		letter-spacing: -0.06em;
		color: rgb(20 20 19 / 0.04);
	}

	.hero-section__copy {
		position: relative;
		z-index: 1;
		display: grid;
		gap: 1.35rem;
	}

	.hero-section__eyebrow {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.hero-section__lead {
		max-width: 35rem;
		font-size: 1.08rem;
		color: var(--color-text-muted);
	}

	.hero-section__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.hero-section__stats {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.8rem;
		max-width: 38rem;
	}

	.hero-section__stat {
		display: grid;
		gap: 0.45rem;
		padding: 1rem 1.1rem;
		border-radius: 1.6rem;
		background: rgb(255 255 255 / 0.6);
		border: 1px solid rgb(255 255 255 / 0.72);
	}

	.hero-section__stat span {
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.hero-section__stat strong {
		font-size: 1rem;
		font-weight: 500;
	}

	.hero-section__visual {
		position: relative;
		min-height: 42rem;
	}

	.hero-section__orbit--one {
		width: 24rem;
		height: 24rem;
		top: 1rem;
		left: 0;
	}

	.hero-section__orbit--two {
		width: 31rem;
		height: 31rem;
		bottom: 0;
		right: -3rem;
		animation-duration: 16s;
	}

	.hero-section__visual-frame {
		position: relative;
		height: 100%;
		display: grid;
		align-items: center;
		padding: 2rem 0;
		border-radius: 3rem;
		background:
			radial-gradient(circle at 18% 22%, rgb(255 255 255 / 0.78), transparent 24%),
			radial-gradient(circle at 80% 66%, rgb(243 115 56 / 0.1), transparent 18%),
			linear-gradient(180deg, rgb(248 243 239 / 0.9), rgb(239 231 225 / 0.94));
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.82);
	}

	.hero-section__slide-stack {
		position: relative;
		display: grid;
		gap: 1.1rem;
		z-index: 1;
	}

	.hero-section__slide {
		display: grid;
		grid-template-columns: 6.5rem minmax(0, 1fr);
		gap: 1rem;
		align-items: center;
		max-width: 31rem;
		padding: 1rem;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.9);
		box-shadow: var(--shadow-soft);
		transform: translateX(0);
		animation: hero-slide-float 10s var(--ease-standard) infinite alternate;
	}

	.hero-section__slide--offset {
		margin-left: auto;
		animation-delay: 1.2s;
	}

	.hero-section__slide:nth-child(3) {
		animation-delay: 2.2s;
	}

	.hero-section__slide-image {
		aspect-ratio: 1;
		border-radius: 50%;
		overflow: hidden;
	}

	.hero-section__slide-image :global(svg) {
		width: 100%;
		height: 100%;
	}

	.hero-section__slide-copy {
		display: grid;
		gap: 0.35rem;
	}

	.hero-section__slide-copy h2 {
		font-size: 1.15rem;
	}

	.hero-section__slide-copy p {
		font-size: 0.92rem;
		color: var(--color-text-muted);
	}

	@keyframes hero-slide-float {
		from {
			transform: translate3d(0, 0, 0);
		}

		to {
			transform: translate3d(0.5rem, -0.45rem, 0);
		}
	}

	@media (max-width: 1024px) {
		.hero-section__shell {
			grid-template-columns: 1fr;
		}

		.hero-section__visual {
			min-height: 38rem;
		}
	}

	@media (max-width: 700px) {
		.hero-section__shell {
			padding: 1.25rem;
			border-radius: 2rem;
		}

		.hero-section__stats {
			grid-template-columns: 1fr;
		}

		.hero-section__visual {
			min-height: auto;
		}

		.hero-section__slide {
			grid-template-columns: 5rem 1fr;
			max-width: none;
			border-radius: 1.8rem;
		}

		.hero-section__slide--offset {
			margin-left: 0;
		}
	}
</style>
