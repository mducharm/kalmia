<script>
  let severity = 1;
  let medicineTaken = false;
  let notes = "";
  let lengthOfOccurrence;

  let now = new Date();

  $: dateString = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

    function saveForm() {
      console.log("Form saved");
    }
</script>

<h1>New Entry</h1>

<p>{dateString}</p>
<p>{notes}</p>
<p>{medicineTaken}</p>
<p>{severity}</p>

<form class="flex flex-col mb-5" on:submit|preventDefault="{saveForm}">
  <div class="my-3">
    <input type="checkbox" name="medicine-taken" bind:checked={medicineTaken} />
    <label for="medicine-taken">Medicine Taken? </label>
  </div>

  <div class="flex flex-col my-3">
    <h2>Severity</h2>
    <label>
      <input type="radio" bind:group={severity} value={1} />
      Low
    </label>
    <label>
      <input type="radio" bind:group={severity} value={2} />
    </label>
    <label>
      <input type="radio" bind:group={severity} value={3} />
      Medium
    </label>
    <label>
      <input type="radio" bind:group={severity} value={4} />
    </label>
    <label>
      <input type="radio" bind:group={severity} value={5} />
      High
    </label>
  </div>

  <div class="my-3">
    <input type="date" bind:value={dateString} />
    <label for="date-of-occurrence">Date of occurrence</label>
  </div>

  <div class="my-3">
    <input type="number" bind:value={lengthOfOccurrence} />
    <label for="date-of-occurrence">hours</label>
  </div>

  <div class="my-3">
    <h2>Notes</h2>
    <textarea bind:value={notes} name="" id="" cols="30" rows="10" />
  </div>

  <div class="my-3">
    <button on:click={saveForm}>Submit</button>
  </div>
</form>
