import NoteButton from "../buttons/NoteButton";
import classes from "./NoteOptions.module.css";

const NoteOptions = ({ options, answer, clef, isCompleted, onCorrectAnswer, onWrongAnswer }) => {
    const optionButtons = options.map(option => {
        let isCorrect = option.getNote() === answer;

        return <NoteButton
            id={option.getNote()}
            key={option.getNote()}
            option={option}
            clef={clef}
            isCorrect={isCorrect}
            isCompleted={isCompleted}
            onAnswer={isCorrect ? onCorrectAnswer : onWrongAnswer}
        />;
    });

    return <div className={classes["note-options"]}>
        {optionButtons}
    </div>;
}

export default NoteOptions;