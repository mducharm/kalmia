<script lang="ts">
  import { blur } from "svelte/transition";
  export let action: () => void;

  let showModal = false;
  $: if (showModal)
    setTimeout(() => (showModal = false), 2000);

  let handleSuccess = () => {
    action();
    showModal = true;
  };
</script>

<button
  on:click={handleSuccess}
  class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full"
>
  Submit
</button>

{#if showModal}
  <div
    transition:blur={{ duration: 400 }}
    class="fixed inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-start justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed bg-gray-500 bg-opacity-0 transition-opacity"
        aria-hidden="true"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle"
        aria-hidden="true">&#8203;</span
      >

      <div
        class="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div
          class="space-x-2 bg-green-50 p-4 rounded flex items-center text-green-600 my-4 shadow-lg mx-auto max-w-2xl w-full"
        >
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current w-5 pt-1"
              viewBox="0 0 24 24"
              ><path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"
              /></svg
            >
          </div>
          <h3 class="text-green-800 tracking-wider flex-1">Added new entry.</h3>
        </div>
      </div>
    </div>
  </div>
{/if}
