import { test } from '../data/test.js';

import { showResultPage } from './result.js';



const questionText = document.querySelector('#question h1');
const progressBar = document.querySelector('#question .progress .bar');
const progressText = document.querySelector('#question .progress .text');
const choices = document.querySelector('#question .choices');

let isAnimating = false;



function showNextQuestion() {
    nextQuestion();

    if (isFinished()) {
        showResultPage();
    }
    else {
        showCurrentQuestionWithAnimation();
    }
}

function nextQuestion() {
    test.nextQuestion();
}

function isFinished() {
    return test.isFinished();
}

function showCurrentQuestionWithAnimation() {
    startAnimation();

    $('#question *')
        .animate({'opacity': '0.0'}, 200, 'swing', changeQuestionAfterFadeOut)
        .animate({'opacity': '1.0'}, 200, stopAnimation);
}

function startAnimation() {
    isAnimating = true;
}

function changeQuestionAfterFadeOut() {
    changeIntoCurrentQuestion();
}

function changeIntoCurrentQuestion() {
    const currentQuestion = test.getCurrentQuestion();

    changeQuestionText(currentQuestion);
    changeChoices(currentQuestion);

    const progressRatio = test.getCurrentRatio();

    changeProgressBar(progressRatio);
    changeProgressText(progressRatio);
}

function changeQuestionText(currentQuestion) {
    questionText.innerText = currentQuestion.title;
}

function changeChoices(currentQuestion) {
    removePreviousChoices();
    appendCurrentChoices(currentQuestion);
}

function removePreviousChoices() {
    const children = Array.from(choices.children);

    children.forEach((node) => {
        if (node.tagName === 'A') {
            node.remove();
        }
    });
}

function appendCurrentChoices(currentQuestion) {
    currentQuestion.choices.forEach((choice, choiceIndex) => {
        const choiceButton = document.createElement('a');

        choiceButton.classList.add('choice');
        choiceButton.innerText = choice.text;

        choiceButton.addEventListener('click', (e) => {
            if (hasAnyQuestionWhileAnimationStop()) {
                chooseAnswer(choiceIndex);
                showNextQuestion();
            }
        });

        choices.appendChild(choiceButton);
    });
}

function hasAnyQuestionWhileAnimationStop() {
    return !isAnimating && !test.isFinished();
}

function chooseAnswer(choiceIndex) {
    test.chooseAnswer(choiceIndex);
}

function changeProgressBar(progressRatio) {
    progressBar.style.width = `${progressRatio * 100}%`;
}

function changeProgressText(progressRatio) {
    progressText.innerText = `${Math.round(progressRatio * 100)}%`;
}

function stopAnimation() {
    isAnimating = false;
}

export function resetQuestionPage() {
    resetTest();
    changeIntoCurrentQuestion();
}

function resetTest() {
    test.reset();
}

changeIntoCurrentQuestion();