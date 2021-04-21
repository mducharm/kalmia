
<script lang="typescript">
import { onMount } from 'svelte';
import { Database } from '../db/Database'

  let db = new Database();

  async function getEntries() {
      return await db.entries.orderBy('id').toArray();
  }

  
  onMount(() => {
      getEntries().then(entries => {
          console.log(entries);
      })
  })

</script>
<h1>hkpp</h1>
<p>Tracking chronic health symptoms over time</p>

<h1>Dashboard</h1>