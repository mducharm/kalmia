import Dexie from 'dexie';
import type { Entry, Label } from 'src/types';

export class Database extends Dexie {
    entries: Dexie.Table<Entry, number>;
    labels: Dexie.Table<Label, number>;
    
    constructor() {  
      super("Database");
      this.version(1).stores({
        entries: '++id, severity, medicineTaken, dateOfOccurrence, *labels, notes',
        labels: '++id, name'
      });
      
      this.entries = this.table("entries");
      this.labels = this.table("labels");
    }
}

export const db = new Database();
