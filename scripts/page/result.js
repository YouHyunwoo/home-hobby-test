import { test } from '../data/test.js';



const title = document.querySelector('#result .title');
const picture = document.querySelector('#result .picture img');
const description = document.querySelector('#result .description');
const imageCopyright = document.querySelector('#result .image_copyright a');

const shareButtons = Array.from(document.querySelectorAll('#result .share > li'));
const linkCopyButton = document.querySelector('#result #linkCopy');

const retryButton = document.querySelector('#result button#retry');

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
    alert('복사 완료!');
});

function copyToClipboard(text) {
    const ta = document.createElement("textarea");
    document.body.appendChild(ta);
    ta.value = text;
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
}


retryButton.addEventListener('click', moveToMainPage);

function moveToMainPage() {
    $('#pages').animate({'left': '0%'}, 200);
}

export function showResultPage() {
    showResultHobby();
    moveToResultPage();
}

function showResultHobby() {
    const result = test.getHighestScore();

    showResultHobbyText(result);
    showResultHobbyPicture(result);
    showResultHobbyDescription(result);
    showResultHobbyImageCopyright(result);
}

function showResultHobbyText(result) {
    title.innerText = result.title;
}

function showResultHobbyPicture(result) {
    picture.src = result.image;
}

function showResultHobbyDescription(result) {
    description.innerHTML = result.description;
}

function showResultHobbyImageCopyright(result) {
    if (result.imageCopyright) {
        $('#result .result_image_copyright').show();
        imageCopyright.href = result.imageCopyright;
    }
    else {
        $('#result .result_image_copyright').hide();
        imageCopyright.href = '';
    }
}

function moveToResultPage() {
    $('#pages').animate({'left': '-200%'}, 300);
}