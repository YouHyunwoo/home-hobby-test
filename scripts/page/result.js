import { test } from '../data/test.js';



const title = document.querySelector('header h1 .hobby');
const picture = document.querySelector('header figure img');
const imageCopyright = document.querySelector('header figure figcaption');
const descriptions = Array.from(document.querySelectorAll('.description article'));

const shareButtons = Array.from(document.querySelectorAll('.share ul li'));
const linkCopyButton = document.querySelector('.share a#link-copy');
const ResultCopyButton = document.querySelector('.share a#result-copy');


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
    const protocol = window.location.protocol;
    const host = window.location.host;
    const url = protocol + '//' + host;
    
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '집콕 취미 테스트',
            description: '당신에게 알맞는 집콕 취미를 추천해드립니다!',
            imageUrl: url + '/images/thumbnail.png',
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
    copyToClipboard(window.location.href);

    alert('링크 복사 완료!');
});

ResultCopyButton.addEventListener('click', (e) => {
    const content = document.querySelector('.content');

    html2canvas(content, { scrollY: -window.scrollY }).then(canvas => {
        canvas.toBlob(function(blob) {
            const item = new ClipboardItem({ "image/png": blob });

            navigator.clipboard.write([item]);
        });
    });

    alert('이미지 복사 완료!');
});

function copyToClipboard(text) {
    const ta = document.createElement("textarea");
    document.body.appendChild(ta);
    ta.value = text;
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
}


function showResult() {
    const parameters = parseURLParamerter(currentUrl);

    const firstResultIndex = parameters['r1'];
    const secondResultIndex = parameters['r2'];
    const lastResultIndex = parameters['r3'];

    const firstResult = test.getResultByIndex(firstResultIndex);
    const secondResult = test.getResultByIndex(secondResultIndex);
    const lastResult = test.getResultByIndex(lastResultIndex);

    showResultHobbyText(firstResult);
    showResultHobbyPicture(firstResult);
    showResultHobbyImageCopyright(firstResult);
    showResultHobbyDescription([firstResult, secondResult, lastResult]);
}

function parseURLParamerter(url) {
    const result = {};

    const questionMarkPosition = url.indexOf('?');

    console.assert(questionMarkPosition >= 0);

    const parameterPart = url.slice(questionMarkPosition + 1);
    const eachParameter = parameterPart.split('&');

    eachParameter.forEach(parameter => {
        const [key, value] = parameter.split('=');

        result[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return result;
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

        showHobbyDescription(result, description);

        if (!isMainHobby(description)) {
            const title = description.querySelector('h2');
            const picture = description.querySelector('figure img');
            const imageCopyright = description.querySelector('figure figcaption');

            showHobbyText(result, title);
            showHobbyPicture(result, picture);
            showHobbyImageCopyright(result, imageCopyright);
        }
    });
}

function showHobbyDescription(result, description) {
    description.innerHTML += result.description;
}

function isMainHobby(description) {
    return description.classList.contains('first');
}


showResult();