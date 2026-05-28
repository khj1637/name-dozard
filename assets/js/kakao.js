const KAKAO_JS_KEY = '1927099e19cf557b5352d571f3f07414';

function initKakao() {
  if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init(KAKAO_JS_KEY);
  }
}

function shareKakao(name1, name2, score, grade, emoji, g1, g2) {
  initKakao();

  if (typeof Kakao === 'undefined') {
    copyLink(name1, name2);
    return;
  }

  const isCoupleType = (g1 !== g2);
  const url = `https://name.dozard.com/?a=${encodeURIComponent(name1)}&b=${encodeURIComponent(name2)}`;

  const titleText = isCoupleType
    ? `${name1} ♥ ${name2} 궁합은 ${score}%! ${emoji}`
    : `${name1} & ${name2} 우정 테스트 결과는 ${score}%! ${emoji}`;

  const descText = isCoupleType
    ? `${grade} — 나도 해보러 가기 👉 name.dozard.com`
    : `${grade} — 우리 우정 몇 %? 나도 해봐 👉 name.dozard.com`;

  const btnTitle = isCoupleType ? '나도 궁합 테스트하기 💕' : '나도 우정 테스트하기 👊';

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: titleText,
      description: descText,
      imageUrl: 'https://name.dozard.com/assets/img/og.png',
      link: {
        mobileWebUrl: 'https://name.dozard.com',
        webUrl: 'https://name.dozard.com',
      },
    },
    buttons: [
      {
        title: btnTitle,
        link: {
          mobileWebUrl: 'https://name.dozard.com',
          webUrl: 'https://name.dozard.com',
        },
      },
    ],
  });
}

function copyLink(name1, name2) {
  const url = `https://name.dozard.com/?a=${encodeURIComponent(name1)}&b=${encodeURIComponent(name2)}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('링크가 복사됐어요! 친구한테 보내봐 💕');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('링크가 복사됐어요! 친구한테 보내봐 💕');
  }
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(45,45,45,0.9);
    color: white;
    padding: 12px 24px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 600;
    z-index: 9999;
    white-space: nowrap;
    animation: fadeIn 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
