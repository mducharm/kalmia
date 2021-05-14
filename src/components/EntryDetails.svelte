<script lang="ts">
  import type { Entry } from "src/types";
  import ViewEntries from "../pages/ViewEntries.svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import { currentPage } from "../stores/router";
  import { fly } from "svelte/transition";
  import { db } from "../db/Database";
  import ButtonWithConfirm from "components/ButtonWithConfirm.svelte";
  import EditEntryForm from "components/EditEntryForm.svelte";
  import { getSeverityColor } from "../utils";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  dayjs.extend(customParseFormat);

  export let entry: Entry;

  let isEditing = false;

  function goBack() {
    currentPage.set({
      name: "View Entries",
      component: ViewEntries,
    });
  }
  async function deleteEntry() {
    if (entry.id) {
      await db.entries.delete(entry.id);
      goBack();
    }
  }
</script>

<div transition:fly={{ x: 200, duration: 200 }}>
  <div class="flex flex-row justify-around md:w-1/2 mx-auto">
    <button
      on:click={goBack}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mx-2"
    >
      Back
    </button>
    <button
      on:click={() => (isEditing = true)}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mx-2"
    >
      Edit
    </button>
    <ButtonWithConfirm
      class="w-full mx-2"
      actionName="Delete"
      contents="Are you sure you wish to delete this entry?"
      action={deleteEntry}
    />
  </div>

  {#if isEditing}
    <!-- Editing... -->
    <EditEntryForm bind:entry on:save={() => (isEditing = false)} />
  {:else}
    <div
      class="relative bg-white py-6 px-6 rounded-3xl my-4 shadow-xl cursor-pointer md:w-1/2 mx-auto"
    >
      <div
        class="flex items-center justify-center rounded-full py-2 px-4 shadow-xl font-bold text-lg {getSeverityColor(
          entry.severity
        )}"
      >
        Severity: {entry.severity}
      </div>
      <div class="mt-8">
        <!-- <p class="text-xl font-semibold my-2">Web Design</p> -->
        <div class="flex justify-between">
          <div class="flex space-x-2 text-gray-400 text-sm">
            <MedicinePill bind:active={entry.medicineTaken} />
            <p>Medicine Taken</p>
          </div>
          <div class="flex space-x-2 text-gray-400 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>
              {dayjs.unix(entry.dateOfOccurrence).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
        <div class="flex flex-row flex-wrap text-gray-400 text-sm my-3">
          {#if entry?.labels?.length > 0}
            {#each entry.labels as label}
              <div class="border rounded px-3 py-2 mr-2 mb-2">{label}</div>
            {/each}
          {/if}
        </div>

        <h1 class="font-bold mb-2">Notes</h1>
        {#if entry.notes.length > 0}
          <p>
            {entry.notes}
          </p>
        {:else}
          <p class="text-sm text-gray-600 pb-4">
            No notes recorded for this entry.
          </p>
        {/if}
      </div>
    </div>
  {/if}
</div>
