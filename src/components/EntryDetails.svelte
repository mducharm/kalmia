<script lang="ts">
  import type { Entry } from "src/types";
  import ViewEntries from "../pages/ViewEntries.svelte";
  import { currentPage } from "../stores/router";
  import { fly } from "svelte/transition";
  import { db } from "../db/Database";
  import ButtonWithConfirm from "components/ButtonWithConfirm.svelte";
  export let entry: Entry;

  function goBack() {
    currentPage.set({
      name: "View Entries",
      component: ViewEntries,
    });
  }
  async function deleteEntry() {
    if (entry.id) {
      await db.entries.delete(entry.id);
      goBack();
    }
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
  <ButtonWithConfirm
    actionName="Delete"
    contents="Are you sure you wish to delete this entry?"
    action={deleteEntry}
  />

  <h1>Entry #{entry.id}</h1>

  <p>Severity: {entry.severity}</p>
  <p>Medicine Taken: {entry.medicineTaken}</p>
  <p>Labels: {entry.labels}</p>
  <h2>Notes:</h2>
  <p>
    {entry.notes}
  </p>
</div>
