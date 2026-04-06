<script lang="ts">
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui';
	import type { HomeSectionId, NavigationItem } from '$lib/modules/site-navigation';
	import { onMount, tick } from 'svelte';

	type Props = {
		navigation: NavigationItem[];
	};

	let { navigation }: Props = $props();

	let isMobileMenuOpen = $state(false);
	let isHeaderElevated = $state(false);
	let activeSectionId = $state<HomeSectionId>('hero');
	let homeSections: HTMLElement[] = [];

	const currentPathname = $derived(page.url.pathname);
	const primaryItem = $derived(navigation.find((item) => item.isPrimary) ?? null);
	const navigationWithoutPrimary = $derived(navigation.filter((item) => !item.isPrimary));

	const sectionIdFromHref = (href: NavigationItem['href']): HomeSectionId =>
		href.slice(1) as HomeSectionId;
	const sectionIds = $derived(navigation.map((item) => sectionIdFromHref(item.href)));

	const getHeaderActivationOffset = (): number => {
		if (!browser) {
			return 0;
		}

		const header = document.querySelector('.app-header');

		if (!(header instanceof HTMLElement)) {
			return 0;
		}

		return header.offsetHeight + 24;
	};

	const collectHomeSections = () => {
		if (!browser || currentPathname !== '/') {
			homeSections = [];
			return;
		}

		homeSections = sectionIds
			.map((id) => document.getElementById(id))
			.filter((section): section is HTMLElement => section !== null)
			.sort((a, b) => a.offsetTop - b.offsetTop);
	};

	const syncActiveFromScroll = () => {
		if (!browser || currentPathname !== '/' || homeSections.length === 0) {
			return;
		}

		const activationLine = window.scrollY + getHeaderActivationOffset();
		let nextActiveSection: HomeSectionId = 'hero';

		for (const section of homeSections) {
			const sectionId = section.id as HomeSectionId;

			if (!sectionIds.includes(sectionId)) {
				continue;
			}

			if (section.offsetTop <= activationLine) {
				nextActiveSection = sectionId;
				continue;
			}

			break;
		}

		activeSectionId = nextActiveSection;
	};

	const isItemActive = (item: NavigationItem): boolean => {
		if (currentPathname === '/') {
			return sectionIdFromHref(item.href) === activeSectionId;
		}

		return item.routePath === currentPathname;
	};

	const syncActiveFromHash = () => {
		if (!browser || currentPathname !== '/') {
			return;
		}

		const hash = window.location.hash.slice(1) as HomeSectionId;

		if (hash && sectionIds.includes(hash)) {
			activeSectionId = hash;
			return;
		}

		syncActiveFromScroll();
	};

	const scrollToSection = (sectionId: HomeSectionId) => {
		if (!browser) {
			return;
		}

		const section = document.getElementById(sectionId);

		if (!section) {
			return;
		}

		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		section.scrollIntoView({ behavior: motionPreference ? 'auto' : 'smooth', block: 'start' });
		replaceState(resolve(sectionId === 'hero' ? '/' : `/#${sectionId}`), {});
		activeSectionId = sectionId;
	};

	const handleSectionNavigation = (item: NavigationItem, event?: MouseEvent) => {
		isMobileMenuOpen = false;

		if (!browser || currentPathname !== '/' || item.target !== 'home-section') {
			return;
		}

		event?.preventDefault();

		scrollToSection(sectionIdFromHref(item.href));
	};

	const handlePrimaryAction = () => {
		isMobileMenuOpen = false;

		if (!browser || currentPathname !== '/') {
			return;
		}

		if (!primaryItem || primaryItem.target !== 'home-section') {
			scrollToSection('contact');
			return;
		}

		scrollToSection(sectionIdFromHref(primaryItem.href));
	};

	$effect(() => {
		if (currentPathname === '/') {
			isMobileMenuOpen = false;
			return;
		}

		isMobileMenuOpen = false;
	});

	$effect(() => {
		if (!browser) {
			return;
		}

		let cancelled = false;

		const mountSections = async () => {
			if (currentPathname !== '/') {
				homeSections = [];
				return;
			}

			await tick();

			if (cancelled) {
				return;
			}

			collectHomeSections();
			syncActiveFromScroll();
			syncActiveFromHash();
		};

		void mountSections();

		return () => {
			cancelled = true;
			homeSections = [];
		};
	});

	onMount(() => {
		if (!browser) {
			return;
		}

		const onScroll = () => {
			isHeaderElevated = window.scrollY > 6;
			syncActiveFromScroll();
		};

		const onResize = () => {
			if (window.innerWidth >= 960) {
				isMobileMenuOpen = false;
			}

			collectHomeSections();
			syncActiveFromScroll();
		};

		const onHashChange = () => {
			syncActiveFromHash();
		};

		const onEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isMobileMenuOpen = false;
			}
		};

		collectHomeSections();
		onScroll();
		syncActiveFromHash();

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		window.addEventListener('hashchange', onHashChange);
		window.addEventListener('keydown', onEscape);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('hashchange', onHashChange);
			window.removeEventListener('keydown', onEscape);
		};
	});
