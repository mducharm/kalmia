<script lang="typescript">
  import { db } from "../db/Database.js";
  import ButtonWithToaster from "components/ButtonWithToaster.svelte";
  import ToggleablePillButton from "components/ToggleablePillButton.svelte";
  import PillList from "components/PillList.svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import { onMount } from "svelte";
  import { getSeverityColor } from "../utils.js";

  let severity = 1;
  let severityColor: string;
  $: severityColor = getSeverityColor(severity);

  let medicineTaken = false;
  let notes = "";
  let allLabels: {text: string, selected: boolean}[] = [];
  let labels: string[] = [];
  $: labels = allLabels.filter(l => l.selected).map(l => l.text);

  let now = new Date();

  $: dateOfOccurrence = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  function saveForm() {
    let entry = {
      severity,
      medicineTaken,
      labels,
      notes,
      dateOfOccurrence,
    };

    db.entries.add(entry);
  }

  onMount(async () => {
    let labelsFromDB = await db.labels.toArray();
    allLabels = labelsFromDB.map(l => ({
      text: l.name,
      selected: false
    }))
  });
</script>

<form class="mb-5 rounded pt-6 pb-8" on:submit|preventDefault>
  <div class="my-3">
    <ToggleablePillButton bind:checked={medicineTaken} text="Medicine Taken?" toggledColor="teal">
      <MedicinePill bind:active={medicineTaken} />
    </ToggleablePillButton>
  </div>

  <div class="flex flex-col my-3 md:mx-auto md:w-1/2">
    <h2 class="mx-auto my-3 font-bold uppercase">Severity</h2>
    <h2 class="mx-auto text-4xl">
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
      class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring w-full"
    />
  </div>

  <div class="flex flex-row flex-wrap my-3">
    <h1>Labels</h1>

    <PillList
      bind:items={allLabels}
    />

  </div>

  <div class="my-3">
    <h2 class="mx-auto pb-4">Notes</h2>
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
    <ButtonWithToaster action={saveForm} />
  </div>
</form>
