// 카카오톡 공유
// Kakao Developers에서 발급받은 JavaScript 키를 입력하세요
const KAKAO_JS_KEY = '1927099e19cf557b5352d571f3f07414'; // ← 여기에 키 입력

function initKakao() {
  if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init(KAKAO_JS_KEY);
  }
}

function shareKakao(name1, name2, score, grade, emoji) {
  initKakao();

  if (typeof Kakao === 'undefined') {
    // 카카오 SDK 없으면 링크 복사로 대체
    copyLink(name1, name2, score, grade);
    return;
  }

  const url = `https://name.dozard.com/?a=${encodeURIComponent(name1)}&b=${encodeURIComponent(name2)}`;
  const title = `${name1} ♥ ${name2} 궁합은 ${score}%! ${emoji}`;
  const desc = `${grade} — 우리 궁합 결과 나왔어! 너도 해봐 💕`;

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: desc,
      imageUrl: 'https://name.dozard.com/assets/img/og.png',
      link: {
        mobileWebUrl: url,
        webUrl: url,
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
}

// 링크 복사 (카카오 대체)
function copyLink(name1, name2, score, grade) {
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

// 토스트 메시지
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
