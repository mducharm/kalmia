<script lang="typescript">
  import { onMount } from "svelte";
  import EntriesList from '../components/EntriesList.svelte'
  import { db } from "../db/Database";
</script>


<div>
    <h2>
        View Entries
    </h2>
    
    <EntriesList></EntriesList>
</div>