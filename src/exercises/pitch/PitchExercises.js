import { chromaticScale } from "../../utils/notes/notes-utils";
import { isNoteHigher, getRandomNote, getRandomNoteNoDouble, availableAccidentals } from "../../utils/notes/notes-functions";
import { calculateInterval, calculateNoteFromInterval } from "../../utils/intervals/intervals-functions";
import { getAvailableClefs, getClefKeyAndNote, removeAccidentals } from "../exercises-functions";

import Note from "../../utils/notes/note";
import Key from "../../utils/keys/key";
import Interval from "../../utils/intervals/interval";
import Exercise from "../exercise";

const PitchExercises = class {
    #grade;
    #octaves = [2, 3, 4, 5]

    constructor(grade) {
        this.#grade = grade;
    }

    #getSemitoneOrTone() {
        let note1, note2;

        if (this.#grade < 4) {
            note1 = getRandomNoteNoDouble(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);
        } else {
            note1 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);
        }

        const intervals = ["augmented 1", "minor 2", "major 2"]
        let random = Math.floor(Math.random() * 3);

        note2 = calculateNoteFromInterval(note1, new Interval(intervals[random]), Math.floor(Math.random() * 2) === 1 ? true : false);

        while (
            (this.#grade < 4 && (note2.getAccidentalInSemitones() < -1 || note2.getAccidentalInSemitones() > 1)) ||
            note2.getNoteWithoutOctave() === "undefined"
        ) {
            random = Math.floor(Math.random() * 3);
            note2 = calculateNoteFromInterval(note1, new Interval(intervals[random]), Math.floor(Math.random() * 2) === 1 ? true : false);
        }

        return { note1, note2 }
    }

    nameNote() {
        const { clef, key, notes } = getClefKeyAndNote(this.#grade);

        let answer = notes[0].getNoteWithoutOctave();
        let question = "What is the name of the following note?";
        const options = [answer];

        for (let i = 0; i < 3; i++) {
            let option;
            option = this.#grade < 4 ? getRandomNoteNoDouble(3, 4) : getRandomNote(1, 6);

            while (
                options.includes(option.getNoteWithoutOctave())
                || (key === undefined && option.getAccidentalInSemitones() !== notes[0].getAccidentalInSemitones())
            ) {
                option = this.#grade < 4 ? getRandomNoteNoDouble(3, 4) : getRandomNote(1, 6);
            }

            options.push(option.getNoteWithoutOctave());
        }

        options.sort(() => -0.5 + Math.random())

        const settings = {
            clef,
            key,
            showClef: true,
            optionType: "multiple"
        }

        return new Exercise(question, answer, options, settings, notes);
    }

    addClef() {
        const { clef, notes } = getClefKeyAndNote(this.#grade);

        let answer = clef;
        let noteName = notes[0].getNoteWithoutOctave();

        if (noteName.length > 1 && noteName[noteName.length - 1] === "B") {
            noteName = noteName[0] + "\u{1D12B}";
        }

        let question = `Choose a clef to make this note a ${noteName}`;
        const options = getAvailableClefs(this.#grade);

        options.sort(() => -0.5 + Math.random())

        const settings = {
            clef,
            key: undefined,
            showClef: false,
            optionType: "multiple"
        }

        return new Exercise(question, answer, options, settings, notes);
    }

    isSecondNoteHigher() {
        const { clef, notes } = getClefKeyAndNote(this.#grade);

        let note1 = notes[0];
        let newAccidental;
        const accidentals = availableAccidentals(this.#grade);

        let index = accidentals.indexOf(note1.getAccidental());
        accidentals.splice(index, 1);

        newAccidental = accidentals[Math.floor(Math.random() * accidentals.length)];

        let note2 = new Note(`${note1.getLetterName()}${newAccidental}${note1.getOctave()}`);
        console.log(accidentals)

        let question = `Is the second note higher or lower than the first?`;

        const answer = isNoteHigher(note1, note2) ? "higher" : "lower";
        const options = ["higher", "lower"];

        options.sort(() => -0.5 + Math.random())

        const settings = {
            clef,
            key: undefined,
            showClef: true,
            optionType: "multiple"
        }

        return new Exercise(question, answer, options, settings, [note1, note2]);
    }

    findEnharmonicEquivalent() {
        if (this.#grade < 4) {
            throw new Error("The no-accidental version of this exercise is not supported past Grade Two");
        }

        const note1 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);

        let enharmonicEquivalents = chromaticScale.filter(notes => notes.includes(note1.getNoteWithoutOctave()))[0];
        enharmonicEquivalents = enharmonicEquivalents.filter(note => note !== note1.getNoteWithoutOctave());

        let question, answers;

        question = `Find the enharmonic equivalent of ${note1.getNote()}`
        answers = enharmonicEquivalents.map(note => note + (note === "B#" || note === "Bx" ? note1.getOctave() - 1 : note1.getOctave()));

        return { question, answers }
    }

    isEnharmonicEquivalent() {
        if (this.#grade < 4) {
            throw new Error("This exercise is not supported before Grade Four");
        }

        const note1 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);

        const intervals = ["augmented 1", "diminished 2", "minor 2"];
        let asc = Math.floor(Math.random() * 2) === 0 ? false : true;
        let random = Math.floor(Math.random() * 3);
        let isEnharmonic = random === 1 ? true : false;

        let note2 = calculateNoteFromInterval(note1, new Interval(intervals[random]), asc);

        while (note2.getNoteWithoutOctave() === "undefined") {
            asc = Math.floor(Math.random() * 2) === 0 ? false : true;
            random = Math.floor(Math.random() * 3);
            isEnharmonic = random === 1 ? true : false;
            note2 = calculateNoteFromInterval(note1, new Interval(intervals[random]), asc);
        }

        let question, answers;

        question = `Are these two notes enharmonic equivalent? ${note1.getNote()} ${note2.getNote()}`
        answers = [isEnharmonic ? "yes" : "no"];

        return { question, answers }
    }

    toneOrSemitone() {
        const { note1, note2 } = this.#getSemitoneOrTone();

        let question, answers;

        question = `Is this interval a semitone, or a tone? ${note1.getNote()} ${note2.getNote()}`
        answers = [calculateInterval(note1, note2).getSemitones() === 1 ? "semitone" : "tone"];

        return { question, answers }
    }

    addAccidentalToToneOrSemitone() {
        const { note1, note2 } = this.#getSemitoneOrTone();
        const interval = calculateInterval(note1, note2);

        const naturalNote2 = removeAccidentals([note2])[0];

        let question, answers;

        question = `Add an accidental to the second note to make a ${interval.getSemitones() === 1 ? "semitone" : "tone"}: ${note1.getNote()} ${naturalNote2.getNote()}`
        answers = [note2.getNote() !== naturalNote2.getNote() ? note2.getNote() : "none"];

        return { question, answers }
    }

    getExerciseSet(grade) {
        const exercises = [];

        for (let i = 0; i < 7; i++) {
            exercises.push(this.nameNote());
        }

        for (let i = 0; i < 4; i++) {
            exercises.push(this.isSecondNoteHigher());
        }

        for (let i = 0; i < 4; i++) {
            exercises.push(this.addClef());
        }

        return exercises;
    }
}

export default PitchExercises;