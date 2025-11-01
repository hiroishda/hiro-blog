<script lang="ts">
	import { onMount } from 'svelte';
	
	let heroElement: HTMLElement;
	
	// Sample recent posts (we'll make this dynamic later)
	const recentPosts = [
		{
			title: "Building AI Products: Lessons from the Trenches",
			excerpt: "After two years of building AI-powered applications, here are the key insights I've learned about what works, what doesn't, and how to think about AI product development.",
			date: "2024-10-28",
			slug: "building-ai-products-lessons",
			readTime: "8 min read"
		},
		{
			title: "The Future of Human-AI Collaboration",
			excerpt: "How we work with AI is rapidly evolving. This post explores the emerging patterns of human-AI collaboration and what they mean for the future of work.",
			date: "2024-10-20",
			slug: "future-human-ai-collaboration",
			readTime: "6 min read"
		},
		{
			title: "Why I'm Optimistic About AI",
			excerpt: "Despite the headlines and concerns, I remain fundamentally optimistic about AI's potential to improve human life. Here's why.",
			date: "2024-10-12",
			slug: "why-optimistic-about-ai",
			readTime: "5 min read"
		}
	];
	
	onMount(() => {
		// Simple fade-in animation for hero section
		if (heroElement) {
			heroElement.style.opacity = '0';
			heroElement.style.transform = 'translateY(20px)';
			
			requestAnimationFrame(() => {
				heroElement.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
				heroElement.style.opacity = '1';
				heroElement.style.transform = 'translateY(0)';
			});
		}
	});
</script>

<svelte:head>
	<title>Hiro's Blog - AI, Technology, and Human Experience</title>
	<meta name="description" content="Welcome to Hiro's blog where I share insights and experiences from working with AI and technology. Practical perspectives on building AI products and the future of human-computer collaboration." />
</svelte:head>

<!-- Hero Section -->
<section class="pt-24 pb-20 px-6 sm:px-8 lg:px-12" bind:this={heroElement}>
	<div class="max-w-5xl mx-auto text-center">
		<h1 class="text-6xl md:text-7xl lg:text-8xl text-charcoal mb-6 tracking-tight">
			Hi, I'm Hiro
		</h1>
		<p class="text-xl md:text-2xl text-warm-gray max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
			I write about AI, technology, and the fascinating intersection of human creativity and machine intelligence.
		</p>
		<div class="flex flex-col sm:flex-row gap-5 justify-center items-center">
			<a href="/blog" class="btn-primary">
				Read the Blog
			</a>
			<a href="/about" class="btn-secondary">
				About Me
			</a>
		</div>
	</div>
</section>

<!-- Recent Posts Section -->
<section class="py-20 px-6 sm:px-8 lg:px-12">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-20">
			<h2 class="text-4xl md:text-5xl text-charcoal mb-5">Recent Posts</h2>
			<p class="text-lg text-warm-gray max-w-2xl mx-auto font-normal">
				Latest thoughts and insights from my work with AI and technology
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each recentPosts as post}
				<article class="group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-charcoal/5">
					<div class="mb-5">
						<time class="text-xs text-warm-gray font-medium uppercase tracking-wide">{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}</time>
						<span class="text-warm-gray mx-2">·</span>
						<span class="text-xs text-warm-gray uppercase tracking-wide">{post.readTime}</span>
					</div>

					<h3 class="text-2xl font-semibold text-charcoal mb-4 leading-tight tracking-tight">
						<a href="/blog/{post.slug}" class="group-hover:text-accent transition-colors duration-300">
							{post.title}
						</a>
					</h3>

					<p class="text-warm-gray leading-relaxed mb-6 font-normal">
						{post.excerpt}
					</p>

					<a
						href="/blog/{post.slug}"
						class="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors duration-300 group/link"
					>
						Read more
						<svg class="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
					</a>
				</article>
			{/each}
		</div>

		<div class="text-center mt-16">
			<a href="/blog" class="btn-secondary">
				View All Posts
			</a>
		</div>
	</div>
</section>

<!-- Newsletter/Contact Section -->
<section class="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-transparent to-white/30">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-4xl md:text-5xl text-charcoal mb-6">Stay in Touch</h2>
		<p class="text-lg text-warm-gray mb-10 max-w-2xl mx-auto font-normal">
			Interested in AI, technology, and thoughtful perspectives on the future?
			Let's connect and share ideas.
		</p>
		<div class="flex flex-col sm:flex-row gap-5 justify-center items-center">
			<a href="mailto:hello@hiroblog.com" class="btn-primary">
				Get in Touch
			</a>
			<a href="/about" class="text-accent hover:text-accent-dark transition-colors duration-300 font-medium">
				Learn more about me →
			</a>
		</div>
	</div>
</section>
