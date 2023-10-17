import classes from "./ExerciseNav.module.css";

const ExerciseNav = ({ sectionTitle, gradeTitle, onStopExercise }) => {
    return <nav className={classes["exercise-nav"]}>
        <button onClick={onStopExercise} data-cy="back-to-main-menu">Back to Main Menu</button>
        <div className={classes.title}>
            <h1 data-cy="section-title">{sectionTitle}</h1>
            <h2 data-cy="grade-title">{gradeTitle}</h2>
        </div>
    </nav>
}

export default ExerciseNav;