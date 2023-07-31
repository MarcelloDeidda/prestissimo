import { useEffect, useState } from "react";
import classes from "./IntervalOptions.module.css";

const IntervalOptions = props => {
    const [number, setNumber] = useState("unison");
    const [quality, setQuality] = useState("perfect");
    const [compound, setCompound] = useState(false);
    const [isCorrect, setIscorrect] = useState();

    let answer = `${compound ? "compound " : ""}${props.grade > 2 ? quality + " " : ""}${number}`
    const { isCompleted } = props;

    const numberChangeHandler = e => {
        setNumber(e.target.value);
    }

    const qualityChangeHandler = e => {
        setQuality(e.target.value);
    }

    const compoundChangeHandler = () => {
        setCompound(prevState => !prevState);
    }

    useEffect(() => {
        if (!isCompleted) {
            setNumber("unison");
            setQuality("perfect");
            setCompound(false);
        }
    }, [isCompleted]);

    const intervalNumbers = [
        "unison",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth",
        "seventh",
        "octave"
    ];

    const intervalNumberOptions = intervalNumbers.map(elem => {
        return <option value={elem}>{elem}</option>;
    })

    const intervalQualities = [
        "minor",
        "perfect",
        "major"
    ];

    if (props.grade > 3) {
        intervalQualities.unshift("diminished");
        intervalQualities.push("augmented");
    }

    const intervalQualityOptions = intervalQualities.map(elem => {
        return <option value={elem}>{elem}</option>;
    })

    const intervalQualitySelect = <div className={classes["interval-answer-element"]}>
        <label htmlFor="quality">Quality</label>
        <select id="quality" value={quality} onChange={qualityChangeHandler} disabled={props.isCompleted}>
            {intervalQualityOptions}
        </select>
    </div>

    const compoundCheckbox = <div className={classes["interval-answer-element"]}>
        <label htmlFor="compound">Compound</label>
        <input id="compound" type="checkbox" checked={compound} onChange={compoundChangeHandler} disabled={props.isCompleted} />
    </div>

    let buttonClass = classes["interval-answer-button"];
    let buttonText = "Answer";

    if (props.isCompleted && isCorrect) {
        buttonClass += ` ${classes["interval-answer-button__correct"]}`;
        buttonText = "Correct!";
    } else if (props.isCompleted && isCorrect === false) {
        buttonClass += ` ${classes["interval-answer-button__wrong"]}`;
        buttonText = props.answer;
    }

    const submitHandler = e => {
        e.preventDefault();

        if (props.isCompleted) {
            return;
        }

        if (answer === props.answer) {
            props.onCorrectAnswer();
            setIscorrect(true);
        } else {
            props.onWrongAnswer();
            setIscorrect(false);
        }
    }

    return <form className={classes["interval-answer"]} onSubmit={submitHandler}>
        {props.grade > 2 && intervalQualitySelect}
        <div className={classes["interval-answer-element"]}>
            <label htmlFor="number">Number</label>
            <select id="number" value={number} onChange={numberChangeHandler} disabled={props.isCompleted}>
                {intervalNumberOptions}
            </select>
        </div>
        {props.grade > 4 && compoundCheckbox}
        <button className={buttonClass}>{buttonText}</button>
    </form>
}

export default IntervalOptions;