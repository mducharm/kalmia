<script lang="ts">
  export let checked = false;
  export let text: string;

  let colors: string;
  $: colors = checked
    ? `bg-emerald-200 hover:bg-emerald-600 text-black`
    : "bg-gray-200 hover:bg-gray-400 text-gray-700"
</script>

<div
    on:click="{() => checked = !checked}"
    class="{colors} font-bold py-3 px-6 rounded-lg flex flex-row items-center"
>
  <input type="checkbox" bind:checked={checked} class="h-5 w-5 flex-none checked:bg-emerald-800 rounded-full"/>
  <label for="{text}" class="pl-4 flex-1">{text}</label>
  <slot></slot>
</div>
