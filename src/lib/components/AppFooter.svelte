<script lang="ts">
	import { resolve } from '$app/paths';
	import { contactDetails, legacyAssetPaths } from '$lib/modules/home/content';
	import type { NavigationItem } from '$lib/modules/site-navigation';

	type Props = {
		navigation: NavigationItem[];
	};

	let { navigation }: Props = $props();

	const currentYear = new Date().getFullYear();
	const compactNavigation = $derived(navigation.filter((item) => item.key !== 'home'));
</script>

<footer class="app-footer">
	<div class="shell-container app-footer__inner">
		<div class="app-footer__headline-block">
			<p class="app-footer__eyebrow">Nordic Solutions</p>
			<h2 class="app-footer__headline">
				We stay close to the brief, the partner landscape, and the delivery reality.
			</h2>
			<p class="app-footer__intro">
				Structured support for defense partnerships, capability transfer, and long-range industrial
				coordination in the UAE.
			</p>
		</div>

		<div class="app-footer__grid">
			<section class="app-footer__column">
				<img class="app-footer__logo" src={legacyAssetPaths.logo} alt="Nordic Solutions" />
				<p class="app-footer__meta-copy">
					{contactDetails.company}<br />
					{contactDetails.addressLine1}<br />
					{contactDetails.addressLine2}
				</p>
			</section>

			<nav class="app-footer__column" aria-label="Footer navigation">
				<h3>Explore</h3>
				<ul class="app-footer__links">
					{#each compactNavigation as item (item.key)}
						<li><a href={resolve(item.routePath)}>{item.title}</a></li>
					{/each}
				</ul>
			</nav>

			<section class="app-footer__column">
				<h3>Reach Us</h3>
				<ul class="app-footer__links">
					<li><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></li>
					<li><a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a></li>
					<li><span>{contactDetails.addressLine1}</span></li>
				</ul>
			</section>
		</div>
	</div>

	<div class="shell-container app-footer__bottom">
		<span>© {currentYear} Nordic Solutions. All rights reserved.</span>
		<span>Built for high-trust strategic engagement.</span>
	</div>
</footer>

<style>
	.app-footer {
		margin-top: var(--section-space);
		padding-top: clamp(3rem, 7vw, 5rem);
		padding-bottom: 2rem;
		background: var(--color-dark-surface);
		color: #f3f0ee;
	}

	.app-footer__inner {
		display: grid;
		gap: clamp(2rem, 5vw, 3.5rem);
	}

	.app-footer__headline-block {
		max-width: 44rem;
		display: grid;
		gap: 1rem;
	}

	.app-footer__eyebrow {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(243 240 238 / 0.58);
	}

	.app-footer__headline {
		color: #f3f0ee;
		max-width: 18ch;
	}

	.app-footer__intro {
		max-width: 36rem;
		color: rgb(243 240 238 / 0.68);
	}

	.app-footer__grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr 0.9fr;
		gap: clamp(1.5rem, 4vw, 3rem);
		padding-top: 1.5rem;
		border-top: 1px solid rgb(255 255 255 / 0.14);
	}

	.app-footer__column {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	.app-footer__column h3 {
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(243 240 238 / 0.52);
	}

	.app-footer__logo {
		width: 10rem;
		height: auto;
		filter: brightness(0) invert(1);
	}

	.app-footer__meta-copy {
		color: rgb(243 240 238 / 0.68);
	}

	.app-footer__links {
		display: grid;
		gap: 0.7rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.app-footer__links a,
	.app-footer__links span {
		color: #f3f0ee;
		text-decoration: none;
	}

	.app-footer__bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid rgb(255 255 255 / 0.14);
		color: rgb(243 240 238 / 0.5);
		font-size: 0.84rem;
	}

	@media (max-width: 900px) {
		.app-footer__grid {
			grid-template-columns: 1fr;
		}

		.app-footer__headline {
			max-width: unset;
		}
	}
</style>
