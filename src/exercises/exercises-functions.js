import { calculateNoteFromInterval } from "../utils/intervals/intervals-functions";
import { getRandomNote, getRandomNoteNoDouble, isNoteHigher } from "../utils/notes/notes-functions";

import Note from "../utils/notes/note";
import Interval from "../utils/intervals/interval";
import Key from "../utils/keys/key";

export const getAvailableClefs = grade => {
    const clefs = ["treble", "bass"];

    if (grade > 3) {
        clefs.push("alto");
    }

    if (grade > 4) {
        clefs.push("tenor");
    }

    return clefs;
}

export const getClefBounds = (grade, clef) => {
    let lowerNote, higherNote, octaves;

    switch (clef) {
        case "alto":
            lowerNote = new Note("Ex2");
            higherNote = new Note("AB5");
            octaves = [2, 3, 4, 5];
            break;
        case "tenor":
            lowerNote = new Note("Cx2");
            higherNote = new Note("FB5");
            octaves = [2, 3, 4, 5];
            break;
        case "treble":
            if (grade === 1) {
                lowerNote = new Note("Bx3");
                higherNote = new Note("AB5");
                octaves = [3, 4, 5];
            } else if (grade === 2) {
                lowerNote = new Note("Fx3");
                higherNote = new Note("EB6");
                octaves = [3, 4, 5, 6];
            } else if (grade >= 3) {
                lowerNote = new Note("Dx3");
                higherNote = new Note("GB6");
                octaves = [3, 4, 5, 6];
            }
            break;
        case "bass":
            if (grade === 1) {
                lowerNote = new Note("Fx2");
                higherNote = new Note("DB4");
                octaves = [2, 3, 4];
            } else if (grade === 2) {
                lowerNote = new Note("Ax1");
                higherNote = new Note("GB4");
                octaves = [1, 2, 3, 4];
            } else if (grade >= 3) {
                lowerNote = new Note("Fx1");
                higherNote = new Note("BB4");
                octaves = [1, 2, 3, 4];
            }
            break;
        default:
            return;
    }
    return { lowerNote, higherNote, octaves };
}

export const getRandomClef = grade => {
    const clefs = getAvailableClefs(grade);

    return clefs[Math.floor(Math.random() * clefs.length)];
}

export const getClefKeyAndNote = (grade, numOfNotes = 1) => {
    let note;
    const notes = [];

    const clef = getRandomClef(grade);
    const { lowerNote, higherNote } = getClefBounds(grade, clef);

    const key = Math.floor(Math.random() * 2) === 0 ? Key.getRandomMajorKey(grade) : undefined;

    for (let i = 0; i < numOfNotes; i++) {
        note = grade < 4 ? getRandomNoteNoDouble(1, 6) : getRandomNote(1, 6);

        while (
            isNoteHigher(higherNote, note)
            || isNoteHigher(note, lowerNote)
            || (key !== undefined && !key.isNotePartOfKey(note))
        ) {
            note = grade < 4 ? getRandomNoteNoDouble(1, 6) : getRandomNote(1, 6);
        }
        notes.push(note);
    }

    return {
        clef,
        key,
        notes
    }
}

export const removeAccidentals = notes => {
    const newNotes = notes.map(note => {
        return new Note(`${note.getLetterName()}${note.getOctave()}`)
    })

    return newNotes;
}

export const tamperChord = notes => {
    let newNotes = notes.slice();
    let newNoteIndex = Math.floor(Math.random() * notes.length);
    let asc = Math.floor(Math.random() * 2) === 1 ? true : false;

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("augmented 1"), asc);
    newNotes[newNoteIndex] = newNote;
    return newNotes;
}

export const tamperChordNoDouble = notes => {
    let newNotes = notes.slice();
    let newNoteIndex = Math.floor(Math.random() * notes.length);
    let asc = Math.floor(Math.random() * 2) === 1 ? true : false;

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("augmented 1"), asc);

    while (newNote.getAccidentalInSemitones() < -1 || newNote.getAccidentalInSemitones() > 1) {
        newNoteIndex = Math.floor(Math.random() * notes.length);
        asc = Math.floor(Math.random() * 2) === 1 ? true : false;

        newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("augmented 1"), asc);
    }

    newNotes[newNoteIndex] = newNote;
    return newNotes;
}

export const tamperMelodyNoDouble = (notes) => {
    let newNotes = notes.slice();
    let newNoteIndex = Math.floor(Math.random() * notes.length);
    let asc = Math.floor(Math.random() * 2) === 1 ? true : false;

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("major 2"), asc);

    while (newNote.getAccidentalInSemitones() < -1 || newNote.getAccidentalInSemitones() > 1) {
        newNoteIndex = Math.floor(Math.random() * notes.length);
        asc = Math.floor(Math.random() * 2) === 1 ? true : false;

        newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("major 2"), asc);
    }

    newNotes[newNoteIndex] = newNote;
    return newNotes;
}

export const tamperChromaticScale = (scale) => {
    const intervals = ["augmented 1", "minor 2"];
    let randomNote = Math.floor(Math.random() * scale.length);
    let randomInterval = Math.floor(Math.random() * intervals.length);
    let asc = Math.floor(Math.random() * 2) === 0 ? false : true;

    let newNote = calculateNoteFromInterval(scale[randomNote], new Interval(intervals[randomInterval]), asc);

    while (
        newNote.getNoteWithoutOctave() === "undefined" ||
        newNote.getAccidentalInSemitones() < -1 ||
        newNote.getAccidentalInSemitones() > 1
        ) {
        randomInterval = Math.floor(Math.random() * intervals.length);
        asc = Math.floor(Math.random() * 2) === 0 ? false : true;
        newNote = calculateNoteFromInterval(scale[randomNote], new Interval(intervals[randomInterval]), asc);
    }

    scale[randomNote] = newNote;

    return { scale, index: randomNote };
}