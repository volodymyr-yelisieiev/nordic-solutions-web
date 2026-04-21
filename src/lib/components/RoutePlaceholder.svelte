<script lang="ts">
	import GeneratedScene from '$lib/components/GeneratedScene.svelte';
	import type { Variant } from '$lib/components/GeneratedScene.svelte';
	import { Button } from '$lib/components/ui';
	import {
		approachPhases,
		contactDetails,
		serviceHighlights,
		valuePillars,
		whyChooseNordic
	} from '$lib/modules/home/content';

	type Props = {
		pageTitle: string;
		routePath: string;
		purpose: string;
	};

	let { pageTitle, routePath, purpose }: Props = $props();

	type RouteConfig = {
		items: string[];
		art: Variant;
	};

	const routeConfig = $derived.by<RouteConfig>(() => {
		switch (routePath) {
			case '/about':
				return {
					items: valuePillars.slice(0, 3).map((item) => item.title),
					art: 'route-about'
				};
			case '/services':
				return {
					items: serviceHighlights.map((item) => item.title),
					art: 'route-services'
				};
			case '/approach':
				return {
					items: approachPhases.map((item) => item.title),
					art: 'route-approach'
				};
			case '/why-nordic':
				return {
					items: whyChooseNordic.slice(0, 4).map((item) => item.title),
					art: 'route-why'
				};
			case '/contact':
				return {
					items: [contactDetails.email, contactDetails.phone, contactDetails.addressLine1],
					art: 'route-contact'
				};
			default:
				return {
					items: [],
					art: 'route-about'
				};
		}
	});
</script>

<section class="route-placeholder">
	<div class="route-placeholder__hero">
		<div class="route-placeholder__copy">
			<p class="route-placeholder__eyebrow">Nordic Solutions</p>
			<h1>{pageTitle}</h1>
			<p>{purpose}</p>
			<Button href="/">Back to Home Narrative</Button>
		</div>

		<div class="route-placeholder__visual">
			<GeneratedScene variant={routeConfig.art} alt={pageTitle} />
		</div>
	</div>

	<div class="route-placeholder__list-wrap">
		<h2>Highlights</h2>
		<ul class="route-placeholder__list">
			{#each routeConfig.items as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.route-placeholder {
		display: grid;
		gap: 1rem;
		padding-top: 1.5rem;
	}

	.route-placeholder__hero,
	.route-placeholder__list-wrap {
		padding: clamp(1.5rem, 4vw, 3rem);
		border-radius: 2.5rem;
		background: rgb(255 255 255 / 0.72);
		box-shadow: var(--shadow-soft);
	}

	.route-placeholder__hero {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(18rem, 0.9fr);
		gap: clamp(1rem, 3vw, 2rem);
		align-items: center;
	}

	.route-placeholder__copy {
		display: grid;
		gap: 1rem;
	}

	.route-placeholder__eyebrow {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.route-placeholder__copy > p:last-of-type {
		color: var(--color-text-muted);
	}

	.route-placeholder__visual {
		overflow: hidden;
		border-radius: 2rem;
		aspect-ratio: 4 / 3;
	}

	.route-placeholder__visual :global(svg) {
		width: 100%;
		height: 100%;
	}

	.route-placeholder__list-wrap h2 {
		margin-bottom: 1rem;
	}

	.route-placeholder__list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.9rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.route-placeholder__list li {
		padding: 1rem 1.1rem;
		border-radius: 1.4rem;
		background: color-mix(in srgb, var(--color-bg-subtle) 76%, white);
	}

	@media (max-width: 900px) {
		.route-placeholder__hero,
		.route-placeholder__list {
			grid-template-columns: 1fr;
		}
	}
</style>
