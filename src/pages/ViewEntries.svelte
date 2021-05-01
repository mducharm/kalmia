<script lang="typescript">
  import { onMount } from "svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import EntryDetails from "components/EntryDetails.svelte";
  import { db } from "../db/Database";
  import { currentPage } from "../stores/router";
  import type { Entry, Label } from "src/types";
  import { getSeverityColor } from "../utils";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  dayjs.extend(customParseFormat);

  async function getEntries(from: number, to: number): Promise<Entry[]> {
    return await db.entries
      .orderBy("dateOfOccurrence")
      .filter((e) => e.dateOfOccurrence >= from && e.dateOfOccurrence <= to)
      .reverse()
      .toArray();
  }

  let fromDate = dayjs().format("YYYY-MM-DD");
  let toDate = dayjs().format("YYYY-MM-DD");
  $: from = dayjs(fromDate, "YYYY-MM-DD").unix();
  $: to = dayjs(toDate, "YYYY-MM-DD").unix();

  $: entriesToGet = getEntries(from, to);

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
  <label for="from">From</label>
  <input
    type="date"
    bind:value={fromDate}
    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring w-full"
  />
</div>
<div>
  <label for="to">To</label>
  <input
    type="date"
    bind:value={toDate}
    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring w-full"
  />
</div>

{#await entriesToGet}
  <p>Loading...</p>
{:then entries}
  <div>
    {#if entries.length === 0}
      <p class="text-sm text-gray-600 pb-4">
        You haven't added any entries yet.
      </p>
    {:else}
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
    {/if}
  </div>
{/await}
