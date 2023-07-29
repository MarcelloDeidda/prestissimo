import { renderNotes, renderNotesWithoutClef } from "./note-handler";
import classes from "./ScoreBox.module.css";
import { useEffect } from "react";

const ScoreBox = props => {
  const { notes, clef, keyName, showClef } = props;

  useEffect(() => {
    document.getElementById("output").innerHTML = "";
    if (showClef) {
      renderNotes(notes, clef, keyName);
    } else {
      renderNotesWithoutClef(notes, clef, keyName);
    }
  }, [showClef, notes, clef, keyName]);

  return <div className={classes.scorebox} id="output"></div>;
}

export default ScoreBox;