<script lang="ts">
	import { onMount } from 'svelte';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import json from 'highlight.js/lib/languages/json';
	import css from 'highlight.js/lib/languages/css';
	import bash from 'highlight.js/lib/languages/bash';
	import python from 'highlight.js/lib/languages/python';
	
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
	
	let isOpen = $state(false);
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

<div class="my-8 border border-warm-gray/20 rounded-2xl overflow-hidden bg-white/60 shadow-sm">
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
				<pre class="text-sm font-mono leading-relaxed"><code class="language-{language} hljs">{@html highlightedCode || code}</code></pre>
			</div>
		</div>
	{/if}
</div>

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

	/* Simple, elegant code styling focused on beige tones */
	pre code {
		background: none !important;
		color: inherit !important;
		font-family: var(--font-mono);
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		tab-size: 4;
		hyphens: none;
	}

	/* Enhanced highlight.js theme - Warm Beige Edition */
	
	/* Base code styling with proper beige background and text wrapping */
	pre {
		background-color: rgba(255, 250, 240, 0.9) !important; /* beige background */
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
		color: #a39081 !important;
		font-style: italic;
	}

	/* Keywords - deep charcoal, bold */
	:global(.hljs-keyword),
	:global(.hljs-selector-tag),
	:global(.hljs-literal),
	:global(.hljs-type),
	:global(.hljs-addition) {
		color: #1a1a1a !important;
		font-weight: 600;
	}

	/* Strings - warm golden accent */
	:global(.hljs-string),
	:global(.hljs-regexp),
	:global(.hljs-template-string) {
		color: #b8956a !important;
	}

	/* Numbers - darker warm accent */
	:global(.hljs-number),
	:global(.hljs-built_in),
	:global(.hljs-builtin-name) {
		color: #a67c52 !important;
	}

	/* Functions and methods - medium warm accent */
	:global(.hljs-function),
	:global(.hljs-title),
	:global(.hljs-attr),
	:global(.hljs-symbol),
	:global(.hljs-bullet) {
		color: #c49563 !important;
		font-weight: 500;
	}

	/* Variables and properties - standard charcoal */
	:global(.hljs-variable),
	:global(.hljs-template-variable),
	:global(.hljs-attribute) {
		color: #2d2d2d !important;
	}

	/* Class names - slightly lighter charcoal */
	:global(.hljs-class),
	:global(.hljs-title.class_),
	:global(.hljs-name) {
		color: #4a453f !important;
		font-weight: 500;
	}

	/* Operators and punctuation - warm gray */
	:global(.hljs-operator),
	:global(.hljs-punctuation) {
		color: #8b8680 !important;
	}

	/* Meta tags and doctypes - muted warm tone */
	:global(.hljs-meta),
	:global(.hljs-doctag) {
		color: #8b7d6b !important;
	}

	/* Python-specific decorators and params */
	:global(.hljs-decorator),
	:global(.hljs-params) {
		color: #9c8567 !important;
	}

	/* Special sections and tags */
	:global(.hljs-section),
	:global(.hljs-tag) {
		color: #2d2d2d !important;
		font-weight: 500;
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