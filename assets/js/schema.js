// 구조화 데이터 (JSON-LD) 동적 삽입
(function() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://name.dozard.com/#website",
        "url": "https://name.dozard.com/",
        "name": "이름 궁합 테스트",
        "description": "한글 획수로 계산하는 정통 이름 궁합 테스트. 연애 궁합, 우정 궁합 모두 가능!",
        "inLanguage": "ko-KR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://name.dozard.com/?a={name1}&b={name2}",
          "query-input": "required name=name1 name=name2"
        }
      },
      {
        "@type": "WebApplication",
        "@id": "https://name.dozard.com/#app",
        "name": "이름 궁합 테스트",
        "url": "https://name.dozard.com/",
        "description": "내 이름과 상대방 이름으로 궁합을 테스트! 한글 획수 정통 계산법으로 연애 궁합, 우정 궁합을 확인해보세요.",
        "applicationCategory": "EntertainmentApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "inLanguage": "ko-KR",
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "KRW"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1247",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "이름 궁합 계산은 어떻게 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "한글 각 글자의 획수를 구한 뒤, 인접한 두 수를 더해 일의 자리만 남기는 과정을 반복해 최종 두 자리 숫자로 궁합 점수를 계산합니다."
            }
          },
          {
            "@type": "Question",
            "name": "연애 궁합만 볼 수 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "아니요! 남자+여자 연애 궁합뿐만 아니라 남자+남자, 여자+여자 우정 궁합도 볼 수 있어요."
            }
          },
          {
            "@type": "Question",
            "name": "이름은 몇 글자부터 가능한가요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "성을 포함해 3글자 이상의 한글 이름부터 계산 가능합니다."
            }
          },
          {
            "@type": "Question",
            "name": "이름 궁합 결과를 공유할 수 있나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "네! 카카오톡 공유와 이미지 저장 기능을 통해 결과를 친구들과 공유할 수 있어요."
            }
          }
        ]
      }
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
})();
