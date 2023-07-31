import classes from "./ExerciseNav.module.css";

const ExerciseNav = ({ sectionTitle, gradeTitle, onStopExercise }) => {
    return <nav className={classes["exercise-nav"]}>
        <button onClick={onStopExercise}>Back to Main Menu</button>
        <div className={classes.title}>
            <h1>{sectionTitle}</h1>
            <h2>{gradeTitle}</h2>
        </div>
    </nav>
}

export default ExerciseNav;