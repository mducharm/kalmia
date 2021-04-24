<script lang="typescript">
  import { onMount } from "svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import EntryDetails from "components/EntryDetails.svelte";
  import { db } from "../db/Database";
  import { currentPage } from "../stores/router";
  import type { Entry, Label } from "src/types";
  import { getSeverityColor } from "../utils";

  let entries: Entry[] = [];

  onMount(async () => {
    entries = await db.entries.toArray();
  });

  function severityColor(num: number) {
    let severity = getSeverityColor(num);
    return `text-${severity}-800 bg-${severity}-300`;
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
          class="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full {severityColor(
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
          {#if entry?.labels?.length > 1}
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
