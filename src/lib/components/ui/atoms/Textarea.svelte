<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '../classnames';

	type Props = HTMLTextareaAttributes & {
		invalid?: boolean;
		class?: string;
	};

	let { invalid = false, class: className = '', ...attributes }: Props = $props();

	const textareaClass = $derived(cn('ui-textarea', invalid && 'ui-textarea--invalid', className));
</script>

<textarea class={textareaClass} aria-invalid={invalid || undefined} {...attributes}></textarea>

<style>
	.ui-textarea {
		width: 100%;
		font: inherit;
		font-size: var(--font-size-body);
		line-height: 1.5;
		padding: var(--control-padding-block) var(--control-padding-inline-field);
		border-radius: 1.5rem;
		border: 1px solid color-mix(in srgb, var(--color-text-primary) 16%, transparent);
		background: rgb(255 255 255 / 0.88);
		color: var(--color-text-primary);
		resize: vertical;
		min-height: 8rem;
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.ui-textarea::placeholder {
		color: color-mix(in srgb, var(--color-text-muted) 78%, transparent);
	}

	.ui-textarea:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 1px;
		border-color: color-mix(in srgb, var(--color-accent) 52%, white);
		box-shadow: 0 0 0 4px rgb(243 115 56 / 0.12);
		transform: translateY(-1px);
	}

	.ui-textarea--invalid {
		border-color: color-mix(in srgb, var(--color-danger) 68%, white);
		background: color-mix(in srgb, var(--color-danger) 6%, white);
	}
</style>
