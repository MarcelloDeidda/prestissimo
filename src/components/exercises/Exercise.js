import { useEffect, useState } from "react";

import ScoreBox from "./ScoreBox";

import ExerciseNav from "./UI/ExerciseNav";
import ExerciseFooter from "./UI/ExerciseFooter";
import ResultModal from "./UI/ResultModal";

import IntervalOptions from "./options/IntervalOptions";
import AnswerOptions from "./options/AnswerOptions";
import NoteOptions from "./options/NoteOptions";

import IntervalExercises from "../../exercises/intervals/IntervalExercises";
import PitchExercises from "../../exercises/pitch/PitchExercises";

import classes from "./Exercise.module.css";

const ExerciseSection = props => {
    const grade = props.exerciseSettings.grade.grade;
    const { title, section } = props.exerciseSettings.section;

    let exerciseBuilder;

    switch (section) {
        case "pitch":
            exerciseBuilder = new PitchExercises(grade);
            break;
        case "intervals":
            exerciseBuilder = new IntervalExercises(grade);
            break;
        default:
            break;
    }
    /*
    
    REDUCER will contain:
    - exerciseSet
    - currentExercise
    - index
    - exerciseCompleted
    - sessionCompleted
    
    */

    const [exercises] = useState(exerciseBuilder.getExerciseSet(grade));
    const [index, setIndex] = useState(0)
    const [currentExercise, setCurrentExercise] = useState(exercises[0]);
    const [exerciseCompleted, setExerciseComplete] = useState(false);
    const [sessionCompleted, setSessionCompleted] = useState(false);

    let result = exercises.reduce((a, b) => {
        return a + b.getResult()
    }, 0);

    useEffect(() => {
        const exerciseSection = document.getElementById("exercise");

        exerciseSection.style.transform = "translateX(20rem)";
        exerciseSection.style.opacity = "0";

        setTimeout(() => {
            setCurrentExercise(exercises[index]);

            exerciseSection.style.transform = "none";
            exerciseSection.style.opacity = "1";
        }, 300);
    }, [exercises, index]);

    const correctAnswerHandler = () => {
        setExerciseComplete(true);
        currentExercise.answerWasCorrect();
    }

    const wrongAnswerHandler = () => {
        setExerciseComplete(true);
        currentExercise.answerWasWrong();
    }

    const nextExerciseHandler = () => {
        if (exerciseCompleted) {
            if (index < exercises.length - 1) {
                setIndex(index => index + 1);
                setExerciseComplete(false);
            } else {
                setSessionCompleted(true);
            }
        }
    }

    const { clef, optionType } = currentExercise.getSettings();

    let keyName;

    if (currentExercise.getSettings().key !== undefined) {
        keyName = currentExercise.getSettings().key.getTonic();
    } else {
        keyName = undefined;
    }

    return <>
        <ExerciseNav
            onStopExercise={props.onStopExercise}
            gradeTitle={props.exerciseSettings.grade.title}
            sectionTitle={title}
        />
        <div id="exercise" className={classes.exercise}>
            <div className={classes["exercise__question"]}>
                <h3>{currentExercise.getQuestion()}</h3>
                <ScoreBox
                    id="output"
                    notes={currentExercise.getNotes()}
                    clef={clef}
                    keyName={keyName}
                    showClef={currentExercise.getSettings().showClef}
                />
            </div>
            <div className={classes["exercise__options"]}>
                {optionType === "multiple" && <AnswerOptions
                    options={currentExercise.getOptions()}
                    answer={currentExercise.getAnswer()}
                    isCompleted={exerciseCompleted}
                    onCorrectAnswer={correctAnswerHandler}
                    onWrongAnswer={wrongAnswerHandler}
                />}
                {optionType === "interval" && <IntervalOptions
                    answer={currentExercise.getAnswer()}
                    isCompleted={exerciseCompleted}
                    onCorrectAnswer={correctAnswerHandler}
                    onWrongAnswer={wrongAnswerHandler}
                    grade={grade}
                />}
                {optionType === "note" && <NoteOptions
                    answer={currentExercise.getAnswer()}
                    clef={clef}
                    isCompleted={exerciseCompleted}
                    onCorrectAnswer={correctAnswerHandler}
                    onWrongAnswer={wrongAnswerHandler}
                    grade={grade}
                    options={currentExercise.getOptions()}
                />}
            </div>
        </div>
        <ExerciseFooter
            index={index}
            length={exercises.length}
            isCompleted={exerciseCompleted}
            onNextExercise={nextExerciseHandler}
        />
        {sessionCompleted && <ResultModal
            onStopExercise={props.onStopExercise}
            result={result}
            length={exercises.length}
        />}
    </>
}

export default ExerciseSection;