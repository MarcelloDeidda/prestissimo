import { useEffect, useState } from "react";
import classes from "./OptionButton.module.css";

const OptionButton = props => {
    const [wrongAnswer, setWrongAnswer] = useState(false);

    let buttonText = props.option;

    if (buttonText.length > 1 && buttonText[buttonText.length - 1] === "B") {
        buttonText = buttonText[0] + "\u{1D12B}";
    }

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

    let buttonClasses = `${classes["options-button"]}`;

    if (isCompleted && isCorrect) {
        buttonClasses += " " + classes["options-button__correct"];
    } else if (wrongAnswer) {
        buttonClasses += " " + classes["options-button__wrong"];
    } else if (isCompleted) {
        buttonClasses += " " + classes["options-button__disabled"];
    }

    return <button
        className={buttonClasses}
        onClick={clickHandler}
    >
        {buttonText}
    </button>;
}

export default OptionButton;