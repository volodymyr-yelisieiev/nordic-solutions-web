<script lang="ts">
	import { SectionShell, ValueCard } from '$lib/components/ui';

	const reasons = [
		{
			title: 'International Perspective',
			description:
				'We operate with awareness of cross-border expectations, governance norms, and partner cultures.'
		},
		{
			title: 'Structured Execution',
			description:
				'Engagements are managed through clear milestones, ownership, and transparent status communication.'
		},
		{
			title: 'Long-Term Orientation',
			description:
				'We design collaborations for continuity rather than one-off transactions or isolated handovers.'
		},
		{
			title: 'Professional Discretion',
			description:
				'Communication remains measured and compliant, balancing visibility with confidentiality needs.'
		}
	];
</script>

<SectionShell
	id="why-nordic"
	eyebrow="Why Nordic"
	title="A partnership model centered on trust, clarity, and delivery discipline."
	description="The differentiators below summarize how we work and why clients choose to continue working with us."
>
	<div class="why-nordic-section__grid" aria-label="Reasons to work with Nordic Solutions">
		{#each reasons as reason (reason.title)}
			<ValueCard title={reason.title} description={reason.description} />
		{/each}
	</div>
</SectionShell>

<style>
	.why-nordic-section__grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-3);
	}

	@media (max-width: 800px) {
		.why-nordic-section__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
