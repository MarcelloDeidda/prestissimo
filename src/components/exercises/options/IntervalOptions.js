import { useEffect } from "react";
import classes from "./IntervalOptions.module.css";
import useIntervalOptions from "../../../hooks/use-interval-options";

const IntervalOptions = ({ grade, isCompleted, correctAnswer, onCorrectAnswer, onWrongAnswer }) => {
    // Initialise state and form options through custom hook
    const [
        intervalOptionState,
        dispatchIntervalOption,
        intervalNumberOptions,
        intervalQualityOptions
    ] = useIntervalOptions(grade);

    const { number, quality, compound, isCorrect } = intervalOptionState;

    // Reset form
    useEffect(() => {
        if (!isCompleted) {
            dispatchIntervalOption({ type: "RESET" });
        }
    }, [isCompleted, dispatchIntervalOption]);

    // Define handlers
    const numberChangeHandler = e => {
        dispatchIntervalOption({ type: "NUMBER_UPDATE", number: e.target.value });
    }

    const qualityChangeHandler = e => {
        dispatchIntervalOption({ type: "QUALITY_UPDATE", quality: e.target.value });
    }

    const compoundChangeHandler = () => {
        dispatchIntervalOption({ type: "COMPOUND_TOGGLE" });
    }

    const submitHandler = e => {
        e.preventDefault();

        let answer = `${compound ? "compound " : ""}${grade > 2 ? quality + " " : ""}${number}`;

        if (isCompleted) {
            return;
        }

        if (answer === correctAnswer) {
            onCorrectAnswer();
            dispatchIntervalOption({ type: "CORRECT_ANSWER" })
        } else {
            onWrongAnswer();
            dispatchIntervalOption({ type: "WRONG_ANSWER" })
        }
    }

    // Manage button
    let buttonClass = classes["interval-answer-button"];
    let buttonText = "Answer";

    if (isCompleted && isCorrect) {
        buttonClass += ` ${classes["interval-answer-button__correct"]}`;
        buttonText = "Correct!";
    } else if (isCompleted && isCorrect === false) {
        buttonClass += ` ${classes["interval-answer-button__wrong"]}`;
        buttonText = correctAnswer;
    }

    // Render children
    return <form className={classes["interval-answer"]} onSubmit={submitHandler}>
        {grade > 2 && <div className={classes["interval-answer-element"]}>
            <label htmlFor="quality">Quality</label>
            <select id="quality" value={quality} onChange={qualityChangeHandler} disabled={isCompleted}>
                {intervalQualityOptions}
            </select>
        </div>}
        <div className={classes["interval-answer-element"]}>
            <label htmlFor="number">Number</label>
            <select id="number" value={number} onChange={numberChangeHandler} disabled={isCompleted}>
                {intervalNumberOptions}
            </select>
        </div>
        {grade > 4 && <div className={classes["interval-answer-element"]}>
            <label htmlFor="compound">Compound</label>
            <input id="compound" type="checkbox" checked={compound} onChange={compoundChangeHandler} disabled={isCompleted} />
        </div>}
        <button className={buttonClass}>{buttonText}</button>
    </form>
}

export default IntervalOptions;