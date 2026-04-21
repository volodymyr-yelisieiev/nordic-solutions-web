<script lang="ts">
	import { browser } from '$app/environment';
	import { replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui';
	import { legacyAssetPaths } from '$lib/modules/home/content';
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

		return header.offsetHeight + 20;
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
			isHeaderElevated = window.scrollY > 12;
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
	<div class="shell-container">
		<div class="app-header__pill">
			<a class="app-header__brand" href={resolve('/')} aria-label="Nordic Solutions home">
				<img class="app-header__logo" src={legacyAssetPaths.logo} alt="Nordic Solutions" />
				<span class="app-header__brand-copy">Strategic defense partnerships</span>
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

			<div class="app-header__actions">
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
		</div>
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
				Contact Nordic
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
				Contact Nordic
			</Button>
		{/if}
	</div>
</header>

<style>
	.app-header {
		position: sticky;
		top: 0;
		z-index: 40;
		padding-top: 1rem;
	}

	.app-header__pill {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: clamp(0.75rem, 2vw, 1.5rem);
		min-height: var(--header-height);
		padding: 0.8rem 1rem 0.8rem 1.15rem;
		border-radius: var(--radius-pill);
		border: 1px solid rgb(255 255 255 / 0.78);
		background: rgb(255 255 255 / 0.74);
		box-shadow: 0 18px 38px -28px rgb(20 20 19 / 0.3);
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		transition:
			transform var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard);
	}

	.app-header--elevated .app-header__pill {
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
		background: rgb(255 255 255 / 0.82);
	}

	.app-header__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		min-width: 0;
		text-decoration: none;
		color: inherit;
	}

	.app-header__logo {
		width: clamp(8rem, 11vw, 9.8rem);
		height: auto;
	}

	.app-header__brand-copy {
		max-width: 10rem;
		font-size: 0.82rem;
		line-height: 1.1;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.app-header__desktop-nav {
		justify-self: center;
	}

	.app-header__list {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(0.4rem, 1vw, 0.8rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.app-header__link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.35rem;
		padding: 0.3rem 0.95rem;
		border-radius: var(--radius-pill);
		text-decoration: none;
		color: var(--color-text-muted);
		font-size: 0.96rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		transition:
			background-color var(--duration-base) var(--ease-standard),
			color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.app-header__link--active {
		background: color-mix(in srgb, var(--color-bg-subtle) 72%, white);
		color: var(--color-text-primary);
	}

	@media (hover: hover) {
		.app-header__link:hover {
			background: rgb(255 255 255 / 0.72);
			color: var(--color-text-primary);
			transform: translateY(-1px);
		}
	}

	.app-header__actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
		justify-self: end;
		margin-left: auto;
	}

	.app-header__menu-toggle {
		display: none;
		position: relative;
		width: 3rem;
		height: 3rem;
		border: none;
		border-radius: 50%;
		background: rgb(255 255 255 / 0.02);
		color: var(--color-text-primary);
		box-shadow: none;
		transition:
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.app-header__menu-line {
		position: absolute;
		left: 50%;
		width: 1rem;
		height: 2px;
		border-radius: 999px;
		background: currentColor;
		transform: translateX(-50%);
		transition:
			transform var(--duration-base) var(--ease-emphasis),
			opacity var(--duration-base) var(--ease-standard);
	}

	.app-header__menu-line:nth-child(1) {
		top: 1rem;
	}

	.app-header__menu-line:nth-child(2) {
		top: 1.45rem;
	}

	.app-header__menu-line:nth-child(3) {
		top: 1.9rem;
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(1) {
		transform: translateX(-50%) translateY(0.45rem) rotate(45deg);
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(2) {
		opacity: 0;
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(3) {
		transform: translateX(-50%) translateY(-0.45rem) rotate(-45deg);
	}

	.app-header__mobile-panel {
		display: none;
	}

	@media (hover: hover) {
		.app-header__menu-toggle:hover {
			background: rgb(20 20 19 / 0.05);
			transform: translateY(-1px);
		}
	}

	@media (max-width: 1080px) {
		.app-header__brand-copy {
			display: none;
		}
	}

	@media (max-width: 960px) {
		.app-header__pill {
			grid-template-columns: auto 1fr auto;
			padding-right: 0.7rem;
		}

		.app-header__desktop-nav,
		:global(.app-header__cta) {
			display: none;
		}

		.app-header__menu-toggle {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		.app-header__mobile-panel {
			display: none;
			gap: 1.5rem;
			margin: 0.9rem var(--container-gutter) 0;
			padding: 1.5rem;
			border-radius: 2rem;
			background: rgb(255 255 255 / 0.88);
			box-shadow: var(--shadow-md);
		}

		.app-header__mobile-panel--open {
			display: grid;
		}

		.app-header__mobile-list {
			display: grid;
			gap: 0.4rem;
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.app-header__mobile-link {
			display: block;
			padding: 0.95rem 1rem;
			border-radius: 1.3rem;
			text-decoration: none;
			color: var(--color-text-primary);
			background: rgb(243 240 238 / 0.9);
		}

		.app-header__mobile-link--active {
			background: color-mix(in srgb, var(--color-accent-soft) 14%, white);
		}
	}

	@media (max-width: 600px) {
		.app-header {
			padding-top: 0.8rem;
		}

		.app-header__pill {
			padding-left: 0.9rem;
		}

		.app-header__logo {
			width: 7.3rem;
		}
	}
</style>
