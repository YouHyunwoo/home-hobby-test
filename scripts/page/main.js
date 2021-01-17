import { resetQuestionPage } from './question.js';



const startButtons = Array.from(document.querySelectorAll('#main .test-start'));



startButtons.forEach((button) => { button.addEventListener('click', startTest); });



function startTest() {
    resetQuestionPage();
    moveToQuestionPage();
}

function moveToQuestionPage() {
    $('#pages').animate({'left':'-100%'}, 300);
}

function animateNeonSign() {
    $('#main .title').css('visibility', 'visible')
        .delay(3000).queue(function (next) { $(this).css('visibility', 'hidden'); next(); })
        .delay(100).queue(function (next) { $(this).css('visibility', 'visible'); next(); })
        .delay(100).queue(function (next) { $(this).css('visibility', 'hidden'); next(); })
        .delay(100).queue(function (next) { $(this).css('visibility', 'visible'); next(); animateNeonSign(); });
}

animateNeonSign();