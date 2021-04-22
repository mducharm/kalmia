<script lang="typescript">
  import { onMount } from "svelte";
  import { db } from "../db/Database";
  import type { Entry, Label } from "src/types";

  let entries: Entry[] = [];

  onMount(async () => {
    entries = await db.entries.toArray();
  });
</script>

<h2>Entries</h2>
{#each entries as entry}
  <p>
    {entry.id}
    {entry.severity}
    {entry.notes}
  </p>
{/each}
