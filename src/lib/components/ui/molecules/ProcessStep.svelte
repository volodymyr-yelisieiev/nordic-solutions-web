<script lang="ts">
	import Card, { type CardElement, type CardVariant } from './Card.svelte';

	type Props = {
		step: string;
		title: string;
		description: string;
		variant?: CardVariant;
		as?: CardElement;
	};

	let { step, title, description, variant = 'elevated', as = 'article' }: Props = $props();
</script>

<Card {as} {variant} padding="md">
	<p class="process-step__number">{step}</p>
	<h3 class="process-step__title">{title}</h3>
	<p class="process-step__description">{description}</p>
</Card>

<style>
	.process-step__number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--step-badge-size);
		height: var(--step-badge-size);
		margin: 0;
		border-radius: var(--radius-pill);
		border: 1px solid color-mix(in oklab, var(--color-accent) 30%, var(--color-border-soft));
		background: color-mix(in oklab, var(--color-accent-soft) 80%, white);
		font-size: var(--font-size-small);
		font-weight: 700;
		letter-spacing: 0.04em;
		color: color-mix(in oklab, var(--color-accent) 82%, black);
	}

	.process-step__title {
		margin: 0;
		font-size: var(--font-size-h4);
	}

	.process-step__description {
		margin: 0;
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-body);
		color: var(--color-text-muted);
	}

	@media (max-width: 960px) {
		.process-step__title,
		.process-step__description {
			padding-inline-start: calc(var(--step-badge-size) + var(--space-3));
		}
	}
</style>
