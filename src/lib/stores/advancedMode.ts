import { writable } from 'svelte/store';

export const advancedMode = writable(false);

export function toggleAdvancedMode() {
		advancedMode.update(mode => !mode);
		console.log('Advanced mode toggled');
	}