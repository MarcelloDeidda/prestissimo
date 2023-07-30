import classes from "./ExerciseNav.module.css";

const ExerciseNav = props => {
    return <nav className={classes["exercise-nav"]}>
        <button onClick={props.onStopExercise}>Back to Main Menu</button>
        <div className={classes.title}>
            <h1>{props.sectionTitle}</h1>
            <h2>{props.gradeTitle}</h2>
        </div>
    </nav>
}

export default ExerciseNav;