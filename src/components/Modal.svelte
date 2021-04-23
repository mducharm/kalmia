<script>
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";
  export let showModal = false;

  $: if (showModal) setTimeout(() => showModal = false, 2000);

</script>

{#if showModal}
  <div
    transition:blur={{ duration: 400 }}
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
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
          <button
            on:click={() => (showModal = !showModal)}
            class="inline-flex items-center hover:bg-green-100 border border-green-50 hover:border-green-300 hover:text-green-900 focus:outline-none rounded-full p-2 hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current w-4 h-4 pt-1"
              viewBox="0 0 24 24"
              ><path
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
              /></svg
            >
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
