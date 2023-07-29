import classes from "./ExerciseFooter.module.css";

const ExerciseFooter = props => {
    return <footer className={classes["exercise-footer"]}>
        <p>{props.index + 1}/{props.length}</p>
        <button
            disabled={!props.isCompleted}
            onClick={props.onNextExercise}
        >
            {props.index + 1 < props.length ? "Next >" : "Results >"}
        </button>
    </footer>
}

export default ExerciseFooter;