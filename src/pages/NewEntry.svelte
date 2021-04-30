<script lang="typescript">
  import { db } from "../db/Database.js";
  import ButtonWithToaster from "components/ButtonWithToaster.svelte";
  import ToggleButton from "components/ToggleButton.svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import { onMount } from "svelte";
  import { getSeverityColor } from "../utils";
  import { goToSettings } from "../stores/router";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  dayjs.extend(customParseFormat);

  let severity = 1;

  let medicineTaken = false;
  let notes = "";
  let allLabels: { text: string; selected: boolean }[] = [];
  let labels: string[] = [];
  $: labels = allLabels.filter((l) => l.selected).map((l) => l.text);

  let dateInputValue = dayjs().format("YYYY-MM-DD");
  $: dateOfOccurrence = dayjs(dateInputValue, "YYYY-MM-DD").unix();

  let severityColor: string;
  $: severityColor = getSeverityColor(severity);

  function saveForm() {
    let entry = {
      severity,
      medicineTaken,
      labels,
      notes,
      dateOfOccurrence,
    };

    db.entries.add(entry);

    severity = 1;
    medicineTaken = false;
    labels = [];
    notes = "";
    dateInputValue = dayjs().format("YYYY-MM-DD");

    allLabels = allLabels.map((l) => ({
      text: l.text,
      selected: false,
    }));
  }

  onMount(async () => {
    let labelsFromDB = await db.labels.toArray();
    allLabels = labelsFromDB.map((l) => ({
      text: l.name,
      selected: false,
    }));
  });
</script>

<form
  class="mb-5 rounded pb-8 divide-y-2 divide-teal-900 divide-opacity-20"
  on:submit|preventDefault
>
  <div class="py-5">
    <p class="text-sm text-gray-600">
      Not feeling well? Record details by submitting a new entry below.
    </p>
  </div>

  <div class="flex flex-col my-4 md:mx-auto md:w-1/2 py-6">
    <h2 class="my-3 font-bold">Severity</h2>
    <p class="text-sm text-gray-600">
      Estimate how bad you feel from best (1) to worst (5).
    </p>
    <h2 class="mx-auto text-4xl mt-2">
      {severity}
    </h2>
    <input
      class="mx-auto mt-3 w-full appearance-none rounded-full {severityColor}"
      type="range"
      min="1"
      max="5"
      bind:value={severity}
    />
  </div>

  <div class="py-6">
    <p class="text-sm text-gray-600 pb-4">
      Did you miss a dose of medicine leading up to your current symptoms?
    </p>
    <ToggleButton bind:checked={medicineTaken} text="Medicine Taken" />
  </div>

  <div class="py-6">
    <p class="text-sm text-gray-600 pb-4">
      When did you start feeling your current symptoms?
    </p>
    <input
      type="date"
      bind:value={dateInputValue}
      class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring w-full"
    />
  </div>

  <div class="flex flex-col my-3 py-6">
    <h1 class="pb-4">Labels</h1>

    {#if allLabels.length === 0}
      <p class="text-sm text-gray-600 pb-4">
        You can add custom labels under <b on:click="{goToSettings}">Settings</b>.
      </p>
    {/if}

    {#each allLabels as label}
      <ToggleButton text={label.text} bind:checked={label.selected} />
    {/each}
  </div>

  <div class="my-3 py-6">
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

  <div class="my-8">
    <ButtonWithToaster action={saveForm} />
  </div>
</form>
