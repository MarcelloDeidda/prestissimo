import Modal from "../UI/Modal";
import Button from "../UI/Button";
import classes from "./GradeModal.module.css";

const GradeModal = props => {
    const gradeButtonClickHandler = grade => {
        props.onStartExercise(props.section, props.title, grade);
    }


    const grades = [
        {
            grade: 1,
            title: "Grade One"
        },
        {
            grade: 2,
            title: "Grade Two"
        },
        {
            grade: 3,
            title: "Grade Three"
        },
        {
            grade: 4,
            title: "Grade Four"
        },
        {
            grade: 5,
            title: "Grade Five"
        }
    ];

    const gradeButtons = grades.map(grade => {
        return <Button
            className={classes["grade-modal__button"]}
            onClick={() => gradeButtonClickHandler(grade)}
            section={grade.grade}
            title={grade.title}
            key={grade.grade}
            dataCy={grade.grade}
        />
    });

    return <Modal onClose={props.onClose}>
        <div className={classes["grade-modal"]}>
            <h2 className={classes["grade-modal__title"]}>{props.title}</h2>
            {gradeButtons}
        </div>
    </Modal>

}

export default GradeModal;