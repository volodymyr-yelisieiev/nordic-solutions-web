<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '../classnames';

	type Props = HTMLInputAttributes & {
		invalid?: boolean;
		class?: string;
	};

	let { invalid = false, class: className = '', ...attributes }: Props = $props();

	const inputClass = $derived(cn('ui-text-input', invalid && 'ui-text-input--invalid', className));
</script>

<input class={inputClass} aria-invalid={invalid || undefined} {...attributes} />

<style>
	.ui-text-input {
		width: 100%;
		font: inherit;
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		padding: var(--control-padding-block) var(--control-padding-inline-field);
		border-radius: var(--radius-sm);
		border: 1px solid var(--glass-border);
		background: color-mix(in oklab, var(--glass-surface-strong) 80%, white);
		backdrop-filter: var(--glass-blur-sm);
		-webkit-backdrop-filter: var(--glass-blur-sm);
		color: var(--color-text-primary);
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-text-input::placeholder {
		color: color-mix(in oklab, var(--color-text-muted) 74%, transparent);
	}

	.ui-text-input:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 1px;
		box-shadow: 0 0 0 4px var(--focus-ring-shadow);
		border-color: color-mix(in oklab, var(--color-accent) 34%, var(--glass-border));
		background: color-mix(in oklab, var(--glass-surface-strong) 90%, white);
		transform: translateY(-1px);
	}

	.ui-text-input--invalid {
		border-color: color-mix(in oklab, var(--color-danger) 68%, var(--glass-border));
		background: color-mix(in oklab, var(--color-danger) 5%, var(--glass-surface-strong));
	}
</style>
