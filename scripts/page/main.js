import { resetQuestionPage } from './question.js';



const page = document.querySelector('#pages');

const neon = document.querySelector('#main .title');

const startButtons = Array.from(document.querySelectorAll('#main .test-start'));



startButtons.forEach((button) => {
    if ('ontouchstart' in document.documentElement) {
        button.addEventListener('touchstart', startTest);
    }
    else {
        button.addEventListener('click', startTest);
    }
});



function startTest() {
    resetQuestionPage();
    moveToQuestionPage();
}

function moveToQuestionPage() {
    page.animate(
        [ { left: '-100%' } ],
        {
            duration: 400,
            direction: 'alternate',
            fill: 'forwards',
        }
    );
}

function animateNeonSign() {
    delay(0)()
    .then(setVisibility('visible'))
    .then(delay(3000))
    .then(setVisibility('hidden'))
    .then(delay(100))
    .then(setVisibility('visible'))
    .then(delay(100))
    .then(setVisibility('hidden'))
    .then(delay(100))
    .then(() => animateNeonSign());
}

function delay(ms) {
    return value => new Promise((resolve) => setTimeout(resolve, ms, value));
}

function setVisibility(visibility) {
    return () => { neon.style.visibility = visibility; };
}

animateNeonSign();