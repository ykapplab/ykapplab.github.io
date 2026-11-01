/**
 * PosiEcho (긍정 메아리) - Landing Page Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroPhone();
  initDemoAffirmations();
  initShowcaseCarousel();
  initFaqAccordion();
  initModal();
  initMobileMenu();
});

/* ==========================================================================
   1. Navbar Scroll Effect
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. Hero Interactive Phone Mockup
   ========================================================================== */
function initHeroPhone() {
  const micBtn = document.getElementById('heroMicBtn');
  const quoteEl = document.getElementById('heroPhoneQuote');
  const labelEl = document.getElementById('heroMicLabel');
  const cardTag = document.getElementById('heroCardTag');

  if (!micBtn) return;

  let isRecognizing = false;

  micBtn.addEventListener('click', () => {
    if (isRecognizing) return;
    isRecognizing = true;

    // 녹음 중 상태 표현
    labelEl.textContent = '낭독 듣는 중... "소리 내어 읽어보세요"';
    micBtn.style.transform = 'scale(1.15)';
    micBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    // 1.5초 후 분석 성공 피드백
    setTimeout(() => {
      labelEl.textContent = '🎉 96% 일치! 마음에 긍정 각인';
      cardTag.textContent = '✨ 미션 완료! 긍정의 나무 성장 +1';
      cardTag.style.color = '#10b981';

      // Confetti 축하 효과
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        // 복구
        labelEl.textContent = '마이크를 눌러 낭독 체험하기';
        micBtn.style.transform = '';
        micBtn.style.background = '';
        cardTag.textContent = '🌅 아침 확언 루틴';
        cardTag.style.color = '';
        isRecognizing = false;
      }, 3500);
    }, 1500);
  });
}

/* ==========================================================================
   3. Interactive Affirmation Demo (Tabs, TTS, Copy)
   ========================================================================== */
const affirmationsData = {
  morning: {
    icon: '🌅',
    quote: '나는 날마다, 모든 면에서, 점점 더 좋아지고 있다.',
    author: '— 에밀 쿠에 (Émile Coué)',
    time: '아침 06:00 ~ 11:00 활력 루틴'
  },
  noon: {
    icon: '🌤️',
    quote: '오늘 마주치는 모든 도전은 내가 한 뼘 더 단단해질 선물이다.',
    author: '— 긍정 메아리 힐링 큐레이션',
    time: '점심 11:00 ~ 17:00 리프레시 루틴'
  },
  night: {
    icon: '🌙',
    quote: '오늘 하루도 최선을 다해 살아낸 나 자신에게 깊은 감사를 보낸다.',
    author: '— 긍정 메아리 수면 명상 큐레이션',
    time: '저녁 17:00 ~ 24:00 안식과 감사 루틴'
  }
};

function initDemoAffirmations() {
  const tabs = document.querySelectorAll('.demo-tab-btn');
  const quoteText = document.getElementById('demoQuoteText');
  const quoteAuthor = document.getElementById('demoQuoteAuthor');
  const quoteIcon = document.getElementById('demoQuoteIcon');
  const ttsBtn = document.getElementById('demoTtsBtn');
  const copyBtn = document.getElementById('demoCopyBtn');

  if (!quoteText) return;

  let currentCategory = 'morning';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      currentCategory = cat;
      const data = affirmationsData[cat];

      const card = document.querySelector('.demo-quote-card');
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';

      setTimeout(() => {
        quoteIcon.textContent = data.icon;
        quoteText.textContent = data.quote;
        quoteAuthor.textContent = data.author;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  // TTS (Text To Speech) 미리 듣기
  if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
      const textToRead = affirmationsData[currentCategory].quote;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(textToRead);
        utter.lang = 'ko-KR';
        utter.rate = 0.9; // 차분하게
        utter.pitch = 1.0;

        ttsBtn.innerHTML = '<span>🔊 들려드리는 중...</span>';
        utter.onend = () => {
          ttsBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> <span>선행 듣기 (TTS)</span>';
        };
        window.speechSynthesis.speak(utter);
      } else {
        alert('사용하시는 브라우저에서는 음성 합성(TTS)을 지원하지 않습니다.');
      }
    });
  }

  // 클립보드 복사
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = affirmationsData[currentCategory].quote;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✅ 복사되었습니다!</span>';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      }).catch(() => {
        alert('복사에 실패했습니다.');
      });
    });
  }
}

/* ==========================================================================
   4. App Screenshot Carousel Showcase
   ========================================================================== */
