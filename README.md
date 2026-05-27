# 이름 궁합 테스트 💕

**name.dozard.com** — 한글 획수 기반 이름 궁합 테스트

## 파일 구조

```
name-dozard/
├── index.html          ← 메인 (입력 + 계산 애니메이션)
├── result.html         ← 결과 페이지
├── assets/
│   ├── css/style.css   ← 파스텔 인스타 디자인
│   ├── js/
│   │   ├── hangul.js   ← 한글 획수 DB + 계산 로직
│   │   ├── canvas.js   ← 결과 이미지 생성
│   │   └── kakao.js    ← 카카오톡 공유
│   └── img/og.png      ← 카카오 공유 고정 이미지
```

## 배포 전 설정 필요 항목

### 1. AdSense 광고 슬롯 ID
index.html, result.html에서 아래 플레이스홀더를 실제 슬롯 ID로 교체:
- `TOP_BANNER_SLOT_ID`
- `BOTTOM_BANNER_SLOT_ID`
- `INTERSTITIAL_SLOT_ID`
- `RESULT_TOP_BANNER_SLOT_ID`
- `RESULT_MID_BANNER_SLOT_ID`
- `RESULT_BOTTOM_BANNER_SLOT_ID`

### 2. 카카오 JavaScript 키
`assets/js/kakao.js`에서:
```js
const KAKAO_JS_KEY = 'YOUR_KAKAO_JS_KEY';
```

### 3. OG 이미지
`assets/img/og.png` — 1200x630px 이미지 교체
