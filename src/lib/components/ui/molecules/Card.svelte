<script lang="ts">
	import { cn } from '../classnames';

	export type CardVariant = 'elevated' | 'subtle' | 'outlined';
	export type CardPadding = 'md' | 'lg';
	export type CardElement = 'article' | 'div' | 'section' | 'li';

	type Props = {
		as?: CardElement;
		variant?: CardVariant;
		padding?: CardPadding;
		ariaLabel?: string;
		class?: string;
		children?: import('svelte').Snippet;
	};

	let {
		as = 'article',
		variant = 'elevated',
		padding = 'md',
		ariaLabel,
		class: className = '',
		children
	}: Props = $props();

	const cardClass = $derived(
		cn('ui-card', `ui-card--${variant}`, `ui-card--${padding}`, className)
	);
</script>

<svelte:element this={as} class={cardClass} aria-label={ariaLabel}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style>
	.ui-card {
		display: grid;
		gap: var(--card-content-gap);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-soft);
		position: relative;
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-card--md {
		padding: var(--card-padding-md);
	}

	.ui-card--lg {
		padding: var(--card-padding-lg);
	}

	.ui-card--elevated {
		background: color-mix(in oklab, var(--color-bg-elevated) 86%, white);
		box-shadow: var(--shadow-sm);
	}

	.ui-card--subtle {
		background: color-mix(in oklab, var(--color-bg-subtle) 72%, white);
	}

	.ui-card--outlined {
		background: transparent;
	}

	@media (hover: hover) {
		.ui-card--elevated:hover,
		.ui-card--subtle:hover {
			transform: translateY(-2px);
			border-color: color-mix(in oklab, var(--color-border-strong) 62%, var(--color-border-soft));
			box-shadow: var(--shadow-md);
		}
	}

	.ui-card--elevated:focus-within,
	.ui-card--subtle:focus-within {
		border-color: color-mix(in oklab, var(--color-accent) 42%, var(--color-border-soft));
		box-shadow: var(--shadow-md);
	}
</style>
