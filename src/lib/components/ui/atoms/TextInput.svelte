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
		border: 1px solid var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-elevated) 90%, white);
		color: var(--color-text-primary);
		transition:
			border-color 180ms ease,
			box-shadow 180ms ease,
			background-color 180ms ease;
	}

	.ui-text-input::placeholder {
		color: color-mix(in oklab, var(--color-text-muted) 74%, transparent);
	}

	.ui-text-input:focus-visible {
		outline: 2px solid color-mix(in oklab, var(--color-accent) 32%, white);
		outline-offset: 1px;
		border-color: color-mix(in oklab, var(--color-accent) 34%, var(--color-border-soft));
	}

	.ui-text-input--invalid {
		border-color: color-mix(in oklab, var(--color-danger) 56%, var(--color-border-soft));
	}
</style>
