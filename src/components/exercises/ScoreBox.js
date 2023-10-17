import { renderNotes, renderNotesWithoutClef, renderNotesInButton } from "./note-handler";
import classes from "./ScoreBox.module.css";
import { useEffect } from "react";

const ScoreBox = props => {
  const { id, notes, clef, keyName, showClef, isButton } = props;

  useEffect(() => {
    document.getElementById(id).innerHTML = "";
    if (isButton) {
      renderNotesInButton(id, notes, clef);
    } else if (showClef) {
      renderNotes(id, notes, clef, keyName);
    } else {
      renderNotesWithoutClef(id, notes, clef, keyName);
    }
  }, [showClef, notes, clef, keyName]);

  return <div data-cy={props.dataCy} className={classes.scorebox} id={id}></div>;
}

export default ScoreBox;