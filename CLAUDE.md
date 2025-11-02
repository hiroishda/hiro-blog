# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog built with SvelteKit, designed for Cloudflare Pages deployment. The blog features an Apple-inspired minimalist design with warm beige tones and includes an "Advanced Mode" toggle that reveals technical content like code snippets and implementation details.

## Essential Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:5173

# Build and deploy
npm run build           # Build for production using Cloudflare adapter
npm run preview         # Preview production build locally

# Type checking
npm run check           # Run svelte-check for type validation
```

## Architecture

### Blog Post System

Blog posts are **Svelte components**, not markdown files. To add a new post:

1. Add metadata to `src/lib/data/posts.ts` (BlogPost interface with title, excerpt, date, slug, readTime, tags)
2. Create component in `src/lib/blog-posts/YourPost.svelte` using `BlogPostLayout`
3. Add dynamic import case to `src/routes/blog/[slug]/+page.ts` switch statement

The routing uses SvelteKit's file-based routing with `[slug]` dynamic routes and prerendering enabled.

### Advanced Mode Feature

The site has a global "Advanced Mode" toggle (store: `src/lib/stores/advancedMode.ts`) that controls visibility of technical content:

- **`<CodeSnippet>`** - Shows collapsible, syntax-highlighted code blocks (using highlight.js) when advanced mode is ON, shows placeholder when OFF
- **`<AdvancedSection>`** - Shows full technical content when ON, shows summary when OFF

Both components import and check `$advancedMode` store to conditionally render.

### Component Structure

- **`BlogPostLayout.svelte`** - Wrapper for all blog posts, handles metadata display and layout
- **`Nav.svelte`** - Navigation with Advanced Mode toggle
- **`CodeSnippet.svelte`** - Collapsible code blocks with highlight.js syntax highlighting
- **`AdvancedSection.svelte`** - Conditional technical content sections

### Deployment Target

Uses `@sveltejs/adapter-cloudflare` for Cloudflare Pages. The build outputs a static site with SvelteKit's SSG prerendering (`export const prerender = true` in page load functions).

## Design System

- Colors: Custom CSS variables (`--color-beige`, `--color-charcoal`, `--color-warm-gray`, `--color-accent`)
- Typography: SF Pro Display fallback to system fonts
- Styling: Tailwind CSS v4 with custom theme extending the palette

## Key Conventions

- All routes use SvelteKit's `+page.svelte` convention
- Load functions in `+page.ts` files use `export const prerender = true`
- Blog post components receive `{ post }` prop from parent layout
- Code highlighting supports: javascript, typescript, json, css, bash, python
