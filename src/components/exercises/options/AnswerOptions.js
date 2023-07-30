import OptionButton from "../buttons/OptionButton";

const AnswerOptions = props => {
    const optionButtons = props.options.map(option => {
        let isCorrect = option === props.answer;

        return <OptionButton
            option={option}
            isCorrect={isCorrect}
            isCompleted={props.isCompleted}
            onAnswer={isCorrect ? props.onCorrectAnswer : props.onWrongAnswer}
        />;
    });

    return optionButtons;
}

export default AnswerOptions;