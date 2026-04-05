<script lang="ts">
	type Props = {
		title: string;
		eyebrow?: string;
		id?: string;
		content?: string;
		children?: import('svelte').Snippet;
	};

	let { title, eyebrow, id, content, children }: Props = $props();
</script>

<section class="section-shell" {id} aria-label={title}>
	<header class="section-shell__header">
		{#if eyebrow}
			<p class="section-shell__eyebrow">{eyebrow}</p>
		{/if}

		<h2 class="section-shell__title">{title}</h2>

		{#if content}
			<p class="section-shell__content">{content}</p>
		{/if}
	</header>

	{#if children}
		<div class="section-shell__slot">
			{@render children()}
		</div>
	{/if}
</section>

<style>
	.section-shell {
		padding-block: var(--section-space);
	}

	.section-shell__header {
		display: grid;
		gap: var(--space-4);
		max-width: 66ch;
	}

	.section-shell__eyebrow {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.09em;
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.section-shell__title {
		margin: 0;
	}

	.section-shell__content {
		margin: 0;
		max-width: 62ch;
		color: var(--color-text-muted);
	}

	.section-shell__slot {
		margin-top: var(--space-8);
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border-soft);
		display: grid;
		gap: var(--space-4);
	}
</style>
