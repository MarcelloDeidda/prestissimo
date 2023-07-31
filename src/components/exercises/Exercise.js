import { useReducer } from "react";

import ScoreBox from "./ScoreBox";

import ExerciseNav from "./UI/ExerciseNav";
import ExerciseFooter from "./UI/ExerciseFooter";
import ResultModal from "./UI/ResultModal";

import IntervalOptions from "./options/IntervalOptions";
import AnswerOptions from "./options/AnswerOptions";
import NoteOptions from "./options/NoteOptions";

import { getInitialExerciseState, exerciseStateReducer } from "../../store/exercise-store";

import classes from "./Exercise.module.css";

const ExerciseSection = props => {
    // Fetch props
    const { grade, title: gradeTitle } = props.exerciseSettings.grade;
    const { section, title: sectionTitle } = props.exerciseSettings.section;

    // Initialise state
    const [exerciseState, dispatchExercise] = useReducer(exerciseStateReducer, getInitialExerciseState(section, grade));

    const {
        exerciseSet,
        index,
        exerciseCompleted,
        sessionCompleted,
        score
    } = exerciseState;

    const currentExercise = exerciseSet[index];

    // Define handlers
    const correctAnswerHandler = () => {
        dispatchExercise({ type: "CORRECT_ANSWER" });
    }

    const wrongAnswerHandler = () => {
        dispatchExercise({ type: "WRONG_ANSWER" });
    }

    const nextExerciseHandler = () => {
        if (exerciseCompleted) {
            if (index < exerciseSet.length - 1) {
                const exerciseSection = document.getElementById("exercise");

                exerciseSection.style.transform = "translateX(20rem)";
                exerciseSection.style.opacity = "0";

                setTimeout(() => {
                    dispatchExercise({ type: "UPDATE_INDEX" });

                    exerciseSection.style.transform = "none";
                    exerciseSection.style.opacity = "1";
                }, 300);
            } else {
                dispatchExercise({ type: "COMPLETE_SESSION" });
            }
        } else {
            return;
        }
    }

    // Fetch exercise settings
    const { clef, optionType } = currentExercise.getSettings();

    let keyName;

    if (currentExercise.getSettings().key !== undefined) {
        keyName = currentExercise.getSettings().key.getTonic();
    } else {
        keyName = undefined;
    }

    // Render children
    return <>
        <ExerciseNav
            onStopExercise={props.onStopExercise}
            gradeTitle={gradeTitle}
            sectionTitle={sectionTitle}
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
                    grade={grade}
                    correctAnswer={currentExercise.getAnswer()}
                    isCompleted={exerciseCompleted}
                    onCorrectAnswer={correctAnswerHandler}
                    onWrongAnswer={wrongAnswerHandler}
                />}
                {optionType === "note" && <NoteOptions
                    clef={clef}
                    grade={grade}
                    options={currentExercise.getOptions()}
                    answer={currentExercise.getAnswer()}
                    isCompleted={exerciseCompleted}
                    onCorrectAnswer={correctAnswerHandler}
                    onWrongAnswer={wrongAnswerHandler}
                />}
            </div>
        </div>
        <ExerciseFooter
            index={index}
            length={exerciseSet.length}
            isCompleted={exerciseCompleted}
            onNextExercise={nextExerciseHandler}
        />
        {sessionCompleted && <ResultModal
            onStopExercise={props.onStopExercise}
            result={score}
            length={exerciseSet.length}
        />}
    </>
}

export default ExerciseSection;