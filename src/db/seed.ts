import dayjs from 'dayjs';
import { db } from './Database'

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const times = (x: number) => (f: Function) => {
    if (x > 0) {
        f()
        times(x - 1)(f)
    }
}

const getRandomGrouping = (labels: string[]): string[] => {
    let numberOfLabels = getRandomInt(0, labels.length + 1);

    let indexes = [];

    for (let i = 0; i < numberOfLabels; i++) {
       indexes.push(getRandomInt(0, labels.length + 1)) 
    }

    return Array.from(new Set(indexes))
        .map(i => labels[i])
        .filter(s => s !== undefined && s.length > 0);
}

const getRandomDate = (): number => 
    dayjs().subtract(1, 'month').date(getRandomInt(1, 31)).unix();

/** Generates fake entries for demo & testing purposes */
export async function seed() {
    let labels = [
        `❄️ Cold ❄️`,
        `Overexertion`,
        `💤 Lack of sleep 💤`,
    ]

    for (let label of labels)
        await db.labels.add({ name: label });

    times(50)(() => {

        let entry = {
            severity: getRandomInt(1, 6),
            medicineTaken: getRandomInt(0, 2) === 1,
            labels: getRandomGrouping(labels),
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            dateOfOccurrence: getRandomDate(),
        };

        db.entries.add(entry);
    });


}