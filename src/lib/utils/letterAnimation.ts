/**
 * Animates elements with the class '.animate-letters' by splitting text into words
 * and applying a staggered appearance animation with random timing.
 * 
 * @param containerElement - The container element to search for '.animate-letters' elements
 */
export function animateLetters(containerElement: HTMLElement): void {
	if (!containerElement) return;

	const elements = containerElement.querySelectorAll('.animate-letters');

	elements.forEach((element) => {
		const text = element.textContent || '';
		const words = text.split(' ');

		// Create array of word indices and shuffle them randomly
		const indices = words.map((_, i) => i);
		for (let i = indices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[indices[i], indices[j]] = [indices[j], indices[i]];
		}

		// Replace text with word spans (keeping word boundaries intact)
		element.innerHTML = words
			.map((word, i) => {
				return `<span class="inline-block opacity-0" style="animation-delay: ${indices.indexOf(i) * 100}ms">${word}</span>`;
			})
			.join('<span class="inline-block">&nbsp;</span>');

		// Trigger animation
		setTimeout(() => {
			element.querySelectorAll('span').forEach(span => {
				span.classList.add('animate-appear');
			});
		}, 100);
	});
}