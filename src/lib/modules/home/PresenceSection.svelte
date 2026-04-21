<script lang="ts">
	import GeneratedScene from '$lib/components/GeneratedScene.svelte';
	import { SectionShell } from '$lib/components/ui';
</script>

<SectionShell
	id="presence"
	eyebrow="Presence"
	title="Regional presence with local relevance and international partner access."
	description="From Abu Dhabi, Nordic Solutions connects domestic defense priorities with global manufacturers, specialist expertise, and structured collaboration pathways."
>
	<div class="presence-section__layout reveal-stagger">
		<div class="presence-section__visual">
			<GeneratedScene variant="presence-hub" alt="Nordic Solutions regional presence visual" />
			<div class="presence-section__chip presence-section__chip--one">UAE base</div>
			<div class="presence-section__chip presence-section__chip--two">Global partner access</div>
		</div>

		<div class="presence-section__copy">
			<h3>Nordic Solutions operates with local relevance and international reach.</h3>
			<p>
				From Abu Dhabi, the company connects domestic needs with global manufacturers, technical
				expertise, and structured collaboration models that can scale into long-term industrial
				value.
			</p>
			<p>
				This operating position helps clients move from market scanning to partnership design and
				execution without losing strategic control.
			</p>
		</div>
	</div>
</SectionShell>

<style>
	.presence-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
	}

	.presence-section__visual {
		position: relative;
		overflow: hidden;
		border-radius: 2.5rem;
		box-shadow: var(--shadow-md);
		min-height: 24rem;
	}

	.presence-section__visual :global(svg) {
		width: 100%;
		height: 100%;
	}

	.presence-section__chip {
		position: absolute;
		padding: 0.8rem 1rem;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.9);
		box-shadow: var(--shadow-soft);
		font-size: 0.9rem;
	}

	.presence-section__chip--one {
		left: 1rem;
		top: 1rem;
	}

	.presence-section__chip--two {
		right: 1rem;
		bottom: 1rem;
	}

	.presence-section__copy {
		display: grid;
		gap: 1rem;
		color: var(--color-text-muted);
	}

	@media (max-width: 900px) {
		.presence-section__layout {
			grid-template-columns: 1fr;
		}
	}
</style>
