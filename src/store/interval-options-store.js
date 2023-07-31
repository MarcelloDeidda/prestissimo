export const initialIntervalOptionState = {
    number: "unison",
    quality: "perfect",
    compound: false,
    isCorrect: undefined
}

export const intervalOptionStateReducer = (state, action) => {
    let newState;

    switch (action.type) {
        case "NUMBER_UPDATE":
            newState = {
                ...state,
                number: action.number
            };

            return newState;
        case "QUALITY_UPDATE":
            newState = {
                ...state,
                quality: action.quality
            };

            return newState;
        case "COMPOUND_TOGGLE":
            newState = {
                ...state,
                compound: !state.compound
            };

            return newState;

        case "CORRECT_ANSWER":
            newState = {
                ...state,
                isCorrect: true
            };

            return newState;

        case "WRONG_ANSWER":
            newState = {
                ...state,
                isCorrect: false
            };

            return newState;

        case "RESET":
            return initialIntervalOptionState;

        default:
            return initialIntervalOptionState;
    }
}