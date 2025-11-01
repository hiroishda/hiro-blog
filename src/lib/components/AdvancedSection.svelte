<script lang="ts">
	import { advancedMode } from '../stores/advancedMode';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		summary?: string;
		children: Snippet;
	}

	let { 
		title = "Technical Details", 
		summary = "Implementation details and code examples are available in advanced mode.",
		children 
	}: Props = $props();
</script>

{#if $advancedMode}
	<!-- Show full content when advanced mode is on -->
	<div class="advanced-section-content relative">
		<!-- Small indicator that this is advanced content -->
		<div class="absolute -left-3 top-2 w-1.5 h-8 bg-accent/40 rounded-full"></div>
		<div class="pl-2">
			{@render children()}
		</div>
	</div>
{:else}
	<!-- Show subtle summary when advanced mode is off -->
	<div class="my-6 relative">
		<div class="flex items-start gap-3">
			<!-- Subtle indicator -->
			<div class="shrink-0 mt-1.5">
				<div class="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
					<div class="w-1.5 h-1.5 rounded-full bg-accent/60"></div>
				</div>
			</div>
			
			<div class="flex-1">
				<div class="flex items-center gap-2 mb-1">
					<h4 class="text-sm font-medium text-charcoal/80">{title}</h4>
					<svg class="w-3 h-3 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
					</svg>
				</div>
				<p class="text-sm text-warm-gray leading-relaxed">{summary}</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.advanced-section-content {
		/* Subtle styling to indicate this is advanced content */
		margin: 1.5rem 0;
	}
</style>