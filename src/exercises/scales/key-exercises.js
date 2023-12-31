import { writeRandomMelody } from "../../utils/melody/melody-functions";
import { removeAccidentals, getRandomClef } from "../exercises-functions";

import Key from "../../utils/keys/key";
import Note from "../../utils/notes/note";
import Exercise from "../exercise";

const KeyExercises = class {
    #grade;

    constructor(grade) {
        this.#grade = grade;
    }

    findSignatureFromKey() {
        const clef = getRandomClef(this.#grade);
        const key = Key.getRandomMajorKey(this.#grade);

        const answer = key.getTonic();
        let question = `What is the key signature of ${key.getName()}`;
        const options = [answer];

        for (let i = 0; i < 3; i++) {
            let option;
            option = Key.getRandomMajorKey(this.#grade).getTonic();

            while (options.includes(option)) {
                option = Key.getRandomMajorKey(this.#grade).getTonic();
            }

            options.push(option);
        }

        options.sort(() => -0.5 + Math.random())

        const settings = {
            clef,
            showClef: true,
            optionType: "multiple"
        }

        return new Exercise(question, answer, options, settings, []);
    }

    findKeyFromSignature() {
        const key = Key.getRandomKey(this.#grade);

        let question, answers, keySignature;

        if (key.getKeySignature().length > 0) {
            keySignature = key.getKeySignature().join(" ");
        } else {
            keySignature = "none";
        }

        question = `Name the ${key.getMode()} key that has this key signature: ${keySignature}`;
        answers = [key.getName()];

        return {
            question,
            answers
        }
    }

    findRelative() {
        const key = Key.getRandomKey(this.#grade);

        let question = `What is the ${key.getMode() === "major" ? "minor" : "major"} relative of ${key.getName()}?`;
        let answers = [key.getRelative()];

        return { question, answers };
    }

    findKeyOfMelody() {
        const { melody } = writeRandomMelody(this.#grade, 3, 8);
        const allKeys = Key.getAllKeys();

        let question;
        const answers = [];

        question = `Name a possible key for this melody:\n${melody.map(note => note.getNote()).join(" ")}`;

        for (let key of allKeys) {
            const scale = key.getMode() === "major" ? key.getAscScale(new Note(`${key.getTonic()}3`)) : key.getAscScale(new Note(`${key.getTonic()}3`)).harmonic;
            let scaleIsValid = melody.every(melodyNote => {
                return scale.map(scaleNote => scaleNote.getNoteWithoutOctave()).includes(melodyNote.getNoteWithoutOctave());
            })

            if (scaleIsValid) { answers.push(key.getName()) }
        }

        return { question, answers }
    }

    addAccidentalsToMelody() {
        const { melody, key } = writeRandomMelody(this.#grade, 3, 8);

        let naturalMelody = removeAccidentals(melody);

        let differentNotes = melody.filter(note => {
            for (let naturalNote of naturalMelody) {
                if (naturalNote.getNote() === note.getNote()) {
                    return false;
                }
            }
            return true;
        });

        let question = `Add the accidentals to this melody in the key of ${key.getName()}:\n${naturalMelody.map(note => note.getNote()).join(" ")}`
        let answers = [differentNotes.map(note => note.getNote()).join(" ")];

        if (answers[0] === "") { answers = ["none"] }

        return {
            question,
            answers
        }
    }

    getExerciseSet(grade) {
        const exercises = [];

        for (let i = 0; i < 5; i++) {
            exercises.push(this.findKeyFromSignature());
        }

        return exercises;
    }
}

export default KeyExercises;