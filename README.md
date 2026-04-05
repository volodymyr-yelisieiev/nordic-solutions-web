# Nordic Solutions Web

Sprint 1 bootstrap on SvelteKit + Bun. The repository contains a clean architectural skeleton without final UI content.

## Tech Stack

- SvelteKit 2 + Svelte 5
- TypeScript (strict)
- Bun (runtime, package manager, test runner)
- ESLint + Prettier

## Commands

```bash
bun install
bun dev
bun test
bun lint
bun format
bun run check
```

## Routing (Sprint 1)

- `/` - Home
- `/about`
- `/services`
- `/approach`
- `/why-nordic`
- `/contact`

Home reflects the target narrative sequence:
Hero -> About -> Services/Capabilities -> Approach -> Why Nordic -> Contact.

## Project Structure

```text
src/
	lib/
		components/
			RoutePlaceholder.svelte
			SectionShell.svelte
		layouts/
			PageShell.svelte
		modules/
			site-navigation.ts
			site-navigation.test.ts
		styles/
			global.css
		assets/
			favicon.svg
		index.ts
	routes/
		+layout.svelte
		+page.svelte
		about/+page.svelte
		services/+page.svelte
		approach/+page.svelte
		why-nordic/+page.svelte
		contact/+page.svelte
```

## Architecture Conventions

- `src/lib/components` - reusable UI building blocks.
- `src/lib/layouts` - page and app-level shells.
- `src/lib/modules` - domain data and non-UI logic.
- `src/lib/styles` - global styles and design tokens.
- `src/routes` - SvelteKit file-based routing.

Layer system in Sprint 1:

- Main shell: `PageShell` (header, container, footer).
- Section shell: `SectionShell` (shared content section pattern).

## Code Style

- TypeScript strict mode (`strict`, `noImplicitAny`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- Svelte compiler uses strict runes workflow (with `accessors: true` set for compatibility requirements).
- Formatting and linting are centralized through `bun lint` and `bun format`.
