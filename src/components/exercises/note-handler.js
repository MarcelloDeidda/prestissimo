import { Vex } from "vexflow";

const { Renderer, Stave, StaveNote, Formatter, Accidental } = Vex.Flow;

const accidentalParsing = {
    "b": "b",
    "B": "bb",
    "#": "#",
    "x": "##"
}

export const renderNotes = (id, notes, clef, keyName) => {
    // Create an SVG renderer and attach it to the DIV element with id="output".
    const div = document.getElementById(id);
    div.id = id;
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    let longStave = keyName !== undefined && keyName !== "C";

    // Configure the rendering context.
    renderer.resize(notes.length * 50 + (longStave ? 200 : 150), 200);
    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave of width 400 at position 10, 40.
    const stave1 = new Stave(10, 40, notes.length * 50 + (longStave ? 150 : 100));

    const notes1 = [];

    stave1.addClef(clef)
        .setContext(context);

    if (keyName !== undefined) {
        stave1.addKeySignature(keyName);
    }

    stave1.draw();

    notes.forEach(note => {
        const newNote = new StaveNote({
            keys: [`${note.getLetterName().toLowerCase()}${note.getAccidental() ? accidentalParsing[note.getAccidental()] : ""}/${note.getOctave()}`],
            duration: "w",
            clef: clef
        });

        if (note.getAccidental() !== null && keyName === undefined) {
            newNote.addModifier(new Accidental(accidentalParsing[note.getAccidental()]));
        }

        notes1.push(newNote);
    });

    Formatter.FormatAndDraw(context, stave1, notes1);
}

export const renderNotesWithoutClef = (id, notes, clef, keyName) => {
    // Create an SVG renderer and attach it to the DIV element with id="output".
    const div = document.getElementById(id);
    div.id = id;
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    let longStave = keyName !== undefined && keyName !== "C";

    // Configure the rendering context.
    renderer.resize(notes.length * 50 + (longStave ? 125 : 75), 200);
    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave of width 400 at position 10, 40.
    const stave1 = new Stave(10, 40, notes.length * 50 + (longStave ? 75 : 25));

    const notes1 = [];

    stave1.setContext(context);

    if (keyName !== undefined) {
        stave1.addKeySignature(keyName);
    }

    stave1.draw();

    notes.forEach(note => {
        const newNote = new StaveNote({
            keys: [`${note.getLetterName().toLowerCase()}${note.getAccidental() ? accidentalParsing[note.getAccidental()] : ""}/${note.getOctave()}`],
            duration: "w",
            clef: clef
        });

        if (note.getAccidental() !== null && keyName === undefined) {
            newNote.addModifier(new Accidental(accidentalParsing[note.getAccidental()]));
        }

        notes1.push(newNote);
    });

    Formatter.FormatAndDraw(context, stave1, notes1);
}

export const renderNotesInButton = (id, notes, clef) => {
    // Create an SVG renderer and attach it to the DIV element with id="output".
    const div = document.getElementById(id);
    div.id = id;
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(notes.length * 50 + (75), 100);
    const context = renderer.getContext();
    context.setFont('Arial', 10);

    // Create a stave of width 400 at position 10, 40.
    const stave1 = new Stave(10, -5, notes.length * 50 + (50));

    const notes1 = [];

    stave1.addClef(clef)
        .setContext(context)
        .draw();

    notes.forEach(note => {
        const newNote = new StaveNote({
            keys: [`${note.getLetterName().toLowerCase()}${note.getAccidental() ? accidentalParsing[note.getAccidental()] : ""}/${note.getOctave()}`],
            duration: "w",
            clef: clef
        });

        if (note.getAccidental() !== null) {
            newNote.addModifier(new Accidental(accidentalParsing[note.getAccidental()]));
        }

        notes1.push(newNote);
    });

    Formatter.FormatAndDraw(context, stave1, notes1);
}