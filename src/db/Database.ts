import Dexie from 'dexie';

export class Database extends Dexie {
    entries: Dexie.Table<IEntry, number>;
    
    constructor() {  
      super("Database");
      this.version(1).stores({
        entries: '++id, severity, medicineTaken, lengthOfOccurrence, dateOfOccurrence, notes',
      });
      
      this.entries = this.table("entries");
    }
}

export interface IEntry {
    id?: number,
    severity: number,
    medicineTaken: boolean,
    lengthOfOccurrence: number,
    dateOfOccurrence: string,
    notes: string,
}