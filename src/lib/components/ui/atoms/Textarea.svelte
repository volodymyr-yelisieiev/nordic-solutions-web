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
		line-height: var(--line-height-body);
		padding: var(--control-padding-block) var(--control-padding-inline-field);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-elevated) 90%, white);
		color: var(--color-text-primary);
		resize: vertical;
		min-height: 7.2rem;
		transition:
			border-color 180ms ease,
			box-shadow 180ms ease,
			background-color 180ms ease;
	}

	.ui-textarea::placeholder {
		color: color-mix(in oklab, var(--color-text-muted) 74%, transparent);
	}

	.ui-textarea:focus-visible {
		outline: 2px solid color-mix(in oklab, var(--color-accent) 32%, white);
		outline-offset: 1px;
		border-color: color-mix(in oklab, var(--color-accent) 34%, var(--color-border-soft));
	}

	.ui-textarea--invalid {
		border-color: color-mix(in oklab, var(--color-danger) 56%, var(--color-border-soft));
	}
</style>
