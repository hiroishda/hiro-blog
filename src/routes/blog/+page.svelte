<script lang="ts">
	import { posts } from '$lib/data/posts';

	const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<svelte:head>
	<title>Blog - Hiro's Blog</title>
	<meta name="description" content="Read Hiro's latest thoughts on AI, technology, and the future of human-computer collaboration." />
</svelte:head>

<div class="pt-20 pb-24 px-6 sm:px-8 lg:px-12">
	<div class="max-w-4xl mx-auto">
		<div class="mb-16">
			<h1 class="text-4xl text-charcoal mb-4 font-normal">Writing</h1>
			<p class="text-base text-warm-gray font-normal leading-relaxed">
				Thoughts on AI, technology, and building products that matter.
			</p>
		</div>

		<div class="space-y-10">
			{#each sortedPosts as post}
				<article class="group border-b border-charcoal/10 pb-10 last:border-b-0">
					<a href="/blog/{post.slug}" class="block">
						<div class="flex items-baseline justify-between mb-2">
							<time class="text-sm text-warm-gray font-normal">
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
							<span class="text-sm text-warm-gray">{post.readTime}</span>
						</div>

						<h2 class="text-2xl md:text-3xl text-charcoal mb-3 leading-tight font-normal group-hover:text-charcoal/70 transition-colors duration-150">
							{post.title}
						</h2>

						<p class="text-warm-gray leading-relaxed mb-4 font-normal">
							{post.excerpt}
						</p>

						<div class="flex flex-wrap gap-3">
							{#each post.tags as tag}
								<span class="text-xs text-charcoal/50 font-normal">
									{tag}
								</span>
							{/each}
						</div>
					</a>
				</article>
			{/each}
		</div>

		<div class="mt-20 text-center">
			<p class="text-warm-gray font-normal">
				More posts coming soon. Stay tuned!
			</p>
		</div>
	</div>
</div>
