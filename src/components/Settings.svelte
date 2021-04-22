<script>
    import {db} from '../db/Database'

    function clearDatabase() {
        db.entries.clear();
        db.labels.clear();

        console.log("Database cleared.");
    }
</script>
<h1>Settings</h1>

<button on:click="{clearDatabase}" class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Clear Data</button>

