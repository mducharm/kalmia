<script lang="ts">
  import type { Entry } from "src/types";
  import { db } from "../db/Database.js";
  import ButtonWithToaster from "components/ButtonWithToaster.svelte";
  import ToggleButton from "components/ToggleButton.svelte";
  import MedicinePill from "components/MedicinePill.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import { getSeverityColor } from "../utils";
  import { goToSettings } from "../stores/router";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  dayjs.extend(customParseFormat);

  const dispatcher = createEventDispatcher();

  export let entry: Entry;

  let allLabels: { text: string; selected: boolean }[] = [];
  let dateInputValue = dayjs.unix(entry.dateOfOccurrence).format("YYYY-MM-DD");
  let severityColor: string;
  $: severityColor = getSeverityColor(entry.severity);

  function saveForm() {
    entry.labels = allLabels.filter((l) => l.selected).map((l) => l.text);
    entry.dateOfOccurrence = dayjs(dateInputValue, "YYYY-MM-DD").unix();

    if (entry.id) db.entries.update(entry.id, entry);

    dispatcher("save");
  }

  onMount(async () => {
    let labelsFromDB = await db.labels.toArray();
    allLabels = labelsFromDB.map((l) => ({
      text: l.name,
      selected: entry.labels.includes(l.name),
    }));
  });
</script>

<form
  class="mb-5 rounded pb-8 divide-y-2 divide-teal-900 divide-opacity-20"
  on:submit|preventDefault
>
  <div class="pt-4">
    <p class="text-sm text-gray-600">
      Edit details using the form below.
    </p>
  </div>

  <div class="flex flex-col my-4 md:mx-auto md:w-1/2 py-6">
    <h2 class="my-3 font-bold">Severity</h2>
    <p class="text-sm text-gray-600">
      Estimate how bad you feel from best (1) to worst (5).
    </p>
    <h2 class="mx-auto text-4xl mt-2">
      {entry.severity}
    </h2>
    <input
      class="mx-auto mt-3 w-full appearance-none rounded-full {severityColor}"
      type="range"
      min="1"
      max="5"
      bind:value={entry.severity}
    />
  </div>

  <div class="py-6">
    <p class="text-sm text-gray-600 pb-4">
      Did you miss a dose of medicine leading up to your current symptoms?
    </p>
    <ToggleButton bind:checked={entry.medicineTaken} text="Medicine Taken" />
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
        You can add custom labels under <b
          on:click={goToSettings}
          class="underline cursor-pointer">Settings</b
        >.
      </p>
    {/if}

    {#each allLabels as label}
      <ToggleButton text={label.text} bind:checked={label.selected} />
    {/each}
  </div>

  <div class="my-3 py-6">
    <h2 class="mx-auto pb-4">Notes</h2>
    <textarea
      bind:value={entry.notes}
      name=""
      id=""
      cols="30"
      rows="10"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div class="my-8">
    <ButtonWithToaster action={saveForm} text="Save" />
  </div>
</form>
