import { useEffect, useState } from "react";
import classes from "./NoteButton.module.css";
import ScoreBox from "../ScoreBox";

const NoteButton = props => {
    const [wrongAnswer, setWrongAnswer] = useState(false);

    const { isCompleted, isCorrect } = props;
    useEffect(() => {
        if (!isCompleted) {
            setWrongAnswer(false);
        }
    }, [isCompleted]);

    const clickHandler = () => {
        if (!isCompleted) {
            props.onAnswer();
            !isCorrect && setWrongAnswer(true);
        }
    }

    console.log(props.option.getLetterName())

    let buttonClasses = `${classes["note-button"]}`;

    if (isCompleted && isCorrect) {
        buttonClasses += " " + classes["note-button__correct"];
    } else if (wrongAnswer) {
        buttonClasses += " " + classes["note-button__wrong"];
    } else if (isCompleted) {
        buttonClasses += " " + classes["note-button__disabled"];
    }

    return <button
        className={buttonClasses}
        onClick={clickHandler}
    >
        <ScoreBox
            id={props.id}
            notes={[props.option]}
            clef={props.clef}
            showClef={true}
            isButton={true}
        />
    </button>;
}

export default NoteButton;