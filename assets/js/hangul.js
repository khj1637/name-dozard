// 한글 자음 획수
const CONSONANT_STROKES = {
  'ㄱ': 2, 'ㄲ': 4, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 6,
  'ㄹ': 5, 'ㅁ': 4, 'ㅂ': 4, 'ㅃ': 8, 'ㅅ': 2,
  'ㅆ': 4, 'ㅇ': 1, 'ㅈ': 3, 'ㅉ': 6, 'ㅊ': 4,
  'ㅋ': 3, 'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3
};

// 한글 모음 획수
const VOWEL_STROKES = {
  'ㅏ': 2, 'ㅐ': 3, 'ㅑ': 3, 'ㅒ': 4, 'ㅓ': 2,
  'ㅔ': 3, 'ㅕ': 3, 'ㅖ': 4, 'ㅗ': 2, 'ㅘ': 4,
  'ㅙ': 5, 'ㅚ': 3, 'ㅛ': 3, 'ㅜ': 2, 'ㅝ': 4,
  'ㅞ': 5, 'ㅟ': 3, 'ㅠ': 3, 'ㅡ': 1, 'ㅢ': 2,
  'ㅣ': 1
};

// 초성 리스트
const CHOSUNGS = [
  'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ',
  'ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
];

// 중성 리스트
const JUNGSUNGS = [
  'ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ',
  'ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'
];

// 종성 리스트 (없음 포함)
const JONGSUNGS = [
  '','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ',
  'ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ',
  'ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
];

// 복합 종성 획수
const JONGSUNG_STROKES = {
  '': 0,
  'ㄱ': 2, 'ㄲ': 4, 'ㄳ': 4, 'ㄴ': 2, 'ㄵ': 5,
  'ㄶ': 5, 'ㄷ': 3, 'ㄹ': 5, 'ㄺ': 7, 'ㄻ': 9,
  'ㄼ': 9, 'ㄽ': 7, 'ㄾ': 9, 'ㄿ': 9, 'ㅀ': 8,
  'ㅁ': 4, 'ㅂ': 4, 'ㅄ': 6, 'ㅅ': 2, 'ㅆ': 4,
  'ㅇ': 1, 'ㅈ': 3, 'ㅊ': 4, 'ㅋ': 3, 'ㅌ': 4,
  'ㅍ': 4, 'ㅎ': 3
};

// 한 글자의 획수 계산
function getCharStrokes(char) {
  const code = char.charCodeAt(0);
  // 한글 범위 체크 (가~힣)
  if (code < 0xAC00 || code > 0xD7A3) return 0;

  const offset = code - 0xAC00;
  const jongIdx = offset % 28;
  const jungIdx = ((offset - jongIdx) / 28) % 21;
  const choIdx = Math.floor(offset / 28 / 21);

  const cho = CHOSUNGS[choIdx];
  const jung = JUNGSUNGS[jungIdx];
  const jong = JONGSUNGS[jongIdx];

  const choStroke = CONSONANT_STROKES[cho] || 0;
  const jungStroke = VOWEL_STROKES[jung] || 0;
  const jongStroke = JONGSUNG_STROKES[jong] || 0;

  return choStroke + jungStroke + jongStroke;
}

// 이름 전체 획수 배열 반환
function getNameStrokes(name) {
  return name.split('').map(char => getCharStrokes(char));
}

// 궁합 계산 핵심 로직
function calcCompatibility(name1, name2) {
  const strokes1 = getNameStrokes(name1);
  const strokes2 = getNameStrokes(name2);
  const combined = [...strokes1, ...strokes2];

  // 단계별 계산 과정 저장
  const steps = [combined];
  let current = combined;

  while (current.length > 2) {
    const next = [];
    for (let i = 0; i < current.length - 1; i++) {
      next.push((current[i] + current[i + 1]) % 10);
    }
    steps.push(next);
    current = next;
  }

  // 최종 두 자리 합치기
  const finalScore = parseInt(`${current[0]}${current[1]}`);

  return {
    strokes1,
    strokes2,
    steps,
    score: finalScore
  };
}