</script>

<header class:app-header--elevated={isHeaderElevated} class="app-header">
	<div class="shell-container app-header__inner">
		<a class="app-header__brand" href={resolve('/')} aria-label="Nordic Solutions home">
			<img class="app-header__logo" src="/Nordic_Solutions_Logo_Red.svg" alt="Nordic Solutions" />
		</a>

		<nav class="app-header__desktop-nav" aria-label="Primary navigation">
			<ul class="app-header__list">
				{#each navigationWithoutPrimary as item (item.key)}
					<li>
						<a
							class:app-header__link--active={isItemActive(item)}
							class="app-header__link"
							href={resolve(
								currentPathname === '/'
									? item.href === '#hero'
										? '/'
										: `/${item.href}`
									: item.routePath
							)}
							onclick={(event) => handleSectionNavigation(item, event)}
							aria-current={isItemActive(item) ? 'page' : undefined}
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		{#if currentPathname === '/'}
			<Button
				type="button"
				variant="primary"
				size="md"
				class="app-header__cta"
				onclick={handlePrimaryAction}>Contact</Button
			>
		{:else}
			<Button href={resolve('/contact')} variant="primary" size="md" class="app-header__cta"
				>Contact</Button
			>
		{/if}

		<button
			type="button"
			class="app-header__menu-toggle"
			onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			aria-expanded={isMobileMenuOpen}
			aria-controls="app-mobile-navigation"
			aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
		>
			<span class="app-header__menu-line"></span>
			<span class="app-header__menu-line"></span>
			<span class="app-header__menu-line"></span>
		</button>
	</div>

	<div
		class:app-header__mobile-panel--open={isMobileMenuOpen}
		class="app-header__mobile-panel"
		aria-hidden={!isMobileMenuOpen}
		inert={!isMobileMenuOpen}
	>
		<nav aria-label="Mobile navigation">
			<ul class="app-header__mobile-list" id="app-mobile-navigation">
				{#each navigationWithoutPrimary as item (item.key)}
					<li>
						<a
							class:app-header__mobile-link--active={isItemActive(item)}
							class="app-header__mobile-link"
							href={resolve(
								currentPathname === '/'
									? item.href === '#hero'
										? '/'
										: `/${item.href}`
									: item.routePath
							)}
							onclick={(event) => handleSectionNavigation(item, event)}
							aria-current={isItemActive(item) ? 'page' : undefined}
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		{#if currentPathname === '/'}
			<Button
				type="button"
				variant="primary"
				size="lg"
				fullWidth={true}
				class="app-header__mobile-cta"
				onclick={handlePrimaryAction}
			>
				Contact
			</Button>
		{:else}
			<Button
				href={resolve('/contact')}
				variant="primary"
				size="lg"
				fullWidth={true}
				class="app-header__mobile-cta"
				onclick={() => (isMobileMenuOpen = false)}
			>
				Contact
			</Button>
		{/if}
	</div>
</header>

<style>
	.app-header {
		position: sticky;
		top: 0;
		z-index: 30;
		border-bottom: 1px solid color-mix(in oklab, var(--glass-border) 90%, transparent);
		background: linear-gradient(
			170deg,
			color-mix(in oklab, var(--glass-surface-strong) 92%, white),
			color-mix(in oklab, var(--glass-surface) 84%, var(--color-bg-subtle))
		);
		box-shadow: 0 1px 0 rgb(255 255 255 / 0.5);
		backdrop-filter: var(--glass-blur-md);
		-webkit-backdrop-filter: var(--glass-blur-md);
		transition:
			box-shadow var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard);
	}

	.app-header--elevated {
		box-shadow: var(--glass-shadow-md);
	}

	.app-header__inner {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		min-height: var(--header-height);
		gap: clamp(var(--space-3), 2.2vw, var(--space-6));
	}

	.app-header__brand {
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		border-radius: var(--radius-sm);
		line-height: 0;
	}

	.app-header__logo {
		width: clamp(7.8rem, 12.6vw, 9.8rem);
		aspect-ratio: 147.401 / 70.866;
		height: auto;
	}

	@media (max-width: 1200px) {
		.app-header__logo {
			width: 8.9rem;
		}
	}

	@media (max-width: 700px) {
		.app-header__logo {
			width: 7.9rem;
		}
	}

	.app-header__desktop-nav {
		justify-self: center;
	}

	.app-header__list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		gap: clamp(var(--space-2), 1.8vw, var(--space-5));
	}

	.app-header__link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 1.8rem;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-pill);
		text-decoration-line: underline;
		text-decoration-thickness: 0.08em;
		text-decoration-color: transparent;
		text-underline-offset: 0.25em;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text-muted);
		transition:
			color var(--duration-base) var(--ease-standard),
			text-decoration-color var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	@media (hover: hover) {
		.app-header__link:hover {
			color: var(--color-text-primary);
			background: color-mix(in oklab, var(--glass-surface) 78%, white);
			text-decoration-color: color-mix(in oklab, var(--color-text-primary) 56%, transparent);
		}
	}

	.app-header__link:active {
		transform: scale(0.98);
	}

	.app-header__link--active {
		color: var(--color-text-primary);
		background: color-mix(in oklab, var(--glass-surface-strong) 72%, white);
		text-decoration-color: var(--color-text-primary);
	}

	:global(.app-header__cta) {
		justify-self: end;
	}

	.app-header__menu-toggle {
		display: none;
		position: relative;
		--menu-line-offset: 0.4rem;
		align-items: center;
		justify-content: center;
		width: 2.8rem;
		height: 2.8rem;
		margin-left: auto;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		background: color-mix(in oklab, var(--glass-surface-strong) 74%, white);
		box-shadow: var(--glass-shadow-sm);
		backdrop-filter: var(--glass-blur-sm);
		-webkit-backdrop-filter: var(--glass-blur-sm);
		color: var(--color-text-primary);
		transition:
			background-color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.app-header__menu-line {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 1.25rem;
		height: 2px;
		border-radius: var(--radius-pill);
		background: currentColor;
		transform-origin: center;
		transition:
			transform var(--duration-base) var(--ease-emphasis),
			opacity var(--duration-fast) var(--ease-standard);
	}

	.app-header__menu-line:nth-child(1) {
		transform: translate(-50%, calc(-50% - var(--menu-line-offset)));
	}

	.app-header__menu-line:nth-child(2) {
		transform: translate(-50%, -50%);
	}

	.app-header__menu-line:nth-child(3) {
		transform: translate(-50%, calc(-50% + var(--menu-line-offset)));
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(1) {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(2) {
		opacity: 0;
		transform: translate(-50%, -50%) scaleX(0.7);
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(3) {
		transform: translate(-50%, -50%) rotate(-45deg);
	}

	@media (hover: hover) {
		.app-header__menu-toggle:hover {
			background: color-mix(in oklab, var(--glass-surface-strong) 88%, white);
			box-shadow: var(--glass-shadow-md);
		}
	}

	.app-header__menu-toggle:active {
		transform: scale(0.98);
	}

	.app-header__mobile-panel {
		display: none;
		padding-inline: var(--container-gutter);
		max-height: 0;
		overflow: hidden;
		visibility: hidden;
		pointer-events: none;
		opacity: 0;
		transform: translateY(-0.5rem);
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--glass-surface-strong) 92%, white),
			color-mix(in oklab, var(--glass-surface) 86%, var(--color-bg-subtle))
		);
		backdrop-filter: var(--glass-blur-md);
		-webkit-backdrop-filter: var(--glass-blur-md);
		transition:
			max-height 260ms var(--ease-emphasis),
			opacity var(--duration-base) var(--ease-standard),
			transform var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard);
		border-top: 1px solid transparent;
	}

	.app-header__mobile-panel--open {
		max-height: 70vh;
		visibility: visible;
		pointer-events: auto;
		opacity: 1;
		transform: translateY(0);
		border-top-color: color-mix(in oklab, var(--glass-border) 90%, transparent);
	}

	.app-header__mobile-list {
		margin: 0;
		padding: var(--space-3) 0 var(--space-2);
		list-style: none;
		display: grid;
		gap: var(--space-1);
	}

	.app-header__mobile-link {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 2.9rem;
		padding-inline: var(--space-2);
		border-radius: var(--radius-sm);
		text-decoration-line: underline;
		text-decoration-thickness: 0.08em;
		text-decoration-color: transparent;
		text-underline-offset: 0.25em;
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text-primary);
		transition:
			text-decoration-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.app-header__mobile-link--active {
		text-decoration-color: var(--color-text-primary);
	}

	@media (hover: hover) {
		.app-header__mobile-link:hover {
			background: color-mix(in oklab, var(--glass-surface) 82%, white);
			text-decoration-color: color-mix(in oklab, var(--color-text-primary) 56%, transparent);
		}
	}

	.app-header__mobile-link:active {
		transform: scale(0.99);
	}

	.app-header__brand:focus-visible,
	.app-header__link:focus-visible,
	.app-header__mobile-link:focus-visible,
	.app-header__menu-toggle:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 2px;
		box-shadow: 0 0 0 4px var(--focus-ring-shadow);
	}

	:global(.app-header__mobile-cta) {
		margin: var(--space-2) 0 var(--space-4);
	}

	@media (max-width: 460px) {
		.app-header__logo {
			width: 7.2rem;
		}
	}

	@media (max-width: 960px) {
		.app-header__inner {
			grid-template-columns: auto auto;
			min-height: calc(var(--header-height) - 0.2rem);
			padding-block: var(--space-2);
		}

		.app-header__desktop-nav {
			display: none;
		}

		:global(.app-header__inner .app-header__cta) {
			display: none !important;
		}

		.app-header__menu-toggle,
		.app-header__mobile-panel {
			display: flex;
		}

		.app-header__mobile-panel {
			flex-direction: column;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.app-header,
		.app-header__link,
		.app-header__menu-toggle,
		.app-header__menu-line,
		.app-header__mobile-link,
		.app-header__mobile-panel {
			transition: none;
		}
	}
</style>
