<script lang="typescript">
  import { onMount } from "svelte";
  import { db } from "../db/Database";
  import Pie from "svelte-chartjs/src/Pie.svelte";
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import MostCommonLabels from "components/MostCommonLabels.svelte";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  dayjs.extend(customParseFormat);

  let severityData: { [key: number]: number } = {};

  async function getSeverityCounts() {
    let counts: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    await db.entries.each(
      (entry) => (counts[entry.severity] = counts[entry.severity] + 1)
    );
    return counts;
  }

  function daysSinceDate(date: number) {
    return dayjs().diff(dayjs.unix(date), "days");
  }

  onMount(async () => (severityData = await getSeverityCounts()));
  let data: any;
  $: data = {
    labels: Object.keys(severityData),
    datasets: [
      {
        data: Object.values(severityData),
        backgroundColor: [
          "#6EE7B7",
          "#CBD5E1",
          "#FCD34D",
          "#FDBA74",
          "#FCA5A5",
        ],
        hoverBackgroundColor: [
          "#6EE7B7",
          "#CBD5E1",
          "#FCD34D",
          "#FDBA74",
          "#FCA5A5",
        ],
      },
    ],
  };

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    // plugins: {
    //   legend: {
    //     display: false
    //   }
    // }
  };
</script>

{#await db.entries.orderBy("dateOfOccurrence").reverse().first() then lastEntry}
  {#if lastEntry}
    <article
      class="flex flex-col shadow-xl mx-auto max-w-sm bg-gradient-to-r from-teal-100 to-teal-300 py-10 px-12 transform duration-500 hover:-translate-y-2 cursor-pointer rounded-md"
    >
      <h1 class="font-extrabold text-6xl mb-10 text-gray-800">
        {daysSinceDate(lastEntry.dateOfOccurrence)}
      </h1>
      <h2 class="font-bold mb-5 text-gray-800">
        {daysSinceDate(lastEntry.dateOfOccurrence) === 1 ? "day" : "days"} since
        last entry
      </h2>
      <p class="text-sm leading-relaxed text-gray-700">
        {#await db.entries.count() then totalEntries}
          <h1>
            Total entries: {totalEntries}
          </h1>
        {/await}
      </p>
    </article>
  {/if}
{/await}

<section
  class="p-5 py-10 mt-6 text-left duration-500 hover:shadow-xl cursor-pointer bg-gray-100  border-2"
>
  <div>
    <h2 class="font-semibold mb-2 mt-4 text-gray-600 text-2xl">Severity</h2>
    <p class="text-sm text-gray-600">
      Severity levels (1 - 5) for all past entries.
    </p>
  </div>

  <div class="flex flex-col space-y-4">
    {#if Object.values(severityData).every((x) => x === 0)}
      <p class="text-sm text-gray-600 pb-4">
        Once you've added some entries, your data will be visualized here.
      </p>
    {:else}
      <Pie height={300} {data} {options} />
    {/if}
  </div>
</section>

{#await db.entries.toArray() then entries}
  <MostCommonLabels {entries} />
{/await}
