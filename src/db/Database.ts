import Dexie from 'dexie';

export class Database extends Dexie {
    entries: Dexie.Table<IEntry, number>;
    labels: Dexie.Table<ILabel, number>;
    
    constructor() {  
      super("Database");
      this.version(1).stores({
        entries: '++id, severity, medicineTaken, dateOfOccurrence, notes',
        labels: '++id, name'
      });
      
      this.entries = this.table("entries");
      this.labels = this.table("labels");
    }
}

export interface IEntry {
    id?: number,
    severity: number,
    medicineTaken: boolean,
    dateOfOccurrence: string,
    notes: string,
}

export interface ILabel {
    id?: number,
    name: string,
}