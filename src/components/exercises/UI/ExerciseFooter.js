import classes from "./ExerciseFooter.module.css";

const ExerciseFooter = ({ index, length, isCompleted, onNextExercise }) => {
    return <footer className={classes["exercise-footer"]}>
        <p>{index + 1}/{length}</p>
        <button
            disabled={!isCompleted}
            onClick={onNextExercise}
        >
            {index + 1 < length ? "Next >" : "Results >"}
        </button>
    </footer>
}

export default ExerciseFooter;