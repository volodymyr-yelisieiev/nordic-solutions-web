<script lang="ts">
	type Props = {
		step: string;
		title: string;
		description: string;
	};

	let { step, title, description }: Props = $props();
</script>

<article class="approach-step-card">
	<p class="approach-step-card__number">{step}</p>
	<h3 class="approach-step-card__title">{title}</h3>
	<p class="approach-step-card__description">{description}</p>
</article>

<style>
	.approach-step-card {
		display: grid;
		gap: var(--space-3);
		height: 100%;
		padding: var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-elevated) 88%, white);
	}

	.approach-step-card__number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.3rem;
		height: 2.3rem;
		margin: 0;
		border-radius: var(--radius-pill);
		background: color-mix(in oklab, var(--color-accent-soft) 80%, white);
		border: 1px solid color-mix(in oklab, var(--color-accent) 30%, var(--color-border-soft));
		font-size: var(--font-size-small);
		font-weight: 700;
		letter-spacing: 0.04em;
		color: color-mix(in oklab, var(--color-accent) 82%, black);
	}

	.approach-step-card__title {
		margin: 0;
		font-size: 1.1rem;
	}

	.approach-step-card__description {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-text-muted);
	}
</style>
