<script lang="ts">
  import type { Entry } from "src/types";

  export let entries: Entry[];

  let allEntryLabels = entries.map((e) => e.labels);

  /**
   * Gets counts for particular pairings of labels.
   */
  function getLabelCounts(allLabels: string[][]): Array<[string[], number]> {
    let counts = new Map<string, number>();
    for (let labels of allLabels) {
      // temporarily convert labels to single string for easier counting
      let currentCount = counts.get(labels.join(",")) ?? 0;
      counts.set(labels.join(","), currentCount + 1);
    }

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map((x) => [x[0].split(","), x[1]]); // convert string back to array
  }

  let isLabelBlank = (x: string[]) => x.filter((x) => x !== "").length === 0;

  let counts = getLabelCounts(allEntryLabels);
  console.log(counts);
</script>

<section
  class="bg-gradient-to-b from-white to-blue-200 p-5 py-10 mt-6 text-left transform duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-gray-100 divide-y border-2"
>
  <div>
    <h2 class="font-semibold mb-2 mt-4 text-gray-600 text-2xl">
      Most Common Labels
    </h2>
    <p class="text-sm text-gray-600">
      Shows how often each set of labels occurs in your past entries.
    </p>
  </div>
  {#each counts as [labels, count]}
    <div class="flex flex-row justify-between py-4 text-gray-600 mt-2">
      <span class="flex flex-row flex-wrap">
        {#if isLabelBlank(labels)}
          <div class="border rounded px-3 py-2 mr-2 mb-2 shadow-md bg-white">
            None
          </div>
        {:else}
          {#each labels as label}
            <div class="border rounded px-3 py-2 mr-2 mb-2 shadow-md bg-white">
              {label}
            </div>
          {/each}
        {/if}
      </span>
      <span
        class="bg-white inline-flex items-center justify-center px-3 py-2 mr-2 my-auto text-lg font-bold leading-none rounded-full shadow-md ring-1 ring-blue-500"
      >
        {count}
      </span>
    </div>
  {/each}
</section>
