<script lang="typescript">
  import { onMount } from "svelte";
  import { db } from "../db/Database";
  import Pie from "svelte-chartjs/src/Pie.svelte";
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


{#await db.entries
      .orderBy("dateOfOccurrence")
      .reverse()
      .first()
 then lastEntry}
 {#if lastEntry}
  <h1>Last entry: {dayjs.unix(lastEntry.dateOfOccurrence).format("YYYY-MM-DD")}</h1>   
 {/if}
{/await}

{#await db.entries.count() then totalEntries}
 <h1>
   Total entries: {totalEntries} 
 </h1>
{/await}

<div class="flex flex-col space-y-4">
  {#if Object.values(severityData).every((x) => x === 0)}
    <p class="text-sm text-gray-600 pb-4">
      Once you've added some entries, your data will be visualized here.
    </p>
  {:else}
    <Pie height={300} {data} {options} />
  {/if}
</div>
