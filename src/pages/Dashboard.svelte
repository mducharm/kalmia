<script lang="typescript">
  import { onMount } from "svelte";
  import { db } from "../db/Database";
  import Pie from "svelte-chartjs/src/Pie.svelte";

  let severityData: number[] = [];

  async function getSeverityCounts() {
    let counts: { [key: number]: number } = {};
    await db.entries.each((entry) => {
      if (entry.severity in counts) {
        counts[entry.severity] = counts[entry.severity] + 1;
      } else {
        counts[entry.severity] = 1;
      }
    });
    return Object.values(counts);
  }

  onMount(async() => severityData = await getSeverityCounts());
  let data: any;
  $: data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        data: severityData,
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

<div class="flex flex-col space-y-4">
  {#if severityData.length > 0}
    <Pie height={300} {data} {options} />
  {/if}
</div>
