const KAKAO_JS_KEY = '1927099e19cf557b5352d571f3f07414';

function initKakao() {
  if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init(KAKAO_JS_KEY);
  }
}

function shareKakao(name1, name2, score, grade, emoji) {
  initKakao();

  if (typeof Kakao === 'undefined') {
    copyLink(name1, name2);
    return;
  }

  const url = `https://name.dozard.com/?a=${encodeURIComponent(name1)}&b=${encodeURIComponent(name2)}`;

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${name1} ♥ ${name2} 궁합은 ${score}%! ${emoji}`,
      description: `${grade} — 나도 해보러 가기 👉 name.dozard.com`,
      imageUrl: 'https://name.dozard.com/assets/img/og.png',
      link: {
        mobileWebUrl: 'https://name.dozard.com',
        webUrl: 'https://name.dozard.com',
      },
    },
    buttons: [
      {
        title: '나도 테스트하기 💕',
        link: {
          mobileWebUrl: 'https://name.dozard.com',
          webUrl: 'https://name.dozard.com',
        },
      },
    ],
  });

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
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
