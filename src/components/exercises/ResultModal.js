import Modal from "../UI/Modal";
import classes from "./ResultModal.module.css";

const ResultModal = props => {
    let pass = props.result * 100 / props.length > 65;

    return <Modal onClose={() => { }}>
        <div className={classes["result-modal"]}>
            <h2 className={classes["result-modal__title"]}>Session completed!</h2>
            <p
                className={`${classes["result-modal__score"]} ${pass ? classes["score-pass"] : classes["score-fail"]}`}
            >
                Score: {props.result}/{props.length}
            </p>
            <button
                className={classes["result-modal__button"]}
                onClick={props.onStopExercise}
            >
                Back to Main Menu
            </button>
        </div>
    </Modal>
}

export default ResultModal;