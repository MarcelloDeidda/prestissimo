const Exercise = class {
    #question;
    #answer;
    #options;
    #notes;
    #correct;
    #settings;

    constructor(question, answer, options, settings, notes = null) {
        this.#question = question;
        this.#answer = answer;
        this.#options = options;
        this.#notes = notes;
        this.#settings = settings;
    }

    getQuestion() {
        return this.#question;
    }

    getAnswer() {
        return this.#answer;
    }

    getOptions() {
        return this.#options;
    }

    getResult() {
        return this.#correct;
    }

    getNotes() {
        return this.#notes;
    }

    getSettings() {
        return this.#settings;
    }

    isCompleted() {
        return this.#correct !== undefined;
    }

    answerWasCorrect() {
        this.#correct = true;
    }

    answerWasWrong() {
        this.#correct = false;
    }
}

export default Exercise;