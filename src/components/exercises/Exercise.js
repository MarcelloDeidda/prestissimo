import { useEffect, useState } from "react";

import ExerciseNav from "./ExerciseNav";
import ScoreBox from "./ScoreBox";
import OptionButton from "./OptionButton";
import ExerciseFooter from "./ExerciseFooter";
import PitchExercises from "../../exercises/pitch/PitchExercises";
import ResultModal from "./ResultModal";

import classes from "./Exercise.module.css";
import IntervalOptions from "./IntervalOptions";
import AnswerOptions from "./AnswerOptions";

const ExerciseSection = props => {
    const grade = props.exerciseSettings.grade.grade;
    const pitchExercises = new PitchExercises(grade);

    const [exercises] = useState(pitchExercises.getExerciseSet(grade));
    const [index, setIndex] = useState(0)
    const [currentExercise, setCurrentExercise] = useState(exercises[0]);
    const [keyName, setKeyName] = useState(undefined);
    const [exerciseCompleted, setExerciseComplete] = useState(false);
    const [sessionCompleted, setSessionCompleted] = useState(false);

    let result = exercises.reduce((a, b) => {
        return a + b.getResult()
    }, 0);

    useEffect(() => {
        if (currentExercise.getSettings().key !== undefined) {
            setKeyName(currentExercise.getSettings().key.getTonic());
        } else {
            setKeyName(undefined);
        }
    }, [currentExercise, index]);

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

    const optionButtons = currentExercise.getOptions().map(option => {
        let isCorrect = option === currentExercise.getAnswer();

        return <OptionButton
            key={option}
            option={option}
            isCorrect={isCorrect}
            isCompleted={exerciseCompleted}
            onAnswer={isCorrect ? correctAnswerHandler : wrongAnswerHandler}
        />;
    });

    const { clef } = currentExercise.getSettings();

    return <>
        <ExerciseNav
            onStopExercise={props.onStopExercise}
            gradeTitle={props.exerciseSettings.grade.title}
            sectionTitle={props.exerciseSettings.section.title}
        />
        <div id="exercise" className={classes.exercise}>
            <div className={classes["exercise__question"]}>
                <h3>{currentExercise.getQuestion()}</h3>
                <ScoreBox
                    notes={currentExercise.getNotes()}
                    clef={clef}
                    keyName={keyName}
                    showClef={currentExercise.getSettings().showClef}
                />
            </div>
            <div className={classes["exercise__options"]}>
                <AnswerOptions
                    options={currentExercise.getOptions()}
                    answer={currentExercise.getAnswer()}
                    isCompleted={exerciseCompleted}
                    onCorrectAnswer={correctAnswerHandler}
                    onWrongAnswer={wrongAnswerHandler}
                />
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