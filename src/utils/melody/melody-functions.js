import { getRandomNoteFromScale } from "../notes/notes-functions";
import { calculateInterval } from "../intervals/intervals-functions";
import { startingDegrees } from "./melody-utils";

import Note from "../notes/note";
import Key from "../keys/key";

export const writeRandomMelody = (grade, octave, numOfNotes) => {
    const melody = [];

    const key = Key.getRandomKey(grade);
    const tonic = new Note(`${key.getTonic()}${octave}`);
    let scale = key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic;

    let degree = startingDegrees[Math.floor(Math.random() * startingDegrees.length)];
    let note = scale[degree - 1];

    melody.push(note);

    while (melody.length < numOfNotes) {
        note = getRandomNoteFromScale(scale);

        let interval = calculateInterval(melody[melody.length - 1], note);

        while (
            interval.getDistance() > 4 ||
            note.getNote() === melody[melody.length - 1].getNote() ||
            !["major", "perfect", "minor"].includes(interval.getQuality())
        ) {
            note = getRandomNoteFromScale(scale);
            interval = calculateInterval(melody[melody.length - 1], note);
        }

        melody.push(note);
    }

    return { melody, key };
}