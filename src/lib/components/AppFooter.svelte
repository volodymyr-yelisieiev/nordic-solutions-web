<script lang="ts">
	import { resolve } from '$app/paths';
	import type { NavigationItem } from '$lib/modules/site-navigation';

	type Props = {
		navigation: NavigationItem[];
	};

	let { navigation }: Props = $props();

	const currentYear = new Date().getFullYear();
	const compactNavigation = $derived(navigation.filter((item) => item.key !== 'home'));
</script>

<footer class="app-footer">
	<div class="shell-container app-footer__grid glass-panel">
		<section class="app-footer__block">
			<a class="app-footer__brand" href={resolve('/')} aria-label="Nordic Solutions home">
				<img class="app-footer__logo" src="/Nordic_Solutions_Logo_Red.svg" alt="Nordic Solutions" />
			</a>
			<p class="app-footer__description">
				Structured international project support for partnerships, integration work, and long-term
				execution discipline.
			</p>
		</section>

		<section class="app-footer__block app-footer__contacts" aria-label="Contact details">
			<h2 class="app-footer__title">Contact</h2>
			<p>Abu Dhabi Global Market, Al Maryah Island, Abu Dhabi, UAE</p>
			<p>
				<a href="mailto:hello@nordicsolutions.ae">hello@nordicsolutions.ae</a>
			</p>
			<p>
				<a href="tel:+97120004900">+971 2 000 4900</a>
			</p>
		</section>

		<nav class="app-footer__block" aria-label="Footer navigation">
			<h2 class="app-footer__title">Navigate</h2>
			<ul class="app-footer__links">
				{#each compactNavigation as item (item.key)}
					<li>
						<a href={resolve(item.routePath)}>{item.title}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="shell-container app-footer__meta">
		© {currentYear} Nordic Solutions. All rights reserved.
	</div>
</footer>

<style>
	.app-footer {
		margin-top: var(--space-12);
		padding-bottom: var(--space-4);
	}

	.app-footer__grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr 0.9fr;
		gap: clamp(var(--space-6), 4.6vw, var(--space-10));
		padding-block: clamp(var(--space-8), 5vw, var(--space-12));
		padding-inline: clamp(var(--space-4), 3.6vw, var(--space-8));
		border-radius: clamp(var(--radius-lg), 2vw, var(--radius-xl));
	}

	.app-footer__block {
		display: grid;
		gap: var(--space-3);
		align-content: start;
	}

	.app-footer__brand {
		display: inline-flex;
		width: fit-content;
		border-radius: var(--radius-sm);
		line-height: 0;
	}

	.app-footer__logo {
		width: clamp(8.6rem, 13vw, 10.8rem);
		aspect-ratio: 147.401 / 70.866;
		height: auto;
	}

	.app-footer__title {
		margin: 0;
		font-family: var(--font-family-body);
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.app-footer__description,
	.app-footer__contacts p {
		margin: 0;
		max-width: 44ch;
		font-size: 0.95rem;
		line-height: 1.58;
		color: color-mix(in oklab, var(--color-text-muted) 88%, var(--color-text-primary));
	}

	.app-footer__contacts a {
		font-size: 0.95rem;
		font-weight: 560;
		text-decoration: none;
		color: var(--color-text-primary);
		border-radius: var(--radius-sm);
		padding-inline: var(--space-1);
		transition:
			color var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard);
	}

	@media (hover: hover) {
		.app-footer__contacts a:hover {
			color: color-mix(in oklab, var(--color-accent) 82%, black);
			background: color-mix(in oklab, var(--glass-surface) 74%, white);
		}
	}

	.app-footer__links {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: var(--space-2);
	}

	.app-footer__links a {
		display: inline-flex;
		align-items: center;
		min-height: 1.8rem;
		padding-inline: var(--space-1);
		color: var(--color-text-primary);
		text-decoration-line: underline;
		text-decoration-thickness: 0.08em;
		text-decoration-color: transparent;
		text-underline-offset: 0.24em;
		font-size: 0.95rem;
		transition:
			text-decoration-color var(--duration-base) var(--ease-standard),
			color var(--duration-base) var(--ease-standard);
	}

	@media (hover: hover) {
		.app-footer__links a:hover {
			color: var(--color-text-primary);
			background: color-mix(in oklab, var(--glass-surface) 74%, white);
			text-decoration-color: color-mix(in oklab, var(--color-text-primary) 56%, transparent);
		}
	}

	.app-footer__brand:focus-visible,
	.app-footer__contacts a:focus-visible,
	.app-footer__links a:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 2px;
		box-shadow: 0 0 0 4px var(--focus-ring-shadow);
	}

	.app-footer__meta {
		margin-top: var(--space-4);
		padding-block: var(--space-4) var(--space-5);
		border-top: 1px solid color-mix(in oklab, var(--glass-border) 80%, transparent);
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
	}

	@media (max-width: 900px) {
		.app-footer__grid {
			grid-template-columns: 1fr;
			gap: var(--space-8);
			padding-block: var(--space-10);
		}

		.app-footer__logo {
			width: 9rem;
		}
	}

	@media (max-width: 600px) {
		.app-footer__logo {
			width: 8.2rem;
		}
	}
</style>
