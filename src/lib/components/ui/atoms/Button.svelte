<script lang="ts">
	import { cn } from '../classnames';

	export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
	export type ButtonSize = 'md' | 'lg';

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		target?: string;
		rel?: string;
		disabled?: boolean;
		fullWidth?: boolean;
		ariaLabel?: string;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
	};

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		target,
		rel,
		disabled = false,
		fullWidth = false,
		ariaLabel,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const buttonClass = $derived(
		cn(
			'ui-button',
			`ui-button--${variant}`,
			`ui-button--${size}`,
			fullWidth && 'ui-button--full',
			disabled && 'ui-button--disabled',
			className
		)
	);

	const handleAnchorClick = (event: MouseEvent) => {
		if (disabled) {
			event.preventDefault();
			return;
		}

		onclick?.(event);
	};
</script>

{#if href}
	<a
		class={buttonClass}
		{href}
		{target}
		{rel}
		aria-label={ariaLabel}
		aria-disabled={disabled || undefined}
		onclick={handleAnchorClick}
	>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button class={buttonClass} {type} {disabled} aria-label={ariaLabel} {onclick}>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}

<style>
	.ui-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		min-height: var(--control-height-md);
		padding-inline: var(--control-padding-inline-md);
		border-radius: var(--radius-pill);
		border: 1.5px solid transparent;
		font-family: inherit;
		font-size: 0.97rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition:
			transform var(--duration-fast) var(--ease-emphasis),
			background-color var(--duration-base) var(--ease-standard),
			color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard);
	}

	.ui-button:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 2px;
		box-shadow: 0 0 0 4px var(--focus-ring-shadow);
	}

	.ui-button:active {
		transform: scale(0.97);
	}

	.ui-button--md {
		min-height: var(--control-height-md);
		padding-inline: var(--control-padding-inline-md);
	}

	.ui-button--lg {
		min-height: var(--control-height-lg);
		padding-inline: var(--control-padding-inline-lg);
	}

	.ui-button--primary {
		background: var(--color-dark-surface);
		color: var(--color-bg-canvas);
		border-color: var(--color-dark-surface);
		box-shadow: 0 18px 36px -26px rgb(20 20 19 / 0.7);
	}

	.ui-button--secondary {
		background: rgb(255 255 255 / 0.88);
		color: var(--color-text-primary);
		border-color: color-mix(in srgb, var(--color-text-primary) 82%, transparent);
		box-shadow: var(--shadow-soft);
	}

	.ui-button--ghost {
		background: transparent;
		color: var(--color-text-muted);
		border-color: transparent;
		box-shadow: none;
	}

	@media (hover: hover) {
		.ui-button:hover {
			transform: translateY(-2px);
		}

		.ui-button--primary:hover {
			background: color-mix(in srgb, var(--color-dark-surface) 90%, white);
		}

		.ui-button--secondary:hover {
			background: white;
			border-color: var(--color-text-primary);
		}

		.ui-button--ghost:hover {
			color: var(--color-text-primary);
			background: rgb(255 255 255 / 0.58);
		}
	}

	.ui-button--full {
		width: 100%;
	}

	.ui-button--disabled,
	.ui-button[disabled],
	.ui-button[aria-disabled='true'] {
		opacity: 0.58;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
