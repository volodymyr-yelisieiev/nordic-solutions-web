<script lang="ts">
	export type Variant =
		| 'hero-network'
		| 'hero-transfer'
		| 'hero-governance'
		| 'about-region'
		| 'about-expertise'
		| 'service-transfer'
		| 'service-partnerships'
		| 'service-imports'
		| 'service-export'
		| 'why-capability'
		| 'why-market'
		| 'why-consulting'
		| 'why-liability'
		| 'why-management'
		| 'why-projects'
		| 'presence-hub'
		| 'route-about'
		| 'route-services'
		| 'route-approach'
		| 'route-why'
		| 'route-contact';

	type Props = {
		variant: Variant;
		alt: string;
		class?: string;
	};

	let { variant, alt, class: className = '' }: Props = $props();
</script>

<div
	class={`generated-scene ${className}`}
	data-variant={variant}
	role="img"
	aria-label={alt}
	aria-hidden={alt ? undefined : 'true'}
>
	<div class="generated-scene__surface"></div>
</div>

<style>
	.generated-scene {
		width: 100%;
		height: 100%;
		min-height: 100%;
		border-radius: inherit;
		overflow: hidden;
		background:
			radial-gradient(circle at 24% 18%, rgb(255 255 255 / 0.72), transparent 22%),
			radial-gradient(circle at 76% 74%, rgb(243 115 56 / 0.1), transparent 20%),
			linear-gradient(180deg, rgb(248 243 239 / 0.95), rgb(237 229 222 / 0.98));
	}

	.generated-scene__surface {
		width: 100%;
		height: 100%;
		background:
			linear-gradient(135deg, rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.08)),
			repeating-linear-gradient(
				135deg,
				rgb(255 255 255 / 0.14) 0,
				rgb(255 255 255 / 0.14) 18px,
				transparent 18px,
				transparent 36px
			);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.55);
	}
</style>
