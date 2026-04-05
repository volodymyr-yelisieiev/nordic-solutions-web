<script lang="ts">
	type Props = {
		value: string;
		label: string;
		detail?: string;
	};

	let { value, label, detail }: Props = $props();
</script>

<article class="home-stat-card">
	<p class="home-stat-card__value">{value}</p>
	<p class="home-stat-card__label">{label}</p>

	{#if detail}
		<p class="home-stat-card__detail">{detail}</p>
	{/if}
</article>

<style>
	.home-stat-card {
		display: grid;
		gap: var(--space-2);
		padding: var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-subtle) 70%, white);
	}

	.home-stat-card__value {
		margin: 0;
		font-family: var(--font-family-display);
		font-size: clamp(1.5rem, 2.2vw, 2rem);
		line-height: 1.08;
		color: var(--color-text-primary);
	}

	.home-stat-card__label {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 650;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.home-stat-card__detail {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.52;
		color: var(--color-text-muted);
	}
</style>
