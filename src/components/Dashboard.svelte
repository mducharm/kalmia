<script lang="typescript">
  import { onMount } from "svelte";
  import EntriesList from './EntriesList.svelte'
  import { db } from "../db/Database";
</script>

<h1>hkpp-tracker</h1>
<p>Tracking chronic health symptoms over time</p>

<h1>Dashboard</h1>

<EntriesList></EntriesList>
