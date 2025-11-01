<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { post, PostComponent } = data;
</script>

{#if post && PostComponent}
	<svelte:component this={PostComponent} {post} />
{:else}
	<div class="pt-20 pb-24 px-6 sm:px-8 lg:px-12">
		<div class="max-w-4xl mx-auto text-center">
			<h1 class="text-5xl text-charcoal mb-6">Post Not Found</h1>
			<p class="text-xl text-warm-gray mb-8">Sorry, this blog post doesn't exist.</p>
			<a href="/blog" class="btn-primary">Back to Blog</a>
		</div>
	</div>
{/if}
