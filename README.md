# Hiro's Blog

A modern, minimalist blog built with SvelteKit and Tailwind CSS, inspired by Apple's clean design aesthetic. This blog focuses on AI, technology, and the intersection of human creativity and machine intelligence.

## ✨ Features

- **Tailwind CSS v4**: Latest version with modern CSS features and improved performance
- **SvelteKit**: Fast, modern web framework with server-side rendering
- **MDsveX**: Write blog posts in Markdown with Svelte component support
- **Responsive**: Fully responsive design that works beautifully on all devices
- **Type-Safe**: Written in TypeScript for better developer experience
- **Smooth Animations**: Subtle, performant animations using native CSS transitions
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Basic knowledge of SvelteKit and Tailwind CSS

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
│   │   │   └── BlogLayout.svelte    # Blog post layout wrapper
│   │   └── assets/                  # Static assets
│   ├── routes/
│   │   ├── +layout.svelte           # Root layout with navigation
│   │   ├── +page.svelte             # Homepage
│   │   ├── +error.svelte            # Error page (404)
│   │   ├── about/
│   │   │   └── +page.svelte         # About page
│   │   └── blog/
│   │       ├── +page.svelte         # Blog listing page
│   │       └── *.md                 # Blog posts (Markdown)
│   ├── app.css                      # Global styles and Tailwind config
│   ├── app.d.ts                     # TypeScript declarations
│   └── app.html                     # HTML template
├── static/                          # Static files
├── svelte.config.js                 # SvelteKit configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── package.json                     # Project dependencies
```

## 🎨 Design System

### Colors

- **Background**: `#f5f5f7` (Light gray)
- **Text**: `#1d1d1f` (Almost black)
- **Secondary Text**: `#86868b` (Medium gray)
- **Accent**: `#0071e3` (Apple blue)
- **Accent Dark**: `#0077ed` (Darker blue for hover states)

### Typography

- **Headings**: Semibold weight (600) with tight tracking
- **Body**: Normal weight (400) with relaxed line height

### Components

- **Buttons**: Rounded-full design with smooth hover transitions
- **Cards**: White background with subtle borders and shadow on hover
- **Spacing**: Generous whitespace for clean, breathable layouts

## 📝 Writing Blog Posts

Blog posts are written in Markdown with frontmatter. Create a new `.md` file in `src/routes/blog/`:

```markdown
---
title: Your Blog Post Title
date: 2024-01-15
readTime: 5 min read
tags: ["AI", "Technology", "Tutorial"]
excerpt: A brief description of your post that appears in listings
layout: blog
---

# Your Content Here

Write your blog post content using Markdown syntax...
```

### Frontmatter Fields

- `title` (required): The post title
- `date` (required): Publication date in YYYY-MM-DD format
- `readTime` (required): Estimated reading time
- `tags` (required): Array of topic tags
- `excerpt` (required): Short description for listings
- `layout` (required): Set to "blog" to use the blog layout

## 🛠️ Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run check`: Run TypeScript and Svelte checks
- `npm run lint`: Run ESLint (if configured)

### Building for Production

```bash
npm run build
```

The built files will be in `.svelte-kit/output`. The project uses `@sveltejs/adapter-auto` which automatically detects your deployment platform.

### Deployment

This project is configured to deploy to **Cloudflare Pages** by default.

#### Cloudflare Pages (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Log in to [Cloudflare Pages](https://pages.cloudflare.com)
3. Click "Create a project" and connect your Git repository
4. Configure the build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `public`
   - **Root directory**: `/` (leave as default)
   - **Node version**: `18` or higher (in Environment Variables)
5. Click "Save and Deploy"

Cloudflare Pages will automatically deploy your site and provide a URL. Future commits to your main branch will trigger automatic deployments.

#### Other Platforms

To deploy to other platforms, change the adapter in `svelte.config.js`:

- **Vercel**: Install `@sveltejs/adapter-vercel` and import it
- **Netlify**: Install `@sveltejs/adapter-netlify` and import it
- **Node.js Server**: Install `@sveltejs/adapter-node` and import it

See [SvelteKit adapters documentation](https://kit.svelte.dev/docs/adapters) for more details.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Code Style

- Use TypeScript for type safety
- Follow the existing code formatting
- Use meaningful variable and function names
- Write descriptive comments only when necessary (code should be self-documenting)
- Maintain the Apple-inspired design aesthetic

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new blog post about AI ethics
fix: Correct responsive layout on mobile devices
docs: Update README with deployment instructions
style: Refine button hover animations
```

### Pull Request Process

1. **Fork the repository** and create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test thoroughly:
   ```bash
   npm run dev
   npm run check
   npm run build
   ```

3. **Commit your changes** with clear messages:
   ```bash
   git commit -m "feat: Add your feature description"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Reference to any related issues

### Design Guidelines

When contributing design changes:

- **Maintain minimalism**: Less is more
- **Use the existing color palette**: Don't introduce new colors without discussion
- **Keep animations subtle**: 300-500ms durations, ease-out timing
- **Ensure responsiveness**: Test on mobile, tablet, and desktop
- **Follow Apple's design principles**: Clean, simple, user-friendly

### Adding Features

Before adding major features:

1. Open an issue to discuss the feature
2. Wait for maintainer feedback
3. Implement following the project's architecture
4. Add documentation for new features
5. Include tests if applicable

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Markdown processing by [mdsvex](https://mdsvex.pngwn.io)

## 📞 Contact

Have questions or suggestions? Feel free to:

- Open an issue on GitHub
- Send an email to hello@hiroblog.com
- Connect on social media

---

Built with ❤️ using SvelteKit and Tailwind CSS