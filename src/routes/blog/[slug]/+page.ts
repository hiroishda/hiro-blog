import { posts } from '$lib/data/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return posts.map(post => ({ slug: post.slug }));
};

export const load: PageLoad = async ({ params }) => {
	const post = posts.find(p => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	// Dynamically import the blog post component
	let PostComponent;
	try {
		switch (params.slug) {
			case 'building-ai-products-lessons':
				PostComponent = (await import('$lib/blog-posts/BuildingAIProducts.svelte')).default;
				break;
			case 'future-human-ai-collaboration':
				PostComponent = (await import('$lib/blog-posts/FutureHumanAI.svelte')).default;
				break;
			case 'why-optimistic-about-ai':
				PostComponent = (await import('$lib/blog-posts/WhyOptimistic.svelte')).default;
				break;
			default:
				throw error(404, 'Post not found');
		}
	} catch (e) {
		throw error(404, 'Post not found');
	}

	return {
		post,
		PostComponent
	};
};
