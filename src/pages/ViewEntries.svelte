<script lang="typescript">
  import { onMount } from "svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import EntryDetails from "components/EntryDetails.svelte";
  import { db } from "../db/Database";
  import { currentPage } from "../stores/router";
  import type { Entry, Label } from "src/types";

  let entries: Entry[] = [];

  onMount(async () => {
    entries = await db.entries.toArray();
  });

  function severityColor(num: number) {
    switch (num) {
      case 1:
        return "text-emerald-800 bg-emerald-300";
      case 2:
        return "text-bluegray-800 bg-bluegray-300";
      case 3:
        return "text-amber-800 bg-amber-300";
      case 4:
        return "text-orange-800 bg-orange-300";
      case 5:
        return "text-red-800 bg-red-300";
      default:
        return "text-green-800 bg-green-300";
    }
  }

  function viewEntryDetails(entry: Entry) {
    return () => {
      currentPage.set({
        name: "Entry Details",
        component: EntryDetails,
        props: {
          entry,
        },
      });
    };
  }
</script>

<div>
  <ul class="flex flex-col bg-gray-100 divide-y divide-blue-400">
    {#each entries as entry}
      <li class="flex flex-row items-center justify-between px-4 py-3">
        <span
          class="text-lg font-bold inline-block py-1 px-3 uppercase rounded {severityColor(
            entry.severity
          )} uppercase last:mr-0 mr-1 my-auto"
        >
          {entry.severity}
        </span>

        <p>
          {entry.dateOfOccurrence}
        </p>

        <div>
          <MedicinePill bind:active={entry.medicineTaken} />
        </div>

        <div>
          {#if entry?.labels?.length > 0}
            {#each entry.labels as label}
              <div class="rounded">{label}</div>
            {/each}
          {/if}
        </div>

        <button
          on:click={viewEntryDetails(entry)}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View
        </button>
      </li>
    {/each}
  </ul>
</div>
