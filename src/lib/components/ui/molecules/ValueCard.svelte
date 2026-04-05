<script lang="ts">
	import Card, { type CardElement, type CardVariant } from './Card.svelte';

	type Props = {
		title: string;
		description: string;
		variant?: CardVariant;
		as?: CardElement;
	};

	let { title, description, variant = 'elevated', as = 'article' }: Props = $props();
</script>

<Card {as} {variant} padding="md">
	<h3 class="value-card__title">{title}</h3>
	<p class="value-card__description">{description}</p>
</Card>

<style>
	.value-card__title {
		margin: 0;
		font-size: var(--font-size-h4);
	}

	.value-card__description {
		margin: 0;
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-body);
		color: var(--color-text-muted);
	}
</style>
