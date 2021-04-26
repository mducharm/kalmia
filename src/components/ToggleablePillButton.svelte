<script lang="ts">
  export let checked = false;
  export let text: string;
  export let toggledColor = "blue";

  let colors: string;
  $: colors = checked
    ? `bg-${toggledColor}-500 hover:bg-${toggledColor}-700 text-white`
    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
</script>

<div
    on:click="{() => checked = !checked}"
    class="{colors} font-bold py-2 px-2 rounded-full flex flex-row"
>
  <input type="checkbox" bind:checked={checked} class="mx-3 px-3 py-3 h-5 w-5 "/>
  <label for="{text}" class="px-2">{text}</label>
</div>
