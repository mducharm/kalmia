<script lang="ts">
  import Tailwind from "./Tailwind.svelte";
  import { currentPage } from "./stores/router";
  import Dashboard from './pages/Dashboard.svelte';
  import Settings from './pages/Settings.svelte';
  import NewEntry from './pages/NewEntry.svelte';
  import ViewEntries from './pages/ViewEntries.svelte';

  const pages = [
    {
      name: "Settings",
      component: Settings
    },
    {
      name: "View Entries",
      component: ViewEntries
    },
    {
      name: "Dashboard",
      component: Dashboard
    },
    {
      name: "New Entry",
      component: NewEntry
    }];

    currentPage.set(pages[1]);
</script>

<Tailwind />

<div class="flex md:flex-row-reverse flex-wrap">
  <!--Main Content-->
  <div class="w-full md:w-4/5 bg-gray-100">
    <div class="container bg-gray-100 pt-16 px-6 pb-16 h-full">
      <svelte:component this={$currentPage.component} />
    </div>
  </div>

  <!--Sidebar-->
  <div
    class="w-full md:w-1/5 bg-gray-900 md:bg-gray-900 px-2 text-center fixed bottom-0 md:pt-8 md:top-0 md:left-0 h-16 md:h-screen md:border-r-4 md:border-gray-600"
  >
    <div class="md:relative mx-auto lg:float-right lg:px-6">

      <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
        {#each pages as page}
          {#if page.name === $currentPage}
            <li class="mr-3 flex-1">
              <a
                href="#"
                class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-green-600"
              >
                <i class="fas fa-link pr-0 md:pr-3 text-green-500" /><span
                  class="pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block"
                >
                  {page.name}
                </span>
              </a>
            </li>
          {:else}
            <li class="mr-3 flex-1">
              <a
                href="#"
                on:click={() => currentPage.set(page)}
                class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-green-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-green-500"
              >
                <i class="fas fa-link pr-0 md:pr-3" /><span
                  class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block"
                >
                  {page.name}
                </span>
              </a>
            </li>
          {/if}
        {/each}
      </ul>

    </div>
  </div>
</div>

<style>
  :root {
    --svelte-rgb: 255, 62, 0;
  }
</style>
