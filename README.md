# Hiro's Blog

A modern, minimalist blog built with Svelte and Tailwind CSS, inspired by Apple's clean design aesthetic. This is a static single-page application focusing on AI, technology, and the intersection of human creativity and machine intelligence.

## ✨ Features

- **Apple-Inspired Design**: Clean, minimalist aesthetic with careful attention to typography, spacing, and animations
- **Pure Svelte SPA**: Fast, modern single-page application built with Svelte
- **Tailwind CSS v4**: Latest version with modern CSS features
- **Client-Side Routing**: Smooth navigation using svelte-routing
- **Responsive**: Fully responsive design that works beautifully on all devices
- **Type-Safe**: Written in TypeScript for better developer experience
- **Smooth Animations**: Subtle, performant animations using native CSS transitions
- **Static Build**: Outputs to `dist` folder for easy deployment anywhere

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Basic knowledge of Svelte and Tailwind CSS

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hiro-blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
hiro-blog/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Nav.svelte              # Navigation component
│   │   │   ├── Footer.svelte           # Footer component
│   │   │   └── BlogPostLayout.svelte   # Blog post wrapper
│   │   ├── blog-posts/
│   │   │   ├── BuildingAIProducts.svelte
│   │   │   ├── FutureHumanAI.svelte
│   │   │   └── WhyOptimistic.svelte
│   │   └── data/
│   │       └── posts.ts                # Blog posts metadata
│   ├── pages/
│   │   ├── Home.svelte                 # Homepage
│   │   ├── Blog.svelte                 # Blog listing
│   │   ├── About.svelte                # About page
│   │   └── BlogPost.svelte             # Blog post router
│   ├── App.svelte                      # Main app component
│   ├── main.ts                         # Entry point
│   └── app.css                         # Global styles
├── index.html                          # HTML template
├── vite.config.ts                      # Vite configuration
├── tailwind.config.js                  # Tailwind configuration
└── package.json                        # Dependencies

## 🎨 Design System

### Colors

The blog uses an Apple-inspired color palette with warm tones:

- **Background**: `#f7f5f3` (Warm beige)
- **Text**: `#2d2d2d` (Charcoal)
- **Secondary Text**: `#8b8680` (Warm gray)
- **Accent**: `#d4a574` (Soft terracotta/tan)

### Typography

- **Font Family**: SF Pro Display fallback to system fonts (`-apple-system`)
- **Headings**: Semibold weight (600) with tight tracking
- **Body**: Normal weight (400) with relaxed line height

### Components

- **Buttons**: Rounded-full design with smooth hover transitions
- **Cards**: White background with subtle borders and shadow on hover
- **Spacing**: Generous whitespace for clean, breathable layouts

## 📝 Adding Blog Posts

Blog posts are Svelte components. To add a new post:

1. Add post metadata to `src/lib/data/posts.ts`:

```typescript
{
	title: "Your Post Title",
	excerpt: "Brief description",
	date: "2024-11-01",
	slug: "your-post-slug",
	readTime: "5 min read",
	tags: ["AI", "Technology"]
}
```

2. Create a new component in `src/lib/blog-posts/YourPost.svelte`:

```svelte
<script lang="ts">
	import BlogPostLayout from '../components/BlogPostLayout.svelte';
	export let post;
</script>

<BlogPostLayout {post}>
	<p>Your blog post content here...</p>
	<h2>Section Title</h2>
	<p>More content...</p>
</BlogPostLayout>
```

3. Import and add it to the `components` object in `src/pages/BlogPost.svelte`

## 🛠️ Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production (outputs to `dist/`)
- `npm run preview`: Preview production build

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory. This is a static site that can be deployed anywhere.

## 🚀 Deployment

### Cloudflare Pages

1. Push your code to a Git repository
2. Log in to [Cloudflare Pages](https://pages.cloudflare.com)
3. Create a new project and connect your repository
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Deploy!

### Other Static Hosting Platforms

The `dist` folder can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder or use CLI
- **GitHub Pages**: Push `dist` contents to `gh-pages` branch
- **Any static host**: Upload `dist` folder contents

## 🤝 Contributing

Contributions are welcome! Guidelines:

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Maintain the Apple-inspired design aesthetic

### Commit Messages

```
feat: Add new blog post about AI ethics
fix: Correct responsive layout on mobile
style: Refine button hover animations
```

### Pull Request Process

1. Fork and create a feature branch
2. Make changes and test thoroughly (`npm run dev`, `npm run build`)
3. Commit with clear messages
4. Push and create a Pull Request with description and screenshots

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by [Apple's website](https://apple.com)
- Built with [Svelte](https://svelte.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Routing by [svelte-routing](https://github.com/EmilTholin/svelte-routing)

## 📞 Contact

- Open an issue on GitHub
- Email: hello@hiroblog.com

---

Built with ❤️ using Svelte and Tailwind CSS
