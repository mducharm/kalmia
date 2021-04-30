import type { Entry } from 'src/types';
import type { SvelteComponent } from 'svelte';
import Settings from '../pages/Settings.svelte'
import { Writable, writable } from 'svelte/store';

export const currentPage: Writable<Page> = writable({});

export const goToSettings = () => currentPage.set({
        name: "Settings",
        component: Settings,
        props: {}
      });

export type Page = {
    name?: string,
    component?: typeof SvelteComponent,
    props?: {[key: string]: string | Entry}
}