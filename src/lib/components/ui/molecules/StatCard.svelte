<script lang="ts">
	import Card, { type CardElement, type CardVariant } from './Card.svelte';

	type Props = {
		value: string;
		label: string;
		detail?: string;
		variant?: CardVariant;
		as?: CardElement;
	};

	let { value, label, detail, variant = 'subtle', as = 'article' }: Props = $props();
</script>

<Card {as} {variant} padding="md">
	<p class="stat-card__value">{value}</p>
	<p class="stat-card__label">{label}</p>

	{#if detail}
		<p class="stat-card__detail">{detail}</p>
	{/if}
</Card>

<style>
	.stat-card__value {
		margin: 0;
		font-family: var(--font-family-display);
		font-size: clamp(1.5rem, 2.2vw, 2rem);
		line-height: 1.08;
		color: var(--color-text-primary);
	}

	.stat-card__label {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 650;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.stat-card__detail {
		margin: 0;
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-body);
		color: var(--color-text-muted);
	}
</style>
