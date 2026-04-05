<script lang="ts">
	import Card, { type CardElement, type CardVariant } from './Card.svelte';

	type Props = {
		title: string;
		description: string;
		badge?: string;
		variant?: CardVariant;
		as?: CardElement;
	};

	let { title, description, badge, variant = 'elevated', as = 'article' }: Props = $props();
</script>

<Card {as} {variant} padding="lg">
	{#if badge}
		<p class="feature-card__badge" aria-hidden="true">{badge}</p>
	{/if}

	<h3 class="feature-card__title">{title}</h3>
	<p class="feature-card__description">{description}</p>
</Card>

<style>
	.feature-card__badge {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.feature-card__title {
		margin: 0;
		font-size: var(--font-size-h4);
	}

	.feature-card__description {
		margin: 0;
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-body);
		color: var(--color-text-muted);
	}
</style>
