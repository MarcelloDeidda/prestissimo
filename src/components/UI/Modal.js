import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = props => {
    return <div
        className={classes.backdrop}
        onClick={props.onClose}
        data-cy="modal-background"
    />
}

const ModalOverlay = props => {
    return <div
        className={classes.modal}
        data-cy="modal"
    >
        {props.children}
    </div>
}

const portalElement = document.getElementById("overlays");

const Modal = props => {
    return <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            portalElement
        )}
    </>
}

export default Modal;