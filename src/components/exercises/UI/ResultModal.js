import Modal from "../../UI/Modal";
import classes from "./ResultModal.module.css";

const ResultModal = ({ result, length, onStopExercise }) => {
    let pass = result * 100 / length > 65;

    let scoreClassName = `${classes["result-modal__score"]} ${pass ? classes["score-pass"] : classes["score-fail"]}`;

    return <Modal onClose={() => { }}>
        <div className={classes["result-modal"]}>
            <h2 className={classes["result-modal__title"]}>Session completed!</h2>
            <p
                className={scoreClassName}
            >
                Score: {result}/{length}
            </p>
            <button
                className={classes["result-modal__button"]}
                onClick={onStopExercise}
            >
                Back to Main Menu
            </button>
        </div>
    </Modal>
}

export default ResultModal;