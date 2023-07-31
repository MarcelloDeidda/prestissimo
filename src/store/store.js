import IntervalExercises from "../exercises/intervals/IntervalExercises";
import PitchExercises from "../exercises/pitch/PitchExercises";

export const getInitialExerciseState = (section = "pitch", grade = 1) => {
    const state = {
        index: 0,
        exerciseCompleted: false,
        sessionCompleted: false,
        score: 0
    }

    let exerciseBuilder;

    switch (section) {
        case "pitch":
            exerciseBuilder = new PitchExercises(grade);
            break;
        case "intervals":
            exerciseBuilder = new IntervalExercises(grade);
            break;
        default:
            break;
    }

    state.exerciseSet = exerciseBuilder.getExerciseSet(grade);

    return state;
};

export const exerciseStateReducer = (state, action) => {
    let newState;

    switch (action.type) {
        case "UPDATE_INDEX":
            console.log("here")
            newState = {
                ...state,
                index: state.index + 1,
                exerciseCompleted: false
            };
            return newState;

        case "CORRECT_ANSWER":
            newState = {
                ...state,
                exerciseCompleted: true
            };

            newState.exerciseSet[newState.index].answerWasCorrect();

            return newState;

        case "WRONG_ANSWER":
            newState = {
                ...state,
                exerciseCompleted: true
            };

            newState.exerciseSet[newState.index].answerWasWrong();

            return newState;

        case "COMPLETE_SESSION":
            newState = {
                ...state,
                sessionCompleted: true,
                score: state.exerciseSet.reduce((a, b) => {
                    return a + b.getResult()
                }, 0)
            };

            return newState;

        default:
            console.log("here")
            return getInitialExerciseState;
    }
}