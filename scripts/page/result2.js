import { test } from '../data/test.js';



const title = document.querySelector('header h1 .hobby');
const picture = document.querySelector('header figure img');
const imageCopyright = document.querySelector('header figure figcaption a');
const descriptions = Array.from(document.querySelectorAll('.description article'));

const shareButtons = Array.from(document.querySelectorAll('.share ul li'));
const linkCopyButton = document.querySelector('.share a#link-copy');


const currentUrl = window.location.href;
const snsUrls = {
    twitter: 'https://twitter.com/intent/tweet?text=집콕취미테스트:&url=',
    facebook: 'http://www.facebook.com/sharer/sharer.php?u=',
    kakaostory: 'https://story.kakao.com/share?url='
}

Kakao.init('695a8c694d1264df3398740fab7df090');



shareButtons.forEach((button) => {
    if (button.id === 'kakaotalk') {
        button.addEventListener('click', shareKakaotalk);
    }
    else {
        button.addEventListener('click', shareSNS);
    }
});

function shareKakaotalk(e) {
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
    window.open(snsUrls[e.target.id] + currentUrl, '', 'width=600,height=300,top=100,left=100,scrollbars=yes');
}


linkCopyButton.addEventListener('click', (e) => {
    copyToClipboard('http://homehobby.netlify.app');
    alert('링크 복사 완료!');
});

function copyToClipboard(text) {
    const ta = document.createElement("textarea");
    document.body.appendChild(ta);
    ta.value = text;
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
}

// 여기서부터 다시 코딩
export function showResultPage() {
    calculateResult();
    showResultHobby();
    moveToResultPage();
}

function calculateResult() {
    test.sortScore();
}

function showResultHobby() {
    const firstResult = test.getFirstRankingResult();
    const secondResult = test.getRankingResultByIndex(1);
    const lastResult = test.getLastRankingResult();

    showResultHobbyText(firstResult);
    showResultHobbyPicture(firstResult);
    showResultHobbyImageCopyright(firstResult);
    showResultHobbyDescription([firstResult, secondResult, lastResult]);
}

function showResultHobbyText(result) {
    showHobbyText(result, title);
}

function showHobbyText(result, title) {
    title.innerText = result.title;
}

function showResultHobbyPicture(result) {
    showHobbyPicture(result, picture);
}

function showHobbyPicture(result, picture) {
    picture.src = result.image;
}

function showResultHobbyImageCopyright(result) {
    showHobbyImageCopyright(result, imageCopyright);
}

function showHobbyImageCopyright(result, imageCopyright) {
    if (result.imageCopyright) {
        imageCopyright.style.visibility = 'visible';
        imageCopyright.querySelector('a').href = result.imageCopyright;
    }
    else {
        imageCopyright.style.visibility = 'hidden';
        imageCopyright.querySelector('a').href = '';
    }
}

function showResultHobbyDescription(results) {
    results.forEach((result, index) => {
        const description = descriptions[index];

        const content = description.querySelector('.content');

        showHobbyDescription(result, content);

        if (!isMainHobby(description)) {
            const title = description.querySelector('.title');
            const picture = description.querySelector('.picture img');
            const imageCopyright = description.querySelector('.picture .copyright');

            showHobbyText(result, title);
            showHobbyPicture(result, picture);
            showHobbyImageCopyright(result, imageCopyright);
        }
    });
}

function isMainHobby(description) {
    return description.classList.contains('first');
}

function showHobbyDescription(result, content) {
    content.innerHTML = result.description;
}

function moveToResultPage() {
    page.animate(
        [ { left: '-200%' } ],
        {
            duration: 300,
            direction: 'alternate',
            fill: 'forwards',
        }
    );
}