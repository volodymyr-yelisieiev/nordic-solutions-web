<script lang="ts">
	type Props = {
		title: string;
		description: string;
		icon?: string;
		compact?: boolean;
	};

	let { title, description, icon, compact = false }: Props = $props();
</script>

<article class:home-card--compact={compact} class="home-card">
	{#if icon}
		<p class="home-card__icon" aria-hidden="true">{icon}</p>
	{/if}

	<h3 class="home-card__title">{title}</h3>
	<p class="home-card__description">{description}</p>
</article>

<style>
	.home-card {
		display: grid;
		gap: var(--space-3);
		padding: clamp(var(--space-4), 2vw, var(--space-6));
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-md);
		background: color-mix(in oklab, var(--color-bg-elevated) 86%, white);
		box-shadow: var(--shadow-sm);
	}

	.home-card--compact {
		padding: var(--space-4);
		gap: var(--space-2);
	}

	.home-card__icon {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--color-accent);
	}

	.home-card__title {
		margin: 0;
		font-size: 1.2rem;
	}

	.home-card__description {
		margin: 0;
		font-size: 0.97rem;
		line-height: 1.58;
		color: var(--color-text-muted);
	}
</style>
