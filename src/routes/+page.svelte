<script lang="ts">
	import { onMount } from "svelte";
	import { posts } from "$lib/data/posts";
	import ThreeBackground from "$lib/components/ThreeBackground.svelte";

	let heroElement: HTMLElement;
	let currentAnimationPhase = 0;
	const recentPosts = posts.slice(0, 3);

	// Location mapping for each animation phase
	const animationTexts = [
		"SP, Brazil", // Placeholder for phase 0
		".", // Placeholder for phase 1
		"Building Together"  // Placeholder for phase 2
	];

	$: currentAnimationText = animationTexts[currentAnimationPhase];

	onMount(() => {
		if (heroElement) {
			const elements = heroElement.querySelectorAll(".animate-letters");

			elements.forEach((element) => {
				const text = element.textContent || "";
				const chars = text.split("");

				// Create array of indices and shuffle them randomly
				const indices = chars.map((_, i) => i);
				for (let i = indices.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[indices[i], indices[j]] = [indices[j], indices[i]];
				}

				// Replace text with spans
				element.innerHTML = chars
					.map((char, i) => {
						if (char === " ")
							return '<span class="inline-block">&nbsp;</span>';
						return `<span class="inline-block opacity-0" style="animation-delay: ${indices.indexOf(i) * 10}ms">${char}</span>`;
					})
					.join("");

				// Trigger animation
				setTimeout(() => {
					element.querySelectorAll("span").forEach((span) => {
						span.classList.add("animate-appear");
					});
				}, 100);
			});
		}
	});
</script>

<svelte:head>
	<title>Hiro's Blog - AI, Technology, and Human Experience</title>
	<meta
		name="description"
		content="Welcome to Hiro's blog where I share insights and experiences from working with AI and technology."
	/>
</svelte:head>

<!-- Hero Section -->
<section
	class="pt-24 pb-20 px-6 sm:px-8 lg:px-12 relative backdrop-blur-xl border-b border-charcoal/10"
	bind:this={heroElement}
>
	<!-- 3D Background -->
	<ThreeBackground bind:animationPhase={currentAnimationPhase} />

	<div class="max-w-5xl mx-auto text-center relative z-10">
			<h1
				class="title text-6xl md:text-7xl lg:text-8xl text-charcoal tracking-tight animate-letters"
			>
				Hiro Ishida
			</h1>
			<p class="text-sm font-normal mb-8 text-left max-w-fit mx-auto text-beige">
				{currentAnimationText}
			</p>
			<p
				class="text-xl md:text-2xl text-warm-gray max-w-3xl mx-auto leading-relaxed font-normal animate-letters"
			>
				I write about everything that I find interesting.
			</p>
		<div
			class="flex flex-col sm:flex-row gap-5 justify-center items-center"
		>
				<a href="/blog" class="btn-primary"> Read the Blog </a>
				<a href="/about" class="btn-secondary"> About Me </a>
		</div>
	</div>
</section>

<!-- Recent Posts Section -->
<section class="py-20 px-6 sm:px-8 lg:px-12">
	<div class="max-w-4xl mx-auto">
		<div class="mb-16">
			<h2 class="text-3xl text-charcoal mb-3 font-normal">
				Recent Writing
			</h2>
			<p class="text-base text-warm-gray font-normal">
				Latest thoughts and insights from my work with AI and technology
			</p>
		</div>

		<div class="space-y-8">
			{#each recentPosts as post}
				<article
					class="group border-b border-charcoal/10 pb-8 last:border-b-0"
				>
					<a href="/blog/{post.slug}" class="block">
						<div class="flex items-baseline justify-between mb-2">
							<time class="text-sm text-warm-gray font-normal"
								>{new Date(post.date).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "short",
										day: "numeric",
									},
								)}</time
							>
							<span class="text-sm text-warm-gray"
								>{post.readTime}</span
							>
						</div>

						<h3
							class="text-2xl text-charcoal mb-3 leading-tight font-normal group-hover:text-charcoal/70 transition-colors duration-150"
						>
							{post.title}
						</h3>

						<p
							class="text-warm-gray leading-relaxed mb-3 font-normal text-base"
						>
							{post.excerpt}
						</p>

						<div class="flex flex-wrap gap-3">
							{#each post.tags as tag}
								<span
									class="text-xs text-charcoal/50 font-normal"
								>
									{tag}
								</span>
							{/each}
						</div>
					</a>
				</article>
			{/each}
		</div>

		<div class="text-center mt-16">
			<a href="/blog" class="btn-secondary"> View All Posts </a>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section class="py-20 px-6 sm:px-8 lg:px-12 border-t border-charcoal/10">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-2xl text-charcoal mb-3 font-normal">Get in Touch</h2>
		<p class="text-base text-warm-gray mb-6 font-normal leading-relaxed">
			Interested in AI, technology, and thoughtful perspectives on the
			future? Let's connect and share ideas.
		</p>
		<div class="flex flex-wrap gap-6">
			<a href="mailto:hello@hiroblog.com" class="btn-primary">
				Send an email
			</a>
			<a href="/about" class="btn-secondary"> Learn more </a>
		</div>
	</div>
</section>

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
