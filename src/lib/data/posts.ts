export interface BlogPost {
	title: string;
	date: string;
	readTime: string;
	tags: string[];
	excerpt: string;
	slug: string;
}

export const posts: BlogPost[] = [
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
