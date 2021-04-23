<script lang="ts">
    import {db} from '../db/Database'
    import type {Label} from 'src/types';
    import { currentPage } from '../stores/router'
    import About from './About.svelte'
import { onMount } from 'svelte';

    let labels: Label[] = [];
    let newLabel = '';

    onMount(async () => labels = await db.labels.toArray());

    async function addNewLabel() {
        db.labels.add({name: newLabel})
        labels = await db.labels.toArray();
    }

    function removeLabel(label: Label) {
        return async () => {
            if (label.id)
                db.labels.delete(label.id);
            labels = await db.labels.toArray();
        }
    }

    function clearDatabase() {
        db.entries.clear();
        db.labels.clear();

        console.log("Database cleared.");
    }
</script>
<h1>Settings</h1>

<button on:click="{() => currentPage.set({name: 'About', component: About})}">
    About   
</button>

<div>
    <h1>
        Labels
    </h1>

    <input type="text" bind:value="{newLabel}"><button on:click="{addNewLabel}">Add</button>
    {#each labels as label}
        <p>
            {label.name}


          <button
            on:click={removeLabel(label)}
            class="inline-flex items-center hover:bg-green-100 border border-green-50 hover:border-green-300 hover:text-green-900 focus:outline-none rounded-full p-2 hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current w-4 h-4 pt-1"
              viewBox="0 0 24 24"
              ><path
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
              /></svg
            >
          </button>
        </p>
    {/each}



</div>

<button on:click="{clearDatabase}" class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Clear Data</button>

