<script lang="typescript">
  import { db } from "../db/Database.js";
  import Modal from "../components/Modal.svelte";
  import { onMount } from "svelte";
  import type { Label } from "src/types.js";
  import { getSeverityColor } from "../utils.js";

  let showModal = false;

  let severity = 1;
  let severityColor: string;
  $: severityColor = getSeverityColor(severity);

  let medicineTaken = false;
  let notes = "";
  let allLabels: Label[] = [];
  let labels: string[] = [];

  let now = new Date();

  $: dateOfOccurrence = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  function saveForm() {
    console.log("Form saved");
    let entry = {
      severity,
      medicineTaken,
      labels,
      notes,
      dateOfOccurrence,
    };

    db.entries.add(entry);

    showModal = true;
  }

  onMount(async () => {
    allLabels = await db.labels.toArray();
  });
</script>

<Modal bind:showModal />

<h1>New Entry</h1>

<form class="mb-5 bg-white rounded pt-6 pb-8" on:submit|preventDefault>
  <div class="my-3">
    <input type="checkbox" name="medicine-taken" bind:checked={medicineTaken} />
    <label for="medicine-taken">Medicine Taken? </label>
  </div>

  <div
    class="flex flex-col my-3 md:mx-auto md:w-1/2"
  >
    <h2 class="mx-auto my-3 font-bold uppercase">Severity</h2>
    <h2 class="mx-auto text-5xl">
      {severity}
    </h2>
    <input
      class="mx-auto my-3 w-full"
      type="range"
      min="1"
      max="5"
      bind:value={severity}
    />
  </div>

  <div class="my-3">
    <input
      type="date"
      bind:value={dateOfOccurrence}
      class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
    />
  </div>

  <div class="flex flex-col my-3">
    <h1>Labels</h1>
    {#each allLabels as label}
      <input type="checkbox" />
      <label for="date-of-occurrence">{label.name}</label>
    {/each}
  </div>

  <div class="my-3">
    <h2>Notes</h2>
    <textarea
      bind:value={notes}
      name=""
      id=""
      cols="30"
      rows="10"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div class="my-3">
    <button
      on:click={saveForm}
      class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full"
    >
      Submit
    </button>
  </div>
</form>
