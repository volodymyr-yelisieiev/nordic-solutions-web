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
		line-height: 1.4;
		padding: var(--control-padding-block) var(--control-padding-inline-field);
		border-radius: 1.25rem;
		border: 1px solid color-mix(in srgb, var(--color-text-primary) 16%, transparent);
		background: rgb(255 255 255 / 0.88);
		color: var(--color-text-primary);
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-text-input::placeholder {
		color: color-mix(in srgb, var(--color-text-muted) 78%, transparent);
	}

	.ui-text-input:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 1px;
		border-color: color-mix(in srgb, var(--color-accent) 52%, white);
		box-shadow: 0 0 0 4px rgb(243 115 56 / 0.12);
		transform: translateY(-1px);
	}

	.ui-text-input--invalid {
		border-color: color-mix(in srgb, var(--color-danger) 68%, white);
		background: color-mix(in srgb, var(--color-danger) 6%, white);
	}
</style>
