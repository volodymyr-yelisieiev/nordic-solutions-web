<script lang="ts">
	type Props = {
		title: string;
		eyebrow?: string;
		id?: string;
		description?: string;
		showDivider?: boolean;
		children?: import('svelte').Snippet;
	};

	let { title, eyebrow, id, description, showDivider = true, children }: Props = $props();
</script>

<section class="section-shell" {id}>
	<header class="section-shell__header">
		{#if eyebrow}
			<p class="section-shell__eyebrow">{eyebrow}</p>
		{/if}

		<h2 class="section-shell__title">{title}</h2>

		{#if description}
			<p class="section-shell__description">{description}</p>
		{/if}
	</header>

	{#if children}
		<div class:section-shell__slot--with-divider={showDivider} class="section-shell__slot">
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
		max-width: var(--section-heading-max-width);
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

	.section-shell__description {
		margin: 0;
		max-width: var(--section-copy-max-width);
		color: var(--color-text-muted);
	}

	.section-shell__slot {
		margin-top: var(--space-8);
		display: grid;
		gap: var(--space-4);
	}

	.section-shell__slot--with-divider {
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border-soft);
	}
</style>
