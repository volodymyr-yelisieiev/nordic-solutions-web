<script lang="ts">
	import {
		generatedSceneAssets,
		type GeneratedSceneVariant
	} from './generated-scene-assets';

	export type Variant = GeneratedSceneVariant;

	type Props = {
		variant: Variant;
		alt: string;
		class?: string;
	};

	let { variant, alt, class: className = '' }: Props = $props();
</script>

<div class={`generated-scene ${className}`} data-variant={variant}>
	<img
		class="generated-scene__image"
		src={generatedSceneAssets[variant].src}
		alt={alt}
		loading="lazy"
		aria-hidden={alt ? undefined : 'true'}
	/>
</div>

<style>
	.generated-scene {
		width: 100%;
		height: 100%;
		min-height: 100%;
		border-radius: inherit;
		overflow: hidden;
		background: linear-gradient(180deg, rgb(248 243 239 / 0.95), rgb(237 229 222 / 0.98));
	}

	.generated-scene__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
