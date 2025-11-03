<script lang="ts">
	import { onMount } from 'svelte';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import json from 'highlight.js/lib/languages/json';
	import css from 'highlight.js/lib/languages/css';
	import bash from 'highlight.js/lib/languages/bash';
	import python from 'highlight.js/lib/languages/python';
	import { advancedMode } from '../stores/advancedMode';
	
	// Register languages
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('python', python);
	
	interface Props {
		title?: string;
		language?: string;
		filename?: string;
		code: string; // Change from children to direct code prop
	}
	
	let { title = 'Show Code', language = 'javascript', filename = '', code }: Props = $props();
	
	let isOpen = $state(true);
	let codeElement = $state<HTMLElement>();
	let highlightedCode = $state('');
	
	function toggleCode() {
		isOpen = !isOpen;
	}
	
	onMount(() => {
		// Highlight the code
		if (code) {
			console.log('Highlighting code:', code.substring(0, 50) + '...');
			try {
				const result = hljs.highlight(code.trim(), { language: language || 'javascript' });
				highlightedCode = result.value;
				console.log('Highlighted successfully');
			} catch (e) {
				console.error('Highlighting failed:', e);
				highlightedCode = code.trim();
			}
		}
	});
	
	// Also reactive update when code changes
	$effect(() => {
		if (code) {
			try {
				const result = hljs.highlight(code.trim(), { language: language || 'javascript' });
				highlightedCode = result.value;
			} catch (e) {
				highlightedCode = code.trim();
			}
		}
	});
</script>

<!-- Only show if advanced mode is enabled -->
{#if $advancedMode}
	<div class="my-8 border border-warm-gray/20 rounded-2xl overflow-hidden">
		<!-- Button Header -->
		<button
			onclick={toggleCode}
			class="w-full px-6 py-4 text-left bg-beige-dark/30 hover:bg-beige-dark/50 transition-all duration-300 flex items-center justify-between border-b border-warm-gray/10"
			aria-expanded={isOpen}
		>
			<div class="flex items-center gap-4">
				<span class="text-sm font-medium text-charcoal tracking-tight">{title}</span>
				{#if filename}
					<span class="text-xs text-warm-gray font-mono bg-accent/10 px-3 py-1.5 rounded-full">
						{filename}
					</span>
				{/if}
			</div>
			
			<!-- Chevron Icon -->
			<svg 
				class="w-5 h-5 text-warm-gray transition-all duration-300 ease-out"
				class:rotate-180={isOpen}
				fill="none" 
				stroke="currentColor" 
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
		
		<!-- Collapsible Code Content -->
		{#if isOpen}
			<div 
				class="animate-in slide-in-from-top-2 duration-300"
				bind:this={codeElement}
			>
				<!-- Code Block with enhanced beige theme -->
				<div class="p-6 bg-beige/90 border-t border-warm-gray/10">
					<pre class="text-base font-mono leading-relaxed"><code class="language-{language} hljs">{@html highlightedCode || code}</code></pre>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<!-- Show placeholder when advanced mode is disabled -->
	<div class="my-8 border border-warm-gray/10 rounded-2xl overflow-hidden bg-warm-gray/5">
		<div class="px-6 py-4 text-center">
			<div class="flex items-center justify-center gap-3 text-warm-gray">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
				</svg>
				<span class="text-sm font-medium">Code Example Available</span>
			</div>
			<p class="text-xs text-warm-gray/80 mt-2">Enable Advanced Mode to view interactive code snippets</p>
		</div>
	</div>
{/if}

<style>
	.animate-in {
		animation-fill-mode: both;
	}
	
	.slide-in-from-top-2 {
		animation: slideInFromTop 0.3s ease-out;
	}
	
	@keyframes slideInFromTop {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Enhanced highlight.js theme - Warm Beige Edition */
	
	/* Base code styling with proper beige background and text wrapping */
	pre {
		background-color: var(--color-beige) !important; /* beige background */
		border-radius: 0.5rem;
		margin: 0;
		overflow-x: visible !important; /* Remove horizontal scrolling */
		white-space: pre-wrap !important; /* Allow text wrapping */
		word-wrap: break-word !important; /* Break long words */
	}
	
	pre code {
		background: none !important;
		color: #2d2d2d !important; /* charcoal text */
		font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
		white-space: pre-wrap !important; /* Allow text wrapping */
		word-spacing: normal;
		word-break: break-word !important; /* Break long words */
		tab-size: 4;
		hyphens: none;
		line-height: 1.6;
		overflow-wrap: break-word !important; /* Modern browsers */
	}

	/* Comments - muted warm gray, italic */
	:global(.hljs-comment),
	:global(.hljs-quote) {
		color: #9a8c7a !important;
		font-style: italic;
		opacity: 0.8;
	}

	/* Keywords - deep teal-charcoal, bold */
	:global(.hljs-keyword),
	:global(.hljs-selector-tag),
	:global(.hljs-literal),
	:global(.hljs-type),
	:global(.hljs-addition) {
		color: var(--color-charcoal) !important;
		font-weight: 600;
	}

	/* Strings - warm amber */
	:global(.hljs-string),
	:global(.hljs-regexp),
	:global(.hljs-template-string) {
		color: #cc8c47 !important;
	}

	/* Numbers - deep bronze */
	:global(.hljs-number),
	:global(.hljs-built_in),
	:global(.hljs-builtin-name) {
		color: #8b5d2e !important;
		font-weight: 500;
	}

	/* Functions and methods - rich brown */
	:global(.hljs-function),
	:global(.hljs-title),
	:global(.hljs-attr),
	:global(.hljs-symbol),
	:global(.hljs-bullet) {
		color: #a0522d !important;
		font-weight: 600;
	}

	/* Variables and properties - medium charcoal */
	:global(.hljs-variable),
	:global(.hljs-template-variable),
	:global(.hljs-attribute) {
		color: #404040 !important;
	}

	/* Class names - warm dark brown */
	:global(.hljs-class),
	:global(.hljs-title.class_),
	:global(.hljs-name) {
		color: #654321 !important;
		font-weight: 600;
	}

	/* Operators and punctuation - medium warm gray */
	:global(.hljs-operator),
	:global(.hljs-punctuation) {
		color: #6b6b6b !important;
	}

	/* Meta tags and doctypes - muted olive */
	:global(.hljs-meta),
	:global(.hljs-doctag) {
		color: #8b7355 !important;
		font-style: italic;
	}

	/* Python-specific decorators and params - purple-brown */
	:global(.hljs-decorator),
	:global(.hljs-params) {
		color: #8b5a7a !important;
		font-weight: 500;
	}

	/* Special sections and tags - dark charcoal */
	:global(.hljs-section),
	:global(.hljs-tag) {
		color: #1a1a1a !important;
		font-weight: 600;
	}

	/* Deletion - subtle warm red */
	:global(.hljs-deletion) {
		background-color: rgba(253, 242, 242, 0.8) !important;
		color: #8b5a5a !important;
	}

	/* Emphasis styles */
	:global(.hljs-emphasis) {
		font-style: italic;
	}

	:global(.hljs-strong) {
		font-weight: bold;
	}
</style>