const screenshotData = [
  {
    src: 'playstore_assets/screenshots/1_voice_routine.png',
    title: '🎙️ 실시간 음성인식(STT) 낭독 루틴',
    desc: '마이크를 켜고 소리 내어 읽으면 내장 정밀 STT가 발음 일치도를 분석하여 잠재의식에 각인합니다.'
  },
  {
    src: 'playstore_assets/screenshots/2_daily_routine.png',
    title: '☀️ 하루 3번 시간대별 맞춤 큐레이션',
    desc: '아침 미라클 모닝, 나른한 점심 리프레시, 편안한 저녁 숙면까지 하루 3번 최적의 명언을 제공합니다.'
  },
  {
    src: 'playstore_assets/screenshots/3_positive_tree.png',
    title: '🌳 확언할수록 자라나는 긍정의 나무',
    desc: '작은 콩 씨앗에서 튼튼한 새싹, 울창한 나무로 성장하며 매일 성취감을 선물합니다.'
  },
  {
    src: 'playstore_assets/screenshots/4_garden_bloom.png',
    title: '🌸 15일 완주 만개 정원 도감',
    desc: '15일 루틴을 완주하면 세상에 하나뿐인 아름다운 꽃나무로 만개하여 도감에 영구 소장됩니다.'
  },
  {
    src: 'playstore_assets/screenshots/5_gold_calendar.png',
    title: '🏅 황금 배지 출석 캘린더 & 스트릭',
    desc: '하루 3번 루틴을 완주한 날마다 달력에 황금 배지가 채워지며 연속 실천 습관을 다집니다.'
  },
  {
    src: 'playstore_assets/screenshots/6_home_widget.png',
    title: '📱 스마트폰 홈 화면 감성 위젯',
    desc: '앱을 실행하지 않아도 홈 화면에서 바로 감성 명언과 나의 나무 성장 현황을 실시간 확인합니다.'
  },
  {
    src: 'playstore_assets/screenshots/7_custom_quotes.png',
    title: '✍️ 나만의 맞춤 확언 보관함',
    desc: '나에게 가장 절실한 목표, 시험 합격, 비즈니스 성공 확언을 직접 등록하고 마음에 새길 수 있습니다.'
  },
  {
    src: 'playstore_assets/screenshots/8_healing_asmr.png',
    title: '🌧️ 마음을 비우는 힐링 ASMR 사운드',
    desc: '차분한 빗소리와 타닥타닥 모닥불 백색소음으로 번잡한 잡념을 가라앉히고 깊은 몰입을 경험합니다.'
  }
];

function initShowcaseCarousel() {
  const tabsContainer = document.getElementById('carouselTabs');
  const imageEl = document.getElementById('carouselImage');
  const titleEl = document.getElementById('carouselTitle');
  const descEl = document.getElementById('carouselDesc');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (!tabsContainer || !imageEl) return;

  let currentIndex = 0;

  // 탭 생성
  screenshotData.forEach((item, index) => {
    const tabBtn = document.createElement('button');
    tabBtn.className = `carousel-tab ${index === 0 ? 'active' : ''}`;
    tabBtn.textContent = item.title.split(' ')[1] || item.title;
    tabBtn.addEventListener('click', () => {
      setCarouselSlide(index);
    });
    tabsContainer.appendChild(tabBtn);
  });

  function setCarouselSlide(index) {
    currentIndex = index;
    const tabs = tabsContainer.querySelectorAll('.carousel-tab');
    tabs.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });

    imageEl.style.opacity = '0';
    setTimeout(() => {
      imageEl.src = screenshotData[index].src;
      titleEl.textContent = screenshotData[index].title;
      descEl.textContent = screenshotData[index].desc;
      imageEl.style.opacity = '1';
    }, 150);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + screenshotData.length) % screenshotData.length;
      setCarouselSlide(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % screenshotData.length;
      setCarouselSlide(currentIndex);
    });
  }
}

/* ==========================================================================
   5. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. Download / Notice Modal
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('downloadModal');
  const openBtns = document.querySelectorAll('.open-download-modal');
  const closeBtn = document.getElementById('closeModalBtn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

/* ==========================================================================
   7. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    if (isVisible) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '76px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#ffffff';
      navLinks.style.padding = '24px';
      navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      navLinks.style.borderBottom = '1px solid #e2e8f0';
    }
  });

  // 메뉴 클릭 시 닫기
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        navLinks.style.display = 'none';
      }
    });
  });
}
