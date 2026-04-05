export type RouteKey = 'home' | 'about' | 'services' | 'approach' | 'why-nordic' | 'contact';

export type RoutePath = '/' | '/about' | '/services' | '/approach' | '/why-nordic' | '/contact';

export type NavigationItem = {
	key: RouteKey;
	label: string;
	path: RoutePath;
	summary: string;
};

export type NarrativeStep = {
	step: number;
	label: string;
	path: RoutePath;
	description: string;
};

export const primaryNavigation: NavigationItem[] = [
	{
		key: 'home',
		label: 'Home',
		path: '/',
		summary: 'Hero entry point and narrative bridge to all core sections.'
	},
	{
		key: 'about',
		label: 'About',
		path: '/about',
		summary: 'Company profile, positioning, and trust baseline.'
	},
	{
		key: 'services',
		label: 'Services',
		path: '/services',
		summary: 'Capability stack shown as neutral corporate blocks.'
	},
	{
		key: 'approach',
		label: 'Approach',
		path: '/approach',
		summary: 'Process discipline and execution workflow overview.'
	},
	{
		key: 'why-nordic',
		label: 'Why Nordic',
		path: '/why-nordic',
		summary: 'Trust arguments and partnership differentiators.'
	},
	{
		key: 'contact',
		label: 'Contact',
		path: '/contact',
		summary: 'Intentional and direct path to first communication.'
	}
];

export const homeNarrativeFlow: NarrativeStep[] = [
	{
		step: 1,
		label: 'Hero',
		path: '/',
		description: 'Initial first-screen placeholder for headline, support text, and CTA.'
	},
	{
		step: 2,
		label: 'About',
		path: '/about',
		description: 'Placeholder step for compact company introduction and credibility framing.'
	},
	{
		step: 3,
		label: 'Services / Capabilities',
		path: '/services',
		description: 'Placeholder step for 3-5 high-level capability blocks.'
	},
	{
		step: 4,
		label: 'Approach',
		path: '/approach',
		description: 'Placeholder step for process-oriented execution stages.'
	},
	{
		step: 5,
		label: 'Why Nordic',
		path: '/why-nordic',
		description: 'Placeholder step for concise reasons to trust and collaborate.'
	},
	{
		step: 6,
		label: 'Contact',
		path: '/contact',
		description: 'Placeholder step for clear conversion path to direct contact.'
	}
];
