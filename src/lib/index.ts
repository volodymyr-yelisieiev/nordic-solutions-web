export { default as PageShell } from './layouts/PageShell.svelte';
export { default as AppFooter } from './components/AppFooter.svelte';
export { default as AppHeader } from './components/AppHeader.svelte';
export { default as RoutePlaceholder } from './components/RoutePlaceholder.svelte';
export * from './components/ui';

export { homeNarrativeFlow, primaryNavigation } from './modules/site-navigation';

export type {
	HomeSectionId,
	NavigationItem,
	NavigationTarget,
	NarrativeStep,
	RouteKey,
	RoutePath
} from './modules/site-navigation';
