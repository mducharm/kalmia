export type Entry = {
    id?: number,
    severity: number,
    medicineTaken: boolean,
    dateOfOccurrence: string,
    labels: string[]
    notes: string,
}

export type Label = {
    id?: number,
    name: string,
}