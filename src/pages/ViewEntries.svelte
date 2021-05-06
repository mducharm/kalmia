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

  let fromDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
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

<div class="flex flex-row items-center">
  <input
    type="date"
    bind:value={fromDate}
    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring w-full"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-10 w-10 mx-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
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
      {#each entries as entry}
        <div
          class="relative bg-white py-6 px-6 rounded-3xl my-4 shadow-xl cursor-pointer"
          on:click={viewEntryDetails(entry)}
        >
          <div
            class="flex items-center justify-center rounded-full py-2 px-4 shadow-xl uppercase font-bold text-lg {getSeverityColor(
              entry.severity
            )}"
          >
            {entry.severity}
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
            <div class="flex flex-row flex-wrap text-gray-400 text-sm mt-3">
              {#if entry?.labels?.length > 0}
                {#each entry.labels as label}
                  <div class="border rounded px-3 py-2 mr-2 mb-2 shadow-md">{label}</div>
                {/each}
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
{/await}
