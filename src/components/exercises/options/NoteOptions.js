import NoteButton from "../buttons/NoteButton";
import classes from "./NoteOptions.module.css";

const NoteOptions = props => {
    const optionButtons = props.options.map(option => {
        let isCorrect = option.getNote() === props.answer;

        return <NoteButton
            id={option.getNote()}
            key={option.getNote()}
            option={option}
            clef={props.clef}
            isCorrect={isCorrect}
            isCompleted={props.isCompleted}
            onAnswer={isCorrect ? props.onCorrectAnswer : props.onWrongAnswer}
        />;
    });

    return <div className={classes["note-options"]}>
        {optionButtons}
    </div>;
}

export default NoteOptions;