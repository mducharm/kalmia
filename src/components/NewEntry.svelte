<script lang="typescript">
  import { db } from "../db/Database.js";

  let severity = 1;
  let medicineTaken = false;
  let notes = "";

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
      notes,
      dateOfOccurrence,
    };

    db.entries.add(entry);
  }
</script>

<h1>New Entry</h1>

<form class="flex flex-col mb-5" on:submit|preventDefault>
  <div class="my-3">
    <input type="checkbox" name="medicine-taken" bind:checked={medicineTaken} />
    <label for="medicine-taken">Medicine Taken? </label>
  </div>

  <div class="flex flex-col my-3">
    <h2>Severity</h2>
    <label>
      <input type="radio" bind:group={severity} value={1} />
      Low
    </label>
    <label>
      <input type="radio" bind:group={severity} value={2} />
    </label>
    <label>
      <input type="radio" bind:group={severity} value={3} />
      Medium
    </label>
    <label>
      <input type="radio" bind:group={severity} value={4} />
    </label>
    <label>
      <input type="radio" bind:group={severity} value={5} />
      High
    </label>
  </div>

  <div class="my-3">
    <input type="date" bind:value={dateOfOccurrence} />
    <label for="date-of-occurrence">Date of occurrence</label>
  </div>

  <div class="my-3">
    <h2>Notes</h2>
    <textarea bind:value={notes} name="" id="" cols="30" rows="10" />
  </div>

  <div class="my-3">
    <button
      on:click={saveForm}
      class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      Submit
    </button>
  </div>
</form>
