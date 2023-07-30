import MainMenu from "./components/mainmenu/MainMenu";
import { useState } from "react";
import ExerciseSection from "./components/exercises/Exercise";

const App = () => {
  const [exerciseIsOn, setExerciseIsOn] = useState(false);
  const [exerciseSettings, setExerciseSettings] = useState({});

  const startExerciseHandler = (section, title, grade) => {
    setExerciseSettings({ section, title, grade });
    setExerciseIsOn(true);
  }

  const stopExerciseHandler = () => {
    setExerciseSettings({});
    setExerciseIsOn(false);
  }

  return exerciseIsOn ? <ExerciseSection
    exerciseSettings={exerciseSettings}
    onStopExercise={stopExerciseHandler}
  /> : <MainMenu onStartExercise={startExerciseHandler} />
}

export default App;