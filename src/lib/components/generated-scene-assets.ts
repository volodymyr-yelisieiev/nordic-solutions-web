export type GeneratedSceneVariant =
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

export const generatedSceneAssets: Record<
	GeneratedSceneVariant,
	{
		src: string;
	}
> = {
	'hero-network': { src: '/images/generated-scenes/hero-network.png' },
	'hero-transfer': { src: '/images/generated-scenes/hero-transfer.png' },
	'hero-governance': { src: '/images/generated-scenes/hero-governance.png' },
	'about-region': { src: '/images/generated-scenes/about-region.png' },
	'about-expertise': { src: '/images/generated-scenes/about-expertise.png' },
	'service-transfer': { src: '/images/generated-scenes/service-transfer.png' },
	'service-partnerships': { src: '/images/generated-scenes/service-partnerships.png' },
	'service-imports': { src: '/images/generated-scenes/service-imports.png' },
	'service-export': { src: '/images/generated-scenes/service-export.png' },
	'why-capability': { src: '/images/generated-scenes/why-capability.png' },
	'why-market': { src: '/images/generated-scenes/why-market.png' },
	'why-consulting': { src: '/images/generated-scenes/why-consulting.png' },
	'why-liability': { src: '/images/generated-scenes/why-liability.png' },
	'why-management': { src: '/images/generated-scenes/why-management.png' },
	'why-projects': { src: '/images/generated-scenes/why-projects.png' },
	'presence-hub': { src: '/images/generated-scenes/presence-hub.png' },
	'route-about': { src: '/images/generated-scenes/route-about.png' },
	'route-services': { src: '/images/generated-scenes/route-services.png' },
	'route-approach': { src: '/images/generated-scenes/route-approach.png' },
	'route-why': { src: '/images/generated-scenes/route-why.png' },
	'route-contact': { src: '/images/generated-scenes/route-contact.png' }
} as const;
