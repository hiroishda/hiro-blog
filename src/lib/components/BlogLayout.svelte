<script lang="ts">
	import { onMount } from 'svelte';
	
	// Props that will be passed from the frontmatter
	export let title: string = '';
	export let date: string = '';
	export let readTime: string = '';
	export let tags: string[] = [];
	export let excerpt: string = '';
	
	let contentElement: HTMLElement;
	
	onMount(() => {
		// Simple fade-in animation
		if (contentElement) {
			contentElement.style.opacity = '0';
			contentElement.style.transform = 'translateY(20px)';
			
			requestAnimationFrame(() => {
				contentElement.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
				contentElement.style.opacity = '1';
				contentElement.style.transform = 'translateY(0)';
			});
		}
	});
	
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}
</script>

<svelte:head>
	<title>{title} - Hiro's Blog</title>
	<meta name="description" content={excerpt} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={excerpt} />
</svelte:head>

<article class="pt-16 pb-20 px-4 sm:px-6 lg:px-8" bind:this={contentElement}>
	<div class="max-w-4xl mx-auto">
		<!-- Back to blog link -->
		<div class="mb-8">
			<a 
				href="/blog" 
				class="inline-flex items-center text-warm-gray hover:text-charcoal transition-colors group"
			>
				<svg class="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
				Back to Blog
			</a>
		</div>
		
		<!-- Article Header -->
		<header class="mb-12">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal mb-6 leading-tight">
				{title}
			</h1>
			
			<!-- Meta information -->
			<div class="flex flex-wrap items-center gap-4 text-warm-gray mb-8">
				<time class="text-sm font-medium">
					{formatDate(date)}
				</time>
				{#if readTime}
					<span>•</span>
					<span class="text-sm">{readTime}</span>
				{/if}
			</div>
			
			<!-- Tags -->
			{#if tags && tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-8">
					{#each tags as tag}
						<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-charcoal/5 text-charcoal">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</header>
		
		<!-- Article Content -->
		<div class="prose prose-lg max-w-none">
			<div class="prose-custom">
				<slot />
			</div>
		</div>
		
		<!-- Footer -->
		<footer class="mt-16 pt-8 border-t border-warm-gray/20">
			<div class="bg-white/60 rounded-2xl p-8">
				<h3 class="text-xl font-medium text-charcoal mb-4">Thanks for reading!</h3>
				<p class="text-warm-gray mb-6">
					I hope you found this post helpful. If you have thoughts, questions, or just want to chat about AI and technology, 
					I'd love to hear from you.
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
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