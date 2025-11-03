<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import NavBox from './NavBox.svelte';

	let isMenuOpen = false;

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

	onMount(() => {
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

<nav class="sticky top-0 z-50 bg-beige/95 backdrop-blur-xl border-b border-charcoal/10">
	<div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
		<div class="flex justify-between items-center h-14">
		<!-- Logo -->
		<div class="shrink-0">
			<a href="/" class="flex items-center gap-2 hover:opacity-70 transition-opacity duration-300">
				<span class="text-xl font-semibold text-charcoal">Hiro</span>
				<NavBox />
			</a>
		</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="flex items-center space-x-10">
					{#each navigation as item}
						<a
							href={item.href}
							class="text-sm hover:text-charcoal transition-colors duration-300 relative"
							class:font-medium={$page.url.pathname === item.href}
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
