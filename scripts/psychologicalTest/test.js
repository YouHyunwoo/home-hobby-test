export class Test {
    constructor(results, questions) {
        this.results = results;
        this.questions = questions;

        // this.active = true;
        this.scores = null;

        this.reset();
    }

    nextQuestion() {
        this.currentQuestionIndex = Math.min(this.currentQuestionIndex + 1, this.questions.length);
    }

    reset() {
        this.resetScore();
        this.resetQuestion();
        // this.activate();
    }

    resetScore() {
        this.setAllScoreToZero();
    }

    setAllScoreToZero() {
        this.scores = this.results.map(() => 0);
    }

    resetQuestion() {
        // this.shuffleQuestions();
        // this.shuffleChoices();
        this.moveToFirstQuestion();
    }

    shuffleQuestions() {
        const shuffled = this.questions
            .map(a => ([Math.random(), a]))
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1]);

        this.questions = shuffled;
    }

    shuffleChoices() {
        this.questions.forEach((question) => {
            question.shuffleChoices();
        });
    }

    moveToFirstQuestion() {
        this.currentQuestionIndex = 0;
    }

    chooseAnswer(choiceIndex) {
        this.cumulateAnswerScore(choiceIndex);

        console.log(this.scores);
    }

    cumulateAnswerScore(choiceIndex) {
        const cumulatedScores = this.scores.map((score, scoreIndex) =>
            score + this.questions[this.currentQuestionIndex].choices[choiceIndex].score[scoreIndex]
        );

        this.scores = cumulatedScores;
    }

    isFinished() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    getCurrentRatio() {
        return (this.currentQuestionIndex + 1) / this.questions.length;
    }

    getHighestScore() {
        let maxScore = this.scores[0];
        let maxScoreIndex = 0;

        const itemCount = this.results.length;

        for (let i = 1; i < itemCount; i++) {
            if (this.scores[i] > maxScore) {
                maxScore = this.scores[i];
                maxScoreIndex = i;
            }
        }

        return this.results[maxScoreIndex];
    }
}