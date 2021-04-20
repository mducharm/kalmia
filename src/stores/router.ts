import type { SvelteComponent } from 'svelte';
import { Writable, writable } from 'svelte/store';

export const currentPage: Writable<Page> = writable({});

export type Page = {
    name?: string,
    component?: typeof SvelteComponent
}