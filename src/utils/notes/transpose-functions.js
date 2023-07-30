import { calculateNoteFromInterval } from "../intervals/intervals-functions";

// This function transposes a list of notes
export const transpose = (notes, interval, asc = true) => {
    const transposedNotes = [];

    notes.map(note => {
        transposedNotes.push(calculateNoteFromInterval(note, interval, asc));
    })

    return transposedNotes;
}