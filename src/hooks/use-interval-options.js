import { useReducer } from "react";

import {
    availableIntervalNumbers,
    availableIntervalQualities
} from "../utils/intervals/intervals-functions";

import {
    intervalOptionStateReducer,
    initialIntervalOptionState
} from "../store/interval-options-store";


const useIntervalOptions = grade => {
    const [
        intervalOptionState,
        dispatchIntervalOption
    ] = useReducer(intervalOptionStateReducer, initialIntervalOptionState);

    console.log(intervalOptionState)

    const intervalNumbers = availableIntervalNumbers();
    const intervalQualities = availableIntervalQualities(grade);

    const intervalNumberOptions = intervalNumbers.map(elem => {
        return <option value={elem}>{elem}</option>;
    })

    const intervalQualityOptions = intervalQualities.map(elem => {
        return <option value={elem}>{elem}</option>;
    })

    return [
        intervalOptionState,
        dispatchIntervalOption,
        intervalNumberOptions,
        intervalQualityOptions
    ]
}

export default useIntervalOptions;