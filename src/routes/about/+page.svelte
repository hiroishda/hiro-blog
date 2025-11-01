<script lang="ts">
	import { onMount } from 'svelte';
	
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
</script>

<svelte:head>
	<title>About - Hiro's Blog</title>
	<meta name="description" content="Learn more about Hiro, his background in AI and technology, and why he writes about the intersection of human creativity and machine intelligence." />
</svelte:head>

<div class="pt-16 pb-20 px-4 sm:px-6 lg:px-8" bind:this={contentElement}>
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-medium text-charcoal mb-6">About Me</h1>
			<p class="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
				Hi, I'm Hiro. I build things with AI and write about what I learn along the way.
			</p>
		</div>
		
		<div class="prose-custom space-y-8 text-lg">
			<div class="bg-white/60 rounded-2xl p-8">
				<h2 class="text-2xl font-medium text-charcoal mb-6">What I Do</h2>
				<p class="mb-6">
					I'm a technologist fascinated by the intersection of human creativity and artificial intelligence. 
					For the past few years, I've been building AI-powered products and helping companies navigate 
					the rapidly evolving landscape of machine learning and large language models.
				</p>
				<p class="mb-6">
					My work spans from early-stage startups to established tech companies, where I've had the 
					privilege of building everything from experimental AI research tools to production systems 
					serving millions of users.
				</p>
			</div>
			
			<div class="bg-white/60 rounded-2xl p-8">
				<h2 class="text-2xl font-medium text-charcoal mb-6">Why I Write</h2>
				<p class="mb-6">
					The field of AI is moving incredibly fast, and it can be challenging to separate the signal 
					from the noise. I write to share practical insights from actually building and shipping AI 
					products, not just theorizing about them.
				</p>
				<p class="mb-6">
					My goal is to bridge the gap between cutting-edge AI research and real-world applications. 
					I believe the most interesting developments happen when we move beyond the hype and focus 
					on how these technologies can genuinely improve human life.
				</p>
			</div>
			
			<div class="bg-white/60 rounded-2xl p-8">
				<h2 class="text-2xl font-medium text-charcoal mb-6">My Perspective</h2>
				<p class="mb-6">
					I'm fundamentally optimistic about AI's potential while being realistic about its current 
					limitations. I believe the future belongs to thoughtful human-AI collaboration, not 
					replacement scenarios.
				</p>
				<p class="mb-6">
					My writing focuses on practical insights: what works, what doesn't, and what we can learn 
					from both successes and failures. I try to stay grounded in actual experience rather than 
					speculation about what might happen.
				</p>
			</div>
			
			<div class="bg-white/60 rounded-2xl p-8">
				<h2 class="text-2xl font-medium text-charcoal mb-6">Let's Connect</h2>
				<p class="mb-6">
					I love connecting with fellow builders, researchers, and anyone curious about AI and technology. 
					Whether you're working on something interesting, have questions about AI product development, 
					or just want to chat about the future, I'd love to hear from you.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 mt-8">
					<a href="mailto:hello@hiroblog.com" class="btn-primary">
						Send me an email
					</a>
					<a href="/blog" class="btn-secondary">
						Read my writing
					</a>
				</div>
			</div>
		</div>
		
		<!-- Call to Action -->
		<div class="mt-16 text-center bg-white/40 rounded-2xl p-8">
			<h2 class="text-2xl font-medium text-charcoal mb-4">Want to stay updated?</h2>
			<p class="text-warm-gray mb-6 max-w-2xl mx-auto">
				I write about AI, technology, and building products that matter. 
				No spam, just thoughtful content when I have something worth sharing.
			</p>
			<a href="/blog" class="btn-primary">
				Start reading
			</a>
		</div>
	</div>
</div>