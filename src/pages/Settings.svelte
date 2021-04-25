<script lang="ts">
  import { db } from "../db/Database";
  import type { Label } from "src/types";
  import { currentPage } from "../stores/router";
  import About from "./About.svelte";
  import ButtonWithConfirm from "components/ButtonWithConfirm.svelte";
  import { onMount } from "svelte";

  let labels: Label[] = [];
  let newLabel = "";

  onMount(async () => (labels = await db.labels.toArray()));

  async function addNewLabel() {
    db.labels.add({ name: newLabel });
    labels = await db.labels.toArray();
    newLabel = "";
  }

  function removeLabel(label: Label) {
    return async () => {
      if (label.id) db.labels.delete(label.id);
      labels = await db.labels.toArray();
    };
  }

  function exportToXlsx() {}

  function clearDatabase() {
    db.delete().then(() => db.open());

    console.log("Database cleared.");
  }
</script>

<div class="container mx-auto my-8">

    <button
      on:click={() => currentPage.set({ name: "About", component: About })}
      class="w-full my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      About
    </button>

  <h1 class="font-semibold">Manage Labels</h1>
  <p class="mt-2 text-gray-600">Add custom labels to the form here. </p>

  <input type="text" bind:value={newLabel} class="w-full my-2 py-2 px-2"/>
  <button
    on:click={addNewLabel}
    class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >Add</button
  >
  <div class="flex flex-wrap justify-center my-4">
    {#each labels as label}
      <div
        class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-indigo-100 bg-indigo-700 border border-indigo-700 "
      >
        <div class="text-xs font-normal leading-none max-w-full flex-initial">
          {label.name}
        </div>
        <div class="flex flex-auto flex-row-reverse">
          <div on:click={removeLabel(label)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<button
  on:click={exportToXlsx}
  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >Export to Excel</button
>

<ButtonWithConfirm
    actionName="Reset"
    contents="Are you sure you wish to reset the app? This will delete all data and cannot be undone. If you wish to keep any existing data, export first."
    class="w-full"
    action="{clearDatabase}"
></ButtonWithConfirm>
