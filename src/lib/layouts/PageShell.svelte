<script lang="ts">
	import { resolve } from '$app/paths';
	import type { NavigationItem } from '$lib/modules/site-navigation';

	type Props = {
		navigation: NavigationItem[];
		children: import('svelte').Snippet;
	};

	let { navigation, children }: Props = $props();
	const currentYear = new Date().getFullYear();
</script>

<div class="site-shell">
	<header class="site-header">
		<div class="shell-container shell-row">
			<a class="brand-link" href={resolve('/')} aria-label="Go to home page">Nordic Solutions</a>

			<nav aria-label="Primary navigation">
				<ul class="nav-list">
					{#each navigation as item (item.path)}
						<li>
							<a class="nav-link" href={resolve(item.path)}>{item.label}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<a class="contact-link" href={resolve('/contact')}>Contact</a>
		</div>
	</header>

	<main class="site-main">
		<div class="shell-container">{@render children()}</div>
	</main>

	<footer class="site-footer">
		<div class="shell-container footer-inner">
			<p>Nordic Solutions. Structural placeholder shell for sprint 1.</p>
			<p>© {currentYear} Nordic Solutions</p>
		</div>
	</footer>
</div>
