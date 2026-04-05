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
		border: 1px solid transparent;
		font-family: inherit;
		font-size: var(--font-size-body-sm);
		font-weight: 650;
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color 180ms ease,
			color 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease,
			transform 180ms ease;
	}

	.ui-button:hover {
		transform: translateY(-1px);
	}

	.ui-button:focus-visible {
		outline: 2px solid color-mix(in oklab, var(--color-accent) 42%, white);
		outline-offset: 2px;
	}

	.ui-button--md {
		min-height: var(--control-height-md);
		padding-inline: var(--control-padding-inline-md);
		font-size: var(--font-size-body-sm);
	}

	.ui-button--lg {
		min-height: var(--control-height-lg);
		padding-inline: var(--control-padding-inline-lg);
		font-size: var(--font-size-body);
	}

	.ui-button--primary {
		border-color: color-mix(in oklab, var(--color-accent) 64%, var(--color-border-soft));
		background: color-mix(in oklab, var(--color-accent-soft) 56%, var(--color-bg-elevated));
		color: color-mix(in oklab, var(--color-accent) 88%, black);
		box-shadow: var(--shadow-sm);
	}

	.ui-button--primary:hover {
		background: color-mix(in oklab, var(--color-accent-soft) 68%, var(--color-bg-elevated));
	}

	.ui-button--secondary {
		border-color: var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-elevated) 86%, white);
		color: var(--color-text-primary);
	}

	.ui-button--secondary:hover {
		border-color: color-mix(in oklab, var(--color-border-strong) 70%, var(--color-border-soft));
		background: color-mix(in oklab, var(--color-bg-subtle) 75%, white);
	}

	.ui-button--ghost {
		border-color: transparent;
		background: transparent;
		color: var(--color-text-muted);
	}

	.ui-button--ghost:hover {
		color: var(--color-text-primary);
		background: color-mix(in oklab, var(--color-bg-subtle) 64%, white);
	}

	.ui-button--full {
		width: 100%;
	}

	.ui-button--disabled,
	.ui-button[disabled],
	.ui-button[aria-disabled='true'] {
		opacity: 0.62;
		cursor: not-allowed;
		transform: none;
		pointer-events: none;
	}
</style>
