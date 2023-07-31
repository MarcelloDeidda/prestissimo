import Note from "../../utils/notes/note";
import Key from "../../utils/keys/key";
import Exercise from "../exercise";

import { getRandomNote, getRandomNoteFromScale, isNoteinRange, sortNotes } from "../../utils/notes/notes-functions";
import { calculateInterval, calculateNoteFromInterval } from "../../utils/intervals/intervals-functions";
import { getRandomClef, getClefBounds } from "../exercises-functions";
import Interval from "../../utils/intervals/interval";

const IntervalExercises = class {
    #grade;

    constructor(grade = 1) {
        this.#grade = grade;
    }

    #generateInterval() {
        let clef = getRandomClef(this.#grade);
        const { lowerNote, higherNote, octaves } = getClefBounds(this.#grade, clef);

        let note1, note2, interval;

        if (this.#grade === 5) {
            note1 = getRandomNote(octaves[0], octaves[octaves.length - 1]);
            note2 = getRandomNote(octaves[0], octaves[octaves.length - 1]);
            interval = calculateInterval(note1, note2);

            while (
                !interval.isClassified() ||
                interval.getDistance() > 14 ||
                !isNoteinRange(lowerNote, note1, higherNote) ||
                !isNoteinRange(lowerNote, note2, higherNote)
            ) {
                note1 = getRandomNote(octaves[0], octaves[octaves.length - 1]);
                note2 = getRandomNote(octaves[0], octaves[octaves.length - 1]);
                interval = calculateInterval(note1, note2);
            }

            return { note1, note2, interval, clef };
        }

        const key = Key.getRandomKey(this.#grade);

        if (this.#grade === 4) {
            let tonic = new Note(`${key.getTonic()}${octaves[Math.floor(Math.random() * octaves.length)]}`);

            note1 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
            note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
            interval = calculateInterval(note1, note2);

            while (
                !interval.isClassified() ||
                interval.isCompound() ||
                !isNoteinRange(lowerNote, note1, higherNote) ||
                !isNoteinRange(lowerNote, note2, higherNote)
            ) {
                tonic = new Note(`${key.getTonic()}${octaves[Math.floor(Math.random() * octaves.length)]}`);
                note1 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
                note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
                interval = calculateInterval(note1, note2);
            }

            return { note1, note2, interval, key, clef };
        }

        note1 = new Note(`${key.getTonic()}${octaves[Math.floor(Math.random() * octaves.length)]}`);
        note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(note1) : key.getAscScale(note1).harmonic);

        interval = calculateInterval(note1, note2);
        let sortedNotes = sortNotes(note1, note2);

        while (
            interval.isCompound() ||
            note1.getNote() !== sortedNotes[0].getNote() ||
            !isNoteinRange(lowerNote, note1, higherNote) ||
            !isNoteinRange(lowerNote, note2, higherNote)
        ) {
            note1 = new Note(`${key.getTonic()}${octaves[Math.floor(Math.random() * octaves.length)]}`);
            note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(note1) : key.getAscScale(note1).harmonic);

            interval = calculateInterval(note1, note2);
            sortedNotes = sortNotes(note1, note2);
        }

        return { note1, note2, interval, key, clef };
    }

    findIntervalFromTwoNotes() {
        const { note1, note2, interval, clef } = this.#generateInterval();

        let answer;

        if (this.#grade < 3) {
            answer = interval.getNumber();
        } else {
            answer = `${interval.isCompound() ? "compound " : ""}${interval.getQuality()} ${interval.getNumber()}`;
        }

        let question = "Name the following interval";

        const settings = {
            clef,
            showClef: true,
            optionType: "interval"
        }

        return new Exercise(question, answer, [], settings, [note1, note2]);
    }

    findNoteFromInterval() {
        const { note1, note2, interval, clef, key } = this.#generateInterval();

        const sortedNotes = sortNotes(note1, note2);
        let asc = note1.getNote() === sortedNotes[0].getNote();

        let question, answer;

        if (this.#grade < 3) {
            question = `Find the note a ${interval.getNumber()} higher in the key of ${key.getName()}`
        } else if (this.#grade < 4) {
            question = `Find the note a ${interval.getNumber()} ${interval.getQuality()} higher`
        } else {
            question = `Find the note a ${interval.isCompound() ? "compound " : ""}${interval.getNumber()} ${interval.getQuality()} ${asc ? "higher" : "lower"}`
        }

        answer = note2.getNote();
        const options = [note2];

        const optionIntervals = [
            new Interval("augmented 1"),
            new Interval("diminished 2"),
            new Interval("minor 2"),
            new Interval("major 2"),
            new Interval("augmented 2")
        ];

        for (let i = 0; i < 3; i++) {
            let asc = Math.floor(Math.random() * 2) === 0;
            let optionNote = calculateNoteFromInterval(note2, optionIntervals[Math.floor(Math.random() * optionIntervals.length)], asc);
            const optionNotes = options.map(note => note.getNote());

            while (
                optionNotes.includes(optionNote.getNote()) ||
                optionNote.getLetterName() === "u" ||
                (this.#grade < 4 && ["x", "B"].includes(optionNote.getAccidental()))
            ) {
                let asc = Math.floor(Math.random() * 2) === 0;
                optionNote = calculateNoteFromInterval(note2, optionIntervals[Math.floor(Math.random() * optionIntervals.length)], asc);
            }

            options.push(optionNote);
        }

        options.sort(() => -0.5 + Math.random());
 
        const settings = {
            clef,
            showClef: true,
            optionType: "note"
        }

        return new Exercise(question, answer, options, settings, [note1]);
    }

    getExerciseSet(grade) {
        const exercises = [];

        for (let i = 0; i < 6; i++) {
            exercises.push(this.findIntervalFromTwoNotes());
        }

        for (let i = 0; i < 4; i++) {
            exercises.push(this.findNoteFromInterval());
        }

        return exercises;
    }
}

export default IntervalExercises;