<script lang="ts">
  import { Workbox, messageSW } from "workbox-window";
  import { onMount } from "svelte";

  const workbox = new Workbox(import.meta.env.SNOWPACK_PUBLIC_SERVICE_WORKER);

  const setRegistration = (r: ServiceWorkerRegistration) => {
    if (r && r.waiting) {
      messageSW(r.waiting, { type: "SKIP_WAITING" });
      window.location.reload();
    }
  };

  onMount(() => {
    if ("serviceWorker" in navigator) {
      workbox.register().then((r) => {
        if (r !== undefined) setRegistration(r);
      });
    }
  });
</script>
