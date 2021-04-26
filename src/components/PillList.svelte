<script lang="ts">
  import ToggleablePillButton from "components/ToggleablePillButton.svelte";
  export let items: {text: string, selected: boolean}[];

</script>

{#each items as item}
  <ToggleablePillButton text={item.text} bind:checked={item.selected} />
{/each}