// 성별 조합별 등급 시스템
function getGrade(score, gender1, gender2) {
  // 조합 타입 결정
  const type = `${gender1}-${gender2}`;
  const isCoupleType = (type === 'M-F' || type === 'F-M');
  const isMalePair = (type === 'M-M');
  const isFemalePair = (type === 'F-F');

  if (isCoupleType) {
    // 남+여 / 여+남 연애 궁합
    if (score >= 95) return { grade: '운명의 상대', emoji: '💍', color: '#FF6B9D', desc: '전생에 약속한 사이. 빨리 고백 안 하면 진짜 후회함', type: '💕 연애 궁합' };
    if (score >= 85) return { grade: '찐사랑각', emoji: '💘', color: '#FF6B9D', desc: '이 사람 놓치면 평생 "그때 왜 그랬지" 하게 됨', type: '💕 연애 궁합' };
    if (score >= 75) return { grade: '썸 직전', emoji: '🌸', color: '#FF8FAB', desc: '서로 의식하고 있는 거 다 보임. 거의 다 왔어', type: '💕 연애 궁합' };
    if (score >= 65) return { grade: '친구에서 연인 가능', emoji: '🦋', color: '#C77DFF', desc: '지금은 친구지만... 언제든 바뀔 수 있는 사이', type: '💕 연애 궁합' };
    if (score >= 55) return { grade: '그냥 좋은 사람', emoji: '☁️', color: '#A0C4FF', desc: '나쁘진 않은데 설레진 않는 그 느낌', type: '💕 연애 궁합' };
    if (score >= 45) return { grade: '애매한 사이', emoji: '🤔', color: '#A0C4FF', desc: '친구도 아니고 연인도 아니고... 뭐지?', type: '💕 연애 궁합' };
    if (score >= 35) return { grade: '만나면 싸움', emoji: '🌀', color: '#748DA6', desc: '대화 10분이면 반드시 말다툼 발생. 통계적으로 증명됨', type: '💕 연애 궁합' };
    if (score >= 20) return { grade: '악연 주의보', emoji: '🌪️', color: '#748DA6', desc: '전생에 서로 빚진 사이. 이번 생은 그냥 피해요', type: '💕 연애 궁합' };
    if (score >= 10) return { grade: '재난급 케미', emoji: '💥', color: '#FF6B6B', desc: '같은 공간에 있으면 주변 사람들이 먼저 피로함', type: '💕 연애 궁합' };
    return { grade: '우주 최강 불궁합', emoji: '☠️', color: '#FF6B6B', desc: '축하합니다. 역대급 기록입니다. 그냥 모르는 척 살아요 🙏', type: '💕 연애 궁합' };
  }

  if (isMalePair) {
    // 남+남 우정 궁합
    if (score >= 95) return { grade: '형제보다 진한 사이', emoji: '🔥', color: '#FF6B9D', desc: '피는 물보다 진하지만 이 우정은 피보다 진함', type: '👬 우정 궁합' };
    if (score >= 85) return { grade: '찐친 확정', emoji: '🤝', color: '#FF8FAB', desc: '같이 군대 가도 안 싸울 것 같은 사이', type: '👬 우정 궁합' };
    if (score >= 75) return { grade: '믿을 수 있는 친구', emoji: '💪', color: '#C77DFF', desc: '어려울 때 전화해도 받아주는 그런 친구', type: '👬 우정 궁합' };
    if (score >= 65) return { grade: '잘 맞는 친구', emoji: '😄', color: '#A0C4FF', desc: '같이 있으면 시간 가는 줄 모르는 사이', type: '👬 우정 궁합' };
    if (score >= 55) return { grade: '무난한 사이', emoji: '👊', color: '#A0C4FF', desc: '같이 밥은 먹을 수 있음. 딱 거기까지', type: '👬 우정 궁합' };
    if (score >= 45) return { grade: '겉도는 사이', emoji: '😐', color: '#748DA6', desc: '아는 사이인데 단톡에서만 보는 그 사람', type: '👬 우정 궁합' };
    if (score >= 35) return { grade: '은근히 경쟁하는 사이', emoji: '⚔️', color: '#748DA6', desc: '만나면 은근히 서로 재는 거 다 보임 ㅋㅋ', type: '👬 우정 궁합' };
    if (score >= 20) return { grade: '불편한 사이', emoji: '😤', color: '#FF6B6B', desc: '같은 자리에 있으면 공기가 묘해지는 그 느낌', type: '👬 우정 궁합' };
    if (score >= 10) return { grade: '그냥 남인 사이', emoji: '🚷', color: '#FF6B6B', desc: '이름은 알지만 안 친한 게 서로에게 이득일 수도', type: '👬 우정 궁합' };
    return { grade: '환장의 앙숙', emoji: '💀', color: '#FF6B6B', desc: '어쩌다 이렇게 됐냐. 전생에 무슨 일이 있었던 거야', type: '👬 우정 궁합' };
  }

  if (isFemalePair) {
    // 여+여 우정 궁합
    if (score >= 95) return { grade: '영혼의 베프', emoji: '👑', color: '#FF6B9D', desc: '서로 없으면 못 사는 사이. 평생 베프 확정', type: '👭 우정 궁합' };
    if (score >= 85) return { grade: '찐베프', emoji: '💜', color: '#FF6B9D', desc: '화장실도 같이 가고 비밀도 다 아는 그 친구', type: '👭 우정 궁합' };
    if (score >= 75) return { grade: '믿을 수 있는 베프', emoji: '🌷', color: '#C77DFF', desc: '힘들 때 제일 먼저 연락하게 되는 사람', type: '👭 우정 궁합' };
    if (score >= 65) return { grade: '잘 통하는 친구', emoji: '🌸', color: '#A0C4FF', desc: '취향이 비슷해서 같이 있으면 편한 사이', type: '👭 우정 궁합' };
    if (score >= 55) return { grade: '무난한 친구', emoji: '🍵', color: '#A0C4FF', desc: '같이 카페는 가는데 속 깊은 얘기는 좀 어려운 사이', type: '👭 우정 궁합' };
    if (score >= 45) return { grade: '어색한 사이', emoji: '😶', color: '#748DA6', desc: '아는 사이이긴 한데... 둘이서는 좀 어색한 그 관계', type: '👭 우정 궁합' };
    if (score >= 35) return { grade: '은근히 불편한 사이', emoji: '🙃', color: '#748DA6', desc: '겉으로는 웃지만 속으로는 좀 불편한 거 알고 있음', type: '👭 우정 궁합' };
    if (score >= 20) return { grade: '미묘한 라이벌', emoji: '😒', color: '#FF6B6B', desc: '서로 의식하는 거 본인들만 모름. 주변은 다 알고 있음 ㅋ', type: '👭 우정 궁합' };
    if (score >= 10) return { grade: '겉만 친한 사이', emoji: '🌵', color: '#FF6B6B', desc: '단톡은 같이 있지만 실제로는 남남. 억지로 유지 중인 관계', type: '👭 우정 궁합' };
    return { grade: '전생의 라이벌', emoji: '🔥💀', color: '#FF6B6B', desc: '어쩌다 친구가 됐는지 의문. 전생에 치열하게 싸웠을 것이 분명함', type: '👭 우정 궁합' };
  }
}

// URL 파라미터 파싱
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name1: params.get('a') || '',
    name2: params.get('b') || '',
    gender1: params.get('g1') || 'M',
    gender2: params.get('g2') || 'F'
  };
}
