# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working guidelines

- **Commits:** never add Co-Authored-By or any Claude/AI attribution trailers to commit messages.
- **Tests:** every behavior change must come with a test. Extend `ssr-test.cjs` (run with `npm run test:ssr`) or add a proper test file — don't land component changes untested.
- **Comments:** keep comments sparse and only where the code can't speak for itself; no narrating what a line does, no "here we..." explainer comments.
- **Secrets:** never commit or leave credentials, tokens, or other sensitive values in the repo — including scratch/test files.

## What this is

`svelte-skeleton-loader` — a Svelte 3 component library providing animated loading-skeleton placeholders, ported from react-loading-skeleton. Two components are exported from `src/index.js`: `Skeleton` (default export) and `SkeletonTheme` (named export).

## Commands

- `npm run build` — Rollup build of `src/index.js` to `dist/index.mjs` (ESM) and `dist/index.js` (UMD). Runs automatically on publish via `prepublishOnly`.
- `npm run dev` — same build in watch mode.
- `npm test` — Jest suite in `test/` (jsdom, DOM-level assertions on rendered markup and emotion-injected CSS). Svelte files are compiled by the local transformer `test/svelte-transformer.cjs` — the pinned svelte-jester 2.0.1 only supports Jest's ESM async transform, so don't switch back to it.
- `npm run test:ssr` — SSR smoke test (`ssr-test.cjs`) that compiles the raw `.svelte` sources via `svelte/register` and asserts they render.
- `npm run storybook` — Storybook 6 on port 6006. Stories are Svelte CSF files under `src/stories/` (via `@storybook/addon-svelte-csf`).

## Architecture

**Dual distribution.** The package.json `exports` map has a `"svelte"` condition pointing at the raw source (`./src/index.js`), so Svelte-aware bundlers (SvelteKit, vite-plugin-svelte) compile `src/` directly — changes to `src/` reach those consumers without a build step. Non-Svelte consumers get the precompiled `dist/` bundles, which must be regenerated with `npm run build`. Both `src` and `dist` are published (`files` field). Because the raw source is what SvelteKit consumes, components must stay SSR-safe — that is what `test:ssr` verifies; run it after changing any component.

**Runtime CSS-in-JS, not Svelte scoped styles.** Both components generate their styles at runtime with `@emotion/css` (`createEmotion({ key: "some-key" })`) — the only runtime dependency. The shimmer animation in `Skeleton.svelte` is an emotion `keyframes` + `css` class applied alongside the static class `svelte-loader-skeleton`. `SkeletonTheme` works by rendering a wrapper `<div>` with an emotion class whose rules re-color descendant `.svelte-loader-skeleton` elements through the CSS cascade — its descendant selector must stay in sync with the class name `Skeleton.svelte` renders.

**Non-reactive props.** `Skeleton.svelte` builds its `elements` array in a plain `for` loop at component init, not in a `$:` reactive block — prop changes after mount (e.g. `count`, `width`) do not update the rendered output. Keep this in mind when modifying the component or debugging "prop doesn't update" reports.

**Svelte 3.** The codebase uses Svelte 3 idioms (`export let` props, `svelte:component`, slots). Don't introduce Svelte 4/5 syntax (runes, snippets) without upgrading the toolchain (rollup-plugin-svelte 6, Storybook 6 are pinned to this era).
