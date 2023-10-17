const Button = props => {
    return <button
        onClick={props.onClick}
        className={props.className}
        disabled={props.disabled}
        data-cy={props.dataCy}
    >
        {props.title}
    </button>;
}

export default Button;