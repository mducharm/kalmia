<script lang="typescript">
  import { onMount } from "svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import EntryDetails from "components/EntryDetails.svelte";
  import { db } from "../db/Database";
  import { currentPage } from "../stores/router";
  import type { Entry, Label } from "src/types";
  import { getSeverityColor } from "../utils";
  import dayjs from "dayjs";
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  dayjs.extend(customParseFormat);

  let entries: Entry[] = [];

  onMount(async () => {
    entries = await db.entries.toArray();
  });

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
          class="text-lg font-bold inline-block py-1 px-3 uppercase rounded {getSeverityColor(
            entry.severity
          )} uppercase last:mr-0 mr-1 my-auto"
        >
          {entry.severity}
        </span>

        <p>
          {dayjs.unix(entry.dateOfOccurrence).format("YYYY-MM-DD")}
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
