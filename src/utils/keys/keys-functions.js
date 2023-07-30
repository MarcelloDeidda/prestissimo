import { notes } from "../notes/notes-utils";
import { calculateNoteFromInterval } from "../intervals/intervals-functions";
import { keys, accidentalsIndexes } from "./keys-utils";

import Interval from "../intervals/interval";
import Note from "../notes/note";

// Return accidentals from keyConfig as object (e.g.: { type: "#", number: 2})
export const printAccidentals = keyConfig => {
    const accidentals = [];

    if (keyConfig.type === "#") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[accidentalsIndexes[i]]}#`);
        }
    } else if (keyConfig.type === "b") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[accidentalsIndexes[accidentalsIndexes.length - i - 1]]}b`);
        }
    }

    return accidentals;
}

// Returns key signature as Array from key as string (e.g.: "D major")
export const getKeySignature = key => {
    const keyInfo = key.split(" ");

    let tonic;
    let mode = keyInfo[1];

    if (mode === "major") {
        tonic = new Note(`${keyInfo[0]}1`);
    } else if (mode === "minor") {
        tonic = calculateNoteFromInterval(new Note(`${keyInfo[0]}1`), new Interval("minor 3"));
    }

    return printAccidentals(keys[tonic.getNoteWithoutOctave()]);
}