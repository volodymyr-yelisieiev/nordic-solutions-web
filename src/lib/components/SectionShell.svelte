<script lang="ts">
	type Props = {
		title: string;
		eyebrow?: string;
		content?: string;
		children?: import('svelte').Snippet;
	};

	let { title, eyebrow, content, children }: Props = $props();
</script>

<section class="section-shell" aria-label={title}>
	<div class="section-shell__inner">
		{#if eyebrow}
			<p class="section-shell__eyebrow">{eyebrow}</p>
		{/if}

		<h1 class="section-shell__title">{title}</h1>

		{#if content}
			<p class="section-shell__content">{content}</p>
		{/if}

		{#if children}
			<div class="section-shell__slot">
				{@render children()}
			</div>
		{/if}
	</div>
</section>

<style>
	.section-shell {
		padding-block: var(--space-xl);
	}

	.section-shell__inner {
		padding: var(--space-lg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
	}

	.section-shell__eyebrow {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.section-shell__title {
		margin: var(--space-xs) 0 0;
		font-size: clamp(1.4rem, 2.2vw, 2rem);
	}

	.section-shell__content {
		margin: var(--space-sm) 0 0;
		max-width: 64ch;
		color: var(--color-text-muted);
	}

	.section-shell__slot {
		margin-top: var(--space-md);
		display: grid;
		gap: var(--space-sm);
	}
</style>
