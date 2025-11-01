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
<section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8" bind:this={heroElement}>
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-charcoal mb-8 tracking-tight">
			Hi, I'm <span class="font-medium">Hiro</span>
		</h1>
		<p class="text-xl md:text-2xl text-warm-gray max-w-3xl mx-auto mb-12 leading-relaxed">
			I write about AI, technology, and the fascinating intersection of human creativity and machine intelligence. 
			Welcome to my corner of the internet where I share what I'm learning.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-medium text-charcoal mb-4">Recent Posts</h2>
			<p class="text-lg text-warm-gray max-w-2xl mx-auto">
				Latest thoughts and insights from my work with AI and technology
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each recentPosts as post}
				<article class="bg-white/60 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
					<div class="mb-4">
						<time class="text-sm text-warm-gray font-medium">{new Date(post.date).toLocaleDateString('en-US', { 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric' 
						})}</time>
						<span class="text-warm-gray mx-2">•</span>
						<span class="text-sm text-warm-gray">{post.readTime}</span>
					</div>
					
					<h3 class="text-xl font-medium text-charcoal mb-4 leading-tight">
						<a href="/blog/{post.slug}" class="hover:text-warm-gray transition-colors">
							{post.title}
						</a>
					</h3>
					
					<p class="text-warm-gray leading-relaxed mb-6">
						{post.excerpt}
					</p>
					
					<a 
						href="/blog/{post.slug}" 
						class="inline-flex items-center text-charcoal font-medium hover:text-warm-gray transition-colors group"
					>
						Read more
						<svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
					</a>
				</article>
			{/each}
		</div>
		
		<div class="text-center mt-12">
			<a href="/blog" class="btn-secondary">
				View All Posts
			</a>
		</div>
	</div>
</section>

<!-- Newsletter/Contact Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8 bg-white/40">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl md:text-4xl font-medium text-charcoal mb-6">Stay in Touch</h2>
		<p class="text-lg text-warm-gray mb-8 max-w-2xl mx-auto">
			Interested in AI, technology, and thoughtful perspectives on the future? 
			Let's connect and share ideas.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<a href="mailto:hello@hiroblog.com" class="btn-primary">
				Get in Touch
			</a>
			<a href="/about" class="text-charcoal hover:text-warm-gray transition-colors font-medium">
				Learn more about me →
			</a>
		</div>
	</div>
</section>
