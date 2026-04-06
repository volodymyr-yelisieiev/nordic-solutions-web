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
		position: relative;
		isolation: isolate;
		overflow: hidden;
		min-height: var(--control-height-md);
		padding-inline: var(--control-padding-inline-md);
		border-radius: var(--radius-pill);
		border: 1px solid var(--glass-border);
		font-family: inherit;
		font-size: var(--font-size-body-sm);
		font-weight: 650;
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
		backdrop-filter: var(--glass-blur-sm);
		-webkit-backdrop-filter: var(--glass-blur-sm);
		cursor: pointer;
		transition:
			background-color var(--duration-base) var(--ease-standard),
			color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-button::before {
		content: '';
		position: absolute;
		inset: 1px;
		border-radius: inherit;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.56), rgb(255 255 255 / 0));
		opacity: 0.75;
		pointer-events: none;
		transition: opacity var(--duration-base) var(--ease-standard);
	}

	@media (hover: hover) {
		.ui-button:hover {
			transform: translateY(-1px);
		}
	}

	.ui-button:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 2px;
		box-shadow: 0 0 0 4px var(--focus-ring-shadow);
	}

	.ui-button:active {
		transform: translateY(0) scale(0.985);
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
		border-color: color-mix(in oklab, var(--color-accent) 42%, var(--glass-border));
		background: linear-gradient(
			162deg,
			color-mix(in oklab, white 82%, var(--color-accent-soft)),
			color-mix(in oklab, var(--color-accent) 24%, var(--glass-surface))
		);
		color: color-mix(in oklab, var(--color-accent) 84%, black);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.52),
			0 8px 18px -16px color-mix(in oklab, var(--color-accent) 32%, transparent),
			var(--glass-shadow-sm);
	}

	@media (hover: hover) {
		.ui-button--primary:hover {
			border-color: color-mix(in oklab, var(--color-accent) 52%, var(--glass-border));
			background: linear-gradient(
				162deg,
				color-mix(in oklab, white 86%, var(--color-accent-soft)),
				color-mix(in oklab, var(--color-accent) 30%, var(--glass-surface-strong))
			);
			box-shadow:
				inset 0 1px 0 rgb(255 255 255 / 0.62),
				0 10px 20px -16px color-mix(in oklab, var(--color-accent) 38%, transparent),
				var(--glass-shadow-sm);
		}

		.ui-button--primary:hover::before {
			opacity: 0.88;
		}
	}

	.ui-button--secondary {
		border-color: var(--glass-border);
		background: color-mix(in oklab, var(--glass-surface-strong) 78%, white);
		color: var(--color-text-primary);
		box-shadow: var(--glass-shadow-sm);
	}

	@media (hover: hover) {
		.ui-button--secondary:hover {
			border-color: color-mix(in oklab, var(--glass-border-strong) 74%, var(--glass-border));
			background: color-mix(in oklab, var(--glass-surface-strong) 86%, white);
			box-shadow: var(--glass-shadow-md);
		}
	}

	.ui-button--ghost {
		border-color: transparent;
		background: transparent;
		color: var(--color-text-muted);
		box-shadow: none;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
	}

	@media (hover: hover) {
		.ui-button--ghost:hover {
			color: var(--color-text-primary);
			background: color-mix(in oklab, var(--color-bg-subtle) 64%, white);
		}
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
