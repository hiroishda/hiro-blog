<script lang="ts">
	import type { BlogPost } from '../data/posts';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { advancedMode, toggleAdvancedMode } from '../stores/advancedMode';
	import { animateLetters } from '../utils/letterAnimation';

	interface Props {
		post: BlogPost;
		children: Snippet;
	}

	let { post, children }: Props = $props();
	let contentElement: HTMLElement;

	onMount(() => {
		animateLetters(contentElement);
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<style>
	@keyframes appear {
		to {
			opacity: 1;
		}
	}

	:global(.animate-appear) {
		animation: appear 0.05s forwards;
	}

	.abstract-button {
		position: relative;
		transform-origin: center;
		transition: border-radius 0.5s ease-in-out;
	}

	.abstract-button.inactive {
		border-radius: 40% 60% 70% 30% / 40% 40% 60% 60%;
	}

	.abstract-button.active {
		border-radius: 60% 40% 30% 70% / 60% 60% 40% 40%;
	}

	.abstract-button.inactive:hover {
		border-radius: 50% 40% 60% 50% / 50% 60% 40% 50%;
	}

	.abstract-button.active:hover {
		border-radius: 45% 55% 65% 35% / 55% 45% 35% 65%;
	}
</style>

<svelte:head>
	<title>{post.title} - Hiro's Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="pt-7 pb-24 px-6 sm:px-8 lg:px-12" bind:this={contentElement}>
	<div class="max-w-4xl mx-auto">
		<div class="mb-8">
			<a
				href="/blog"
				class="inline-flex items-center text-warm-gray hover:text-accent transition-colors duration-300 group"
			>
				<svg class="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
				Back to Blog
			</a>
		</div>

		<header class="mb-16">
			<h1 class="text-5xl md:text-6xl lg:text-7xl text-charcoal mb-8 leading-tight tracking-tight animate-letters">
				{post.title}
			</h1>

			<div class="flex flex-wrap items-center gap-4 text-warm-gray mb-8">
				<time class="text-xs font-medium uppercase tracking-wide">
					{formatDate(post.date)}
				</time>
				{#if post.readTime}
					<span>·</span>
					<span class="text-xs uppercase tracking-wide">{post.readTime}</span>
				{/if}
			</div>

			{#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-8">
					{#each post.tags as tag}
						<span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-charcoal/5 text-charcoal hover:bg-charcoal/10 transition-colors duration-300">
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			<!-- Advanced Mode Toggle -->
			<div class="flex items-center gap-3 p-4 bg-beige-dark/50 rounded-2xl border border-warm-gray/20">
				<button
					onclick={toggleAdvancedMode}
					class="abstract-button {$advancedMode ? 'active' : 'inactive'} relative inline-flex h-10 w-14 items-center justify-center transition-all duration-500 focus:outline-none focus:ring-offset-2 cursor-pointer {$advancedMode ? 'bg-accent hover:bg-accent/90' : 'bg-warm-gray/30 hover:bg-warm-gray/40'}"
					role="switch"
					aria-checked={$advancedMode}
				>
					<span class="sr-only">Enable advanced mode</span>
					{#if $advancedMode}
						<!-- Code SVG -->
						<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
						</svg>
					{:else}
						<!-- Document SVG -->
						<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
						</svg>
					{/if}
				</button>
				<div class="flex flex-col">
					<span class="text-sm font-medium text-charcoal">Advanced Mode</span>
					<span class="text-xs text-warm-gray">
						{$advancedMode ? 'Activated' : 'Sections hidden'}
					</span>
				</div>
				{#if $advancedMode}
					<div class="ml-auto">
						<svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
						</svg>
					</div>
				{/if}
			</div>
		</header>

		<div class="prose prose-lg max-w-none prose-custom">
			{@render children()}
		</div>

		<footer class="mt-20 pt-12 border-t border-charcoal/10">
			<div class="bg-beige-dark rounded-3xl p-10 border border-charcoal/5">
				<h3 class="text-2xl text-charcoal mb-5">Thanks for reading!</h3>
				<p class="text-warm-gray mb-8 font-normal leading-relaxed">
					I hope you found this post helpful. If you have thoughts, questions, or just want to chat about AI and technology,
					I'd love to hear from you.
				</p>
				<div class="flex flex-col sm:flex-row gap-5">
					<a href="mailto:hello@hiroblog.com" class="btn-primary">
						Get in touch
					</a>
					<a href="/blog" class="btn-secondary">
						Read more posts
					</a>
				</div>
			</div>
		</footer>
	</div>
</article>
