export type RouteKey = 'home' | 'about' | 'services' | 'approach' | 'why-nordic' | 'contact';

export type RoutePath = '/' | '/about' | '/services' | '/approach' | '/why-nordic' | '/contact';

export type HomeSectionId =
	| 'hero'
	| 'about'
	| 'services'
	| 'approach'
	| 'why-nordic'
	| 'presence'
	| 'contact';

export type NavigationTarget = 'home-section';

export type NavigationItem = {
	key: RouteKey;
	title: string;
	href: `#${HomeSectionId}`;
	target: NavigationTarget;
	routePath: RoutePath;
	isPrimary?: boolean;
	summary: string;
};

export type NarrativeStep = {
	step: number;
	id: HomeSectionId;
	title: string;
	routePath?: RoutePath;
	description: string;
};

export const primaryNavigation: NavigationItem[] = [
	{
		key: 'home',
		title: 'Home',
		href: '#hero',
		target: 'home-section',
		routePath: '/',
		summary: 'Hero entry point and narrative bridge to all core sections.'
	},
	{
		key: 'about',
		title: 'About',
		href: '#about',
		target: 'home-section',
		routePath: '/about',
		summary: 'Company profile, positioning, and trust baseline.'
	},
	{
		key: 'services',
		title: 'Services',
		href: '#services',
		target: 'home-section',
		routePath: '/services',
		summary: 'Capability stack shown as neutral corporate blocks.'
	},
	{
		key: 'approach',
		title: 'Approach',
		href: '#approach',
		target: 'home-section',
		routePath: '/approach',
		summary: 'Process discipline and execution workflow overview.'
	},
	{
		key: 'why-nordic',
		title: 'Why Nordic',
		href: '#why-nordic',
		target: 'home-section',
		routePath: '/why-nordic',
		summary: 'Trust arguments and partnership differentiators.'
	},
	{
		key: 'contact',
		title: 'Contact',
		href: '#contact',
		target: 'home-section',
		routePath: '/contact',
		isPrimary: true,
		summary: 'Intentional and direct path to first communication.'
	}
];

export const homeNarrativeFlow: NarrativeStep[] = [
	{
		step: 1,
		id: 'hero',
		title: 'Hero',
		routePath: '/',
		description: 'Initial first-screen placeholder for headline, support text, and CTA.'
	},
	{
		step: 2,
		id: 'about',
		title: 'About',
		routePath: '/about',
		description: 'Placeholder step for compact company introduction and credibility framing.'
	},
	{
		step: 3,
		id: 'services',
		title: 'Services / Capabilities',
		routePath: '/services',
		description: 'Placeholder step for 3-5 high-level capability blocks.'
	},
	{
		step: 4,
		id: 'approach',
		title: 'Approach',
		routePath: '/approach',
		description: 'Placeholder step for process-oriented execution stages.'
	},
	{
		step: 5,
		id: 'why-nordic',
		title: 'Why Nordic',
		routePath: '/why-nordic',
		description: 'Placeholder step for concise reasons to trust and collaborate.'
	},
	{
		step: 6,
		id: 'presence',
		title: 'Presence',
		description: 'Placeholder step for multi-market footprint and credibility indicators.'
	},
	{
		step: 7,
		id: 'contact',
		title: 'Contact',
		routePath: '/contact',
		description: 'Placeholder step for clear conversion path to direct contact.'
	}
];
