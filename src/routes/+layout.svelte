<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let { children } = $props();
	let isMenuOpen = $state(false);
	
	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'About', href: '/about' }
	];
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	
	function closeMenu() {
		isMenuOpen = false;
	}
	
	// Close mobile menu when route changes
	$effect(() => {
		if ($page.route) {
			isMenuOpen = false;
		}
	});
	
	onMount(() => {
		// Close menu when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest('.mobile-menu-container')) {
				isMenuOpen = false;
			}
		};
		
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="min-h-screen bg-beige">
	<!-- Navigation -->
	<nav class="sticky top-0 z-50 bg-beige/80 backdrop-blur-sm border-b border-warm-gray/20">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo -->
				<div class="flex-shrink-0">
					<a href="/" class="text-xl font-semibold text-charcoal hover:opacity-80 transition-opacity">
						Hiro's Blog
					</a>
				</div>
				
				<!-- Desktop Navigation -->
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-8">
						{#each navigation as item}
							<a
								href={item.href}
								class="text-charcoal hover:text-warm-gray transition-colors duration-200 px-3 py-2 text-sm font-medium"
								class:font-semibold={$page.url.pathname === item.href}
								class:text-charcoal={$page.url.pathname === item.href}
								class:text-warm-gray={$page.url.pathname !== item.href}
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
				
				<!-- Mobile menu button -->
				<div class="md:hidden mobile-menu-container">
					<button
						onclick={toggleMenu}
						type="button"
						class="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-warm-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-charcoal transition-colors"
						aria-controls="mobile-menu"
						aria-expanded={isMenuOpen}
					>
						<span class="sr-only">Open main menu</span>
						<!-- Menu icon -->
						<svg
							class="block h-6 w-6"
							class:hidden={isMenuOpen}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
						<!-- Close icon -->
						<svg
							class="hidden h-6 w-6"
							class:block={isMenuOpen}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>
		
		<!-- Mobile menu -->
		{#if isMenuOpen}
			<div class="md:hidden mobile-menu-container" id="mobile-menu">
				<div class="px-2 pt-2 pb-3 space-y-1 bg-beige border-t border-warm-gray/20">
					{#each navigation as item}
						<a
							href={item.href}
							class="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:text-warm-gray hover:bg-white/50 transition-all duration-200"
							class:font-semibold={$page.url.pathname === item.href}
							onclick={closeMenu}
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</nav>
	
	<!-- Main content -->
	<main class="flex-1">
		{@render children()}
	</main>
	
	<!-- Footer -->
	<footer class="bg-white/50 border-t border-warm-gray/20 mt-20">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="text-center">
				<div class="text-warm-gray text-sm">
					<p class="mb-2">© 2025 Hiro's Blog. Built with SvelteKit.</p>
					<p class="text-xs">Sharing experiences and insights from the world of AI and technology.</p>
				</div>
			</div>
		</div>
	</footer>
</div>
