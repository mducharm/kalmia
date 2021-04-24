<script lang="typescript">
  import { onMount } from "svelte";
  import { db } from "../db/Database";
  import Pie from "svelte-chartjs/src/Pie.svelte";

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

<div class="flex flex-col space-y-4">
  <Pie height={300} {data} {options} />
</div>
