import { resetQuestionPage } from './question.js';



const page = document.querySelector('#pages');

const neon = document.querySelector('#main header figure img');

const startButtons = Array.from(document.querySelectorAll('#main .start a'));
const shareButtons = Array.from(document.querySelectorAll('#main .share ul li'));


const snsUrls = {
    twitter: 'https://twitter.com/intent/tweet?text=집콕취미테스트:&url=',
    facebook: 'http://www.facebook.com/sharer/sharer.php?u=',
    kakaostory: 'https://story.kakao.com/share?url='
}

Kakao.init('695a8c694d1264df3398740fab7df090');



startButtons.forEach((button) => {
    if ('ontouchstart' in document.documentElement) {
        button.addEventListener('touchstart', startTest);
    }
    else {
        button.addEventListener('click', startTest);
    }
});


shareButtons.forEach((button) => {
    if (button.id === 'kakaotalk') {
        button.addEventListener('click', shareKakaotalk);
    }
    else {
        button.addEventListener('click', shareSNS);
    }
});

function shareKakaotalk(e) {
    const currentUrl = window.location.host;
    console.log(currentUrl + '/images/result/thumbnail.jpg');

    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '집콕 취미 테스트',
            description: '당신에게 알맞는 집콕 취미를 추천해드립니다!',
            imageUrl: currentUrl + '/images/result/thumbnail.jpg',
            link: {
                webUrl: currentUrl,
                mobileWebUrl: currentUrl,
            }
        }
    });
}

function shareSNS(e) {
    window.open(snsUrls[e.target.id] + host, '', 'width=600,height=300,top=100,left=100,scrollbars=yes');
}


function startTest() {
    resetQuestionPage();
    moveToQuestionPage();
}

function moveToQuestionPage() {
    page.style.left = '-100%';
}

function moveToQuestionPageWithAnimation() {
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