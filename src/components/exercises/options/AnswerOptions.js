import OptionButton from "../buttons/OptionButton";

const AnswerOptions = ({ options, answer, isCompleted, onCorrectAnswer, onWrongAnswer }) => {
    const optionButtons = options.map(option => {
        let isCorrect = option === answer;

        return <OptionButton
            option={option}
            isCorrect={isCorrect}
            isCompleted={isCompleted}
            onAnswer={isCorrect ? onCorrectAnswer : onWrongAnswer}
        />;
    });

    return optionButtons;
}

export default AnswerOptions;