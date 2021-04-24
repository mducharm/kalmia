<script lang="ts">
  import type { Entry } from "src/types";
  import ViewEntries from "../pages/ViewEntries.svelte";
  import { currentPage } from "../stores/router";
  import { fly } from "svelte/transition";
  export let entry: Entry;

  function goBack() {
    currentPage.set({
      name: "View Entries",
      component: ViewEntries,
    });
  }
</script>

<div style="position:absolute;" transition:fly={{ x: 200, duration: 200 }}>
  <button
    on:click={goBack}
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Back
  </button>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
      Edit
  </button>
  <button
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  >
      Delete
  </button>

  <h1>Entry #{entry.id}</h1>

  <p>Severity: {entry.severity}</p>
  <p>Medicine Taken: {entry.medicineTaken}</p>
  <p>Labels: {entry.labels}</p>
  <h2>Notes: </h2>
  <p>
      {entry.notes}
  </p>
</div>
