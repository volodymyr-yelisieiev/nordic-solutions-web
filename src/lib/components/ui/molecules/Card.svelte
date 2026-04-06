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
		overflow: hidden;
		border: 1px solid var(--glass-border);
		position: relative;
		isolation: isolate;
		backdrop-filter: var(--glass-blur-sm);
		-webkit-backdrop-filter: var(--glass-blur-sm);
		will-change: transform;
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-card::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.44), rgb(255 255 255 / 0));
		opacity: 0.68;
		transition: opacity var(--duration-base) var(--ease-standard);
	}

	.ui-card--md {
		padding: var(--card-padding-md);
	}

	.ui-card--lg {
		padding: var(--card-padding-lg);
	}

	.ui-card--elevated {
		background: linear-gradient(
			162deg,
			color-mix(in oklab, var(--glass-surface-strong) 90%, white),
			color-mix(in oklab, var(--glass-surface) 84%, var(--color-bg-subtle))
		);
		box-shadow: var(--glass-shadow-sm);
	}

	.ui-card--subtle {
		background: linear-gradient(
			166deg,
			color-mix(in oklab, var(--glass-surface) 76%, white),
			color-mix(in oklab, var(--glass-surface-soft) 86%, var(--color-bg-canvas))
		);
	}

	.ui-card--outlined {
		background: color-mix(in oklab, var(--glass-surface-soft) 52%, transparent);
		border-color: color-mix(in oklab, var(--glass-border) 75%, var(--color-border-soft));
	}

	@media (hover: hover) {
		.ui-card--elevated:hover,
		.ui-card--subtle:hover {
			transform: translateY(-1px);
			border-color: color-mix(in oklab, var(--glass-border-strong) 82%, var(--glass-border));
			box-shadow: var(--glass-shadow-md);
		}

		.ui-card--elevated:hover::before,
		.ui-card--subtle:hover::before {
			opacity: 0.84;
		}
	}

	.ui-card--elevated:focus-within,
	.ui-card--subtle:focus-within {
		border-color: color-mix(in oklab, var(--color-accent) 34%, var(--glass-border));
		box-shadow: var(--glass-shadow-md);
	}
</style>
