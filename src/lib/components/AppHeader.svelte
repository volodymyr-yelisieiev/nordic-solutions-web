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

	const currentPathname = $derived(page.url.pathname);
	const primaryItem = $derived(navigation.find((item) => item.isPrimary) ?? null);

	const sectionIdFromHref = (href: NavigationItem['href']): HomeSectionId =>
		href.slice(1) as HomeSectionId;
	const sectionIds = $derived(navigation.map((item) => sectionIdFromHref(item.href)));

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

		if (window.scrollY < 8) {
			activeSectionId = 'hero';
		}
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

	const handleSectionNavigation = (item: NavigationItem) => {
		isMobileMenuOpen = false;

		if (!browser || currentPathname !== '/' || item.target !== 'home-section') {
			return;
		}

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

		let observer: IntersectionObserver | null = null;
		let cancelled = false;

		const mountObserver = async () => {
			if (currentPathname !== '/') {
				return;
			}

			await tick();

			if (cancelled) {
				return;
			}

			const sections = sectionIds
				.map((id) => document.getElementById(id))
				.filter((section): section is HTMLElement => section !== null);

			if (sections.length === 0) {
				return;
			}

			observer = new IntersectionObserver(
				(entries) => {
					const visible = entries
						.filter((entry) => entry.isIntersecting)
						.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

					if (!visible) {
						return;
					}

					const sectionId = visible.target.id as HomeSectionId;

					if (sectionIds.includes(sectionId)) {
						activeSectionId = sectionId;
					}
				},
				{
					rootMargin: '-45% 0px -45% 0px',
					threshold: [0.2, 0.45, 0.7]
				}
			);

			sections.forEach((section) => observer?.observe(section));
			syncActiveFromHash();
		};

		void mountObserver();

		return () => {
			cancelled = true;
			observer?.disconnect();
		};
	});

	onMount(() => {
		if (!browser) {
			return;
		}

		const onScroll = () => {
			isHeaderElevated = window.scrollY > 6;
		};

		const onResize = () => {
			if (window.innerWidth >= 960) {
				isMobileMenuOpen = false;
			}
		};

		const onHashChange = () => {
			syncActiveFromHash();
		};

		const onEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isMobileMenuOpen = false;
			}
		};

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
			<svg class="app-header__mark" viewBox="0 0 28 28" aria-hidden="true">
				<path d="M14 2L24 14L14 26L4 14Z" fill="none" stroke="currentColor" stroke-width="1.7" />
				<path d="M14 8L20 14L14 20L8 14Z" fill="currentColor" />
			</svg>
			<span>NORDIC SOLUTIONS</span>
		</a>

		<nav class="app-header__desktop-nav" aria-label="Primary navigation">
			<ul class="app-header__list">
				{#each navigation as item (item.key)}
					<li>
						{#if currentPathname === '/'}
							<button
								type="button"
								class:app-header__link--active={isItemActive(item)}
								class="app-header__link app-header__link-button"
								onclick={() => handleSectionNavigation(item)}
								aria-current={isItemActive(item) ? 'page' : undefined}
							>
								{item.title}
							</button>
						{:else}
							<a
								class:app-header__link--active={isItemActive(item)}
								class="app-header__link"
								href={resolve(item.routePath)}
								onclick={() => (isMobileMenuOpen = false)}
								aria-current={isItemActive(item) ? 'page' : undefined}
							>
								{item.title}
							</a>
						{/if}
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

	<div class:app-header__mobile-panel--open={isMobileMenuOpen} class="app-header__mobile-panel">
		<nav aria-label="Mobile navigation">
			<ul class="app-header__mobile-list" id="app-mobile-navigation">
				{#each navigation as item (item.key)}
					<li>
						{#if currentPathname === '/'}
							<button
								type="button"
								class:app-header__mobile-link--active={isItemActive(item)}
								class="app-header__mobile-link app-header__mobile-link-button"
								onclick={() => handleSectionNavigation(item)}
								aria-current={isItemActive(item) ? 'page' : undefined}
							>
								{item.title}
							</button>
						{:else}
							<a
								class:app-header__mobile-link--active={isItemActive(item)}
								class="app-header__mobile-link"
								href={resolve(item.routePath)}
								onclick={() => (isMobileMenuOpen = false)}
								aria-current={isItemActive(item) ? 'page' : undefined}
							>
								{item.title}
							</a>
						{/if}
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
		border-bottom: 1px solid var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-canvas) 92%, white);
		backdrop-filter: blur(12px);
		transition: box-shadow var(--duration-base) var(--ease-standard);
	}

	.app-header--elevated {
		box-shadow: 0 16px 28px -28px rgb(12 36 30 / 0.38);
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
		gap: var(--space-2);
		text-decoration: none;
		color: var(--color-text-primary);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		white-space: nowrap;
		border-radius: var(--radius-sm);
		transition: color var(--duration-base) var(--ease-standard);
	}

	.app-header__mark {
		width: 1.45rem;
		height: 1.45rem;
		color: var(--color-accent);
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
		min-height: 2.5rem;
		padding-inline: var(--space-2);
		border-radius: var(--radius-pill);
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text-muted);
		transition:
			color var(--duration-base) var(--ease-standard),
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.app-header__link-button {
		border: 0;
		background: transparent;
		font: inherit;
		cursor: pointer;
	}

	@media (hover: hover) {
		.app-header__link:hover {
			color: var(--color-text-primary);
			background: color-mix(in oklab, var(--color-bg-subtle) 80%, white);
		}
	}

	.app-header__link:active {
		transform: scale(0.98);
	}

	.app-header__link--active {
		color: var(--color-text-primary);
		background: color-mix(in oklab, var(--color-accent-soft) 74%, var(--color-bg-elevated));
	}

	:global(.app-header__cta) {
		justify-self: end;
	}

	.app-header__menu-toggle {
		display: none;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 0.28rem;
		width: 2.8rem;
		height: 2.8rem;
		margin-left: auto;
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-md);
		background: color-mix(in oklab, var(--color-bg-elevated) 88%, white);
		color: var(--color-text-primary);
		transition:
			background-color var(--duration-base) var(--ease-standard),
			border-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.app-header__menu-line {
		width: 1.25rem;
		height: 2px;
		border-radius: var(--radius-pill);
		background: currentColor;
		transform-origin: center;
		transition:
			transform var(--duration-base) var(--ease-emphasis),
			opacity var(--duration-fast) var(--ease-standard);
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(1) {
		transform: translateY(0.37rem) rotate(45deg);
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(2) {
		opacity: 0;
	}

	.app-header__menu-toggle[aria-expanded='true'] .app-header__menu-line:nth-child(3) {
		transform: translateY(-0.37rem) rotate(-45deg);
	}

	@media (hover: hover) {
		.app-header__menu-toggle:hover {
			background: color-mix(in oklab, var(--color-bg-subtle) 74%, white);
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
		transition:
			max-height 260ms var(--ease-emphasis),
			border-color var(--duration-base) var(--ease-standard);
		border-top: 1px solid transparent;
	}

	.app-header__mobile-panel--open {
		max-height: 70vh;
		border-top-color: var(--color-border-soft);
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
		text-decoration: none;
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text-primary);
		transition:
			background-color var(--duration-base) var(--ease-standard),
			transform var(--duration-fast) var(--ease-emphasis);
	}

	.app-header__mobile-link-button {
		border: 0;
		background: transparent;
		font: inherit;
		cursor: pointer;
		text-align: left;
	}

	.app-header__mobile-link--active {
		background: color-mix(in oklab, var(--color-accent-soft) 68%, var(--color-bg-elevated));
	}

	@media (hover: hover) {
		.app-header__mobile-link:hover {
			background: color-mix(in oklab, var(--color-bg-subtle) 78%, white);
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
		.app-header__brand {
			font-size: 0.69rem;
			letter-spacing: 0.1em;
		}

		.app-header__mark {
			width: 1.32rem;
			height: 1.32rem;
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
