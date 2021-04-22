<script>
    import {db} from '../db/Database'

    function clearDatabase() {
        db.entries.clear();
        db.labels.clear();

        console.log("Database cleared.");
    }
</script>
<h1>Settings</h1>

<button on:click="{clearDatabase}">Clear Data</button>

