const IntervalOptions = props => {
    const intervalNumbers = [
        "unison",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth",
        "seventh",
        "octave"
    ];

    const intervalNumberOptions = intervalNumbers.map(elem => {
        return <option>{elem}</option>;
    })
    
    const intervalQualities = [
        "diminished",
        "minor",
        "perfect",
        "major",
        "augmented"
    ];

    const intervalQualityOptions = intervalQualities.map(elem => {
        return <option>{elem}</option>;
    })

    return <form>
        <label for="number">Interval Number</label>
        <select id="number">
            {intervalNumberOptions}
        </select>
        <label for="quality">Interval Quality</label>
        <select id="quality">
            {intervalQualityOptions}
        </select>
        <button>Answer</button>
    </form>
}

export default IntervalOptions;