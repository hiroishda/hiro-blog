<script lang="ts">
	import { onMount } from 'svelte';

	let contentElement: HTMLElement;

	onMount(() => {
		if (contentElement) {
			const elements = contentElement.querySelectorAll('.animate-letters');

			elements.forEach((element) => {
				const text = element.textContent || '';
				const chars = text.split('');

				// Create array of indices and shuffle them randomly
				const indices = chars.map((_, i) => i);
				for (let i = indices.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[indices[i], indices[j]] = [indices[j], indices[i]];
				}

				// Replace text with spans
				element.innerHTML = chars
					.map((char, i) => {
						if (char === ' ') return '<span class="inline-block">&nbsp;</span>';
						return `<span class="inline-block opacity-0" style="animation-delay: ${indices.indexOf(i) * 30}ms">${char}</span>`;
					})
					.join('');

				// Trigger animation
				setTimeout(() => {
					element.querySelectorAll('span').forEach(span => {
						span.classList.add('animate-appear');
					});
				}, 100);
			});
		}
	});
</script>

<style>
	@keyframes appear {
		to {
			opacity: 1;
		}
	}

	:global(.animate-appear) {
		animation: appear 0.3s ease-out forwards;
	}
</style>

<svelte:head>
	<title>About - Hiro's Blog</title>
	<meta name="description" content="Learn more about Hiro, his background in AI and technology, and why he writes about the intersection of human creativity and machine intelligence." />
</svelte:head>

<div class="pt-20 pb-24 px-6 sm:px-8 lg:px-12" bind:this={contentElement}>
	<div class="max-w-4xl mx-auto">
		<div class="mb-16">
			<h1 class="text-4xl text-charcoal mb-4 font-normal animate-letters">About</h1>
			<p class="text-base text-warm-gray leading-relaxed font-normal animate-letters">
				Hi, I'm Hiro. I build things with AI and write about what I learn along the way.
			</p>
		</div>

		<div class="space-y-12">
			<section class="border-b border-charcoal/10 pb-12">
				<h2 class="text-2xl text-charcoal mb-4 font-normal">What I Do</h2>
				<p class="mb-4 text-warm-gray font-normal leading-relaxed">
					I'm a technologist fascinated by the intersection of human creativity and artificial intelligence.
					For the past few years, I've been building AI-powered products and helping companies navigate
					the rapidly evolving landscape of machine learning and large language models.
				</p>
				<p class="text-warm-gray font-normal leading-relaxed">
					My work spans from early-stage startups to established tech companies, where I've had the
					privilege of building everything from experimental AI research tools to production systems
					serving millions of users.
				</p>
			</section>

			<section class="border-b border-charcoal/10 pb-12">
				<h2 class="text-2xl text-charcoal mb-4 font-normal">Why I Write</h2>
				<p class="mb-4 text-warm-gray font-normal leading-relaxed">
					The field of AI is moving incredibly fast, and it can be challenging to separate the signal
					from the noise. I write to share practical insights from actually building and shipping AI
					products, not just theorizing about them.
				</p>
				<p class="text-warm-gray font-normal leading-relaxed">
					My goal is to bridge the gap between cutting-edge AI research and real-world applications.
					I believe the most interesting developments happen when we move beyond the hype and focus
					on how these technologies can genuinely improve human life.
				</p>
			</section>

			<section class="border-b border-charcoal/10 pb-12">
				<h2 class="text-2xl text-charcoal mb-4 font-normal">My Perspective</h2>
				<p class="mb-4 text-warm-gray font-normal leading-relaxed">
					I'm fundamentally optimistic about AI's potential while being realistic about its current
					limitations. I believe the future belongs to thoughtful human-AI collaboration, not
					replacement scenarios.
				</p>
				<p class="text-warm-gray font-normal leading-relaxed">
					My writing focuses on practical insights: what works, what doesn't, and what we can learn
					from both successes and failures. I try to stay grounded in actual experience rather than
					speculation about what might happen.
				</p>
			</section>

			<section class="pt-4">
				<h2 class="text-2xl text-charcoal mb-4 font-normal">Let's Connect</h2>
				<p class="mb-6 text-warm-gray font-normal leading-relaxed">
					I love connecting with fellow builders, researchers, and anyone curious about AI and technology.
					Whether you're working on something interesting, have questions about AI product development,
					or just want to chat about the future, I'd love to hear from you.
				</p>
				<div class="flex flex-wrap gap-6">
					<a href="mailto:hello@hiroblog.com" class="btn-primary">
						Send me an email
					</a>
					<a href="/blog" class="btn-secondary">
						Read my writing
					</a>
				</div>
			</section>
		</div>
	</div>
</div>
