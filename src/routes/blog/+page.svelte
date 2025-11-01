<script lang="ts">
	// Sample blog posts data (in a real app, this would come from a CMS or markdown files)
	const allPosts = [
		{
			title: "Building AI Products: Lessons from the Trenches",
			excerpt: "After two years of building AI-powered applications, here are the key insights I've learned about what works, what doesn't, and how to think about AI product development.",
			date: "2024-10-28",
			slug: "building-ai-products-lessons",
			readTime: "8 min read",
			tags: ["AI", "Product Development", "Engineering"]
		},
		{
			title: "The Future of Human-AI Collaboration",
			excerpt: "How we work with AI is rapidly evolving. This post explores the emerging patterns of human-AI collaboration and what they mean for the future of work.",
			date: "2024-10-20",
			slug: "future-human-ai-collaboration",
			readTime: "6 min read",
			tags: ["AI", "Future of Work", "Collaboration"]
		},
		{
			title: "Why I'm Optimistic About AI",
			excerpt: "Despite the headlines and concerns, I remain fundamentally optimistic about AI's potential to improve human life. Here's why.",
			date: "2024-10-12",
			slug: "why-optimistic-about-ai",
			readTime: "5 min read",
			tags: ["AI", "Philosophy", "Optimism"]
		}
	];
	
	// Sort posts by date (newest first)
	const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<svelte:head>
	<title>Blog - Hiro's Blog</title>
	<meta name="description" content="Read Hiro's latest thoughts on AI, technology, and the future of human-computer collaboration. Practical insights from building AI products and working in tech." />
</svelte:head>

<div class="pt-20 pb-24 px-6 sm:px-8 lg:px-12">
	<div class="max-w-5xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-20">
			<h1 class="text-5xl md:text-6xl text-charcoal mb-6">Blog</h1>
			<p class="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed font-normal">
				Thoughts on AI, technology, and building products that matter.
				Written from the trenches of actually shipping things.
			</p>
		</div>

		<!-- Posts List -->
		<div class="space-y-8">
			{#each posts as post, index}
				<article class="group">
					<div class="bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 border border-charcoal/5">
						<!-- Post Meta -->
						<div class="flex items-center gap-4 mb-5 text-xs text-warm-gray uppercase tracking-wide">
							<time class="font-medium">
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
							<span>·</span>
							<span>{post.readTime}</span>
						</div>

						<!-- Title -->
						<h2 class="text-3xl md:text-4xl text-charcoal mb-5 leading-tight tracking-tight">
							<a
								href="/blog/{post.slug}"
								class="hover:text-accent transition-colors duration-300"
							>
								{post.title}
							</a>
						</h2>

						<!-- Excerpt -->
						<p class="text-warm-gray leading-relaxed mb-6 text-lg font-normal">
							{post.excerpt}
						</p>

						<!-- Tags -->
						<div class="flex flex-wrap gap-2 mb-6">
							{#each post.tags as tag}
								<span class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-charcoal/5 text-charcoal hover:bg-charcoal/10 transition-colors duration-300">
									{tag}
								</span>
							{/each}
						</div>

						<!-- Read More Link -->
						<a
							href="/blog/{post.slug}"
							class="inline-flex items-center text-accent font-medium hover:text-accent-dark transition-colors duration-300 group/link"
						>
							Read full post
							<svg class="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</a>
					</div>
				</article>
			{/each}
		</div>

		<!-- Pagination (placeholder for future) -->
		<div class="mt-20 text-center">
			<p class="text-warm-gray font-normal">
				More posts coming soon. Stay tuned!
			</p>
		</div>
	</div>
</div>