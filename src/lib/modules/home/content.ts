import type { Variant } from '$lib/components/GeneratedScene.svelte';

export type HeroSlide = {
	title: string;
	description: string;
	art: Variant;
};

export type ValuePillar = {
	title: string;
	description: string;
	icon: string;
};

export type AboutSpotlight = {
	title: string;
	description: string;
	art: Variant;
};

export type ServiceHighlight = {
	title: string;
	description: string;
	art: Variant;
};

export type ProofCard = {
	title: string;
	description: string;
	art: Variant;
};

export type CompanyStat = {
	label: string;
	value: string;
};

export type ApproachPhase = {
	step: string;
	title: string;
	description: string;
};

export const legacyAssetPaths = {
	logo: '/legacy-assets/Nordic_Solutions_Logo_Red-2.png',
	logoCompact: '/legacy-assets/Logo.png'
} as const;

export const heroSlides: HeroSlide[] = [
	{
		title: 'Innovate. Collaborate. Elevate.',
		description:
			'Nordic Solutions brings international defense expertise into UAE programs that demand precise structuring, trusted relationships, and measurable delivery.',
		art: 'hero-network'
	},
	{
		title: 'Advanced defense capabilities, structured for national priorities.',
		description:
			'We help shape technology transfer, import pathways, and industrial collaboration models that strengthen domestic readiness and capability depth.',
		art: 'hero-transfer'
	},
	{
		title: 'Liability, partnership, and execution held to the same standard.',
		description:
			'Every engagement is framed around accountability, partner alignment, and governance that remains stable from first conversation to rollout.',
		art: 'hero-governance'
	}
];

export const valuePillars: ValuePillar[] = [
	{
		title: 'Reliability',
		description:
			'We build trust through dependable delivery, precise coordination, and disciplined follow-through.',
		icon: '/legacy-assets/icon.png'
	},
	{
		title: 'Innovation',
		description:
			'We connect cutting-edge defense technologies with implementation strategies that fit the UAE context.',
		icon: '/legacy-assets/icon-1.png'
	},
	{
		title: 'Customer Focus',
		description:
			'Our partners stay at the center of decisions, timelines, and delivery priorities throughout the engagement.',
		icon: '/legacy-assets/icon-2.png'
	},
	{
		title: 'Collaboration',
		description:
			'We actively form bridges between local manufacturers, international leaders, and project stakeholders.',
		icon: '/legacy-assets/icon-3.png'
	},
	{
		title: 'Excellence',
		description:
			'We pursue high standards of quality, safety, and operational performance across the full program cycle.',
		icon: '/legacy-assets/icon-4.png'
	},
	{
		title: 'Contribution',
		description:
			'We focus on strengthening defense, security, and economic objectives through meaningful technology partnerships.',
		icon: '/legacy-assets/icon-5.png'
	}
];

export const aboutSpotlights: AboutSpotlight[] = [
	{
		title: 'Regional business insight',
		description:
			'Experienced commercial coordination shaped around the UAE context and long-range industrial alignment.',
		art: 'about-region'
	},
	{
		title: 'International defense experience',
		description:
			'Cross-border market knowledge and capability planning translated into practical partnership structures.',
		art: 'about-expertise'
	}
];

export const companyStats: CompanyStat[] = [
	{ label: 'Focus', value: 'UAE defense advancement' },
	{ label: 'Mode', value: 'Structured global partnerships' },
	{ label: 'Base', value: 'Abu Dhabi operating presence' },
	{ label: 'Standard', value: 'Liability-first execution' }
];

export const serviceHighlights: ServiceHighlight[] = [
	{
		title: 'Ensuring technology transfer',
		description:
			'We enable the transfer of knowledge, skills, and operating know-how from established global defense partners into local capability development.',
		art: 'service-transfer'
	},
	{
		title: 'Developing partnerships',
		description:
			'Nordic Solutions structures collaboration models between UAE manufacturers and international defense companies built for long-term compatibility.',
		art: 'service-partnerships'
	},
	{
		title: 'Supporting strategic imports',
		description:
			'We support the import of advanced defense goods and related services when domestic operational needs require fast, well-governed access.',
		art: 'service-imports'
	},
	{
		title: 'Supporting export growth',
		description:
			'We help position UAE-made defense products for export and wider industrial opportunity through strategic market preparation and partner coordination.',
		art: 'service-export'
	}
];

export const approachPhases: ApproachPhase[] = [
	{
		step: '01',
		title: 'Frame the national objective',
		description:
			'We align the mission, capability priorities, and decision context before the program structure takes shape.'
	},
	{
		step: '02',
		title: 'Source the right international fit',
		description:
			'We identify the most relevant global expertise, technology, and industrial partner pathways for the brief.'
	},
	{
		step: '03',
		title: 'Design the transfer model',
		description:
			'Knowledge transfer, import mechanisms, and collaboration structures are defined around practical implementation.'
	},
	{
		step: '04',
		title: 'Support delivery discipline',
		description:
			'Execution remains measurable through clear communication loops, accountability, and long-term partnership stewardship.'
	}
];

export const whyChooseNordic: ProofCard[] = [
	{
		title: 'Prioritizes UAE capability development',
		description:
			'We align project structures with the long-term development of advanced domestic defense capability, not short-lived transactional wins.',
		art: 'why-capability'
	},
	{
		title: 'Knows the global defense market',
		description:
			'Our team combines regional knowledge with international market fluency, helping clients navigate counterparties, timing, and strategic fit.',
		art: 'why-market'
	},
	{
		title: 'Uses strategic consulting tools',
		description:
			'We bring rigorous planning, decision support, and delivery controls to complex programs where clarity is as important as ambition.',
		art: 'why-consulting'
	},
	{
		title: 'Puts liability and partnership first',
		description:
			'Responsibility, trust, and accountability remain visible throughout the engagement cycle, keeping every party aligned on obligations and outcomes.',
		art: 'why-liability'
	},
	{
		title: 'Applies effective management practices',
		description:
			'Governance, communication cadence, and execution sequencing are designed for real operating conditions rather than presentation-only planning.',
		art: 'why-management'
	},
	{
		title: 'Brings international project experience',
		description:
			'We combine local ambition with cross-border project experience, helping multi-party initiatives move with discipline instead of friction.',
		art: 'why-projects'
	}
];

export const contactDetails = {
	company: 'Nordic Solutions LLC',
	email: 'info@nordicsolutions.ae',
	phone: '+971503160500',
	addressLine1: 'Tawazun Industrial Park, Abu Dhabi, UAE',
	addressLine2: 'P.O. Box: 3640'
} as const;

export const regionalFootprint = [
	'UAE domestic capability programs',
	'Cross-border industrial partnerships',
	'Technology transfer planning',
	'Import and export support tracks'
];
