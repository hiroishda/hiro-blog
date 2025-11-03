<script lang="ts">
	import { advancedMode, toggleAdvancedMode } from '../stores/advancedMode';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { quintOut, cubicOut } from 'svelte/easing';

	// Custom expand/collapse transition to smoothly animate height + opacity
	// This prevents layout jump when the advanced section toggles.
	function expand(node: HTMLElement, { duration = 380, easing = cubicOut, opacity = true } = {}) {
		const fullHeight = node.scrollHeight;
		const style = getComputedStyle(node);
		const paddingTop = parseFloat(style.paddingTop);
		const paddingBottom = parseFloat(style.paddingBottom);
		return {
			duration,
			easing,
			css: (t: number) => `overflow:hidden;height:${t * fullHeight}px;padding-top:${t * paddingTop}px;padding-bottom:${t * paddingBottom}px;${opacity ? `opacity:${t};` : ''}`
		};
	}

	const sectionId = `adv-${Math.random().toString(36).slice(2)}`;
	let gestureStarted = false;
	let gestureTriggered = false;
interface Props {
	title?: string;
	summary?: string;
	children: Snippet;
}

let { title = 'Technical Appendix', summary = 'Additional implementation notes, code examples, and deeper argumentation are available when Advanced Mode is enabled.', children }: Props = $props();

	let sectionEl: HTMLElement | null = $state(null);
	let isHovering = $state(false);
	let contentEl: HTMLElement | null = $state(null);
	let buttonEl: HTMLElement | null = $state(null);

	const handleMouseEnter = () => {
		isHovering = true;
		console.log('Mouse entered AdvancedSection');
	};

	const handleMouseLeave = () => {
		isHovering = false;
		console.log('Mouse left AdvancedSection');
	};

	const handleGestureStart = (e: any) => {
		e.preventDefault();
		gestureStarted = true;
		gestureTriggered = false;
	};

	const handleGestureChange = (e: any) => {
		e.preventDefault();
		
		if (gestureStarted && !gestureTriggered) {
			// Pinch out (zoom in) - scale > 1.2 triggers advanced mode
			if (e.scale > 1.2 && !$advancedMode) {
				toggleAdvancedMode();
				gestureTriggered = true;
			}
			// Pinch in (zoom out) - scale < 0.8 disables advanced mode  
			else if (e.scale < 0.8 && $advancedMode) {
				toggleAdvancedMode();
				gestureTriggered = true;
			}
		}
	};

	const handleGestureEnd = (e: any) => {
		e.preventDefault();
		console.log('gestureend', e);
		gestureStarted = false;
		gestureTriggered = false;
	};

	// Global wheel handler that only acts when hovering over this section
	const handleWheel = (e: WheelEvent) => {
		if (!isHovering) return; // Let normal zoom work elsewhere
		
		console.log('wheel event over AdvancedSection:', e.ctrlKey, e.deltaY);
		if (e.ctrlKey) {
			e.preventDefault();
			// Simple ctrl+wheel toggle
			if (e.deltaY < 0 && !$advancedMode) {
				console.log('Enabling advanced mode via wheel');
				toggleAdvancedMode();
			} else if (e.deltaY > 0 && $advancedMode) {
				console.log('Disabling advanced mode via wheel');
				toggleAdvancedMode();
			}
		}
	};

	onMount(() => {
		console.log('AdvancedSection mounted, adding event listeners');
		
		// Only add gesture listeners to the specific section element
		if (sectionEl) {
			sectionEl.addEventListener('gesturestart', handleGestureStart, { passive: false });
			sectionEl.addEventListener('gesturechange', handleGestureChange, { passive: false });
			sectionEl.addEventListener('gestureend', handleGestureEnd, { passive: false });
		}
		
		// Global wheel listener that checks hover state
		window.addEventListener('wheel', handleWheel, { passive: false });
		
		return () => {
			if (sectionEl) {
				sectionEl.removeEventListener('gesturestart', handleGestureStart);
				sectionEl.removeEventListener('gesturechange', handleGestureChange);
				sectionEl.removeEventListener('gestureend', handleGestureEnd);
			}
			window.removeEventListener('wheel', handleWheel);
		};
	});
</script>

<section 
	bind:this={sectionEl}
	id={sectionId} 
	aria-labelledby={sectionId} 
	class="my-12"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<!-- <header class="mb-4">
		<h4 id={sectionId} class="text-xs tracking-widest uppercase text-warm-gray text-center">
			{title}
		</h4>
	</header> -->
	<div class="relative" style="overflow:hidden;">
		{#if $advancedMode}
			<div
				bind:this={contentEl}
				class="w-full"
				in:expand={{ duration: 450, easing: cubicOut }}
				out:expand={{ duration: 220, easing: quintOut }}
			>
				{@render children()}
			</div>
		{:else}
			<div
				class="w-full"
				in:expand={{ duration: 320, easing: cubicOut }}
				out:expand={{ duration: 180, easing: quintOut }}
			>
				<button
					bind:this={buttonEl}
					onclick={toggleAdvancedMode}
					class="w-full group cursor-pointer rounded-md text-left px-2 py-1 border border-dashed border-warm-gray/10 hover:border-warm-gray/25 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:ring-offset-0 transition-colors duration-300"
					aria-label="Reveal advanced technical appendix"
				>
					<p class="m-0 text-[0.9rem] leading-relaxed text-warm-gray/65 italic tracking-tight group-hover:text-warm-gray/75 transition-colors duration-300">{summary}</p>
					<div class="mt-1 flex items-center gap-1 text-[11px] text-warm-gray/50">
						<svg class="w-3 h-3 opacity-40 group-hover:opacity-60 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
						</svg>
						<span class="opacity-0 group-hover:opacity-80 transition-opacity duration-300">Click or Zoom in</span>
					</div>
				</button>
			</div>
		{/if}
	</div>
</section>