<script lang="ts">
  import { db } from "../db/Database";
  import type { Entry } from "src/types";
  import { onMount } from "svelte";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  dayjs.extend(customParseFormat);

  export let filename = "kalmia-data";

  let data = "";

  async function getEntries(): Promise<Entry[]> {
    return await db.entries.toArray();
  }

  function download(data: string, filename: string) {
    const bom = "\ufeff";
    let csvContent = data;
    const csvData = new Blob([`${bom}${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });
    let csvURL = "";
    if (navigator.msSaveBlob) {
      csvURL = navigator.msSaveBlob(csvData, `${filename}.csv`);
    } else {
      csvURL = window.URL.createObjectURL(csvData);
    }
    const link = document.createElement("a");
    link.href = csvURL;
    link.setAttribute("download", `${filename}.csv`);
    link.click();
    link.remove();
  }

  function convertEntryToRow(entry: Entry): string {
    return [
      entry.id,
      entry.severity,
      entry.medicineTaken,
      dayjs.unix(entry.dateOfOccurrence).format("MM-DD-YYYY"),
      `"${entry.labels.join(",")}"`, // escape commas
      entry.notes
  ].join(",")
  }

  onMount(async () => {
    let entries = await getEntries();

    data = [
      `Id,Severity,"Medicine Taken","Date of Occurrence",Labels,Notes`,
      ...entries.map(convertEntryToRow)
    ].join(`\r\n`)
  });
</script>

<button
  on:click={() => download(data, filename)}
  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >Export to CSV</button
>
