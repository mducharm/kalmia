<script lang="ts">
  export let checked = false;
  export let text: string;

  let colors: string;
  $: colors = checked
    ? `bg-blue-500 hover:bg-blue-700 text-white`
    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
</script>

<div
    on:click="{() => checked = !checked}"
    class="{colors} font-bold py-3 px-6 rounded-full flex flex-row"
>
  <input type="checkbox" bind:checked={checked} class="h-5 w-5 "/>
  <label for="{text}" class="pl-2">{text}</label>
  <slot></slot>
</div>
