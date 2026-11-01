/**
 * 긍정 메아리 (PosiEcho) - 프로토타입 인터랙티브 스크립트
 */

// 1. 시간대별 추천 명언 및 기본 데이터
const DEFAULT_QUOTES = {
  morning: [
    { text: "시작이 반이다.", author: "아리스토텔레스" },
    { text: "오늘이라는 날은 두 번 다시 오지 않는다.", author: "단테" },
    { text: "당신이 할 수 있다고 믿든 할 수 없다고 믿든, 믿는 대로 될 것이다.", author: "헨리 포드" }
  ],
  lunch: [
    { text: "행복은 목적지가 아니라 여행하는 방식이다.", author: "마거릿 런벡" },
    { text: "가장 어두운 밤도 결국 지나가고 태양은 떠오른다.", author: "빅토르 위고" },
    { text: "성공의 비결은 결코 포기하지 않는 데 있다.", author: "벤저민 디스레일리" }
  ],
  evening: [
    { text: "스스로를 믿어라. 당신은 생각보다 더 용감하고, 똑똑하고, 강하다.", author: "A.A. 밀른" },
    { text: "삶이 있는 한 희망은 있다.", author: "키케로" },
    { text: "태양을 향해 고개를 들어라. 그러면 그림자를 볼 수 없을 것이다.", author: "헬렌 켈러" }
  ]
};

// 1-1. 마음 상태(감정)별 추천 확언 및 피드백 데이터
const MOOD_DATA = {
  great: {
    emoji: '😄',
    label: '활기차요',
    toastMsg: '🚀 활기찬 에너지가 가득하군요! 이 기운으로 오늘을 멋지게 열어봐요!',
    quotes: [
      { text: "내 안의 무한한 열정과 긍정 에너지가 세상을 밝힌다.", author: "긍정 메아리 · 활기" },
      { text: "나는 오늘 마주할 모든 도전을 즐겁고 당당하게 맞이한다.", author: "긍정 메아리 · 도전" },
      { text: "내가 뿜어내는 밝은 에너지가 멋진 기적을 불러온다.", author: "긍정 메아리 · 열정" }
    ]
  },
  good: {
    emoji: '😊',
    label: '좋아요',
    toastMsg: '✨ 기분 좋은 하루! 당신의 밝은 미소가 일상을 환하게 밝힙니다.',
    quotes: [
      { text: "기분 좋은 미소가 나와 내 주변 모든 곳에 행운을 부른다.", author: "긍정 메아리 · 감사" },
      { text: "오늘 하루 마주하는 작고 소중한 순간들이 모두 선물이다.", author: "긍정 메아리 · 기쁨" },
      { text: "감사하는 마음으로 오늘 하루를 온전히 만끽한다.", author: "긍정 메아리 · 행복" }
    ]
  },
  calm: {
    emoji: '😌',
    label: '평온해요',
    toastMsg: '🍃 차분하고 평온한 마음은 어떤 비바람도 잔잔하게 만듭니다.',
    quotes: [
      { text: "깊은 숨과 함께 모든 긴장이 풀리고 마음이 고요해진다.", author: "틱낫한 (Thich Nhat Hanh)" },
      { text: "내 마음은 잔잔한 호수처럼 평화롭고 흔들림이 없다.", author: "긍정 메아리 · 평온" },
      { text: "조급해하지 않고 지금 이 순간의 나 자신과 온전히 머문다.", author: "긍정 메아리 · 쉼" }
    ]
  },
  tired: {
    emoji: '🥺',
    label: '조금 지쳐요',
    toastMsg: '🌿 오늘 하루도 정말 수고 많았어요. 따뜻한 위로의 확언을 띄워드릴게요.',
    quotes: [
      { text: "지금 그대로도 충분히 잘하고 있어. 나 자신을 따뜻하게 안아준다.", author: "루이스 헤이 (Louise Hay)" },
      { text: "잠시 쉬어가도 괜찮아. 내 안의 힘은 편안한 휴식 속에서 다시 자라난다.", author: "긍정 메아리 · 위로" },
      { text: "오늘 하루 버텨낸 나 자신이 진심으로 대견하고 자랑스럽다.", author: "긍정 메아리 · 토닥임" }
    ]
  }
};

// 다품종 긍정 식물/나무 데이터베이스 (만개 후 선택 가능한 7가지 품종)
const PLANT_TYPES = {
  cherry: {
    id: 'cherry',
    name: '화사한 벚꽃나무',
    seedName: '설렘의 벚꽃 씨앗',
    emoji: '🌸',
    stages: ['🫘', '🌱', '🌿', '🌳', '🌸'],
    theme: '설렘과 새로운 시작',
    quoteTag: '도전과 설렘',
    color: '#ec4899',
    patMessages: [
      "🌸 향긋한 벚꽃 잎이 당신의 하루를 따뜻하게 응원합니다!",
      "🌱 분홍빛 새순이 돋아나며 설렘이 피어납니다.",
      "✨ 당신의 오늘 하루는 벚꽃처럼 눈부시게 빛날 거예요.",
      "🌸 토닥토닥! 당신의 모든 새로운 시작을 응원해요."
    ],
    confettiColors: ['#ff758c', '#ff7eb3', '#ffc3a0', '#ffffff', '#ec4899']
  },
  sunflower: {
    id: 'sunflower',
    name: '당당한 해바라기 숲',
    seedName: '자신감의 해바라기 씨앗',
    emoji: '🌻',
    stages: ['🫘', '🌱', '🌿', '🪴', '🌻'],
    theme: '자신감과 흔들리지 않는 용기',
    quoteTag: '용기와 열정',
    color: '#f59e0b',
    patMessages: [
      "🌻 태양을 향해 당당하게 고개를 드는 당신은 이미 빛나는 영웅입니다!",
      "✨ 황금빛 햇살 에너지가 온 마음을 가득 채웁니다.",
      "💛 어떤 비바람에도 꺾이지 않는 당당한 자신감이 자라납니다.",
      "🌻 당신은 스스로 빛나는 눈부신 존재입니다."
    ],
    confettiColors: ['#ffd200', '#f7971e', '#f5af19', '#ffffff', '#eab308']
  },
  lavender: {
    id: 'lavender',
    name: '평온한 라벤더 언덕',
    seedName: '치유의 라벤더 씨앗',
    emoji: '💜',
    stages: ['🫘', '🌱', '🌿', '🌾', '💜'],
    theme: '마음의 평화와 스트레스 치유',
    quoteTag: '휴식과 평온',
    color: '#8b5cf6',
    patMessages: [
      "💜 은은한 라벤더 향기가 지친 마음에 편안한 쉼을 선물합니다.",
      "🕊️ 모든 불안과 긴장을 편안하게 내려놓으세요.",
      "✨ 당신의 내면은 잔잔한 호수처럼 고요하고 평화롭습니다.",
      "💜 오늘도 애쓴 나 자신을 따뜻하게 토닥여주세요."
    ],
    confettiColors: ['#c084fc', '#a855f7', '#7c3aed', '#ede9fe', '#d8b4fe']
  },
  maple: {
    id: 'maple',
    name: '깊은 가을 단풍나무',
    seedName: '성숙과 결실의 단풍 씨앗',
    emoji: '🍁',
    stages: ['🫘', '🌱', '🌿', '🌲', '🍁'],
    theme: '성숙과 지혜, 풍요로운 결실',
    quoteTag: '감사와 성숙',
    color: '#ef4444',
    patMessages: [
      "🍁 깊어지는 붉은 단풍처럼 당신의 내면도 지혜롭게 무르익고 있어요.",
      "🍂 지나간 모든 순간은 거름이 되어 더 단단한 나를 만듭니다.",
      "✨ 인생의 가장 풍요롭고 눈부신 결실이 다가오고 있습니다.",
      "🍁 풍요로운 감사의 마음이 큰 행복을 가져다줍니다."
    ],
    confettiColors: ['#ef4444', '#f97316', '#b91c1c', '#fdba74', '#ea580c']
  },
  snowpine: {
    id: 'snowpine',
    name: '은빛 눈꽃 전나무',
    seedName: '순수함의 눈꽃 결정 씨앗',
    emoji: '❄️',
    stages: ['🫘', '🌱', '🌿', '🎄', '❄️'],
    theme: '순수함과 고요한 내면의 침묵',
    quoteTag: '내면의 침묵',
    color: '#38bdf8',
    patMessages: [
      "❄️ 은빛 눈꽃이 세상을 덮듯, 마음속 잡념이 맑고 고요해집니다.",
      "✨ 맑고 순수한 당신의 본래 모습을 온전히 기억하세요.",
      "🌨️ 모진 추위 속에서도 늘 푸른 전나무처럼 단단하게 피어납니다.",
      "❄️ 세상의 소음에서 벗어나 내 안의 평온에 머무릅니다."
    ],
    confettiColors: ['#38bdf8', '#7dd3fc', '#bae6fd', '#ffffff', '#0284c7']
  },
  goldenapple: {
    id: 'goldenapple',
    name: '기적의 황금 사과나무',
    seedName: '풍요와 기적의 황금 씨앗',
    emoji: '🍎',
    stages: ['🫘', '🌱', '🌿', '🌳', '🍎'],
    theme: '풍요, 경제적 자유와 기적',
    quoteTag: '기적과 풍요',
    color: '#eab308',
    isPro: true,
    patMessages: [
      "🍎 탐스러운 황금 사과가 열리듯 당신의 삶에 풍요와 행운이 쏟아집니다!",
      "✨ 기적은 언제나 스스로를 믿고 실천하는 자의 편입니다.",
      "💰 긍정의 파동이 세상의 모든 기회와 번영을 끌어당깁니다.",
      "🍎 나는 이미 충분하며 날마다 더 풍요로워지고 있습니다."
    ],
    confettiColors: ['#facc15', '#f59e0b', '#fbbf24', '#ffffff', '#ca8a04']
  },
  worldtree: {
    id: 'worldtree',
    name: '빛나는 생명의 세계수',
    seedName: '우주적 지혜의 세계수 씨앗',
    emoji: '🌌',
    stages: ['🫘', '🌱', '🌿', '🌲', '🌌'],
    theme: '궁극의 지혜와 우주적 긍정 (마스터)',
    quoteTag: '초월과 마스터',
    color: '#6366f1',
    isPro: true,
    patMessages: [
      "🌌 우주의 모든 별들이 당신의 앞날을 눈부시게 축복합니다!",
      "🪐 당신은 이 온 우주에 하나뿐인 지극히 귀하고 위대한 존재입니다.",
      "✨ 단단한 긍정의 뿌리가 온 세상과 경이롭게 연결되어 있습니다.",
      "🌌 당신이 딛는 모든 곳에 밝은 빛과 지혜가 함께합니다."
    ],
    confettiColors: ['#818cf8', '#6366f1', '#c084fc', '#f43f5e', '#38bdf8']
  },
  jacaranda: {
    id: 'jacaranda',
    name: '영롱한 보랏빛 자카란다',
    seedName: '신비와 영감의 자카란다 씨앗',
    emoji: '🌸',
    stages: ['🫘', '🌱', '🌿', '💜', '🌸'],
    theme: '신비로운 꿈과 영혼의 고결한 지혜',
    quoteTag: '영감과 지혜',
    color: '#a855f7',
    isPro: true,
    patMessages: [
      "🌸 보랏빛 자카란다 꽃비가 마음에 깊은 영감과 지혜를 선사합니다.",
      "💜 당신의 내면은 어떤 폭풍에도 흔들리지 않는 숭고한 지혜를 품고 있습니다.",
      "✨ 매 순간 당신은 더 현명하고 품격 있는 사람이 되어가고 있습니다."
    ],
    confettiColors: ['#a855f7', '#c084fc', '#e879f9', '#ffffff']
  }
};

// 로컬스토리지 보조 헬퍼
function getStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

// 2. 앱 전역 상태
const state = {
  currentSession: 'morning', // 'morning' | 'lunch' | 'evening'
  currentQuote: DEFAULT_QUOTES.morning[0],
  completedSteps: 0, // 0 to 3
  activeMode: 'stt', // 'stt' | 'type'
  activeTab: 'tab-mission', // 'tab-mission' | 'tab-calendar' | 'tab-custom'
  isProcessingSuccess: false, // 1회 낭독 다중 인식 방지 락
  lastRecordedSessionVoice: null, // 3회차 완주 시 방금 녹음된 세션별 육성 인메모리 캐시 { session, dateKey, blob, duration }
  currentCalendarMonth: new Date(),
  newQuoteSession: 'morning', // 새로 등록할 확언의 노출 시간대
  // TTS & ASMR 상태
  ttsGender: getStorage('posiecho_tts_gender_v1', 'female'), // 'female' | 'male'
  isTtsPlaying: false,
  fallbackAudio: null,
  isRecording: false,
  recognition: null,
  editingCustomId: null,
  activeCustomTtsBtn: null,
  // ASMR 앰비언스 오디오 엔진
  audioCtx: null,
  isAsmrPlaying: false,
  asmrSound: (getStorage('posiecho_asmr_settings_v1', {})).sound || 'rain', // 'rain' | 'fire' | 'piano' | 'waves'
  asmrVolume: typeof (getStorage('posiecho_asmr_settings_v1', {})).volume === 'number' ? (getStorage('posiecho_asmr_settings_v1', {})).volume : 0.35,
  asmrDucking: (getStorage('posiecho_asmr_settings_v1', {})).ducking !== false,
  asmrAutoPlay: !!(getStorage('posiecho_asmr_settings_v1', {})).autoPlay,
  asmrNodes: null,
  // 다품종 식물/정원 상태
  plantData: getStorage('posiecho_current_plant_v1', {
    type: 'cherry',
    cycle: 1,
    currentDays: 0
  })
};

// 로컬스토리지 키
const STORAGE_KEYS = {
  HISTORY: 'posiecho_history_v1',
  CUSTOM_AFFIRMATIONS: 'posiecho_customs_v1',
  CUSTOM_AUTO_APPLY: 'posiecho_custom_auto_apply_v1',
  TOTAL_SUCCESS: 'posiecho_total_success_v1',
  ACTIVE_TAB: 'posiecho_active_tab_v1',
  NOTI_SETTINGS: 'posiecho_noti_settings_v1',
  LAST_NOTIFIED: 'posiecho_last_notified_v1',
  FAVORITES: 'posiecho_favorites_v1',
  TTS_GENDER: 'posiecho_tts_gender_v1',
  ASMR_SETTINGS: 'posiecho_asmr_settings_v1',
  GARDEN_TREES: 'posiecho_garden_trees_v1',
  CURRENT_PLANT: 'posiecho_current_plant_v1',
  BOOSTER_LAST_DATE: 'posiecho_booster_last_date_v1',
  ROUTINE_ASSIGNED_QUOTES: 'posiecho_routine_assigned_quotes_v1',
  NOTI_TTS_VOICE: 'posiecho_noti_tts_voice_v1'
};

// 3. DOM 요소 참조
const DOM = {
  body: document.body,
  routineSlotsCard: document.getElementById('routineSlotsCard'),
  routineSlotsToggle: document.getElementById('routineSlotsToggle'),
  routineSlotsToggleBtn: document.getElementById('routineSlotsToggleBtn'),
  routineSlotsList: document.getElementById('routineSlotsList'),
  currentTimeDisplay: document.getElementById('currentTimeDisplay'),
  sessionChips: document.querySelectorAll('.time-session-chips .chip'),
  notiBtn: document.getElementById('notiBtn'),
  asmrBtn: document.getElementById('asmrBtn'),
  greetingMoodText: document.getElementById('greetingMoodText'),
  moodBtns: document.querySelectorAll('.mood-btn'),
  cardSessionBadge: document.getElementById('cardSessionBadge'),
  targetQuote: document.getElementById('targetQuote'),
  targetAuthor: document.getElementById('targetAuthor'),
  // 확언 카드 액션 버튼들
  ttsGenderBtn: document.getElementById('ttsGenderBtn'),
  ttsGenderIcon: document.getElementById('ttsGenderIcon'),
  ttsGenderLabel: document.getElementById('ttsGenderLabel'),
  favoriteQuoteBtn: document.getElementById('favoriteQuoteBtn'),
  favIcon: document.getElementById('favIcon'),
  shuffleQuoteBtn: document.getElementById('shuffleQuoteBtn'),
  ttsBtn: document.getElementById('ttsBtn'),
  step1: document.getElementById('step1'),
  step2: document.getElementById('step2'),
  step3: document.getElementById('step3'),
  counterStatusText: document.getElementById('counterStatusText'),
  // 다음 행동 유도(CTA) 배너
  sessionNextCtaBanner: document.getElementById('sessionNextCtaBanner'),
  ctaBannerIcon: document.getElementById('ctaBannerIcon'),
  ctaBannerTitle: document.getElementById('ctaBannerTitle'),
  ctaBannerDesc: document.getElementById('ctaBannerDesc'),
  ctaBannerActionBtn: document.getElementById('ctaBannerActionBtn'),
  ctaBannerBtnText: document.getElementById('ctaBannerBtnText'),
  modeTabBtns: document.querySelectorAll('.mode-tab-btn'),
  sttModeView: document.getElementById('sttModeView'),
  typeModeView: document.getElementById('typeModeView'),
  tabMission: document.getElementById('tab-mission'),
  typingQuoteTargetText: document.getElementById('typingQuoteTargetText'),
  typingQuoteAuthor: document.getElementById('typingQuoteAuthor'),
  micBtn: document.getElementById('micBtn'),
  pulseVisualizer: document.getElementById('pulseVisualizer'),
  micHint: document.getElementById('micHint'),
  recognizedText: document.getElementById('recognizedText'),
  wordMatchGuide: document.getElementById('wordMatchGuide'),
  similarityScore: document.getElementById('similarityScore'),
  similarityFill: document.getElementById('similarityFill'),
  typingInputWrapper: document.getElementById('typingInputWrapper'),
  typingWatermark: document.getElementById('typingWatermark'),
  typingInput: document.getElementById('typingInput'),
  typingAccuracy: document.getElementById('typingAccuracy'),
  typingCharCount: document.getElementById('typingCharCount'),
  submitTypingBtn: document.getElementById('submitTypingBtn'),
  // 3회 완주 축하 팝업 모달
  successModal: document.getElementById('successModal'),
  closeSuccessModalBtn: document.getElementById('closeSuccessModalBtn'),
  dismissSuccessBtn: document.getElementById('dismissSuccessBtn'),
  badgeRewardTitle: document.getElementById('badgeRewardTitle'),
  badgeRewardDesc: document.getElementById('badgeRewardDesc'),
  moveToCalendarBtn: document.getElementById('moveToCalendarBtn'),
  successCapsuleRecordBtn: document.getElementById('successCapsuleRecordBtn'),
  missionCapsuleBtn: document.getElementById('missionCapsuleBtn'),
  missionCapsuleStatusText: document.getElementById('missionCapsuleStatusText'),
  // 캘린더 & 나무
  treeVisualBox: document.getElementById('treeVisualBox'),
  treeArt: document.getElementById('treeArt'),
  treePlantName: document.getElementById('treePlantName'),
  waterTreeBtn: document.getElementById('waterTreeBtn'),
  treeLevelBadge: document.getElementById('treeLevelBadge'),
  treeMessage: document.getElementById('treeMessage'),
  treeExpFill: document.getElementById('treeExpFill'),
  treeExpText: document.getElementById('treeExpText'),
  treeNextPreviewBadge: document.getElementById('treeNextPreviewBadge'),
  treeBloomBanner: document.getElementById('treeBloomBanner'),
  openSeedSelectBtn: document.getElementById('openSeedSelectBtn'),
  openSeedSelectFromGardenBtn: document.getElementById('openSeedSelectFromGardenBtn'),
  openGardenGalleryBtn: document.getElementById('openGardenGalleryBtn'),
  openTreeGuideFromCalBtn: document.getElementById('openTreeGuideFromCalBtn'),
  gardenCountBadge: document.getElementById('gardenCountBadge'),
  // ASMR 모달 요소
  asmrModal: document.getElementById('asmrModal'),
  closeAsmrModalBtn: document.getElementById('closeAsmrModalBtn'),
  asmrTrackCards: document.querySelectorAll('.asmr-track-card'),
  asmrVolumeSlider: document.getElementById('asmrVolumeSlider'),
  asmrVolumePercent: document.getElementById('asmrVolumePercent'),
  asmrDuckingToggle: document.getElementById('asmrDuckingToggle'),
  asmrModalAutoPlayToggle: document.getElementById('asmrModalAutoPlayToggle'),
  asmrStopBtn: document.getElementById('asmrStopBtn'),
  asmrApplyBtn: document.getElementById('asmrApplyBtn'),
  // 옵션 모달 내 ASMR 요소
  asmrAutoPlayToggle: document.getElementById('asmrAutoPlayToggle'),
  optAsmrChips: document.querySelectorAll('.opt-asmr-chip'),
  optAsmrCurrentModeDesc: document.getElementById('optAsmrCurrentModeDesc'),
  openAsmrDetailModalBtn: document.getElementById('openAsmrDetailModalBtn'),
  // 새 씨앗 선택 모달
  seedSelectModal: document.getElementById('seedSelectModal'),
  closeSeedModalBtn: document.getElementById('closeSeedModalBtn'),
  seedListGrid: document.getElementById('seedListGrid'),
  // 정원 도감 모달
  gardenGalleryModal: document.getElementById('gardenGalleryModal'),
  closeGardenModalBtn: document.getElementById('closeGardenModalBtn'),
  gardenTotalTreesCount: document.getElementById('gardenTotalTreesCount'),
  gardenTotalDaysCount: document.getElementById('gardenTotalDaysCount'),
  gardenYearProgress: document.getElementById('gardenYearProgress'),
  gardenCollectionGrid: document.getElementById('gardenCollectionGrid'),
  openPlantFromGardenBtn: document.getElementById('openPlantFromGardenBtn'),
  dismissGardenModalBtn: document.getElementById('dismissGardenModalBtn'),
  // 통계 위젯
  statStreakDays: document.getElementById('statStreakDays'),
  statMonthDays: document.getElementById('statMonthDays'),
  statTopMood: document.getElementById('statTopMood'),
  // 캘린더 네비게이션
  calendarMonthTitle: document.getElementById('calendarMonthTitle'),
  todayJumpBtn: document.getElementById('todayJumpBtn'),
  calendarDaysGrid: document.getElementById('calendarDaysGrid'),
  prevMonthBtn: document.getElementById('prevMonthBtn'),
  nextMonthBtn: document.getElementById('nextMonthBtn'),
  // 날짜별 상세 모달
  dayDetailModal: document.getElementById('dayDetailModal'),
  closeDayDetailModalBtn: document.getElementById('closeDayDetailModalBtn'),
  dismissDayDetailBtn: document.getElementById('dismissDayDetailBtn'),
  modalDayBadge: document.getElementById('modalDayBadge'),
  modalDayDate: document.getElementById('modalDayDate'),
  modalRoutineMorning: document.getElementById('modalRoutineMorning'),
  modalRoutineLunch: document.getElementById('modalRoutineLunch'),
  modalRoutineEvening: document.getElementById('modalRoutineEvening'),
  modalDayMood: document.getElementById('modalDayMood'),
  modalDayQuote: document.getElementById('modalDayQuote'),
  modalMorningQuote: document.getElementById('modalMorningQuote'),
  modalLunchQuote: document.getElementById('modalLunchQuote'),
  modalEveningQuote: document.getElementById('modalEveningQuote'),
  modalMorningDoneTag: document.getElementById('modalMorningDoneTag'),
  modalLunchDoneTag: document.getElementById('modalLunchDoneTag'),
  modalEveningDoneTag: document.getElementById('modalEveningDoneTag'),
  modalQuoteCardMorning: document.getElementById('modalQuoteCardMorning'),
  modalQuoteCardLunch: document.getElementById('modalQuoteCardLunch'),
  modalQuoteCardEvening: document.getElementById('modalQuoteCardEvening'),
  modalGoMissionBtn: document.getElementById('modalGoMissionBtn'),
  // 커스텀 확언
  customCard: document.getElementById('customCard'),
  customCardTitle: document.getElementById('customCardTitle'),
  customHeaderIcon: document.getElementById('customHeaderIcon'),
  customCardDesc: document.getElementById('customCardDesc'),
  customInput: document.getElementById('customInput'),
  clearCustomInputBtn: document.getElementById('clearCustomInputBtn'),
  customCharCount: document.getElementById('customCharCount'),
  addCustomBtn: document.getElementById('addCustomBtn'),
  addCustomBtnText: document.getElementById('addCustomBtnText'),
  addCustomBtnIcon: document.getElementById('addCustomBtnIcon'),
  cancelEditCustomBtn: document.getElementById('cancelEditCustomBtn'),
  customAffirmationsList: document.getElementById('customAffirmationsList'),
  newQuoteScheduleChips: document.querySelectorAll('#newQuoteScheduleChips .sched-chip'),
  customAutoApplyToggle: document.getElementById('customAutoApplyToggle'),
  customCountBadge: document.getElementById('customCountBadge'),
  recommendChips: document.querySelectorAll('.recommend-chip'),
  // 네비게이션
  navTabs: document.querySelectorAll('.app-bottom-nav .nav-tab'),
  tabPanels: document.querySelectorAll('.tab-panel'),
  // 사이드바 현황
  sidebarTotalSuccess: document.getElementById('sidebarTotalSuccess'),
  sidebarTreeStage: document.getElementById('sidebarTreeStage'),
  sidebarTodayRoutines: document.getElementById('sidebarTodayRoutines'),
  sbRoutineMorning: document.getElementById('sbRoutineMorning'),
  sbRoutineLunch: document.getElementById('sbRoutineLunch'),
  sbRoutineEvening: document.getElementById('sbRoutineEvening'),
  // 옵션 및 알림 모달 요소들
  optionsBtn: document.getElementById('optionsBtn'),
  openTreeGuideBtn: document.getElementById('openTreeGuideBtn'),
  tutorialGoMissionBtn: document.getElementById('tutorialGoMissionBtn'),
  optNavBtns: document.querySelectorAll('.opt-nav-btn'),
  optPanels: document.querySelectorAll('.opt-panel'),
  notificationModal: document.getElementById('notificationModal'),
  closeNotiModalBtn: document.getElementById('closeNotiModalBtn'),
  notiPermissionBanner: document.getElementById('notiPermissionBanner'),
  notiPermIcon: document.getElementById('notiPermIcon'),
  notiPermMsg: document.getElementById('notiPermMsg'),
  reqPermBtn: document.getElementById('reqPermBtn'),
  notiMasterToggle: document.getElementById('notiMasterToggle'),
  routineNotiList: document.getElementById('routineNotiList'),
  notiMorningToggle: document.getElementById('notiMorningToggle'),
  notiMorningTime: document.getElementById('notiMorningTime'),
  notiLunchToggle: document.getElementById('notiLunchToggle'),
  notiLunchTime: document.getElementById('notiLunchTime'),
  notiEveningToggle: document.getElementById('notiEveningToggle'),
  notiEveningTime: document.getElementById('notiEveningTime'),
  notiSmartSkipCheck: document.getElementById('notiSmartSkipCheck'),
  notiTtsVoiceToggle: document.getElementById('notiTtsVoiceToggle'),
  notiGenderSelectRow: document.getElementById('notiGenderSelectRow'),
  notiGenderFemaleBtn: document.getElementById('notiGenderFemaleBtn'),
  notiGenderMaleBtn: document.getElementById('notiGenderMaleBtn'),
  notiTestBtn: document.getElementById('notiTestBtn'),
  saveNotiSettingsBtn: document.getElementById('saveNotiSettingsBtn'),
  // 광고 배너 & PRO 관련 요소
  calendarAdBanner: document.getElementById('calendarAdBanner'),
  settingsAdBanner: document.getElementById('settingsAdBanner'),
  treeAdBanner: document.getElementById('treeAdBanner'),
  gardenAdBanner: document.getElementById('gardenAdBanner'),
  adRemoveBtnCal: document.getElementById('adRemoveBtnCal'),
  adRemoveBtnSetting: document.getElementById('adRemoveBtnSetting'),
  adRemoveBtnTree: document.getElementById('adRemoveBtnTree'),
  adRemoveBtnGarden: document.getElementById('adRemoveBtnGarden'),
  calendarAdActionBtn: document.getElementById('calendarAdActionBtn'),
  settingsAdActionBtn: document.getElementById('settingsAdActionBtn'),
  treeAdActionBtn: document.getElementById('treeAdActionBtn'),
  gardenAdActionBtn: document.getElementById('gardenAdActionBtn'),
  proModal: document.getElementById('proModal'),
  closeProModalBtn: document.getElementById('closeProModalBtn'),
  dismissProModalBtn: document.getElementById('dismissProModalBtn'),
  buyPlanBtn: document.getElementById('buyPlanBtn'),
  buyBtnText: document.getElementById('buyBtnText'),
  buyBtnIcon: document.getElementById('buyBtnIcon'),
  restorePurchasesBtn: document.getElementById('restorePurchasesBtn'),
  proStatusNotice: document.getElementById('proStatusNotice'),
  adStatusText: document.getElementById('adStatusText'),
  headerProBtn: document.getElementById('headerProBtn'),
  headerProText: document.getElementById('headerProText'),
  gardenBoosterCard: document.getElementById('gardenBoosterCard'),
  gardenBoosterBtn: document.getElementById('gardenBoosterBtn'),
  gardenBoosterDesc: document.getElementById('gardenBoosterDesc'),
  gardenBoosterBtnText: document.getElementById('gardenBoosterBtnText'),
  customCategoryChips: document.querySelectorAll('#customCategoryChips .cat-chip'),
  customFilterBar: document.getElementById('customFilterBar'),
  dayVoiceCapsuleCard: document.getElementById('dayVoiceCapsuleCard'),
  playVoiceCapsuleBtn: document.getElementById('playVoiceCapsuleBtn'),
  recordQuickCapsuleBtn: document.getElementById('recordQuickCapsuleBtn'),
  capsuleMsg: document.getElementById('capsuleMsg'),
  widgetThemeSelector: document.getElementById('widgetThemeSelector'),
  applyWidgetThemeBtn: document.getElementById('applyWidgetThemeBtn'),
  proDemoStateTitle: document.getElementById('proDemoStateTitle'),
  proModalDemoToggleBtn: document.getElementById('proModalDemoToggleBtn'),
  // 복원 모달 관련 요소들
  restoreDataModal: document.getElementById('restoreDataModal'),
  closeRestoreModalBtn: document.getElementById('closeRestoreModalBtn'),
  dismissRestoreModalBtn: document.getElementById('dismissRestoreModalBtn'),
  selectRestoreFileBtn: document.getElementById('selectRestoreFileBtn'),
  restoreJsonTextarea: document.getElementById('restoreJsonTextarea'),
  pasteFromClipboardBtn: document.getElementById('pasteFromClipboardBtn'),
  applyJsonRestoreBtn: document.getElementById('applyJsonRestoreBtn')
};

// 4. 초기화 함수
function getAutoSession() {
  const hour = new Date().getHours();
  // 새벽 4시(04:00)부터 11시 전까지는 미라클 모닝 및 아침 루틴으로 자동 활성화!
  if (hour >= 4 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'lunch';
  return 'evening';
}

function getSessionOrder(session) {
  if (session === 'morning') return 1;
  if (session === 'lunch') return 2;
  return 3;
}

function init() {
  try { localStorage.removeItem('posiecho_test_free_mode'); } catch(e) {}
  if (navigator.userAgent.includes('PosiEchoApp')) {
    document.body.classList.add('android-app');
  }

  updateTimeClock();
  setInterval(updateTimeClock, 1000);
  
  setupEvents();
  loadCustomAffirmations();
  
  // 1번 개선: 현재 실제 시간에 맞춰 적합한 세션(아침 06~11시 / 점심 11~17시 / 저녁 17~24시)을 자동 활성화
  const initialSession = getAutoSession();
  setSession(initialSession, false);

  // 오늘 저장된 마음 상태(감정) 복원 (현재 시간대 세션 확언을 보존하기 위해 changeQuote=false 전달)
  const todayKey = getTodayKey();
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  if (history[todayKey] && history[todayKey].mood) {
    applyMood(history[todayKey].mood, false, false);
  }

  renderCalendar();
  updateTreeAndSidebar();
  updateTtsGenderUI();
  updateAsmrHeaderBtn();
  syncAsmrModalUI();
  syncOptionsAsmrUI();
  initSTT();
  updateVoiceCapsuleCard(todayKey);

  // 옵션 설정: 앱 시작과 함께 ASMR 자동 재생 실행
  if (state.asmrAutoPlay) {
    tryStartAutoPlayAsmr();
  }

  // 저장된 활성 탭 복원 (새로고침 시에도 오늘의 미션 / 캘린더 & 나무 / 나만의 확언 상태 유지)
  const savedTab = getStorage(STORAGE_KEYS.ACTIVE_TAB, 'tab-mission');
  if (document.getElementById(savedTab)) {
    switchTab(savedTab);
  } else {
    switchTab('tab-mission');
  }

  // 하루 3번 루틴 알림 스케줄러 초기화
  initNotificationScheduler();
  syncNativeAlarms(getNotiSettings());

  // 네이티브 앱 환경 감지 및 광고 표시 상태 초기화
  if (window.AndroidBridge) {
    document.body.classList.add('is-native-app');
  }
  updateAdDisplayState();
  updateProUI();
}

// 5. 시간 및 세션 관리 (실시간 세션 전환 & 백그라운드 복귀 동기화 보강)
let lastKnownDateKey = getTodayKey();
let lastKnownAutoSession = getAutoSession();

function checkAndSyncDateChange(force = false, isResume = false) {
  const currentTodayKey = getTodayKey();
  const isDateRolled = currentTodayKey !== lastKnownDateKey;
  const currentAutoSession = getAutoSession();
  const isAutoSessionTicked = currentAutoSession !== lastKnownAutoSession;
  // 🛡️ [수정] 사용자가 수동 선택한 세션(점심/저녁/아침)을 앱 복귀(isResume) 시 강제로 덮어쓰지 않음
  // 날짜가 완전히 변경되었거나(isDateRolled), 명시적 강제(force)인 경우에만 세션 동기화
  const shouldUpdate = force || isDateRolled;

  if (shouldUpdate) {
    if (state.isRecording || state.isThirdStepRecording) {
      // 낭독 또는 녹음 중에는 사용자 발화를 방해하지 않음
      return;
    }

    if (isDateRolled) {
      lastKnownDateKey = currentTodayKey;
      state.currentCalendarMonth = new Date();
      resetInputs();
      showToast('🌅 새로운 하루가 시작되었습니다! 오늘의 긍정 확언을 확인해 보세요 🌿');
    }

    lastKnownAutoSession = currentAutoSession;
    setSession(currentAutoSession, false);
    updateStepsUI();
    renderCalendar();
    updateTreeAndSidebar();
    updateNextCtaBanner();
    syncNativeAlarms(getNotiSettings());
  } else if (isAutoSessionTicked) {
    lastKnownAutoSession = currentAutoSession;
  }
}

function updateTimeClock() {
  if (DOM.currentTimeDisplay) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    DOM.currentTimeDisplay.textContent = `${hours}:${minutes}`;
  }
}

function getActiveQuoteForSession(sessionName) {
  const autoApply = getStorage(STORAGE_KEYS.CUSTOM_AUTO_APPLY, false);
  if (autoApply) {
    const assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, null);
    if (assigned && assigned[sessionName]) {
      const sessionLabels = {
        morning: '나만의 아침 확언',
        lunch: '나만의 점심 확언',
        evening: '나만의 저녁 확언'
      };
      return {
        text: assigned[sessionName],
        author: sessionLabels[sessionName] || '나만의 긍정 확언',
        isCustom: true
      };
    }

    // 초기 마이그레이션 fallback: assigned가 없을 때 기존 커스텀 리스트에서 매칭
    if (!assigned) {
      const customList = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
      const matched = customList.filter(item => 
        (item.session === sessionName || item.session === 'all') && item.session !== 'manual' && item.session !== 'stored'
      );
      if (matched.length > 0) {
        const sessionLabels = {
          morning: '나만의 아침 확언',
          lunch: '나만의 점심 확언',
          evening: '나만의 저녁 확언',
          all: '나만의 긍정 확언'
        };
        return {
          text: matched[0].text,
          author: sessionLabels[matched[0].session] || '나만의 긍정 확언',
          isCustom: true
        };
      }
    }
  }

  // 2순위: 365일 명언 데이터베이스에서 오늘 날짜와 세션에 매칭되는 명언 반환
  return get365QuoteForDate(new Date(), sessionName);
}

// 1년 중 몇 번째 날인지 계산 (1 ~ 365)
function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// 365일 명언 데이터에서 날짜 및 세션별 최적 명언 추출
function get365QuoteForDate(date = new Date(), sessionName = 'morning') {
  if (typeof DAILY_365_QUOTES !== 'undefined' && Array.isArray(DAILY_365_QUOTES) && DAILY_365_QUOTES.length > 0) {
    const dayOfYear = getDayOfYear(date);
    // 아침: 오늘 고유 명언 (offset 0)
    // 점심: +122일 오프셋으로 하루 세 번 겹치지 않게 배정
    // 저녁: +244일 오프셋
    const offsets = { morning: 0, lunch: 122, evening: 244 };
    const offset = offsets[sessionName] || 0;
    const index = (dayOfYear - 1 + offset + DAILY_365_QUOTES.length) % DAILY_365_QUOTES.length;
    const item = DAILY_365_QUOTES[index];
    return {
      text: item.text,
      author: item.author || `${item.month}월 · ${item.theme}`,
      dayNum: item.day,
      theme: item.theme
    };
  }
  const quotes = DEFAULT_QUOTES[sessionName] || DEFAULT_QUOTES.morning;
  const dayIndex = date.getDate() % quotes.length;
  return quotes[dayIndex] || quotes[0];
}

function isSessionCompletedToday(sessionName) {
  const todayKey = getTodayKey();
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  return Boolean(history[todayKey] && history[todayKey][sessionName] === true);
}

function updateSessionChips() {
  const todayKey = getTodayKey();
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  const todayData = history[todayKey] || {};
  const realOrder = getSessionOrder(getAutoSession());

  DOM.sessionChips.forEach(chip => {
    const session = chip.dataset.session;
    const isCompleted = Boolean(todayData[session]);
    chip.classList.toggle('completed', isCompleted);

    const checkEl = chip.querySelector('.chip-check');
    if (checkEl) {
      checkEl.style.display = isCompleted ? 'inline-block' : 'none';
    }

    const timeEl = chip.querySelector('.chip-time');
    if (timeEl) {
      if (isCompleted) {
        const sessionOrder = getSessionOrder(session);
        timeEl.textContent = sessionOrder > realOrder ? '미리 완료' : '3/3 완료';
      } else {
        const defaultTimes = {
          morning: '04~11h',
          lunch: '11~17h',
          evening: '17~24h'
        };
        timeEl.textContent = defaultTimes[session] || '';
      }
    }
  });
}

function setSession(sessionName, resetStep = true) {
  stopTTS();
  // 🛡️ 세션 전환 시 혹시 남아있는 마이크 녹음 및 스트림 트랙 즉시 강제 정리
  if (state.isThirdStepRecording || thirdStepStream) {
    stopThirdStepVoiceRecording(false);
  }
  if (quickRecordStream) {
    stopQuickCapsuleRecording(false);
  }
  state.currentSession = sessionName;
  const isAndroid = navigator.userAgent.includes('PosiEchoApp') || document.body.classList.contains('android-app');
  DOM.body.className = `theme-${sessionName}${isAndroid ? ' android-app' : ''}`;

  if (window.AndroidBridge && typeof window.AndroidBridge.setStatusBarTheme === 'function') {
    window.AndroidBridge.setStatusBarTheme(sessionName === 'evening');
  }

  // 칩 상태 및 완료 체크 배지 변경
  DOM.sessionChips.forEach(chip => {
    chip.classList.toggle('active', chip.dataset.session === sessionName);
  });
  updateSessionChips();

  // 해당 시간대 확언 설정 (나만의 확언 시간대 스케줄 자동 연동)
  state.currentQuote = getActiveQuoteForSession(sessionName);
  updateQuoteUI();

  // 세션 배지 텍스트 및 완료 표시 (스마트 넛지: 미리 실천 / 보충 실천)
  const badgeMap = {
    morning: '🌅 오늘의 아침 확언',
    lunch: '☀️ 오늘의 점심 확언',
    evening: '🌙 오늘의 저녁 확언'
  };
  const isCompleted = isSessionCompletedToday(sessionName);
  const realSession = getAutoSession();
  const sessionOrder = getSessionOrder(sessionName);
  const realOrder = getSessionOrder(realSession);
  const hour = new Date().getHours();
  const isDeepNightEarly = (hour >= 0 && hour < 4);

  if (sessionOrder > realOrder || (isDeepNightEarly && sessionName === 'morning')) {
    if (isCompleted) {
      DOM.cardSessionBadge.innerHTML = `${badgeMap[sessionName]} <span class="badge-done-tag">미리 완료 ✔</span>`;
      DOM.cardSessionBadge.classList.add('completed-badge');
    } else {
      const preLabel = isDeepNightEarly ? '새벽 실천 중 🌅' : '미리 실천 중 ⏰';
      DOM.cardSessionBadge.innerHTML = `${badgeMap[sessionName]} <span class="badge-pre-tag">${preLabel}</span>`;
      DOM.cardSessionBadge.classList.remove('completed-badge');
    }
  } else if (sessionOrder < realOrder) {
    if (isCompleted) {
      DOM.cardSessionBadge.innerHTML = `${badgeMap[sessionName]} <span class="badge-done-tag">완료 ✔</span>`;
      DOM.cardSessionBadge.classList.add('completed-badge');
    } else {
      DOM.cardSessionBadge.innerHTML = `${badgeMap[sessionName]} <span class="badge-catchup-tag">보충 실천 중 🌿</span>`;
      DOM.cardSessionBadge.classList.remove('completed-badge');
    }
  } else {
    if (isCompleted) {
      DOM.cardSessionBadge.innerHTML = `${badgeMap[sessionName]} <span class="badge-done-tag">완료 ✔</span>`;
      DOM.cardSessionBadge.classList.add('completed-badge');
    } else {
      DOM.cardSessionBadge.textContent = badgeMap[sessionName];
      DOM.cardSessionBadge.classList.remove('completed-badge');
    }
  }

  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const doneLabel = sessionOrder > realOrder ? '미리 달성!' : '달성!';

  // 🛡️ 세션 전환 시 네이티브 STT 리소스 완전 리셋 (이전 세션 간섭 원천 차단)
  if (window.AndroidBridge && typeof window.AndroidBridge.resetSTT === 'function') {
    try { window.AndroidBridge.resetSTT(); } catch (e) {}
  }

  // 🛡️ [핵심 수정] 타겟 세션이 오늘 미완료 상태라면 resetStep 값과 상관없이 무조건 스텝을 0으로 독립 초기화!
  // (이전 아침 루틴에서 3회를 완주했더라도, 점심·저녁 루틴으로 이동 시 1회차부터 정상 시작 보장)
  if (isCompleted) {
    state.completedSteps = 3;
    state.isProcessingSuccess = false;
    updateStepsUI();
    closeSuccessModal();
    resetInputs();
    if (isProUser()) {
      DOM.micHint.innerHTML = `✨ <strong style="color:var(--success-color);">오늘의 ${sessionNames[sessionName] || ''} 확언 ${doneLabel}</strong> (마음껏 추가 낭독 가능 🌿)`;
    } else {
      DOM.micHint.innerHTML = `🎉 <strong style="color:var(--success-color);">오늘의 ${sessionNames[sessionName] || ''} 확언 ${doneLabel}</strong> · <a href="#" id="proSwitchLink" style="color:var(--primary-accent); font-weight:700; text-decoration:underline;">PRO 무제한 연습</a>`;
      setTimeout(() => {
        const lk = document.getElementById('proSwitchLink');
        if (lk) lk.onclick = (e) => { e.preventDefault(); openProModal(); };
      }, 50);
    }
  } else {
    state.completedSteps = 0;
    state.isProcessingSuccess = false;
    state.isRecording = false;
    state.isThirdStepRecording = false;
    updateStepsUI();
    closeSuccessModal();
    resetInputs();
    if (sessionOrder > realOrder) {
      DOM.micHint.innerHTML = `⏰ <strong>미리 실천:</strong> 마이크를 눌러 소리 내어 읽어보세요`;
    } else {
      DOM.micHint.textContent = "마이크를 눌러 소리 내어 읽어보세요";
    }
  }
}

function updateQuoteUI() {
  DOM.targetQuote.textContent = `"${state.currentQuote.text}"`;
  DOM.targetAuthor.textContent = `- ${state.currentQuote.author}`;
  if (DOM.typingQuoteTargetText) {
    DOM.typingQuoteTargetText.textContent = `"${state.currentQuote.text}"`;
  }
  if (DOM.typingQuoteAuthor) {
    DOM.typingQuoteAuthor.textContent = `- ${state.currentQuote.author}`;
  }
  if (DOM.typingWatermark) {
    DOM.typingWatermark.textContent = state.currentQuote.text;
  }

  // 🎯 낭독 모드일 때 확언 바로 아래에 또박또박 단어 칩바 즉시 렌더링
  if (state.activeMode === 'stt') {
    updateWordMatchUI('');
  } else if (DOM.wordMatchGuide) {
    DOM.wordMatchGuide.classList.add('hidden');
  }

  // 찜하기(즐겨찾기) 상태 표시 동기화
  const favorites = getStorage(STORAGE_KEYS.FAVORITES, []);
  const isFav = favorites.some(f => f.text === state.currentQuote.text);
  if (DOM.favIcon) {
    DOM.favIcon.textContent = isFav ? '❤️' : '🤍';
  }
  if (DOM.favoriteQuoteBtn) {
    DOM.favoriteQuoteBtn.classList.toggle('favorited', isFav);
    DOM.favoriteQuoteBtn.title = isFav ? '즐겨찾기 해제' : '나만의 확언에 찜하기';
  }

  // 홈 화면 위젯에 최신 확언 실시간 동기화
  syncWidgetData();
}

// 📱 안드로이드 홈 화면 위젯 데이터 실시간 동기화 브릿지
function syncWidgetData() {
  if (window.AndroidBridge && typeof window.AndroidBridge.updateWidget === 'function') {
    try {
      const quoteText = (state.currentQuote && state.currentQuote.text) 
        ? state.currentQuote.text 
        : "당신이 심은 친절의 씨앗은 언젠가 반드시 열매를 맺는다.";
      const quoteAuthor = (state.currentQuote && state.currentQuote.author) 
        ? state.currentQuote.author 
        : "탈무드";
      const session = state.currentSession || "morning";
      const theme = getStorage('posiecho_widget_theme', 'simple');
      const plant = typeof getCurrentPlantData === 'function' ? getCurrentPlantData() : null;
      let plantInfo = "🌱 긍정나무 키우는 중";
      if (plant && typeof getPlantDefinition === 'function') {
        const pDef = getPlantDefinition(plant.type);
        plantInfo = `${pDef.emoji} ${pDef.name} (${plant.currentDays || 0}/15일)`;
      }
      window.AndroidBridge.updateWidget(quoteText, quoteAuthor, session, theme, plantInfo);
    } catch (e) {
      console.warn("syncWidgetData error:", e);
    }
  }
}

// 2번: STT 음성 인식 결과 단어별 일치/누락(초록/주황) 하이라이트 대조 가이드
function updateWordMatchUI(transcript = '', isFinal = false) {
  if (!DOM.wordMatchGuide || !state.currentQuote || !state.currentQuote.text) return;
  const clean = (str) => (str || '').replace(/[^가-힣a-zA-Z0-9]/g, '').toLowerCase();
  const currentText = (transcript || '').trim();
  const rawWords = state.currentQuote.text.trim().split(/\s+/);
  if (rawWords.length === 0) return;

  DOM.wordMatchGuide.classList.remove('hidden');

  // 마이크 시작 전 또는 발화 대기 중: 모든 단어를 대기(pending) 상태로 즉시 펼쳐 낭독 가이드 제공
  if (!currentText) {
    let chipsHtml = '';
    rawWords.forEach(word => {
      const displayWord = word.replace(/[.,!?~"'“”]/g, '').trim();
      if (!displayWord) return;
      chipsHtml += `<span class="target-word pending">${displayWord}</span>`;
    });
    const tipText = state.isRecording 
      ? '🎙️ 목소리를 듣고 있습니다... 또박또박 읽어주세요' 
      : '마이크를 누르고 소리 내어 읽으면 실시간 초록색(🟢 ✓)으로 켜집니다';
    DOM.wordMatchGuide.innerHTML = `
      <div class="word-match-header">
        <span class="word-match-badge">🎯 또박또박 낭독 가이드</span>
        <span class="word-match-tip">${tipText}</span>
      </div>
      <div class="word-match-chips">
        ${chipsHtml}
      </div>
    `;
    return;
  }

  const spokenWords = currentText.split(/\s+/).map(clean).filter(Boolean);
  let matchedCount = 0;
  let totalWordsCount = 0;
  let chipsHtml = '';

  rawWords.forEach(word => {
    const displayWord = word.replace(/[.,!?~"'“”]/g, '').trim();
    if (!displayWord) return;
    totalWordsCount++;

    const cleanWord = clean(displayWord);
    let isMatched = false;
    if (cleanWord.length <= 1) {
      isMatched = spokenWords.some(sw => sw === cleanWord);
    } else {
      isMatched = spokenWords.some(sw => sw === cleanWord || sw.includes(cleanWord) || cleanWord.includes(sw));
    }

    if (isMatched) {
      matchedCount++;
      chipsHtml += `<span class="target-word matched">${displayWord} ✓</span>`;
    } else {
      // 말이 끝난 최종 결과일 때만 missed(오렌지) 표시, 아직 읽는 중(interim/partial)일 땐 pending(대기) 유지
      const cls = isFinal ? 'missed' : 'pending';
      chipsHtml += `<span class="target-word ${cls}">${displayWord}</span>`;
    }
  });

  const percent = totalWordsCount > 0 ? Math.round((matchedCount / totalWordsCount) * 100) : 0;
  let statusBadge = '';
  if (matchedCount === totalWordsCount) {
    statusBadge = `<span class="word-match-badge complete">👏 모든 단어 완벽 일치! (100%)</span>`;
  } else if (percent >= 80) {
    statusBadge = `<span class="word-match-badge complete">✨ ${matchedCount}/${totalWordsCount} 단어 일치 (${percent}%) - 통과!</span>`;
  } else {
    statusBadge = `<span class="word-match-badge">🎙️ ${matchedCount}/${totalWordsCount} 단어 일치 (${percent}%)</span>`;
  }

  DOM.wordMatchGuide.innerHTML = `
    <div class="word-match-header">
      ${statusBadge}
      <span class="word-match-tip">소리 내어 읽으면 실시간 초록색(🟢 ✓)으로 켜집니다</span>
    </div>
    <div class="word-match-chips">
      ${chipsHtml}
    </div>
  `;
}

// 3번: 완주 후 다음 행동 유도 (CTA) 배너
function updateNextCtaBanner() {
  if (!DOM.sessionNextCtaBanner) return;
  const todayKey = getTodayKey();
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  const todayData = history[todayKey] || {};
  const isDoneToday = isSessionCompletedToday(state.currentSession) || state.completedSteps >= 3;

  if (!isDoneToday) {
    DOM.sessionNextCtaBanner.classList.add('hidden');
    return;
  }

  const completedCount = [todayData.morning, todayData.lunch, todayData.evening].filter(Boolean).length;
  DOM.sessionNextCtaBanner.classList.remove('hidden');

  if (completedCount === 3) {
    DOM.ctaBannerIcon.textContent = '🏆';
    DOM.ctaBannerTitle.textContent = '오늘 하루 3회를 모두 달성하셨습니다! 🎉';
    DOM.ctaBannerDesc.textContent = '캘린더에 눈부신 황금 배지(🏅)가 새겨졌습니다.';
    DOM.ctaBannerBtnText.textContent = '📅 배지 확인';
    DOM.ctaBannerActionBtn.onclick = () => switchTab('tab-calendar');
  } else if (state.currentSession === 'morning') {
    DOM.ctaBannerIcon.textContent = '☀️';
    DOM.ctaBannerTitle.textContent = '오늘 아침 루틴을 상쾌하게 열었습니다! 👏';
    DOM.ctaBannerDesc.textContent = '다음 점심 긍정 확언(11:00)에 다시 만나요 🌤️';
    DOM.ctaBannerBtnText.textContent = '🌤️ 점심 루틴';
    DOM.ctaBannerActionBtn.onclick = () => setSession('lunch', true);
  } else if (state.currentSession === 'lunch') {
    DOM.ctaBannerIcon.textContent = '🌤️';
    DOM.ctaBannerTitle.textContent = '오늘 점심 루틴까지 달성하셨습니다! 👏';
    DOM.ctaBannerDesc.textContent = '저녁 확언(17:00)을 마치면 [황금 배지 🏅]를 완성합니다!';
    DOM.ctaBannerBtnText.textContent = '🌙 저녁 루틴';
    DOM.ctaBannerActionBtn.onclick = () => setSession('evening', true);
  } else {
    DOM.ctaBannerIcon.textContent = '🌙';
    DOM.ctaBannerTitle.textContent = '오늘 저녁 확언을 달성하셨습니다! 🌙';
    const remain = !todayData.morning ? '아침' : (!todayData.lunch ? '점심' : '');
    if (remain) {
      DOM.ctaBannerDesc.textContent = `아직 남은 [${remain} 확언]을 완료하고 황금 배지를 획득하세요!`;
      DOM.ctaBannerBtnText.textContent = `${remain === '아침' ? '☀️ 아침' : '🌤️ 점심'} 루틴`;
      DOM.ctaBannerActionBtn.onclick = () => setSession(remain === '아침' ? 'morning' : 'lunch', true);
    } else {
      DOM.ctaBannerDesc.textContent = '평온하고 행복한 밤 되세요 ✨';
      DOM.ctaBannerBtnText.textContent = '📅 캘린더 보기';
      DOM.ctaBannerActionBtn.onclick = () => switchTab('tab-calendar');
    }
  }
}

// 4번: 🎲 다른 확언 추천받기 (새로고침)
function shuffleCurrentQuote() {
  triggerHaptic('click');
  let quotesPool = [];
  if (typeof DAILY_365_QUOTES !== 'undefined' && Array.isArray(DAILY_365_QUOTES) && DAILY_365_QUOTES.length > 0) {
    quotesPool = DAILY_365_QUOTES.map(q => ({
      text: q.text,
      author: q.author || `${q.month}월 · ${q.theme}`
    }));
  } else {
    quotesPool = (DEFAULT_QUOTES[state.currentSession] || []).concat(
      DEFAULT_QUOTES.morning, DEFAULT_QUOTES.lunch, DEFAULT_QUOTES.evening
    );
  }
  const candidates = quotesPool.filter(q => q.text !== state.currentQuote.text);
  if (candidates.length === 0) return;
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  state.currentQuote = picked;
  updateQuoteUI();
  if (!isSessionCompletedToday(state.currentSession)) {
    state.completedSteps = 0;
    updateStepsUI();
    resetInputs();
  }
  showToast("🎲 새로운 확언이 추천되었습니다 ✨");
}

// 4번: ❤️ 즐겨찾기 찜하기 토글
function toggleFavoriteCurrentQuote() {
  if (!state.currentQuote || !state.currentQuote.text) return;
  triggerHaptic('click');
  let favorites = getStorage(STORAGE_KEYS.FAVORITES, []);
  const index = favorites.findIndex(f => f.text === state.currentQuote.text);
  
  if (index >= 0) {
    favorites.splice(index, 1);
    setStorage(STORAGE_KEYS.FAVORITES, favorites);
    showToast("🤍 즐겨찾기에서 해제되었습니다.");
  } else {
    favorites.push({
      text: state.currentQuote.text,
      author: state.currentQuote.author,
      date: getTodayKey()
    });
    setStorage(STORAGE_KEYS.FAVORITES, favorites);

    // 나만의 확언 리스트에도 자동 연동
    let customs = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
    if (!customs.some(c => c.text === state.currentQuote.text)) {
      customs.unshift({
        id: Date.now(),
        text: state.currentQuote.text,
        session: state.currentSession
      });
      setStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, customs);
      loadCustomAffirmations();
    }
    showToast("❤️ [나만의 확언] 보관함에 찜했습니다!");
  }
  updateQuoteUI();
}

// 마음 상태(감정) 적용 및 맞춤 확언 매칭 함수
function applyMood(moodKey, showFeedback = true, changeQuote = true) {
  const todayKey = getTodayKey();
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  if (!history[todayKey]) {
    history[todayKey] = { morning: false, lunch: false, evening: false };
  }

  const currentMood = history[todayKey].mood;
  // 토글: 이미 선택된 감정을 다시 누르면 기본 세션 확언으로 복귀
  if (currentMood === moodKey && showFeedback) {
    history[todayKey].mood = null;
    setStorage(STORAGE_KEYS.HISTORY, history);

    DOM.moodBtns.forEach(b => b.classList.remove('selected'));
    if (DOM.greetingMoodText) {
      DOM.greetingMoodText.textContent = "💭 오늘 기분";
    }

    state.currentQuote = getActiveQuoteForSession(state.currentSession);
    updateQuoteUI();
    if (!isSessionCompletedToday(state.currentSession)) {
      state.completedSteps = 0;
      updateStepsUI();
      resetInputs();
    }
    renderCalendar();
    showToast("기본 오늘의 확언으로 돌아왔습니다 🌿");
    triggerHaptic('click');
    return;
  }

  // 감정 저장
  history[todayKey].mood = moodKey;
  setStorage(STORAGE_KEYS.HISTORY, history);

  // 버튼 선택 상태 UI 동기화
  DOM.moodBtns.forEach(b => {
    b.classList.toggle('selected', b.dataset.mood === moodKey);
  });

  const moodInfo = MOOD_DATA[moodKey];
  if (!moodInfo) return;

  // 헤더 텍스트 피드백
  if (DOM.greetingMoodText) {
    DOM.greetingMoodText.innerHTML = `💭 <strong>${moodInfo.emoji} ${moodInfo.label}</strong>`;
  }

  // 감정 맞춤형 확언 전환
  if (changeQuote && moodInfo.quotes && moodInfo.quotes.length > 0) {
    const dayIndex = new Date().getDate() % moodInfo.quotes.length;
    state.currentQuote = moodInfo.quotes[dayIndex];
    updateQuoteUI();

    // 아직 미완료 세션이면 새 문장으로 연습 스텝 초기화
    if (!isSessionCompletedToday(state.currentSession)) {
      state.completedSteps = 0;
      updateStepsUI();
      resetInputs();
    }
  }

  // 캘린더에 감정 이모지 즉시 반영
  renderCalendar();

  // 토스트 및 햅틱
  if (showFeedback) {
    showToast(moodInfo.toastMsg);
    triggerHaptic('success');
  }
}

// 6. 유사도 계산 (Levenshtein Distance) 및 한국어 음가 정규화
function cleanText(str) {
  return (str || '').replace(/[^가-힣a-zA-Z0-9]/g, '').trim().toLowerCase();
}

// 아라비아 숫자 ➔ 한국어 음가 변환 헬퍼 (음성 인식 불일치 방어)
function normalizeKoreanNumbers(str) {
  if (!str) return '';
  const numMap = {
    '0': '영', '1': '일', '2': '이', '3': '삼', '4': '사',
    '5': '오', '6': '육', '7': '칠', '8': '팔', '9': '구',
    '%': '퍼센트', '+': '플러스'
  };
  return str.replace(/[0-9%]/g, m => numMap[m] || m);
}

function computeRawLevenshtein(c1, c2) {
  if (!c1 || !c2) return 0;
  if (c1 === c2) return 100;

  const m = c1.length;
  const n = c2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = c1[i - 1] === c2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  let similarity = Math.max(0, Math.round((1 - distance / maxLen) * 100));

  if (similarity >= 90) {
    similarity = 100;
  } else if (similarity >= 80) {
    similarity = Math.min(99, Math.round(80 + (similarity - 80) * 1.5));
  }
  return similarity;
}

function getLevenshteinSimilarity(s1, s2) {
  const c1 = cleanText(s1);
  const c2 = cleanText(s2);

  const rawScore = computeRawLevenshtein(c1, c2);
  if (rawScore >= 80) return rawScore;

  // 숫자가 포함된 경우 한글 음가 변환 버전으로 2차 비교
  const n1 = cleanText(normalizeKoreanNumbers(s1));
  const n2 = cleanText(normalizeKoreanNumbers(s2));
  const normScore = computeRawLevenshtein(n1, n2);

  return Math.max(rawScore, normScore);
}

let currentTtsOnEndCallback = null;

// 안드로이드 네이티브 브릿지 콜백 등록
window.onAndroidTTSStart = function() {
  state.isTtsPlaying = true;
  if (DOM.ttsBtn) DOM.ttsBtn.classList.add('playing');
};

window.onAndroidTTSEnd = function() {
  state.isTtsPlaying = false;
  if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
  duckAsmr(false);
  if (typeof currentTtsOnEndCallback === 'function') {
    const cb = currentTtsOnEndCallback;
    currentTtsOnEndCallback = null;
    try { cb(); } catch (e) { console.error(e); }
  }
};

window.onAndroidTTSError = function() {
  state.isTtsPlaying = false;
  if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
  duckAsmr(false);
  if (typeof currentTtsOnEndCallback === 'function') {
    const cb = currentTtsOnEndCallback;
    currentTtsOnEndCallback = null;
    try { cb(); } catch (e) { console.error(e); }
  }
};

window.onAndroidSTTReady = function() {
  state.isRecording = true;
  DOM.pulseVisualizer.classList.add('recording');
  if (DOM.recognitionBox) DOM.recognitionBox.classList.remove('hidden');
  DOM.micHint.textContent = "듣고 있습니다... 또박또박 소리 내어 읽어주세요.";
  updateWordMatchUI('');
};

window.onAndroidSTTStart = function() {
  state.isRecording = true;
  DOM.pulseVisualizer.classList.add('recording');
  if (DOM.recognitionBox) DOM.recognitionBox.classList.remove('hidden');
  updateWordMatchUI('');
};

window.onAndroidSTTEnd = function() {
  DOM.pulseVisualizer.classList.remove('recording');
  DOM.micHint.textContent = "음성을 분석하고 있습니다...";
};

window.onAndroidSTTCancel = function() {
  state.isRecording = false;
  clearSttSilenceGuideTimer();
  DOM.pulseVisualizer.classList.remove('recording');
  DOM.micHint.textContent = "마이크를 눌러 소리 내어 읽어보세요";
};

window.onAndroidSTTError = function(errMsg, errCode) {
  console.warn("Android STT Error:", errMsg, errCode);
  state.isRecording = false;
  clearSttSilenceGuideTimer();
  DOM.pulseVisualizer.classList.remove('recording');

  const friendlyMsg = (errMsg && !errMsg.includes('코드')) ? errMsg : '음성 인식을 다시 시도해 주세요.';

  if (window.AndroidBridge && typeof window.AndroidBridge.startSTTDialog === 'function') {
    DOM.micHint.innerHTML = `${friendlyMsg} <br><a href="#" id="openSttDialogLink" style="color:var(--primary-accent); font-weight:600; text-decoration:underline; display:inline-block; margin-top:4px;">🎙️ [음성 인식창으로 읽기]</a>`;
    setTimeout(() => {
      const link = document.getElementById('openSttDialogLink');
      if (link) {
        link.onclick = (e) => {
          e.preventDefault();
          window.AndroidBridge.startSTTDialog();
        };
      }
    }, 50);
  } else {
    DOM.micHint.textContent = `${friendlyMsg} 마이크를 다시 눌러주세요.`;
  }
};

let sttDebounceSuccessTimer = null;

function triggerSttSuccess(score) {
  if (state.isProcessingSuccess) return;
  state.isProcessingSuccess = true;
  state.isRecording = false;
  if (sttDebounceSuccessTimer) {
    clearTimeout(sttDebounceSuccessTimer);
    sttDebounceSuccessTimer = null;
  }
  DOM.pulseVisualizer.classList.remove('recording');

  // 마이크 입력 중단
  if (window.AndroidBridge && typeof window.AndroidBridge.stopSTT === 'function') {
    window.AndroidBridge.stopSTT();
  }
  if (state.recognition) {
    try { state.recognition.stop(); } catch(e) {}
  }
  stopVoiceCapture(true, getTodayKey(), state.currentSession);
  handleSuccessStep(score);
}

window.onAndroidSTTResult = function(transcript, isFinal) {
  clearSttSilenceGuideTimer();
  if (state.isProcessingSuccess) return;
  const currentText = (transcript || '').trim();
  if (currentText) {
    if (DOM.recognitionBox) DOM.recognitionBox.classList.remove('hidden');
    DOM.recognizedText.textContent = `"${currentText}"`;
    const similarity = getLevenshteinSimilarity(state.currentQuote.text, currentText);

    // 낭독 중 최고 점수 기록 (말끝 잡음으로 점수가 깎이는 현상 방지)
    if (similarity > (state.sttPeakSimilarity || 0)) {
      state.sttPeakSimilarity = similarity;
    }
    const displayScore = Math.max(similarity, state.sttPeakSimilarity || 0);

    updateSimilarityUI(displayScore);
    updateWordMatchUI(currentText, isFinal);

    // 1) 100% 만점 달성 시: 이미 전체 문장을 완벽히 읽었으므로 지체 없이 즉시 축하 완료!
    if (displayScore >= 100) {
      triggerSttSuccess(100);
      return;
    }

    // 2) 80% 이상인 경우:
    if (displayScore >= 80) {
      // 최종 발화 결과(isFinal = true)라면 이미 말이 끝났으므로 최고 점수로 즉시 완료 처리
      if (isFinal) {
        triggerSttSuccess(displayScore);
        return;
      }

      // 아직 말하는 도중(interim / partial)이라면:
      // 말을 끝까지 마칠 수 있도록 즉시 마이크를 끊지 않고 대기(1.2초 디바운스)
      if (sttDebounceSuccessTimer) clearTimeout(sttDebounceSuccessTimer);
      sttDebounceSuccessTimer = setTimeout(() => {
        if (!state.isProcessingSuccess && (state.sttPeakSimilarity || 0) >= 80) {
          triggerSttSuccess(state.sttPeakSimilarity);
        }
      }, 1200);
    }
  }

  if (isFinal) {
    state.isRecording = false;
    DOM.pulseVisualizer.classList.remove('recording');
    if (!state.isProcessingSuccess) {
      const finalScore = state.sttPeakSimilarity || 0;
      if (finalScore >= 80) {
        triggerSttSuccess(finalScore);
      } else {
        if (finalScore < 40) {
          DOM.micHint.textContent = "💡 소음이 있는 환경이라면 상단 [키보드 모드]를 이용해 보세요.";
        } else if (finalScore < 70) {
          DOM.micHint.textContent = `현재 ${finalScore}% 일치! 조금 더 또박또박 읽어보세요 🌿`;
        } else {
          DOM.micHint.textContent = `아쉬워요! ${finalScore}% 일치 (80% 이상 목표). 한 번 더 도전해 보세요 ✨`;
        }
      }
    }
  }
};

// 7. 음성 인식 (STT) 모듈
function initSTT() {
  if (window.AndroidBridge && typeof window.AndroidBridge.startSTT === 'function') {
    DOM.micBtn.disabled = false;
    DOM.micHint.textContent = "마이크를 눌러 소리 내어 읽어보세요";
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    DOM.micHint.textContent = "현재 브라우저는 음성 인식을 지원하지 않습니다. 타이핑 모드를 이용해주세요.";
    DOM.micBtn.disabled = true;
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'ko-KR';
  recognition.continuous = true; // 문장 낭독 중 잠시 숨을 고르거나 쉬어도 끊기지 않도록 연속 모드 활성화
  recognition.interimResults = true;

  let speechSilenceTimer = null;
  const resetSpeechSilenceTimer = () => {
    if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
    // 사용자가 말을 멈추고 4초 동안 추가 입력이 없을 때만 대기 종료
    speechSilenceTimer = setTimeout(() => {
      if (state.isRecording && !state.isProcessingSuccess) {
        stopRecording();
      }
    }, 4000);
  };

  recognition.onstart = () => {
    state.isRecording = true;
    DOM.pulseVisualizer.classList.add('recording');
    if (DOM.recognitionBox) DOM.recognitionBox.classList.remove('hidden');
    DOM.micHint.textContent = "듣고 있습니다... 또박또박 소리 내어 읽어주세요.";
    resetSpeechSilenceTimer();
  };

  recognition.onresult = (event) => {
    clearSttSilenceGuideTimer();
    if (state.isProcessingSuccess) return;
    resetSpeechSilenceTimer();

    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = 0; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + ' ';
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const currentText = (finalTranscript + interimTranscript).trim();
    const hasFinal = event.results && event.results.length > 0 && event.results[event.results.length - 1].isFinal;

    if (currentText) {
      if (DOM.recognitionBox) DOM.recognitionBox.classList.remove('hidden');
      DOM.recognizedText.textContent = `"${currentText}"`;
      const similarity = getLevenshteinSimilarity(state.currentQuote.text, currentText);

      // 최고 점수 갱신 (끝자리 잡음 감점 방지)
      if (similarity > (state.sttPeakSimilarity || 0)) {
        state.sttPeakSimilarity = similarity;
      }
      const displayScore = Math.max(similarity, state.sttPeakSimilarity || 0);

      updateSimilarityUI(displayScore);
      updateWordMatchUI(currentText, isFinal);

      // 1) 100% 만점 달성 시 즉시 축하 완료!
      if (displayScore >= 100) {
        if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
        triggerSttSuccess(100);
        return;
      }

      // 2) 80% 이상 유사도 달성 시
      if (displayScore >= 80) {
        if (hasFinal) {
          if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
          triggerSttSuccess(displayScore);
          return;
        }

        // 중간 인식 중이라면 문장을 끝까지 말할 수 있도록 1.2초 대기
        if (sttDebounceSuccessTimer) clearTimeout(sttDebounceSuccessTimer);
        sttDebounceSuccessTimer = setTimeout(() => {
          if (!state.isProcessingSuccess && (state.sttPeakSimilarity || 0) >= 80) {
            if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
            triggerSttSuccess(state.sttPeakSimilarity);
          }
        }, 1200);
      }
    }
  };

  recognition.onerror = (event) => {
    console.warn("STT Error:", event.error);
    if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
    DOM.micHint.textContent = `음성 인식 알림: ${event.error === 'not-allowed' ? '마이크 권한을 허용해주세요.' : '다시 시도해주세요.'}`;
    stopRecording();
  };

  recognition.onend = () => {
    if (speechSilenceTimer) clearTimeout(speechSilenceTimer);
    if (!state.isProcessingSuccess) {
      const peak = state.sttPeakSimilarity || 0;
      if (peak >= 80) {
        triggerSttSuccess(peak);
        return;
      } else if (peak > 0) {
        if (peak < 40) {
          DOM.micHint.textContent = "💡 주변이 시끄럽다면 [키보드 모드]를 이용해 보세요.";
        } else if (peak < 70) {
          DOM.micHint.textContent = `현재 ${peak}% 일치! 조금 더 또박또박 읽어보세요 🌿`;
        } else {
          DOM.micHint.textContent = `아쉬워요! ${peak}% 일치 (80% 이상 목표). 한 번 더 도전해 보세요 ✨`;
        }
      }
    }
    stopRecording();
  };

  state.recognition = recognition;
}

// ------------------------------------------
// [방법 1] 3회차 타임캡슐 실전 낭독 녹음 제어 (말끝 잘림 방지 최적화)
// ------------------------------------------
let thirdStepRecorder = null;
let thirdStepStream = null;
let thirdStepChunks = [];
let thirdStepTimer = null;
let thirdStepCountdown = 15;
let thirdStepTotalSeconds = 15;
let thirdStepStartTime = 0;
let isStoppingThirdStep = false;

async function startThirdStepVoiceRecording() {
  const curSession = state.currentSession || 'morning';
  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const sLabel = sessionNames[curSession] || '오늘';

  state.isProcessingSuccess = false;
  state.isRecording = true;
  state.isThirdStepRecording = true;
  isStoppingThirdStep = false;
  thirdStepChunks = [];
  duckAsmr(true);
  playToneWaterDrop();

  // 🛡️ 3회차 녹음 진입 전 네이티브 STT 자원 완벽 해제
  if (window.AndroidBridge && typeof window.AndroidBridge.resetSTT === 'function') {
    try { window.AndroidBridge.resetSTT(); } catch (e) {}
  }

  DOM.pulseVisualizer.classList.add('recording');
  if (DOM.recognitionBox) DOM.recognitionBox.classList.remove('hidden');
  updateWordMatchUI('');
  DOM.recognizedText.textContent = "🎙️ [3회차 타임캡슐 녹음] 소리 내어 읽어주세요...";
  updateSimilarityUI(100);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    thirdStepStream = stream;
    const mimeType = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm'))
      ? 'audio/webm'
      : ((typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/mp4')) ? 'audio/mp4' : 'audio/webm');

    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) thirdStepChunks.push(e.data);
    };

    recorder.onstop = async () => {
      // 🛡️ 스트림 트랙은 녹음기가 모든 청크를 온전히 수집하고 멈춘 후 안전하게 해제
      if (thirdStepStream) {
        try {
          thirdStepStream.getTracks().forEach(t => {
            try { t.stop(); } catch (err) {}
          });
        } catch (e) {}
        thirdStepStream = null;
      }
      thirdStepRecorder = null;

      duckAsmr(false);
      state.isRecording = false;
      state.isThirdStepRecording = false;
      isStoppingThirdStep = false;
      DOM.pulseVisualizer.classList.remove('recording');

      // 🛡️ 녹음 완료 후 네이티브 오디오 장치가 완전히 릴리즈되도록 초기화
      if (window.AndroidBridge && typeof window.AndroidBridge.resetSTT === 'function') {
        try { window.AndroidBridge.resetSTT(); } catch (e) {}
      }

      if (thirdStepChunks.length > 0) {
        const audioBlob = new Blob(thirdStepChunks, { type: mimeType });
        const dKey = getTodayKey();
        const sKey = state.currentSession || 'morning';
        const duration = Math.max(1, Math.round((Date.now() - thirdStepStartTime) / 1000));

        // 🌟 방금 완성된 3회차 육성을 인메모리 캐시에 즉시 보관 (DB 비동기 딜레이 / 키 불일치 위험 0%)
        state.lastRecordedSessionVoice = {
          session: sKey,
          dateKey: dKey,
          blob: audioBlob,
          duration: duration,
          timestamp: Date.now()
        };

        await saveVoiceToDB(`${dKey}_${sKey}`, audioBlob, { duration, dateKey: dKey, sessionKey: sKey });
        if (sKey === 'morning') {
          await saveVoiceToDB(dKey, audioBlob, { duration, dateKey: dKey, sessionKey: sKey });
        }

        const history = getStorage(STORAGE_KEYS.HISTORY, {});
        if (!history[dKey]) history[dKey] = {};
        if (!history[dKey].quotes) history[dKey].quotes = {};
        if (state.currentQuote && state.currentQuote.text) {
          history[dKey].quotes[sKey] = state.currentQuote.text;
        }
        if (!history[dKey].voices) history[dKey].voices = {};
        history[dKey].voices[sKey] = true;
        history[dKey].hasVoice = true;
        setStorage(STORAGE_KEYS.HISTORY, history);

        // 메인 홈 화면 타임캡슐 바로가기 UI 즉시 동기화
        if (DOM.missionCapsuleStatusText && DOM.missionCapsuleBtn) {
          DOM.missionCapsuleStatusText.textContent = `✨ 오늘 ${sLabel} 내 목소리 보관됨`;
          DOM.missionCapsuleBtn.innerHTML = `▶️ 다시듣기`;
          DOM.missionCapsuleBtn.style.background = "#10b981";
        }

        showToast(`🎙️ [${sLabel} 타임캡슐] 3회차 완성 육성이 안전하게 보관되었습니다! ✨`);
        // 3회차 완주 달성 성공 처리!
        handleSuccessStep(100);
      } else {
        resetInputs();
      }
      thirdStepChunks = [];
    };

    recorder.start(100);
    thirdStepRecorder = recorder;
    thirdStepStartTime = Date.now();

    // 🛡️ 문장 길이에 따라 넉넉한 녹음 시간(기본 15초 ~ 최대 25초)을 부여하여 마지막 말끝이 잘리는 현상 원천 차단
    const quoteLen = (state.currentQuote && state.currentQuote.text) ? state.currentQuote.text.length : 20;
    thirdStepTotalSeconds = Math.max(15, Math.min(25, Math.ceil(quoteLen / 2.5) + 6));
    thirdStepCountdown = thirdStepTotalSeconds;

    DOM.micHint.innerHTML = `🎙️ <strong style="color:var(--primary-accent);">[3회차 타임캡슐 녹음 중]</strong> (${thirdStepCountdown}초 · 다 읽은 후 마이크 터치)`;

    if (thirdStepTimer) clearInterval(thirdStepTimer);
    thirdStepTimer = setInterval(() => {
      thirdStepCountdown--;
      if (thirdStepCountdown > 0) {
        DOM.micHint.innerHTML = `🎙️ <strong style="color:var(--primary-accent);">[3회차 타임캡슐 녹음 중]</strong> (${thirdStepCountdown}초 · 다 읽은 후 마이크 터치)`;
      } else {
        stopThirdStepVoiceRecording(true);
      }
    }, 1000);

  } catch (err) {
    console.warn("startThirdStepVoiceRecording error:", err);
    state.isRecording = false;
    state.isThirdStepRecording = false;
    isStoppingThirdStep = false;
    duckAsmr(false);
    DOM.pulseVisualizer.classList.remove('recording');
    showToast("⚠️ 마이크 접근 권한이 필요합니다.");
    DOM.micHint.textContent = "마이크를 눌러 소리 내어 읽어보세요";
  }
}

function stopThirdStepVoiceRecording(save = true) {
  if (isStoppingThirdStep) return;
  if (thirdStepTimer) {
    clearInterval(thirdStepTimer);
    thirdStepTimer = null;
  }

  if (!thirdStepRecorder || thirdStepRecorder.state === 'inactive') {
    if (thirdStepStream) {
      try { thirdStepStream.getTracks().forEach(t => t.stop()); } catch (e) {}
      thirdStepStream = null;
    }
    return;
  }

  if (!save) {
    thirdStepChunks = [];
    try { thirdStepRecorder.stop(); } catch (e) {}
    if (thirdStepStream) {
      try { thirdStepStream.getTracks().forEach(t => t.stop()); } catch (e) {}
      thirdStepStream = null;
    }
    return;
  }

  // 🛡️ 말끝 잘림 방지 (Tail Grace Buffer):
  // 사용자가 말을 마치고 마이크를 터치하거나 타이머가 끝날 때, 마지막 음절/잔향이 잘리지 않도록
  // 500ms 동안 녹음 버퍼를 온전히 유지한 뒤 정지 처리
  isStoppingThirdStep = true;
  DOM.micHint.innerHTML = `🎙️ <strong style="color:var(--primary-accent);">[녹음 마무리 중...]</strong> 잠시만 기다려주세요`;

  try {
    if (typeof thirdStepRecorder.requestData === 'function') {
      thirdStepRecorder.requestData();
    }
  } catch (e) {}

  setTimeout(() => {
    try {
      if (thirdStepRecorder && thirdStepRecorder.state !== 'inactive') {
        thirdStepRecorder.stop();
      }
    } catch (e) {}
  }, 500);
}

let sttSilenceGuideTimer = null;

function clearSttSilenceGuideTimer() {
  if (sttSilenceGuideTimer) {
    clearTimeout(sttSilenceGuideTimer);
    sttSilenceGuideTimer = null;
  }
}

function startRecording() {
  triggerHaptic('click');
  const isAllStepsCompleted = state.completedSteps >= 3 || isSessionCompletedToday(state.currentSession);

  // 3회 완주 후 무제한 추가 연습: PRO 멤버십 전용 혜택 제한
  if (isAllStepsCompleted && !isProUser()) {
    triggerHaptic('warning');
    showToast('👑 3회 이상 무제한 낭독 연습은 PRO 멤버십 전용 기능입니다.');
    DOM.micHint.innerHTML = `👑 <strong style="color:var(--gold-badge);">3회 루틴 완주!</strong> · <a href="#" id="openProFromMicHint" style="color:var(--primary-accent); font-weight:700; text-decoration:underline;">PRO 무제한 연습</a>`;
    setTimeout(() => {
      const link = document.getElementById('openProFromMicHint');
      if (link) {
        link.onclick = (e) => {
          e.preventDefault();
          openProModal();
        };
      }
    }, 50);
    setTimeout(() => {
      openProModal();
    }, 350);
    return;
  }

  // ★ 방법 1: 3번째 낭독(completedSteps === 2)은 '타임캡슐 실전 낭독 녹음'으로 자동 전환!
  if (state.completedSteps === 2 && !isAllStepsCompleted) {
    startThirdStepVoiceRecording();
    return;
  }

  state.isProcessingSuccess = false;
  state.sttPeakSimilarity = 0;
  if (sttDebounceSuccessTimer) {
    clearTimeout(sttDebounceSuccessTimer);
    sttDebounceSuccessTimer = null;
  }
  clearSttSilenceGuideTimer();
  sttSilenceGuideTimer = setTimeout(() => {
    if (state.isRecording && !state.isProcessingSuccess && (state.sttPeakSimilarity || 0) === 0) {
      DOM.micHint.innerHTML = `💡 <strong style="color:var(--text-primary);">음성이 아직 감지되지 않았습니다.</strong><br>마이크에 조금 더 가까이 대고 읽으시거나, 상단 [키보드 모드]를 이용해 보세요 🌿`;
    }
  }, 6500);

  duckAsmr(true);
  if (DOM.recognitionBox) DOM.recognitionBox.classList.remove('hidden');
  // 🎯 마이크 시작 즉시 명언 단어 칩들을 대기 상태로 펼쳐 가이드 제공
  updateWordMatchUI('');

  if (isAllStepsCompleted) {
    DOM.micHint.innerHTML = `🌿 편안하게 소리 내어 마음껏 낭독해 보세요!`;
  }

  if (window.AndroidBridge && typeof window.AndroidBridge.startSTT === 'function') {
    if (thirdStepStream) {
      try { thirdStepStream.getTracks().forEach(t => t.stop()); } catch (e) {}
      thirdStepStream = null;
    }
    state.isRecording = true;
    DOM.recognizedText.textContent = "낭독을 시작해주세요...";
    updateSimilarityUI(0);
    window.AndroidBridge.startSTT();
    return;
  }

  if (!state.recognition) return;
  try {
    DOM.recognizedText.textContent = "낭독을 시작해주세요...";
    updateSimilarityUI(0);
    state.recognition.start();
  } catch (e) {
    console.error(e);
  }
}

function stopRecording(saveVoice = false) {
  clearSttSilenceGuideTimer();
  // 3회차 타임캡슐 녹음 중 사용자가 마이크를 다시 터치한 경우 -> 낭독 완료이므로 반드시 저장(save=true)
  if (state.isThirdStepRecording) {
    stopThirdStepVoiceRecording(true);
    return;
  }

  state.isRecording = false;
  duckAsmr(false);
  if (sttDebounceSuccessTimer) {
    clearTimeout(sttDebounceSuccessTimer);
    sttDebounceSuccessTimer = null;
  }
  DOM.pulseVisualizer.classList.remove('recording');
  if (!state.isProcessingSuccess) {
    const isAllStepsCompleted = state.completedSteps >= 3 || isSessionCompletedToday(state.currentSession);
    if (isAllStepsCompleted) {
      if (isProUser()) {
        DOM.micHint.innerHTML = `✨ <strong>오늘 미션 완주!</strong> 마이크를 눌러 추가 연습을 즐겨보세요`;
      } else {
        DOM.micHint.innerHTML = `🎉 <strong style="color:var(--success-color);">오늘의 3회 완주!</strong> · <a href="#" id="proPracticeStopLink" style="color:var(--primary-accent); font-weight:700; text-decoration:underline;">PRO 무제한 연습</a>`;
        setTimeout(() => {
          const lk = document.getElementById('proPracticeStopLink');
          if (lk) lk.onclick = (e) => { e.preventDefault(); openProModal(); };
        }, 50);
      }
    } else if (state.completedSteps === 2) {
      DOM.micHint.innerHTML = `🎙️ <strong style="color:var(--primary-accent);">마지막 3회차: 타임캡슐 녹음</strong> (마이크를 눌러 시작)`;
    } else {
      DOM.micHint.textContent = "마이크를 눌러 소리 내어 읽어보세요";
    }
  }
  if (window.AndroidBridge && typeof window.AndroidBridge.stopSTT === 'function') {
    window.AndroidBridge.stopSTT();
  }
  if (state.recognition) {
    try { state.recognition.stop(); } catch(e) {}
  }
  try {
    stopVoiceCapture(saveVoice, getTodayKey(), state.currentSession);
  } catch (e) {}
}

function updateSimilarityUI(score) {
  DOM.similarityScore.textContent = `${score}%`;
  DOM.similarityFill.style.width = `${score}%`;
  if (score >= 80) {
    DOM.similarityFill.classList.add('success');
  } else {
    DOM.similarityFill.classList.remove('success');
  }
}

// 8. 텍스트 타이핑 모드
function handleTypingInput() {
  const input = DOM.typingInput.value;
  const score = getLevenshteinSimilarity(state.currentQuote.text, input);
  DOM.typingAccuracy.textContent = `${score}%`;
  if (DOM.typingCharCount) {
    DOM.typingCharCount.textContent = `${input.length}자 입력 중`;
  }
  if (score >= 80) {
    DOM.typingAccuracy.style.color = 'var(--success-color)';
  } else {
    DOM.typingAccuracy.style.color = 'var(--text-secondary)';
  }
}

function handleTypingSubmit() {
  if (state.isProcessingSuccess) return;
  const rawInput = DOM.typingInput ? DOM.typingInput.value.trim() : '';
  if (!rawInput) {
    showToast('확언 문장을 입력해 주세요 ⌨️');
    return;
  }
  const isAllStepsCompleted = state.completedSteps >= 3 || isSessionCompletedToday(state.currentSession);
  if (isAllStepsCompleted && !isProUser()) {
    triggerHaptic('warning');
    showToast('👑 3회 이상 추가 연습은 PRO 멤버십 전용 기능입니다.');
    openProModal();
    return;
  }
  const score = getLevenshteinSimilarity(state.currentQuote.text, rawInput);
  if (score >= 80) {
    state.isProcessingSuccess = true;
    DOM.typingInput.value = '';
    DOM.typingAccuracy.textContent = '0%';
    if (DOM.typingCharCount) {
      DOM.typingCharCount.textContent = '0자';
    }
    handleSuccessStep(score);
  } else {
    showToast(`현재 일치율은 ${score}%입니다. 80% 이상 일치해야 인정됩니다. 다시 확인해보세요!`);
  }
}

// 9. 미션 성공 단계 처리 (정확히 1회씩 카운트)
function handleSuccessStep(score) {
  const isDoneToday = isSessionCompletedToday(state.currentSession);
  const isThirdStep = (state.completedSteps === 2);
  const isExtraPractice = (state.completedSteps >= 3 || isDoneToday);
  const shouldSaveCapsule = isProUser() && (isThirdStep || isExtraPractice);

  stopVoiceCapture(shouldSaveCapsule, getTodayKey(), state.currentSession);

  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const sName = sessionNames[state.currentSession] || '';

  if (state.completedSteps >= 3 || isDoneToday) {
    // 오늘 이미 3회를 완주한 세션에서 추가 연습을 성공한 경우 (VIP 회원)
    triggerHaptic('success');
    playToneSuccess();
    showToast(`✨ 추가 낭독 완료! (일치도 ${score}%)`);
    DOM.micHint.innerHTML = `👏 <strong style="color:var(--success-color);">낭독 완료! (일치도 ${score}%)</strong>`;
    // 🛡️ 성공 칩 결과를 충분히 확인할 수 있도록 2.8초간 유지 후 초기화
    setTimeout(() => {
      resetInputs();
      state.isProcessingSuccess = false;
      state.isRecording = false;
      DOM.pulseVisualizer.classList.remove('recording');
      DOM.micHint.innerHTML = `마이크를 눌러 마음껏 추가 낭독을 즐겨보세요 🌿`;
    }, 2800);
    return;
  }

  if (state.completedSteps >= 3) return;

  state.completedSteps++;
  triggerHaptic('success');
  playToneSuccess();

  updateStepsUI();

  if (state.completedSteps >= 3) {
    // 3회 달성 완료!
    completeMissionReward();
    state.isProcessingSuccess = false;
  } else {
    DOM.micHint.innerHTML = `👏 <strong style="color:var(--success-color); font-size:14px;">${state.completedSteps}회 낭독 성공!</strong> <span style="font-size:12px; color:var(--text-secondary);">(단어 칩 확인 후 다음 단계로 이동)</span>`;
    // 🛡️ 성공 칩 결과(초록색 체크 등)를 충분히 확인할 수 있도록 2.8초간 유지 후 다음 단계로 전환
    setTimeout(() => {
      resetInputs();
      state.isProcessingSuccess = false;
      state.isRecording = false;
      DOM.pulseVisualizer.classList.remove('recording');
      if (state.completedSteps === 2) {
        DOM.micHint.innerHTML = `🎙️ <strong style="color:var(--primary-accent);">마지막 3회차: 타임캡슐 녹음</strong> (마이크를 눌러 시작)`;
      } else {
        DOM.micHint.innerHTML = `마이크를 눌러 <strong>${state.completedSteps + 1}번째 낭독</strong>을 시작하세요 🎙️`;
      }
    }, 2800);
  }
}

function updateStepsUI() {
  const isCompleted = isSessionCompletedToday(state.currentSession) || state.completedSteps >= 3;
  const steps = [DOM.step1, DOM.step2, DOM.step3];
  steps.forEach((step, idx) => {
    if (idx < state.completedSteps) {
      step.classList.add('completed');
      step.textContent = '✓';
    } else {
      step.classList.remove('completed');
      step.textContent = String(idx + 1);
    }
  });

  if (isCompleted) {
    DOM.counterStatusText.innerHTML = `<span style="color:var(--success-color); font-weight:800;">🎉 3 / 3회 완료</span>`;
  } else if (state.completedSteps === 2) {
    DOM.counterStatusText.innerHTML = `<strong style="color:var(--primary-accent);">2 / 3회 (마지막 녹음)</strong>`;
  } else {
    DOM.counterStatusText.textContent = `${state.completedSteps} / 3회`;
  }

  // 달성 시 다음 행동 유도(CTA) 배너 갱신
  updateNextCtaBanner();
}

function resetInputs() {
  state.sttPeakSimilarity = 0;
  if (sttDebounceSuccessTimer) {
    clearTimeout(sttDebounceSuccessTimer);
    sttDebounceSuccessTimer = null;
  }
  if (DOM.recognitionBox && !state.isRecording) {
    DOM.recognitionBox.classList.add('hidden');
  }
  DOM.recognizedText.textContent = `"여기에 인식된 목소리가 표시됩니다"`;
  if (state.activeMode === 'stt') {
    updateWordMatchUI('');
  } else if (DOM.wordMatchGuide) {
    DOM.wordMatchGuide.classList.add('hidden');
  }
  updateSimilarityUI(0);
  DOM.typingInput.value = '';
  DOM.typingAccuracy.textContent = '0%';
  if (DOM.typingCharCount) {
    DOM.typingCharCount.textContent = '0자';
  }
}

// 팝업 성공 모달 전용 오디오 인스턴스 (탑레벨 전역 관리로 누수 및 중복 재생 완벽 방지)
let activeSuccessModalAudio = null;

function stopSuccessModalAudio() {
  if (activeSuccessModalAudio) {
    try {
      activeSuccessModalAudio.stop();
    } catch (e) {}
    activeSuccessModalAudio = null;
  }
  if (DOM.successCapsuleRecordBtn) {
    DOM.successCapsuleRecordBtn.innerHTML = `<span>▶️</span> <span>방금 녹음된 내 육성 다시듣기</span>`;
    DOM.successCapsuleRecordBtn.style.background = "#10b981";
  }
}

function openSuccessModal(sessionKey = null) {
  if (DOM.successModal) {
    stopSuccessModalAudio(); // 이전 재생 인스턴스 확실히 정리
    DOM.successModal.classList.remove('hidden');
    DOM.successModal.setAttribute('aria-hidden', 'false');

    const todayKey = getTodayKey();
    const curSession = sessionKey || state.currentSession || 'morning';

    // 1. 인메모리에 방금 녹음된 육성이 있는 경우 즉시 '다시듣기' 버튼 활성화 (DB 딜레이 0%)
    const memoryVoice = state.lastRecordedSessionVoice;
    const hasMemoryVoice = Boolean(
      memoryVoice &&
      memoryVoice.session === curSession &&
      memoryVoice.blob &&
      memoryVoice.blob.size > 200
    );

    if (hasMemoryVoice) {
      if (DOM.successCapsuleRecordBtn) {
        DOM.successCapsuleRecordBtn.innerHTML = `<span>▶️</span> <span>방금 녹음된 내 육성 다시듣기</span>`;
        DOM.successCapsuleRecordBtn.style.background = "#10b981";
      }
    } else {
      // 2. 인메모리에 없으면 IndexedDB에서 조회
      getSessionVoiceItem(todayKey, curSession).then(voiceItem => {
        const hasVoice = Boolean(voiceItem && voiceItem.blob && voiceItem.blob.size > 200);
        if (DOM.successCapsuleRecordBtn) {
          if (hasVoice) {
            DOM.successCapsuleRecordBtn.innerHTML = `<span>▶️</span> <span>방금 녹음된 내 육성 다시듣기</span>`;
            DOM.successCapsuleRecordBtn.style.background = "#10b981";
          } else {
            DOM.successCapsuleRecordBtn.innerHTML = `<span>🎙️</span> <span>오늘의 목소리 5초 남기기</span>`;
            DOM.successCapsuleRecordBtn.style.background = "linear-gradient(135deg, #6366f1, #8b5cf6)";
          }
        }
      });
    }
  }
}

function closeSuccessModal() {
  if (DOM.successModal) {
    DOM.successModal.classList.add('hidden');
    DOM.successModal.setAttribute('aria-hidden', 'true');
  }
  stopSuccessModalAudio();
}

function completeMissionReward() {
  triggerHaptic('complete');
  // 1. 폭죽 애니메이션
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // 2. 사운드
  playToneFanfare();

  // 3. 로컬 스토리지에 오늘 세션 완료 저장
  const todayKey = getTodayKey();
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  if (!history[todayKey]) {
    history[todayKey] = { morning: false, lunch: false, evening: false };
  }
  history[todayKey][state.currentSession] = true;
  if (!history[todayKey].quotes) {
    history[todayKey].quotes = {};
  }
  if (state.currentQuote && state.currentQuote.text) {
    history[todayKey].quotes[state.currentSession] = state.currentQuote.text;
    history[todayKey].quote = state.currentQuote.text; // 이전 단일 quote 참조 호환 유지
  }
  setStorage(STORAGE_KEYS.HISTORY, history);

  // 네이티브 앱 환경에 해당 세션 3회 완료 상태 즉시 동기화 (스마트 건너뛰기 완벽 연동)
  if (window.AndroidBridge && typeof window.AndroidBridge.recordSessionCompleted === 'function') {
    try {
      window.AndroidBridge.recordSessionCompleted(state.currentSession, todayKey);
    } catch (e) {
      console.warn('Failed to record session completed to AndroidBridge:', e);
    }
  }
  // 스마트 건너뛰기 적용을 위해 네이티브 알림 스케줄 재동기화 (해당 세션은 내일로 연기)
  syncNativeAlarms(getNotiSettings());

  // 누적 달성 일수 동기화
  const completedDays = getCompletedDaysCount();
  setStorage(STORAGE_KEYS.TOTAL_SUCCESS, completedDays);

  // 상단 세션 칩 즉시 완료 체크 표시 동기화
  updateSessionChips();
  updateStepsUI();

  // 4. 배지 알림 텍스트 업데이트
  const sessionTitles = {
    morning: "🌅 아침 햇살 배지 획득!",
    lunch: "☀️ 한낮의 활력 배지 획득!",
    evening: "🌙 평온한 달빛 배지 획득!"
  };
  const realSession = getAutoSession();
  const sessionOrder = getSessionOrder(state.currentSession);
  const realOrder = getSessionOrder(realSession);
  const isPreComplete = sessionOrder > realOrder;

  DOM.badgeRewardTitle.textContent = isPreComplete 
    ? `${sessionTitles[state.currentSession]} (미리 달성!)` 
    : sessionTitles[state.currentSession];
  
  // 하루 3회 루틴 달성 현황 체크
  const todayData = history[todayKey];
  const completedCount = [todayData.morning, todayData.lunch, todayData.evening].filter(Boolean).length;
  if (completedCount === 3) {
    const plant = getCurrentPlantData();
    let treeGrowthNotice = '';
    if (plant.lastUpdatedDate !== todayKey) {
      const growthBoost = isProUser() ? 2 : 1;
      const prevDays = plant.currentDays || 0;
      plant.currentDays = Math.min(15, prevDays + growthBoost);
      plant.lastUpdatedDate = todayKey;
      setStorage(STORAGE_KEYS.CURRENT_PLANT, plant);
      if (plant.currentDays >= 15) {
        checkAndSaveGardenTree(plant);
      }
      showTreeGrowthEffect(growthBoost, plant.currentDays);
      treeGrowthNotice = isProUser() 
        ? `<br>⚡ 긍정 나무가 <strong>+2일치</strong> 쑥 자라났습니다! (${plant.currentDays}/15일 🌱)` 
        : `<br>🌱 긍정 나무가 <strong>+1일치</strong> 자라났습니다! (${plant.currentDays}/15일)`;
    } else {
      treeGrowthNotice = `<br>🌱 오늘 긍정 나무 성장분(${plant.currentDays}/15일)이 안전하게 반영되어 있습니다.`;
    }

    DOM.badgeRewardDesc.innerHTML = `🏆 <strong>축하합니다! 오늘 아침·점심·저녁 3회를 모두 달성했습니다!</strong><br>캘린더에 <strong>황금 배지(🏅)</strong>가 새겨지고, <strong>누적 ${completedDays}일 달성</strong>을 이루었습니다!${treeGrowthNotice}`;
    
    // 데이터 보호를 위한 로컬 자동 스냅샷 백업
    try {
      const autoSnapshot = {
        version: "1.0.14",
        timestamp: Date.now(),
        date: todayKey,
        history,
        plant: getCurrentPlantData(),
        customAffirmations: getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []),
        totalSuccess: completedDays
      };
      localStorage.setItem('posiecho_auto_snapshot_latest', JSON.stringify(autoSnapshot));
    } catch (e) {}
  } else if (completedCount === 2) {
    const remaining = !todayData.morning ? '아침' : (!todayData.lunch ? '점심' : '저녁');
    DOM.badgeRewardDesc.innerHTML = `오늘 벌써 <strong>2개 루틴을 달성</strong>하셨습니다! 👏<br>남은 <strong>${remaining} 확언</strong>까지 마치면 오늘 <strong>[하루 달성 황금 배지 🏅]</strong>를 획득합니다!`;
  } else {
    DOM.badgeRewardDesc.innerHTML = "오늘의 확언을 3회 온전히 체화했습니다.<br>캘린더에 칭찬 도장(💮)이 찍혔습니다!";
  }

  // 완료 후 하단 입력 영역 및 힌트 텍스트 정리
  resetInputs();
  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const doneHint = isPreComplete ? '확언 3회 미리 달성!' : '확언 3회 달성!';
  const subHint = isPreComplete 
    ? '오늘 해당 시간대에도 기분 좋은 평온함을 간직하세요 🌿' 
    : '마음에 긍정의 씨앗이 온전히 심어졌습니다 🌿';
  DOM.micHint.innerHTML = `✨ <strong style="color:var(--success-color); font-size:14px;">오늘의 ${sessionNames[state.currentSession] || ''} ${doneHint}</strong><br>${subHint}`;

  // 카드 상단 배지 완료 표시
  const badgeMap = {
    morning: '🌅 오늘의 아침 확언',
    lunch: '☀️ 오늘의 점심 확언',
    evening: '🌙 오늘의 저녁 확언'
  };
  const doneBadgeTag = isPreComplete ? '미리 완료 ✔' : '완료 ✔';
  DOM.cardSessionBadge.innerHTML = `${badgeMap[state.currentSession]} <span class="badge-done-tag">${doneBadgeTag}</span>`;
  DOM.cardSessionBadge.classList.add('completed-badge');

  // 팝업 모달 표시 (현재 달성한 세션 키 명시적 전달)
  openSuccessModal(state.currentSession);
  updateTreeAndSidebar();
  renderCalendar();
  updateNextCtaBanner();
}

// 10. 선행 듣기 (TTS) 및 목소리 성별 토글
function updateTtsGenderUI() {
  if (!DOM.ttsGenderBtn) return;
  const isFemale = state.ttsGender === 'female';
  if (DOM.ttsGenderIcon) DOM.ttsGenderIcon.textContent = isFemale ? '👩' : '👨';
  DOM.ttsGenderBtn.classList.toggle('male', !isFemale);
  DOM.ttsGenderBtn.title = isFemale 
    ? "선행듣기 목소리: 차분한 여성 (탭하여 남성으로 변경)" 
    : "선행듣기 목소리: 신뢰감 있는 남성 (탭하여 여성으로 변경)";
  syncNotiGenderUI();
}

function syncNotiGenderUI() {
  const isMale = state.ttsGender === 'male';
  if (DOM.notiGenderFemaleBtn) DOM.notiGenderFemaleBtn.classList.toggle('active', !isMale);
  if (DOM.notiGenderMaleBtn) DOM.notiGenderMaleBtn.classList.toggle('active', isMale);
}

function setNotiTtsGender(gender) {
  state.ttsGender = gender === 'male' ? 'male' : 'female';
  setStorage(STORAGE_KEYS.TTS_GENDER, state.ttsGender);
  updateTtsGenderUI();
  applyAndSaveNotiSettings();

  const label = state.ttsGender === 'female' ? '차분한 여성' : '신뢰감 있는 남성';
  showToast(`🗣️ 알림 및 확언 음성: [${label}]으로 설정되었습니다.`);
  triggerHaptic('click');

  if (window.AndroidBridge && typeof window.AndroidBridge.speak === 'function') {
    window.AndroidBridge.speak(state.ttsGender === 'female' ? '차분한 여성 목소리입니다.' : '신뢰감 있는 남성 목소리입니다.', state.ttsGender);
  }
}

function toggleTtsGender() {
  state.ttsGender = state.ttsGender === 'female' ? 'male' : 'female';
  setStorage(STORAGE_KEYS.TTS_GENDER, state.ttsGender);
  updateTtsGenderUI();
  applyAndSaveNotiSettings();
  
  const label = state.ttsGender === 'female' ? '차분한 여성 음성' : '신뢰감 있는 남성 음성';
  showToast(`🗣️ 음성: [${label}]으로 설정되었습니다.`);
  
  if (state.isTtsPlaying) {
    stopTTS();
    setTimeout(() => speakQuote(), 250);
  }
}

function speakQuote() {
  if (state.isTtsPlaying) {
    stopTTS();
    return;
  }

  const quoteText = state.currentQuote ? state.currentQuote.text : "";
  if (!quoteText) return;

  // TTS 재생 중에는 ASMR 볼륨 살짝 낮추기 (Ducking)
  duckAsmr(true);

  // 1순위: 안드로이드 네이티브 앱 환경 (AndroidBridge)
  if (window.AndroidBridge && typeof window.AndroidBridge.speak === 'function') {
    state.isTtsPlaying = true;
    if (DOM.ttsBtn) DOM.ttsBtn.classList.add('playing');
    try {
      window.AndroidBridge.speak(quoteText, state.ttsGender);
    } catch (e) {
      window.AndroidBridge.speak(quoteText);
    }
    return;
  }

  // 2순위: Web Speech API (Chrome, Safari, Edge 등 일반 웹 브라우저)
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(quoteText);
      utterance.lang = 'ko-KR';

      const isFemale = state.ttsGender === 'female';
      // 피치 변조 없이 성우 본래의 자연스러운 음색 출력
      utterance.pitch = 1.0;
      utterance.rate = 0.88;

      // 한국어 음성 탐색 및 성별 매칭
      const voices = window.speechSynthesis.getVoices();
      const koVoices = voices.filter(v => v.lang.includes('ko') || v.lang.includes('KO'));
      
      if (koVoices.length > 0) {
        let matchedVoice = null;
        if (isFemale) {
          // 여성: kob, ism, female 등
          matchedVoice = koVoices.find(v => /kob|ism|female|여성|heami|yuna|sunhi|kof/i.test(v.name)) || koVoices[0];
        } else {
          // 남성: kod (대표 남성), koc (차분한 남성), injoon, minsu, male 등
          matchedVoice = koVoices.find(v => /kod|koc|male|남성|injoon|minsu|kom/i.test(v.name)) || 
                         koVoices.find(v => !/kob|ism|female|여성|kof/i.test(v.name));
        }
        if (matchedVoice) utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        state.isTtsPlaying = true;
        if (DOM.ttsBtn) DOM.ttsBtn.classList.add('playing');
      };

      utterance.onend = () => {
        state.isTtsPlaying = false;
        if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
        duckAsmr(false);
      };

      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error, trying fallback audio:", e);
        state.isTtsPlaying = false;
        if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
        duckAsmr(false);
        playTtsFallback(quoteText);
      };

      window.speechSynthesis.speak(utterance);
      return;
    } catch (err) {
      console.warn("speechSynthesis.speak exception:", err);
    }
  }

  // 3순위: 음성 합성 미지원 브라우저용 오디오 스트림 폴백
  playTtsFallback(quoteText);
}

function stopTTS() {
  state.isTtsPlaying = false;
  if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
  duckAsmr(false);
  currentTtsOnEndCallback = null;

  if (window.AndroidBridge && typeof window.AndroidBridge.stopTTS === 'function') {
    try { window.AndroidBridge.stopTTS(); } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch(e) {}
  }
  if (state.fallbackAudio) {
    try {
      state.fallbackAudio.pause();
      state.fallbackAudio.currentTime = 0;
    } catch (e) {}
  }
}

function speakQuoteWithGender(text, gender, onEnd) {
  if (!text) {
    if (typeof onEnd === 'function') onEnd();
    return;
  }

  const genderToUse = gender || state.ttsGender || 'female';
  duckAsmr(true);
  state.isTtsPlaying = true;

  let finished = false;
  let safetyTimer = null;
  const finish = () => {
    if (finished) return;
    finished = true;
    if (safetyTimer) {
      clearTimeout(safetyTimer);
      safetyTimer = null;
    }
    state.isTtsPlaying = false;
    duckAsmr(false);
    if (typeof onEnd === 'function') {
      try { onEnd(); } catch (e) { console.error("TTS onEnd callback error:", e); }
    }
  };

  // 1순위: 안드로이드 네이티브 앱 환경 (AndroidBridge)
  if (window.AndroidBridge && typeof window.AndroidBridge.speak === 'function') {
    currentTtsOnEndCallback = finish;
    // 안전 타임아웃: 기기 TTS 응답 지연/누락 방지 (글자 수 비례 + 여유 2초)
    const expectedDurationMs = Math.max(3500, text.length * 350 + 2000);
    safetyTimer = setTimeout(finish, expectedDurationMs);

    try {
      window.AndroidBridge.speak(text, genderToUse);
    } catch (e) {
      try {
        window.AndroidBridge.speak(text);
      } catch (err) {
        console.error("AndroidBridge speak failed:", err);
        finish();
      }
    }
    return;
  }

  // 2순위: Web Speech API (브라우저 환경)
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      const isFemale = genderToUse === 'female';
      utterance.pitch = 1.0;
      utterance.rate = 0.88;

      const voices = window.speechSynthesis.getVoices();
      const koVoices = voices.filter(v => v.lang.includes('ko') || v.lang.includes('KO'));
      if (koVoices.length > 0) {
        let matchedVoice = null;
        if (isFemale) {
          matchedVoice = koVoices.find(v => /kob|ism|female|여성|heami|yuna|sunhi|kof/i.test(v.name)) || koVoices[0];
        } else {
          matchedVoice = koVoices.find(v => /kod|koc|male|남성|injoon|minsu|kom/i.test(v.name)) || 
                         koVoices.find(v => !/kob|ism|female|여성|kof/i.test(v.name));
        }
        if (matchedVoice) utterance.voice = matchedVoice;
      }

      utterance.onend = finish;
      utterance.onerror = (e) => {
        console.warn("speechSynthesis error:", e);
        finish();
      };

      const expectedDurationMs = Math.max(3500, text.length * 350 + 2000);
      safetyTimer = setTimeout(finish, expectedDurationMs);

      window.speechSynthesis.speak(utterance);
      return;
    } catch (err) {
      console.warn("speechSynthesis speak error:", err);
    }
  }

  // 3순위: 음성 합성 미지원 브라우저용 오디오 스트림 폴백
  playTtsFallback(text);
  const fallbackDurationMs = Math.max(3000, text.length * 300);
  setTimeout(finish, fallbackDurationMs);
}

function playTtsFallback(text) {
  try {
    if (!state.fallbackAudio) {
      state.fallbackAudio = new Audio();
    }
    const encoded = encodeURIComponent(text);
    state.fallbackAudio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ko&client=tw-ob&q=${encoded}`;
    state.fallbackAudio.onplay = () => {
      state.isTtsPlaying = true;
      if (DOM.ttsBtn) DOM.ttsBtn.classList.add('playing');
    };
    state.fallbackAudio.onended = () => {
      state.isTtsPlaying = false;
      if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
      duckAsmr(false);
    };
    state.fallbackAudio.onerror = () => {
      state.isTtsPlaying = false;
      if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
      duckAsmr(false);
      alert("현재 환경에서 음성을 재생할 수 없습니다.");
    };
    state.fallbackAudio.play().catch(e => {
      state.isTtsPlaying = false;
      if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
      duckAsmr(false);
    });
  } catch (err) {
    state.isTtsPlaying = false;
    if (DOM.ttsBtn) DOM.ttsBtn.classList.remove('playing');
    duckAsmr(false);
  }
}

// ==========================================================================
// 11. 고도화된 ASMR 앰비언스 오디오 엔진 (Web Audio API 순수 합성 4종)
// ==========================================================================

// ASMR 설정 영구 저장
function saveAsmrSettings() {
  setStorage(STORAGE_KEYS.ASMR_SETTINGS, {
    sound: state.asmrSound,
    volume: state.asmrVolume,
    ducking: state.asmrDucking,
    autoPlay: state.asmrAutoPlay
  });
}

// 상단 헤더 ASMR 아이콘 버튼 UI 동기화 (선택된 모드 아이콘 & 재생 중 펄스 효과)
function updateAsmrHeaderBtn() {
  if (!DOM.asmrBtn) return;
  const soundIcons = { rain: '🌧️', fire: '🔥', piano: '🧘', waves: '🌊' };
  const soundNames = { rain: '토닥토닥 빗소리', fire: '따뜻한 장작불', piano: '은은한 명상 음악', waves: '고요한 밤 파도' };
  const icon = soundIcons[state.asmrSound] || '🌧️';
  const name = soundNames[state.asmrSound] || '토닥토닥 빗소리';

  const iconSpan = DOM.asmrBtn.querySelector('.btn-icon');
  if (iconSpan) {
    iconSpan.textContent = icon;
  }

  if (state.isAsmrPlaying) {
    DOM.asmrBtn.classList.add('active', 'playing');
    DOM.asmrBtn.setAttribute('title', `[${name}] 재생 중 - 터치하여 정지 (길게 눌러 모드 변경)`);
    DOM.asmrBtn.setAttribute('aria-label', `ASMR [${name}] 재생 중 - 터치 시 정지`);
  } else {
    DOM.asmrBtn.classList.remove('active', 'playing');
    DOM.asmrBtn.setAttribute('title', `[${name}] - 터치하여 재생 (길게 눌러 모드 변경)`);
    DOM.asmrBtn.setAttribute('aria-label', `ASMR [${name}] - 터치 시 재생`);
  }
}

// 메인화면 헤더 아이콘 원터치 재생 / 정지 토글
function toggleAsmrPlayback() {
  const soundNames = { rain: '토닥토닥 빗소리', fire: '따뜻한 장작불', piano: '은은한 명상 음악', waves: '고요한 밤 파도' };
  if (state.isAsmrPlaying) {
    stopAsmrSound();
    triggerHaptic('click');
    showToast("⏹️ ASMR 사운드가 정지되었습니다.");
  } else {
    startAsmrSound(state.asmrSound);
    triggerHaptic('click');
    showToast(`🎧 [${soundNames[state.asmrSound] || 'ASMR'}] 사운드를 재생합니다.`);
  }
}

// 옵션 모달(소리·일반 탭) 내 ASMR 설정 UI 동기화
function syncOptionsAsmrUI() {
  const autoPlayToggle = document.getElementById('asmrAutoPlayToggle');
  if (autoPlayToggle) {
    autoPlayToggle.checked = !!state.asmrAutoPlay;
  }
  const modalAutoPlayToggle = document.getElementById('asmrModalAutoPlayToggle');
  if (modalAutoPlayToggle) {
    modalAutoPlayToggle.checked = !!state.asmrAutoPlay;
  }

  const soundNames = { rain: '토닥토닥 빗소리', fire: '따뜻한 장작불', piano: '은은한 명상 음악', waves: '고요한 밤 파도' };
  const descEl = document.getElementById('optAsmrCurrentModeDesc');
  if (descEl) {
    descEl.textContent = `현재 선택: ${soundNames[state.asmrSound] || '토닥토닥 빗소리'} ${state.isAsmrPlaying ? '(재생 중)' : ''}`;
  }

  const chips = document.querySelectorAll('.opt-asmr-chip');
  if (chips) {
    chips.forEach(chip => {
      const snd = chip.getAttribute('data-sound');
      chip.classList.toggle('active', snd === state.asmrSound);
    });
  }
}

// 앱 시작 시 자동재생 시도 (브라우저 Autoplay Policy 대응)
function tryStartAutoPlayAsmr() {
  if (!state.asmrAutoPlay) return;

  startAsmrSound(state.asmrSound);

  if (state.audioCtx && state.audioCtx.state === 'suspended') {
    const resumeOnGesture = () => {
      if (state.audioCtx && state.audioCtx.state === 'suspended' && state.isAsmrPlaying) {
        state.audioCtx.resume();
      }
      document.removeEventListener('click', resumeOnGesture);
      document.removeEventListener('touchstart', resumeOnGesture);
      document.removeEventListener('keydown', resumeOnGesture);
    };
    document.addEventListener('click', resumeOnGesture, { once: true });
    document.addEventListener('touchstart', resumeOnGesture, { once: true });
    document.addEventListener('keydown', resumeOnGesture, { once: true });
  }
}

// ASMR 앰비언스 모달 열기/닫기
function toggleAsmrModal() {
  if (!DOM.asmrModal) return;
  const isHidden = DOM.asmrModal.classList.contains('hidden');
  if (isHidden) {
    DOM.asmrModal.classList.remove('hidden');
    syncAsmrModalUI();
  } else {
    DOM.asmrModal.classList.add('hidden');
  }
}

function closeAsmrModal() {
  if (DOM.asmrModal) DOM.asmrModal.classList.add('hidden');
}

function syncAsmrModalUI() {
  if (DOM.asmrTrackCards) {
    DOM.asmrTrackCards.forEach(card => {
      const snd = card.getAttribute('data-sound');
      const isSelected = (snd === state.asmrSound);
      const isCurrentPlaying = (isSelected && state.isAsmrPlaying);
      card.classList.toggle('active', isSelected);
      card.classList.toggle('playing', isCurrentPlaying);
      const pill = card.querySelector('.track-status-pill');
      if (pill) {
        if (snd !== 'rain' && !isProUser()) {
          pill.textContent = '🔒 PRO';
          pill.className = 'track-status-pill pro-locked';
        } else if (isCurrentPlaying) {
          pill.textContent = '재생 중';
          pill.className = 'track-status-pill playing';
        } else if (isSelected) {
          pill.textContent = '선택됨';
          pill.className = 'track-status-pill selected';
        } else {
          pill.textContent = '선택';
          pill.className = 'track-status-pill';
        }
      }
    });
  }
  if (DOM.asmrVolumeSlider) {
    DOM.asmrVolumeSlider.value = Math.round(state.asmrVolume * 100);
  }
  if (DOM.asmrVolumePercent) {
    DOM.asmrVolumePercent.textContent = `${Math.round(state.asmrVolume * 100)}%`;
  }
  if (DOM.asmrDuckingToggle) {
    DOM.asmrDuckingToggle.checked = state.asmrDucking;
  }
  const modalAutoPlayToggle = document.getElementById('asmrModalAutoPlayToggle');
  if (modalAutoPlayToggle) {
    modalAutoPlayToggle.checked = !!state.asmrAutoPlay;
  }
}

// 오디오 컨텍스트 획득
function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!state.audioCtx) {
    state.audioCtx = new AudioContext();
  }
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
  return state.audioCtx;
}

// 오디오 덕킹(Ducking): 음성 인식(낭독)이나 TTS 재생 시 소리를 25%로 줄임
function duckAsmr(isDucking) {
  if (!state.isAsmrPlaying || !state.asmrNodes || !state.asmrNodes.gainNode || !state.asmrDucking) return;
  try {
    const ctx = state.audioCtx;
    const gain = state.asmrNodes.gainNode.gain;
    const target = isDucking ? (state.asmrVolume * 0.22) : state.asmrVolume;
    gain.cancelScheduledValues(ctx.currentTime);
    gain.setTargetAtTime(target, ctx.currentTime, isDucking ? 0.3 : 1.2);
  } catch (e) {}
}

function stopAsmrSound(shouldSyncUI = true) {
  if (state.asmrNodes) {
    try {
      if (state.asmrNodes.stop) state.asmrNodes.stop();
      if (state.asmrNodes.sources) {
        state.asmrNodes.sources.forEach(s => {
          try { s.stop(); s.disconnect(); } catch (e) {}
        });
      }
      if (state.asmrNodes.intervals) {
        state.asmrNodes.intervals.forEach(id => clearInterval(id));
      }
    } catch (e) {}
  }
  state.asmrNodes = null;
  state.isAsmrPlaying = false;

  if (shouldSyncUI) {
    updateAsmrHeaderBtn();
    syncAsmrModalUI();
    syncOptionsAsmrUI();
  }
}

function startAsmrSound(soundType) {
  soundType = soundType || state.asmrSound || 'rain';

  // 무료 플랜은 빗소리(rain)만 기본 제공, 모닥불/피아노/파도는 PRO 전용
  if (soundType !== 'rain' && !isProUser()) {
    showToast("👑 모닥불/피아노/파도 사운드는 PRO 전용 혜택입니다.");
    openProModal();
    return;
  }

  stopAsmrSound(false);

  try {
    const ctx = getAudioContext();
    state.asmrSound = soundType;
    saveAsmrSettings();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(state.asmrVolume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    let nodes = null;
    if (soundType === 'rain') {
      nodes = createRainSound(ctx, masterGain);
    } else if (soundType === 'fire') {
      nodes = createFireSound(ctx, masterGain);
    } else if (soundType === 'piano') {
      nodes = createPianoSound(ctx, masterGain);
    } else if (soundType === 'waves') {
      nodes = createWavesSound(ctx, masterGain);
    }

    if (nodes) {
      nodes.gainNode = masterGain;
      state.asmrNodes = nodes;
      state.isAsmrPlaying = true;
    }

    updateAsmrHeaderBtn();
    syncAsmrModalUI();
    syncOptionsAsmrUI();
  } catch (e) {
    console.error("ASMR start error:", e);
  }
}

// 1. 빗소리 생성기 (Pink Noise + Lowpass/Highpass 필터)
function createRainSound(ctx, dest) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
    b6 = white * 0.115926;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.setValueAtTime(680, ctx.currentTime);

  const highpass = ctx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.setValueAtTime(90, ctx.currentTime);

  noise.connect(lowpass);
  lowpass.connect(highpass);
  highpass.connect(dest);
  noise.start(0);

  return {
    sources: [noise],
    stop: () => {
      try { noise.stop(); noise.disconnect(); } catch (e) {}
    }
  };
}

// 2. 장작불 소리 생성기 (전자음 오실레이터 완전 제거 -> 진짜 물리적 노이즈 크래클 + 화염 럼블)
function createFireSound(ctx, dest) {
  const sampleRate = ctx.sampleRate;
  
  // A. 깊고 따뜻한 불길 연소 럼블 (Brownian Flame Bed)
  const bufferSize = sampleRate * 2;
  const rumbleBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const rData = rumbleBuffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    const outVal = (lastOut + (0.02 * white)) / 1.02;
    lastOut = outVal;
    rData[i] = outVal * 2.2;
  }
  const rumble = ctx.createBufferSource();
  rumble.buffer = rumbleBuffer;
  rumble.loop = true;

  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = 'lowpass';
  rumbleFilter.frequency.setValueAtTime(160, ctx.currentTime);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.7, ctx.currentTime);

  rumble.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(dest);
  rumble.start(0);

  // B. 불씨 자글거리는 고음 시즐 (Hissing Embers)
  const hissBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const hData = hissBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    hData[i] = (Math.random() * 2 - 1) * 0.04;
  }
  const hiss = ctx.createBufferSource();
  hiss.buffer = hissBuffer;
  hiss.loop = true;

  const hissFilter = ctx.createBiquadFilter();
  hissFilter.type = 'bandpass';
  hissFilter.frequency.setValueAtTime(2800, ctx.currentTime);
  hissFilter.Q.setValueAtTime(1.5, ctx.currentTime);

  hiss.connect(hissFilter);
  hissFilter.connect(dest);
  hiss.start(0);

  // C. 진짜 나무가 타닥타닥 터지는 물리적 크래클 팝 (오실레이터 대신 초단시간 노이즈 임펄스 사용)
  const intervals = [];
  function triggerRealWoodPop() {
    if (!state.isAsmrPlaying) return;
    try {
      // 2~6ms의 아주 짧은 노이즈 버스트
      const popLen = Math.floor(sampleRate * (0.002 + Math.random() * 0.005));
      const popBuf = ctx.createBuffer(1, popLen, sampleRate);
      const pData = popBuf.getChannelData(0);
      for (let i = 0; i < popLen; i++) {
        // 급격히 감쇠하는 지수형 임펄스
        const decay = Math.exp(-i / (popLen * 0.28));
        pData[i] = (Math.random() * 2 - 1) * decay;
      }

      const popSource = ctx.createBufferSource();
      popSource.buffer = popBuf;

      const popFilter = ctx.createBiquadFilter();
      popFilter.type = 'bandpass';
      // 장작 특유의 나무 껍질 터지는 주파수 (1200 ~ 3600Hz)
      popFilter.frequency.setValueAtTime(1200 + Math.random() * 2400, ctx.currentTime);
      popFilter.Q.setValueAtTime(4 + Math.random() * 4, ctx.currentTime);

      const popGain = ctx.createGain();
      const isBigPop = Math.random() < 0.12; // 가끔 크게 튀는 장작 팝
      const vol = isBigPop ? (0.6 + Math.random() * 0.4) : (0.15 + Math.random() * 0.25);
      popGain.gain.setValueAtTime(vol, ctx.currentTime);

      popSource.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(dest);

      popSource.start();
    } catch (e) {}
  }

  // 70~220ms 간격으로 자연스럽고 불규칙하게 타닥거림 발생
  const popTimer = setInterval(() => {
    if (Math.random() < 0.72) triggerRealWoodPop();
    if (Math.random() < 0.28) {
      setTimeout(triggerRealWoodPop, 20 + Math.random() * 40);
    }
  }, 110);
  intervals.push(popTimer);

  return {
    sources: [rumble, hiss],
    intervals,
    stop: () => {
      try { rumble.stop(); rumble.disconnect(); } catch (e) {}
      try { hiss.stop(); hiss.disconnect(); } catch (e) {}
      intervals.forEach(id => clearInterval(id));
    }
  };
}

// 3. 잔잔한 명상 음악 (전자 비프음 완전 제거 -> 아늑한 432Hz 젠 앰비언트 코드 패드 + 맑은 싱잉볼 차임)
function createPianoSound(ctx, dest) {
  const sources = [];
  const intervals = [];

  // A. 배경에 아늑하고 깊게 깔리는 432Hz 힐링 앰비언트 코드 패드 (Ambient Chord Pad)
  // Cmaj9/Am9 코드 구성음 (C, E, G, B, D)의 따뜻한 배음
  const chordFreqs = [129.6, 162.0, 194.4, 243.0, 288.0]; // 432Hz 하모닉 배음
  const padGain = ctx.createGain();
  padGain.gain.setValueAtTime(0.001, ctx.currentTime);
  // 숨 쉬듯 부드럽게 3초에 걸쳐 차오름
  padGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 3.0);

  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.setValueAtTime(480, ctx.currentTime); // 뭉툭하고 포근한 톤

  chordFreqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    // 각 음마다 미세한 디튠(0.3~0.8Hz)으로 몽환적인 코러스/쉬머 효과 연출
    osc.frequency.setValueAtTime(freq + (idx % 2 === 0 ? 0.35 : -0.35), ctx.currentTime);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(1.0 / chordFreqs.length, ctx.currentTime);

    osc.connect(oscGain);
    oscGain.connect(padFilter);
    osc.start(0);
    sources.push(osc);
  });

  // B. 패드의 자연스러운 호흡 (LFO로 볼륨이 천천히 오르내림)
  const lfo = ctx.createOscillator();
  lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // 약 12초 주기의 깊은 호흡
  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(80, ctx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(padFilter.frequency);
  lfo.start(0);
  sources.push(lfo);

  padFilter.connect(padGain);
  padGain.connect(dest);

  // C. 7~10초 간격으로 은은하게 퍼지는 맑은 크리스털 명상 싱잉볼 (Tibetan Singing Bowl Bell)
  const bowlPitches = [432.0, 576.0, 648.0, 864.0]; // 맑고 청아한 명상 벨 주파수
  let pitchIdx = 0;

  function triggerSingingBowl() {
    if (!state.isAsmrPlaying) return;
    try {
      const now = ctx.currentTime;
      const baseFreq = bowlPitches[pitchIdx % bowlPitches.length];
      pitchIdx++;

      // 싱잉볼 기음과 금속성 비정수 배음 (2.76x, 5.4x)
      const harmonics = [1.0, 2.76, 5.4];
      const gains = [0.28, 0.08, 0.03];
      const decayTime = 7.5; // 7초 이상 길고 영롱한 여운

      harmonics.forEach((h, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h, now);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(gains[i], now + 0.04); // 부드러운 타격감
        g.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

        osc.connect(g);
        g.connect(dest);

        osc.start(now);
        osc.stop(now + decayTime);
        sources.push(osc);
      });
    } catch (e) {}
  }

  // 시작 0.8초 후 첫 싱잉볼 울림 후, 8초마다 주기적 여운
  setTimeout(triggerSingingBowl, 800);
  const bowlTimer = setInterval(() => {
    triggerSingingBowl();
  }, 8200);
  intervals.push(bowlTimer);

  return {
    sources,
    intervals,
    stop: () => {
      try {
        padGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        setTimeout(() => {
          sources.forEach(s => {
            try { s.stop(); s.disconnect(); } catch (e) {}
          });
        }, 850);
      } catch (e) {}
      intervals.forEach(id => clearInterval(id));
    }
  };
}

// 4. 고요한 밤 파도 소리 (LFO로 스윕하는 핑크 노이즈)
function createWavesSound(ctx, dest) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.07;
    b6 = white * 0.115926;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  // LFO를 통한 주기적인 파도 쓸림 효과
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(350, ctx.currentTime);

  const lfo = ctx.createOscillator();
  lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 약 8.3초 주기

  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(320, ctx.currentTime);

  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  noise.connect(filter);
  filter.connect(dest);

  noise.start(0);
  lfo.start(0);

  return {
    sources: [noise, lfo],
    stop: () => {
      try {
        noise.stop(); noise.disconnect();
        lfo.stop(); lfo.disconnect();
      } catch (e) {}
    }
  };
}

// 기분 좋은 딩동 사운드 합성
// 효과음 및 햅틱 설정 도우미
function isSoundEnabled() {
  return getStorage('posiecho_sound_enabled', true);
}

function isHapticEnabled() {
  return getStorage('posiecho_haptic_enabled', true);
}

function playToneSuccess() {
  if (!isSoundEnabled()) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

function playToneFanfare() {
  if (!isSoundEnabled()) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch (e) {}
}

// 물방울 / 나무 쓰다듬기 사운드 합성 (물방울 소리)
function playToneWaterDrop() {
  if (!isSoundEnabled()) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {}
}

// 12. 캘린더 및 성장형 긍정 나무 로직
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// 하루 3회(아침·점심·저녁)를 모두 완주한 날짜(황금 배지 획득일) 총 개수 계산
function getCompletedDaysCount() {
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  let count = 0;
  for (const dateKey in history) {
    const day = history[dateKey];
    if (day && day.morning && day.lunch && day.evening) {
      count++;
    }
  }
  return count;
}

// 연속 완주(Streak) 일수 계산
function getStreakDaysCount() {
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  let streak = 0;
  const checkDate = new Date();

  // 오늘 3회 완주 여부 확인
  const todayKey = getTodayKey();
  const todayRecord = history[todayKey];
  const isTodayComplete = todayRecord && todayRecord.morning && todayRecord.lunch && todayRecord.evening;

  if (!isTodayComplete) {
    // 오늘은 아직 진행 중이므로 어제부터 연속 일수 체크
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const key = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    const rec = history[key];
    if (rec && rec.morning && rec.lunch && rec.evening) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// 해당 월의 통계 계산 (완주 일수, 가장 많이 느낀 감정)
function getMonthStats(year, month) {
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  const lastDate = new Date(year, month + 1, 0).getDate();
  let completedDays = 0;
  const moodCounts = {};

  for (let d = 1; d <= lastDate; d++) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const rec = history[key];
    if (rec) {
      if (rec.morning && rec.lunch && rec.evening) {
        completedDays++;
      }
      if (rec.mood) {
        moodCounts[rec.mood] = (moodCounts[rec.mood] || 0) + 1;
      }
    }
  }

  let topMoodKey = null;
  let maxCount = 0;
  for (const [mKey, cnt] of Object.entries(moodCounts)) {
    if (cnt > maxCount) {
      maxCount = cnt;
      topMoodKey = mKey;
    }
  }

  return {
    completedDays,
    topMood: topMoodKey && MOOD_DATA[topMoodKey] ? MOOD_DATA[topMoodKey] : null
  };
}

function updateStatsWidget() {
  const year = state.currentCalendarMonth.getFullYear();
  const month = state.currentCalendarMonth.getMonth();

  const streak = getStreakDaysCount();
  const monthStats = getMonthStats(year, month);

  const completedDays = monthStats.completedDays;
  const lastDate = new Date(year, month + 1, 0).getDate();
  const monthRate = Math.round((completedDays / lastDate) * 100);

  if (DOM.statStreakDays) {
    DOM.statStreakDays.textContent = `${streak}일`;
  }
  if (DOM.statMonthDays) {
    DOM.statMonthDays.textContent = `${completedDays}일`;
    DOM.statMonthDays.title = `${completedDays}일 (${monthRate}%)`;
  }
  if (DOM.statTopMood) {
    if (monthStats.topMood) {
      const shortMoodLabels = { great: '활기', good: '좋음', calm: '평온', tired: '지침' };
      const mKey = Object.keys(MOOD_DATA).find(k => MOOD_DATA[k].emoji === monthStats.topMood.emoji || MOOD_DATA[k].label === monthStats.topMood.label);
      const shortText = (mKey && shortMoodLabels[mKey]) ? shortMoodLabels[mKey] : monthStats.topMood.label;
      DOM.statTopMood.textContent = `${monthStats.topMood.emoji} ${shortText}`;
      DOM.statTopMood.title = `${monthStats.topMood.label}`;
    } else {
      DOM.statTopMood.textContent = '😌 평온';
      DOM.statTopMood.title = '평온';
    }
  }
}

// ==========================================================================
// 12. 다품종 씨앗 및 긍정 정원 (Posi-Garden) 도감 시스템
// ==========================================================================

// 현재 심어진 식물 데이터 가져오기 (비정상 회차 자동 보정 및 리셋 포함)
function getCurrentPlantData() {
  let plant = getStorage(STORAGE_KEYS.CURRENT_PLANT, null);
  const gardenTrees = getGardenTrees();
  const validMaxCycle = Math.max(1, gardenTrees.length + 1);

  if (!plant) {
    const totalSuccess = getCompletedDaysCount();
    plant = {
      type: 'cherry',
      cycle: validMaxCycle,
      currentDays: totalSuccess % 15
    };
    setStorage(STORAGE_KEYS.CURRENT_PLANT, plant);
  } else {
    // 비정상적으로 부풀려진 회차(예: 이전 씨앗 변경 버그로 인한 14회차 등)는 완성된 정원 나무 수 기반으로 즉시 정상 리셋
    if (!plant.cycle || plant.cycle > validMaxCycle) {
      plant.cycle = validMaxCycle;
      setStorage(STORAGE_KEYS.CURRENT_PLANT, plant);
    }
  }
  state.plantData = plant;
  return plant;
}

// 식물 품종 정의 반환
function getPlantDefinition(type) {
  return PLANT_TYPES[type] || PLANT_TYPES.cherry;
}

// 수집된 정원 나무 목록
function getGardenTrees() {
  return getStorage(STORAGE_KEYS.GARDEN_TREES, []);
}

// 15일 만개 달성 시 도감에 자동 영구 보관 (즉시 UI 동기화)
function checkAndSaveGardenTree(plant) {
  if (!plant || plant.currentDays < 15) return false;
  const trees = getGardenTrees();
  const exists = trees.some(t => t.cycle === plant.cycle && t.type === plant.type);
  if (!exists) {
    const pDef = getPlantDefinition(plant.type);
    const today = getTodayKey();
    trees.push({
      id: Date.now(),
      type: plant.type,
      name: pDef.name,
      emoji: pDef.emoji,
      theme: pDef.theme,
      cycle: plant.cycle,
      completedDate: today
    });
    setStorage(STORAGE_KEYS.GARDEN_TREES, trees);
    showToast(`🎉 축하합니다! [${pDef.name}]가 나의 긍정 정원 도감에 등록되었습니다! 🌸`);

    // 🛡️ 15일 만개 즉시 도감 탭 배지 및 도감 갤러리 UI를 최신 수량으로 실시간 동기화
    if (DOM.gardenCountBadge) {
      DOM.gardenCountBadge.textContent = `${trees.length}`;
    }
    const gardenSubtabBadge = document.getElementById('gardenSubtabBadge');
    if (gardenSubtabBadge) {
      gardenSubtabBadge.textContent = `${trees.length}`;
    }
    if (typeof renderGardenGallery === 'function') {
      renderGardenGallery();
    }
    return true;
  }
  return false;
}

// 나무 쓰다듬기 / 물주기 인터랙션
let treePatMsgIndex = 0;
let isPattingTreeThrottled = false;
function patTree() {
  if (isPattingTreeThrottled) return;
  isPattingTreeThrottled = true;
  setTimeout(() => {
    isPattingTreeThrottled = false;
  }, 350);

  const plant = getCurrentPlantData();
  const pDef = getPlantDefinition(plant.type);

  if (DOM.treeArt) {
    DOM.treeArt.classList.remove('bounce');
    void DOM.treeArt.offsetWidth; // 트리거 리플로우
    DOM.treeArt.classList.add('bounce');
    setTimeout(() => {
      if (DOM.treeArt) DOM.treeArt.classList.remove('bounce');
    }, 600);
  }

  playToneWaterDrop();
  triggerHaptic('success');

  // 품종 맞춤형 파티클 연출
  if (window.confetti) {
    window.confetti({
      particleCount: 32,
      spread: 60,
      origin: { y: 0.45 },
      colors: pDef.confettiColors || ['#38ef7d', '#ffd200']
    });
  }

  const messages = pDef.patMessages && pDef.patMessages.length > 0 ? pDef.patMessages : [
    "🌱 듬뿍 사랑을 주셔서 감사해요! 무럭무럭 자랄게요.",
    "💧 긍정의 물방울이 톡톡! 잎사귀가 돋아납니다."
  ];
  const msg = messages[treePatMsgIndex % messages.length];
  treePatMsgIndex++;
  showToast(msg);
}

// 나무 성장 플로팅 배지 시각 연출
function showTreeGrowthEffect(addedDays, totalDays) {
  const visualBox = DOM.treeVisualBox || document.getElementById('treeVisualBox');
  if (!visualBox) return;
  const badge = document.createElement('div');
  badge.className = 'tree-growth-floating-badge';
  badge.innerHTML = `⚡ +${addedDays}일 성장!<br><span style="font-size:11px; opacity:0.9;">현재 ${totalDays}/15일</span>`;
  visualBox.appendChild(badge);
  setTimeout(() => {
    badge.remove();
  }, 1600);
}

// 나무 상태 및 캘린더 사이드바 업데이트
function updateTreeAndSidebar() {
  const completedDays = getCompletedDaysCount();
  const plant = getCurrentPlantData();
  const pDef = getPlantDefinition(plant.type);
  const progressDays = plant.currentDays;

  // 🛡️ 15일 만개 시 도감 등록을 먼저 수행하여 배지와 통계에 즉시 1로 반영되도록 보장
  if (progressDays >= 15) {
    checkAndSaveGardenTree(plant);
  }

  // 전체 누적 달성 일수 표시
  if (DOM.sidebarTotalSuccess) {
    DOM.sidebarTotalSuccess.textContent = `${completedDays}일 달성`;
  }

  // 현재 품종명 표시 (예: 🌸 화사한 벚꽃나무 (첫 번째 나무))
  if (DOM.treePlantName) {
    const treeOrderText = (plant.cycle === 1 || !plant.cycle) ? '첫 번째 나무' : `${plant.cycle}번째 나무`;
    DOM.treePlantName.textContent = `${pDef.emoji} ${pDef.name} (${treeOrderText})`;
  }

  // 정원 도감 배지 숫자 동기화 (방금 등록된 수량까지 포함된 최신 상태)
  const gardenTrees = getGardenTrees();
  if (DOM.gardenCountBadge) {
    DOM.gardenCountBadge.textContent = `${gardenTrees.length}`;
  }
  const gardenSubtabBadge = document.getElementById('gardenSubtabBadge');
  if (gardenSubtabBadge) {
    gardenSubtabBadge.textContent = `${gardenTrees.length}`;
  }

  let stage = '🫘 발아';
  let levelName = '레벨 1 · 발아';
  let art = pDef.stages[0];
  let nextGoal = 2;
  let message = `오늘 3번 확언을 실천해 [${pDef.name}] 새싹을 틔워보세요!`;
  let percent = Math.min(100, Math.round((progressDays / 2) * 100));

  if (progressDays >= 15) {
    stage = `${pDef.emoji} ${pDef.name}`;
    levelName = `레벨 5 · 만개한 ${pDef.name}`;
    art = pDef.stages[4] || pDef.emoji;
    nextGoal = '✨ 만개 완료 (정원 도감 등록됨)';
    message = `긍정의 ${pDef.name}가 활짝 피어났습니다!`;
    percent = 100;

    // 만개 시 도감 등록 및 새 씨앗 심기 배너 노출
    checkAndSaveGardenTree(plant);
    if (DOM.treeBloomBanner) DOM.treeBloomBanner.classList.remove('hidden');
  } else {
    if (DOM.treeBloomBanner) DOM.treeBloomBanner.classList.add('hidden');

    if (progressDays >= 9) {
      stage = '🌳 울창한 나무';
      levelName = '레벨 4 · 울창한 나무';
      art = pDef.stages[3];
      nextGoal = 15;
      message = '든든하고 울창한 나무로 자라났습니다.';
      percent = Math.round(((progressDays - 9) / (15 - 9)) * 100);
    } else if (progressDays >= 5) {
      stage = '🌿 푸르른 잎새';
      levelName = '레벨 3 · 푸르른 잎새';
      art = pDef.stages[2];
      nextGoal = 9;
      message = '파릇파릇한 잎들이 풍성하게 자라나고 있어요.';
      percent = Math.round(((progressDays - 5) / (9 - 5)) * 100);
    } else if (progressDays >= 2) {
      stage = '🌱 어린 새싹';
      levelName = '레벨 2 · 어린 새싹';
      art = pDef.stages[1];
      nextGoal = 5;
      message = '귀여운 연둣빛 새싹이 고개를 내밀었습니다!';
      percent = Math.round(((progressDays - 2) / (5 - 2)) * 100);
    }
  }

  if (DOM.treeArt) DOM.treeArt.textContent = art;
  if (DOM.treeLevelBadge) DOM.treeLevelBadge.textContent = levelName;
  if (DOM.sidebarTreeStage) DOM.sidebarTreeStage.textContent = `${art} ${pDef.name}`;
  if (DOM.treeMessage) DOM.treeMessage.textContent = message;
  if (DOM.treeExpFill) DOM.treeExpFill.style.width = `${percent}%`;
  if (DOM.treeExpText) {
    if (typeof nextGoal === 'number') {
      const remain = Math.max(0, nextGoal - progressDays);
      DOM.treeExpText.textContent = `${progressDays} / ${nextGoal}일 (다음 단계까지 ${remain}일 남음)`;
    } else {
      DOM.treeExpText.textContent = nextGoal;
    }
  }

  // 오늘 3회 루틴 진행 현황 사이드바 동기화
  const todayHistory = getStorage(STORAGE_KEYS.HISTORY, {})[getTodayKey()] || {};
  if (DOM.sbRoutineMorning) {
    DOM.sbRoutineMorning.textContent = todayHistory.morning ? '☀️ 아침 완료 ✔' : '☀️ 아침';
    DOM.sbRoutineMorning.classList.toggle('completed', Boolean(todayHistory.morning));
  }
  if (DOM.sbRoutineLunch) {
    DOM.sbRoutineLunch.textContent = todayHistory.lunch ? '🌤️ 점심 완료 ✔' : '🌤️ 점심';
    DOM.sbRoutineLunch.classList.toggle('completed', Boolean(todayHistory.lunch));
  }
  if (DOM.sbRoutineEvening) {
    DOM.sbRoutineEvening.textContent = todayHistory.evening ? '🌙 저녁 완료 ✔' : '🌙 저녁';
    DOM.sbRoutineEvening.classList.toggle('completed', Boolean(todayHistory.evening));
  }

  // 사이드바 정원 정보 업데이트
  updateStatsWidget();

  // 화분 하단 씨앗 버튼 텍스트 상태 동기화
  const openSeedSelectTreeBtn = document.getElementById('openSeedSelectTreeBtn');
  if (openSeedSelectTreeBtn) {
    if (progressDays >= 15) {
      openSeedSelectTreeBtn.textContent = '✨ 만개 달성! 다음 나무 씨앗 심기';
    } else {
      openSeedSelectTreeBtn.textContent = '🌱 마음의 씨앗 변경 & 관리';
    }
  }

  // 2배 성장 부스터 카드 UI 상태 동기화
  updateGardenBoosterUI();
}

function updateGardenBoosterUI() {
  if (!DOM.gardenBoosterDesc || !DOM.gardenBoosterBtnText) return;
  const isPro = isProUser();
  const plant = getCurrentPlantData();
  const pDef = getPlantDefinition(plant.type);
  const isFullBloom = (plant.currentDays >= 15);
  const todayKey = getTodayKey();
  const lastBoosterDate = getStorage(STORAGE_KEYS.BOOSTER_LAST_DATE, '');
  const isBoosterUsedToday = (lastBoosterDate === todayKey);
  const todayHistory = getStorage(STORAGE_KEYS.HISTORY, {})[todayKey] || {};
  let completedSets = 0;
  if (todayHistory.morning) completedSets++;
  if (todayHistory.lunch) completedSets++;
  if (todayHistory.evening) completedSets++;

  if (!isPro) {
    DOM.gardenBoosterDesc.innerHTML = '1세트 이상 실천 시 매일 <strong>+1일 보너스 성장</strong> (7일 만개)';
    DOM.gardenBoosterBtnText.textContent = '⚡ PRO 부스터 시작';
    if (DOM.gardenBoosterBtn) {
      DOM.gardenBoosterBtn.disabled = false;
      DOM.gardenBoosterBtn.style.opacity = '1';
      DOM.gardenBoosterBtn.classList.remove('used-today');
      DOM.gardenBoosterBtn.classList.remove('locked');
    }
    return;
  }

  if (isFullBloom) {
    DOM.gardenBoosterDesc.innerHTML = `🌸 <strong>${pDef.name}</strong> 만개 완료! 새 씨앗을 심어보세요.`;
    DOM.gardenBoosterBtnText.textContent = '🌸 새 씨앗 심기';
    if (DOM.gardenBoosterBtn) {
      DOM.gardenBoosterBtn.disabled = false;
      DOM.gardenBoosterBtn.style.opacity = '1';
      DOM.gardenBoosterBtn.classList.remove('used-today');
      DOM.gardenBoosterBtn.classList.remove('locked');
    }
  } else if (isBoosterUsedToday) {
    DOM.gardenBoosterDesc.innerHTML = `✨ <strong>오늘 영양제 투여 완료!</strong> (내일 00:00에 다시 충전됩니다 · 현재 ${plant.currentDays}/15일)`;
    DOM.gardenBoosterBtnText.textContent = '✔ 오늘 투여 완료 (내일 충전)';
    if (DOM.gardenBoosterBtn) {
      DOM.gardenBoosterBtn.disabled = false;
      DOM.gardenBoosterBtn.style.opacity = '1';
      DOM.gardenBoosterBtn.classList.add('used-today');
      DOM.gardenBoosterBtn.classList.remove('locked');
    }
  } else if (completedSets < 1) {
    DOM.gardenBoosterDesc.innerHTML = `🔒 오늘 확언 <strong>1세트 이상 실천 시</strong> 영양제를 줄 수 있어요`;
    DOM.gardenBoosterBtnText.textContent = '🔒 1세트 실천 후 사용 가능';
    if (DOM.gardenBoosterBtn) {
      DOM.gardenBoosterBtn.disabled = false;
      DOM.gardenBoosterBtn.style.opacity = '0.9';
      DOM.gardenBoosterBtn.classList.remove('used-today');
      DOM.gardenBoosterBtn.classList.add('locked');
    }
  } else {
    DOM.gardenBoosterDesc.innerHTML = `👑 오늘 ${completedSets}세트 완료! 무료 영양제로 <strong>+1일 성장</strong>시키세요`;
    DOM.gardenBoosterBtnText.textContent = '⚡ 영양제 주기 (+1일)';
    if (DOM.gardenBoosterBtn) {
      DOM.gardenBoosterBtn.disabled = false;
      DOM.gardenBoosterBtn.style.opacity = '1';
      DOM.gardenBoosterBtn.classList.remove('used-today');
      DOM.gardenBoosterBtn.classList.remove('locked');
    }
  }
}

// --------------------------------------------------------------------------
// 새로운 씨앗 심기 모달 로직
// --------------------------------------------------------------------------
function openSeedSelectModal() {
  if (!DOM.seedSelectModal) return;
  renderSeedList();
  DOM.seedSelectModal.classList.remove('hidden');
}

function closeSeedSelectModal() {
  if (DOM.seedSelectModal) DOM.seedSelectModal.classList.add('hidden');
}

function renderSeedList() {
  if (!DOM.seedListGrid) return;
  const currentPlant = getCurrentPlantData();
  const currentDef = getPlantDefinition(currentPlant.type);
  const gardenTrees = getGardenTrees();
  const isFullBloom = (currentPlant.currentDays >= 15);
  const nextCycle = isFullBloom ? gardenTrees.length + 1 : currentPlant.cycle;

  // 모달 상단 히어로 배너 동적 안내문 구성
  const seedModalHero = document.querySelector('.seed-modal-hero');
  if (seedModalHero) {
    if (isFullBloom) {
      const nextTreeText = (nextCycle === 1) ? '첫 번째 나무' : `${nextCycle}번째 나무`;
      seedModalHero.innerHTML = `
        <div class="seed-hero-emoji">🎉 ${currentDef.emoji} ➔ 🌱</div>
        <h4>만개 달성! 다음 나무의 씨앗을 골라주세요</h4>
        <p>정성으로 피워낸 [${currentDef.name}]가 도감에 등록되었습니다.<br>새로운 <strong>${nextTreeText}</strong>로 피워낼 씨앗을 선택해보세요!</p>
      `;
    } else {
      seedModalHero.innerHTML = `
        <div class="seed-hero-emoji">${currentDef.emoji} 🌱</div>
        <h4>현재 [${currentDef.name}] 키우는 중 (${currentPlant.currentDays}/15일 달성)</h4>
        <p>한 그루에 15일 동안 확언을 실천하면 만개하여 도감에 영구 소장됩니다.<br><small style="color:var(--text-muted); display:inline-block; margin-top:4px;">* 15일 만개 후 다음 나무의 씨앗을 이어 키우는 것을 권장하며, 중간에 씨앗을 변경하시면 새 씨앗(1일차)부터 다시 시작됩니다.</small></p>
      `;
    }
  }

  DOM.seedListGrid.innerHTML = '';

  Object.values(PLANT_TYPES).forEach(plant => {
    const isCurrent = plant.id === currentPlant.type;
    const isProTree = plant.isPro === true;
    const proBadge = isProTree ? `<span class="pro-chip small">👑 PRO</span>` : '';
    const card = document.createElement('div');
    card.className = `seed-item-card ${isCurrent ? 'current' : ''} ${isProTree ? 'pro-only-item' : ''}`;
    
    let btnText = '선택';
    if (isCurrent) {
      btnText = isFullBloom ? '만개 완료 ✔' : '🌱 키우는 중';
    } else if (isFullBloom) {
      btnText = isProTree && !isProUser() ? '👑 PRO 심기' : '심기 🌱';
    } else {
      btnText = isProTree && !isProUser() ? '👑 PRO 전용' : '새로 심기';
    }

    card.innerHTML = `
      <div class="seed-info-left">
        <div class="seed-avatar">${plant.emoji}</div>
        <div class="seed-title-box">
          <strong>${plant.seedName} ${proBadge}</strong>
          <span class="seed-theme">꽃말: ${plant.theme}</span>
        </div>
      </div>
      <button type="button" class="seed-select-btn ${isCurrent ? 'current' : ''}" data-seed="${plant.id}">
        ${btnText}
      </button>
    `;

    if (!isCurrent) {
      card.addEventListener('click', () => selectNewSeed(plant.id));
    }
    DOM.seedListGrid.appendChild(card);
  });
}

function selectNewSeed(seedId) {
  const pDef = getPlantDefinition(seedId);

  // PRO 전용 나무 검사
  if (pDef && pDef.isPro && !isProUser()) {
    showToast(`👑 [${pDef.name}]는 PRO VIP 전용 시그니처 나무입니다. PRO로 업그레이드하고 키워보세요!`);
    openProModal();
    return;
  }

  const currentPlant = getCurrentPlantData();
  const gardenTrees = getGardenTrees();
  const isFullBloom = (currentPlant.currentDays >= 15);
  const currentDef = getPlantDefinition(currentPlant.type);

  if (!isFullBloom) {
    // 15일 만개 전 중간 변경 시도시 안내 및 확인 팝업
    const confirmed = window.confirm(
      `⚠️ 씨앗 품종을 [${pDef.seedName}]으로 새로 변경하시겠습니까?\n\n현재 정성껏 키우고 계신 [${currentDef.name}] (${currentPlant.currentDays}일차) 화분의 진행도가 리셋(0일차)되며, 처음 1일차부터 다시 키우게 됩니다.\n\n정말 변경하시겠습니까?`
    );
    if (!confirmed) {
      return;
    }
  }

  let nextCycle = Math.max(1, gardenTrees.length + 1);
  let nextDays = 0;

  if (isFullBloom) {
    checkAndSaveGardenTree(currentPlant);
    const updatedTrees = getGardenTrees();
    nextCycle = updatedTrees.length + 1;
    nextDays = 0;
  } else {
    // 중간 변경 시: 진행일수 0일차로 초기화, 회차는 정상 계산치 유지
    nextDays = 0;
    nextCycle = Math.max(1, gardenTrees.length + 1);
  }

  // 새 씨앗 화분 정보 갱신
  const newPlant = {
    type: seedId,
    cycle: nextCycle,
    currentDays: nextDays
  };
  setStorage(STORAGE_KEYS.CURRENT_PLANT, newPlant);
  state.plantData = newPlant;

  closeSeedSelectModal();
  updateTreeAndSidebar();
  renderGardenGallery();

  if (isFullBloom) {
    const nextTreeName = (nextCycle === 1) ? '첫 번째 나무' : `${nextCycle}번째 나무`;
    showToast(`🌱 새로운 마음의 씨앗 [${pDef.seedName}]을 심었습니다! [${nextTreeName}] 시작! ✨`);
  } else {
    showToast(`🌱 [${pDef.seedName}] 씨앗을 새로 심었습니다. 1일차부터 시작합니다! ✨`);
  }

  if (window.confetti) {
    window.confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.5 },
      colors: pDef.confettiColors
    });
  }
}

// --------------------------------------------------------------------------
// 나의 긍정 정원 도감 갤러리 모달 로직
// --------------------------------------------------------------------------
function openGardenGalleryModal() {
  if (!DOM.gardenGalleryModal) return;
  renderGardenGallery();
  DOM.gardenGalleryModal.classList.remove('hidden');
}

function closeGardenGalleryModal() {
  if (DOM.gardenGalleryModal) DOM.gardenGalleryModal.classList.add('hidden');
}

function renderGardenGallery() {
  const trees = getGardenTrees();
  const totalDays = getCompletedDaysCount();

  document.querySelectorAll('#gardenTotalTreesCount').forEach(el => {
    el.textContent = `${trees.length}그루`;
  });
  document.querySelectorAll('#gardenTotalDaysCount').forEach(el => {
    el.textContent = `${totalDays}일`;
  });
  document.querySelectorAll('#gardenYearProgress').forEach(el => {
    el.textContent = `${trees.length} / 12`;
  });

  const gardenSubtabBadge = document.getElementById('gardenSubtabBadge');
  if (gardenSubtabBadge) {
    gardenSubtabBadge.textContent = `${trees.length}`;
  }
  if (DOM.gardenCountBadge) {
    DOM.gardenCountBadge.textContent = `${trees.length}`;
  }

  const grids = document.querySelectorAll('#gardenCollectionGrid');
  if (grids.length === 0) return;

  grids.forEach(grid => {
    grid.innerHTML = '';
    if (trees.length === 0) {
      grid.innerHTML = `
        <div class="garden-empty-card">
          <span class="empty-emoji">🪴</span>
          <p>아직 정원에 피워낸 꽃나무가 없습니다.<br>하루 3회 루틴을 15일 동안 꾸준히 실천하여 첫 번째 꽃나무를 피워보세요!</p>
        </div>
      `;
    } else {
      trees.forEach(tree => {
        const card = document.createElement('div');
        card.className = 'garden-tree-card';
        card.innerHTML = `
          <div class="tree-card-art">${tree.emoji}</div>
          <strong class="tree-card-title">${tree.name}</strong>
          <span class="tree-card-date">${tree.completedDate} 달성</span>
        `;
        card.addEventListener('click', () => {
          showToast(`✨ [${tree.name}] 꽃말: "${tree.theme}"`);
        });
        grid.appendChild(card);
      });
    }
  });
}

// ==========================================
// 🎙️ PosiEcho 육성 보관함 (Voice Time-Capsule DB)
// ==========================================
const VOICE_DB_NAME = 'PosiEchoVoiceDB_v2';
const VOICE_DB_STORE = 'capsules';

function openVoiceDatabase() {
  return new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      const req = indexedDB.open(VOICE_DB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(VOICE_DB_STORE)) {
          db.createObjectStore(VOICE_DB_STORE, { keyPath: 'id' });
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => {
        console.warn('IndexedDB open error:', e);
        resolve(null);
      };
    } catch (err) {
      console.warn('IndexedDB exception:', err);
      resolve(null);
    }
  });
}

async function saveVoiceToDB(key, blob, meta = {}) {
  try {
    const db = await openVoiceDatabase();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(VOICE_DB_STORE, 'readwrite');
      const store = tx.objectStore(VOICE_DB_STORE);
      const item = {
        id: key,
        blob: blob,
        size: blob.size,
        type: blob.type,
        recordedAt: new Date().toISOString(),
        ...meta
      };
      const req = store.put(item);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (e) {
    console.warn('saveVoiceToDB error:', e);
    return false;
  }
}

async function loadVoiceFromDB(key) {
  try {
    const db = await openVoiceDatabase();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(VOICE_DB_STORE, 'readonly');
      const store = tx.objectStore(VOICE_DB_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.warn('loadVoiceFromDB error:', e);
    return null;
  }
}

// 해당 날짜/세션의 확언 문장 일관성 보장 함수 (화면 표기 및 AI 낭독 완벽 일치)
function getDaySessionQuote(dateKey, sessionKey) {
  const dKey = dateKey || state.selectedModalDate || getTodayKey();
  const sKey = sessionKey || state.selectedCapsuleSession || 'morning';
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  const record = history[dKey] || {};

  // 1. 해당 날짜 세션에 저장된 고유 확언이 있는지 확인
  if (record.quotes && record.quotes[sKey]) {
    return record.quotes[sKey];
  }
  if (record[sKey] && record.quote) {
    const completedList = ['morning', 'lunch', 'evening'].filter(k => record[k]);
    if (completedList.length === 1 && completedList[0] === sKey) {
      return record.quote;
    }
  }

  // 2. 오늘 날짜인 경우 활성 세션(나만의 확언 등) 우선 조회
  if (dKey === getTodayKey()) {
    const activeQ = getActiveQuoteForSession(sKey);
    if (activeQ && activeQ.text) {
      return activeQ.text;
    }
  }

  // 3. 365 명언 데이터베이스에서 해당 날짜와 세션의 명언 반환
  const parts = dKey.split('-');
  const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const q = get365QuoteForDate(dObj, sKey);
  return q ? q.text : "나는 매일 모든 면에서 점점 더 좋아지고 있다.";
}

// 해당 날짜/세션의 육성 데이터 일관성 보장 함수 (세션 간 오염 및 잘못된 매칭 방지)
async function getSessionVoiceItem(dateKey, sessionKey) {
  const dKey = dateKey || state.selectedModalDate || getTodayKey();
  const sKey = sessionKey || state.selectedCapsuleSession || 'morning';

  // 1. 세션 전용 슬롯(${dKey}_${sKey}) 우선 조회
  let vItem = await loadVoiceFromDB(`${dKey}_${sKey}`);
  if (vItem && vItem.blob && vItem.blob.size > 200) {
    return vItem;
  }

  // 2. 아침 세션인 경우에만 과거 단일 키(${dKey}) 하위 호환 체크 (단, 점심/저녁 음성으로 오염된 경우 제외)
  if (sKey === 'morning') {
    const legacy = await loadVoiceFromDB(dKey);
    if (legacy && legacy.blob && legacy.blob.size > 200) {
      if (!legacy.sessionKey || legacy.sessionKey === 'morning') {
        return legacy;
      }
    }
  }

  return null;
}

// ------------------------------------------
// 실시간 낭독 오디오 캡처 엔진 (MediaRecorder)
// ------------------------------------------
let mediaRecorderInstance = null;
let mediaStreamInstance = null;
let recordedAudioChunks = [];
let recordingStartTime = 0;

async function startVoiceCapture() {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    stopVoiceCapture(false);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamInstance = stream;
    recordedAudioChunks = [];
    recordingStartTime = Date.now();

    let options = {};
    if (typeof MediaRecorder !== 'undefined') {
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        options = { mimeType: 'audio/webm;codecs=opus' };
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options = { mimeType: 'audio/mp4' };
      } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        options = { mimeType: 'audio/ogg;codecs=opus' };
      }
      const recorder = new MediaRecorder(stream, options);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedAudioChunks.push(e.data);
        }
      };
      recorder.start(100);
      mediaRecorderInstance = recorder;
    }
  } catch (e) {
    console.warn("startVoiceCapture error:", e);
  }
}

function stopVoiceCapture(save = true, dateKey = null, sessionKey = null) {
  if (!mediaRecorderInstance && !mediaStreamInstance) return;
  const currentRecorder = mediaRecorderInstance;
  const currentStream = mediaStreamInstance;
  const duration = Math.round((Date.now() - recordingStartTime) / 1000);

  mediaRecorderInstance = null;
  mediaStreamInstance = null;

  if (currentRecorder && currentRecorder.state !== 'inactive') {
    currentRecorder.onstop = () => {
      if (save && recordedAudioChunks.length > 0) {
        const mimeType = currentRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(recordedAudioChunks, { type: mimeType });
        const dKey = dateKey || getTodayKey();
        const sKey = sessionKey || state.currentSession || 'morning';
        
        saveVoiceToDB(`${dKey}_${sKey}`, audioBlob, { duration, dateKey: dKey, sessionKey: sKey }).then(() => {
          updateVoiceCapsuleCard(dKey, sKey);
        });
        if (sKey === 'morning') {
          saveVoiceToDB(dKey, audioBlob, { duration, dateKey: dKey, sessionKey: sKey });
        }
        
        const history = getStorage(STORAGE_KEYS.HISTORY, {});
        if (!history[dKey]) history[dKey] = {};
        if (!history[dKey].quotes) history[dKey].quotes = {};
        if (state.currentQuote && state.currentQuote.text) {
          history[dKey].quotes[sKey] = state.currentQuote.text;
        }
        if (!history[dKey].voices) history[dKey].voices = {};
        history[dKey].voices[sKey] = true;
        history[dKey].hasVoice = true;
        setStorage(STORAGE_KEYS.HISTORY, history);
      }
      recordedAudioChunks = [];
    };
    try {
      currentRecorder.stop();
    } catch (e) {}
  }

  if (currentStream) {
    currentStream.getTracks().forEach(track => {
      try { track.stop(); } catch (e) {}
    });
  }
}

// ------------------------------------------
// 캘린더 모달 육성 타임캡슐 제어
// ------------------------------------------
let activeCapsuleAudio = null;
let quickRecordTimer = null;
let quickRecordRecorder = null;
let quickRecordStream = null;
state.selectedCapsuleSession = 'morning';

// ------------------------------------------
// 육성 Blob 안심 재생 유틸리티 (DataURL + Web Audio API 2단계 안전 폴백)
// ------------------------------------------
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function playRecordedAudioBlob(blob, onEnd, onError) {
  if (!blob || blob.size < 200) {
    if (onError) onError(new Error("Empty audio blob"));
    return null;
  }

  let isStopped = false;
  let currentAudio = null;
  let currentSource = null;
  let objectUrl = null;

  const controller = {
    stop: () => {
      isStopped = true;
      if (currentAudio) {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        } catch (e) {}
        currentAudio = null;
      }
      if (objectUrl) {
        try { URL.revokeObjectURL(objectUrl); } catch (e) {}
        objectUrl = null;
      }
      if (currentSource) {
        try { currentSource.stop(); } catch (e) {}
        currentSource = null;
      }
      if (onEnd) onEnd();
    },
    pause: () => {
      controller.stop();
    }
  };

  try {
    try {
      objectUrl = URL.createObjectURL(blob);
    } catch (e) {
      objectUrl = null;
    }

    const src = objectUrl || await blobToDataUrl(blob);
    if (isStopped) {
      if (objectUrl) try { URL.revokeObjectURL(objectUrl); } catch(e) {}
      return controller;
    }

    const audio = new Audio(src);
    currentAudio = audio;

    audio.onended = () => {
      if (objectUrl) {
        try { URL.revokeObjectURL(objectUrl); } catch (e) {}
        objectUrl = null;
      }
      if (!isStopped && onEnd) onEnd();
    };

    audio.onerror = async (err) => {
      if (isStopped) return;
      console.warn("Audio playback failed with primary src, trying DataURL / WebAudio fallback:", err);
      if (objectUrl) {
        try { URL.revokeObjectURL(objectUrl); } catch (e) {}
        objectUrl = null;
      }
      currentAudio = null;
      try {
        const dataUrl = await blobToDataUrl(blob);
        if (isStopped) return;
        const fallbackAudio = new Audio(dataUrl);
        currentAudio = fallbackAudio;
        fallbackAudio.onended = () => {
          if (!isStopped && onEnd) onEnd();
        };
        fallbackAudio.onerror = () => {
          currentAudio = null;
          tryWebAudio();
        };
        await fallbackAudio.play();
      } catch (eFallback) {
        tryWebAudio();
      }
    };

    await audio.play();
    return controller;
  } catch (err) {
    console.warn("Audio play() failed, trying Web Audio API:", err);
    tryWebAudio();
    return controller;
  }

  async function tryWebAudio() {
    if (isStopped) return;
    try {
      const audioCtx = getAudioContext();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      if (isStopped) return;

      const source = audioCtx.createBufferSource();
      currentSource = source;
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);

      source.onended = () => {
        if (!isStopped && onEnd) onEnd();
      };

      source.start(0);
    } catch (e) {
      console.warn("Web Audio API decode/playback failed:", e);
      if (!isStopped && onError) onError(e);
    }
  }
}

async function updateVoiceCapsuleCard(dateKey, sessionKey = null) {
  const dKey = dateKey || state.selectedModalDate || getTodayKey();
  if (sessionKey) {
    state.selectedCapsuleSession = sessionKey;
  }
  const curSession = state.selectedCapsuleSession || 'morning';

  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const sLabel = sessionNames[curSession] || '아침';

  // 1. 아침 / 점심 / 저녁 3세션 칩 상태 및 보관 여부 동기화
  const sessionChips = document.querySelectorAll('#capsuleSessionTabs .capsule-session-chip');
  if (sessionChips && sessionChips.length > 0) {
    for (const chip of sessionChips) {
      const s = chip.getAttribute('data-capsule-session');
      const isActive = (s === curSession);
      chip.classList.toggle('active', isActive);

      // 각 세션별 녹음 존재 여부 비동기 확인
      let sVoice = await getSessionVoiceItem(dKey, s);
      const sHasVoice = Boolean(sVoice);

      chip.classList.toggle('has-voice', sHasVoice);
      const statusEl = chip.querySelector('.chip-session-status');
      if (statusEl) {
        statusEl.textContent = sHasVoice ? '보관됨 ✔' : '미보관';
      }

      // 상단 확언 카드 활성 상태 및 육성 배지 동기화
      const capName = s.charAt(0).toUpperCase() + s.slice(1);
      const cardEl = document.getElementById(`modalQuoteCard${capName}`);
      if (cardEl) {
        cardEl.classList.toggle('is-active-capsule', isActive);
      }
      const badgeEl = document.getElementById(`modal${capName}VoiceBadge`);
      if (badgeEl) {
        badgeEl.textContent = sHasVoice ? '🎙️ 육성' : '미보관';
        badgeEl.className = `quote-voice-badge ${sHasVoice ? 'has-voice' : 'no-voice'}`;
      }
    }
  }

  // 2. 현재 선택된 세션의 육성 데이터 로드
  let voiceItem = await getSessionVoiceItem(dKey, curSession);
  const hasRealVoice = Boolean(voiceItem);

  if (DOM.capsuleMsg) {
    if (hasRealVoice) {
      DOM.capsuleMsg.innerHTML = `✨ <strong style="color:var(--primary-accent);">${sLabel} 낭독 육성 보관됨!</strong> 그날 녹음된 생생한 내 목소리를 들어보세요.`;
    } else {
      DOM.capsuleMsg.innerHTML = `💡 아직 <strong>${sLabel} 낭독 육성</strong>이 없습니다. 3회 완주 후 [5초 직접 녹음]으로 내 목소리를 타임캡슐에 남길 수 있습니다.`;
    }
  }

  if (DOM.playVoiceCapsuleBtn) {
    if (hasRealVoice) {
      DOM.playVoiceCapsuleBtn.innerHTML = `<span class="capsule-btn-icon">▶️</span> <span class="capsule-btn-text"><span>${sLabel} 육성 다시듣기</span></span>`;
    } else {
      DOM.playVoiceCapsuleBtn.innerHTML = `<span class="capsule-btn-icon">🎧</span> <span class="capsule-btn-text"><span>${sLabel} 확언 AI 낭독듣기</span><span class="capsule-btn-subtext">(내 육성 미보관)</span></span>`;
    }
    DOM.playVoiceCapsuleBtn.classList.remove('is-playing');
  }

  if (DOM.recordQuickCapsuleBtn && !DOM.recordQuickCapsuleBtn.classList.contains('is-recording')) {
    DOM.recordQuickCapsuleBtn.innerHTML = `<span class="capsule-record-icon">🎙️</span> <span class="capsule-record-text">${sLabel} 5초 직접 녹음</span>`;
  }

  if (DOM.missionCapsuleStatusText && DOM.missionCapsuleBtn) {
    if (dKey === getTodayKey()) {
      if (hasRealVoice) {
        DOM.missionCapsuleStatusText.textContent = `✨ 오늘 ${sLabel} 내 목소리 보관됨`;
        DOM.missionCapsuleBtn.innerHTML = `▶️ 듣기`;
        DOM.missionCapsuleBtn.style.background = "#10b981";
      } else {
        DOM.missionCapsuleStatusText.textContent = `오늘의 내 목소리 타임캡슐`;
        DOM.missionCapsuleBtn.innerHTML = `🎙️ 열기`;
        DOM.missionCapsuleBtn.style.background = "var(--primary-accent)";
      }
    }
  }
}

function stopCapsuleAudio() {
  currentTtsOnEndCallback = null;
  if (activeCapsuleAudio) {
    try {
      if (typeof activeCapsuleAudio.stop === 'function') {
        activeCapsuleAudio.stop();
      } else if (typeof activeCapsuleAudio.pause === 'function') {
        activeCapsuleAudio.pause();
        activeCapsuleAudio.currentTime = 0;
      }
    } catch (e) {}
    activeCapsuleAudio = null;
  }
  stopTTS();

  if (DOM.missionCapsuleBtn) {
    DOM.missionCapsuleBtn.classList.remove('is-playing');
    DOM.missionCapsuleBtn.innerHTML = `▶️ 다시듣기`;
  }

  if (DOM.playVoiceCapsuleBtn) {
    DOM.playVoiceCapsuleBtn.classList.remove('is-playing');
    const dKey = state.selectedModalDate || getTodayKey();
    const curSession = state.selectedCapsuleSession || 'morning';
    const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
    const sLabel = sessionNames[curSession] || '아침';
    getSessionVoiceItem(dKey, curSession).then(voiceItem => {
      const hasRealVoice = Boolean(voiceItem);
      DOM.playVoiceCapsuleBtn.innerHTML = hasRealVoice 
        ? `<span class="capsule-btn-icon">▶️</span> <span class="capsule-btn-text"><span>${sLabel} 육성 다시듣기</span></span>`
        : `<span class="capsule-btn-icon">🎧</span> <span class="capsule-btn-text"><span>${sLabel} 확언 AI 낭독듣기</span><span class="capsule-btn-subtext">(내 육성 미보관)</span></span>`;
      if (DOM.capsuleMsg) {
        DOM.capsuleMsg.innerHTML = hasRealVoice
          ? `✨ <strong style="color:var(--primary-accent);">${sLabel} 낭독 육성 보관됨!</strong> 그날 녹음된 생생한 내 목소리를 들어보세요.`
          : `💡 아직 <strong>${sLabel} 낭독 육성</strong>이 없습니다. 3회 완주 후 [5초 직접 녹음]으로 내 목소리를 타임캡슐에 남길 수 있습니다.`;
      }
    });
  }
}

async function playVoiceCapsuleAction() {
  if (!isProUser()) {
    showToast("👑 낭독 음성 타임캡슐은 PRO VIP 전용 기능입니다.");
    openProModal();
    return;
  }

  // 재생 중이면 멈춤
  if (activeCapsuleAudio) {
    stopCapsuleAudio();
    return;
  }

  const dKey = state.selectedModalDate || getTodayKey();
  const curSession = state.selectedCapsuleSession || state.currentSession || 'morning';
  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const sLabel = sessionNames[curSession] || '아침';

  // 캘린더 모달 내 해당 세션의 정식 재생 버튼이 있다면 그 버튼을 통해 일관되게 재생 제어
  const sessCap = curSession === 'morning' ? 'Morning' : (curSession === 'lunch' ? 'Lunch' : 'Evening');
  const modalPlayBtn = document.getElementById(`modalPlayBtn${sessCap}`);
  if (modalPlayBtn) {
    const quoteText = getDaySessionQuote(dKey, curSession);
    handleModalSessionPlay(dKey, curSession, quoteText, modalPlayBtn);
    return;
  }

  let voiceItem = await getSessionVoiceItem(dKey, curSession);

  triggerHaptic('medium');
  playToneWaterDrop();

  if (DOM.playVoiceCapsuleBtn) {
    DOM.playVoiceCapsuleBtn.classList.add('is-playing');
    DOM.playVoiceCapsuleBtn.innerHTML = `<span class="capsule-btn-icon">⏹️</span> <span class="capsule-btn-text"><span>${sLabel} 재생 중...</span><span class="capsule-btn-subtext">(터치 시 멈춤)</span></span>`;
  }
  if (DOM.missionCapsuleBtn) {
    DOM.missionCapsuleBtn.classList.add('is-playing');
    DOM.missionCapsuleBtn.innerHTML = `⏹️ 멈춤`;
  }

  if (voiceItem && voiceItem.blob && voiceItem.blob.size > 200) {
    if (DOM.capsuleMsg) {
      DOM.capsuleMsg.innerHTML = `🔊 <strong style="color:var(--primary-accent);">${sLabel} 육성 재생 중...</strong> 그날의 울림을 느껴보세요.`;
    }

    try {
      activeCapsuleAudio = await playRecordedAudioBlob(
        voiceItem.blob,
        () => {
          stopCapsuleAudio();
        },
        (err) => {
          console.warn("Audio playback error, fallback to TTS:", err);
          stopCapsuleAudio();
          playFallbackTTS();
        }
      );
    } catch (err) {
      console.warn("Audio play exception:", err);
      stopCapsuleAudio();
      playFallbackTTS();
    }
  } else {
    playFallbackTTS();
  }

  function playFallbackTTS() {
    if (DOM.capsuleMsg) {
      DOM.capsuleMsg.innerHTML = `💡 ${sLabel} 저장 육성이 없어 <strong>성우 음성(AI)</strong>으로 재생 중입니다.`;
    }

    const quoteToSpeak = getDaySessionQuote(dKey, curSession);

    activeCapsuleAudio = {
      isTts: true,
      stop: () => { stopTTS(); },
      pause: () => { stopTTS(); },
      currentTime: 0
    };

    speakQuoteWithGender(quoteToSpeak, state.ttsGender || 'female', () => {
      stopCapsuleAudio();
    });
  }
}

// 5초 즉시 직접 녹음 기능 (현재 선택된 세션 슬롯에 저장)
async function startQuickCapsuleRecording() {
  if (!isProUser()) {
    showToast("👑 음성 타임캡슐은 PRO VIP 전용 기능입니다.");
    openProModal();
    return;
  }

  if (quickRecordRecorder && quickRecordRecorder.state === 'recording') {
    stopQuickCapsuleRecording(true);
    return;
  }

  const curSession = state.selectedCapsuleSession || 'morning';
  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const sLabel = sessionNames[curSession] || '아침';
  const dKey = state.selectedModalDate || getTodayKey();

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    quickRecordStream = stream;
    const chunks = [];

    let options = {};
    if (typeof MediaRecorder !== 'undefined') {
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        options = { mimeType: 'audio/webm;codecs=opus' };
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options = { mimeType: 'audio/mp4' };
      }
    }

    const recorder = new MediaRecorder(stream, options);
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = async () => {
      const mimeType = recorder.mimeType || 'audio/webm';
      const blob = new Blob(chunks, { type: mimeType });
      const dKey = state.selectedModalDate || getTodayKey();
      
      // 현재 선택된 세션 슬롯에 저장!
      await saveVoiceToDB(`${dKey}_${curSession}`, blob, { duration: 5, dateKey: dKey, sessionKey: curSession });
      if (curSession === 'morning') {
        await saveVoiceToDB(dKey, blob, { duration: 5, dateKey: dKey, sessionKey: curSession });
      }
      
      const history = getStorage(STORAGE_KEYS.HISTORY, {});
      if (!history[dKey]) history[dKey] = {};
      if (!history[dKey].quotes) history[dKey].quotes = {};
      if (!history[dKey].quotes[curSession]) {
        history[dKey].quotes[curSession] = getDaySessionQuote(dKey, curSession);
      }
      if (!history[dKey].voices) history[dKey].voices = {};
      history[dKey].voices[curSession] = true;
      history[dKey].hasVoice = true;
      setStorage(STORAGE_KEYS.HISTORY, history);

      triggerHaptic('complete');
      playToneWaterDrop();
      showToast(`🎉 [${sLabel}] 타임캡슐에 내 목소리가 저장되었습니다! [${sLabel} 다시듣기]를 눌러보세요! ✨`);
      
      if (DOM.recordQuickCapsuleBtn) {
        DOM.recordQuickCapsuleBtn.classList.remove('is-recording');
        DOM.recordQuickCapsuleBtn.innerHTML = `<span class="capsule-record-icon">🎙️</span> <span class="capsule-record-text">${sLabel} 5초 직접 녹음</span>`;
      }
      updateVoiceCapsuleCard(dKey, curSession);
    };

    recorder.start();
    quickRecordRecorder = recorder;

    let countdown = 10;
    triggerHaptic('click');
    playToneWaterDrop();
    if (DOM.recordQuickCapsuleBtn) {
      DOM.recordQuickCapsuleBtn.classList.add('is-recording');
      DOM.recordQuickCapsuleBtn.innerHTML = `<span class="capsule-record-icon">🔴</span> <span class="capsule-record-text">${sLabel} 녹음 중... (${countdown}초)</span>`;
    }
    showToast(`🎙️ 10초간 마이크에 ${sLabel} 확언을 소리 내어 말씀해주세요! (완료 시 터치)`);

    quickRecordTimer = setInterval(() => {
      countdown--;
      if (DOM.recordQuickCapsuleBtn && countdown > 0) {
        DOM.recordQuickCapsuleBtn.innerHTML = `<span class="capsule-record-icon">🔴</span> <span class="capsule-record-text">${sLabel} 녹음 중... (${countdown}초)</span>`;
      }
      if (countdown <= 0) {
        stopQuickCapsuleRecording(true);
      }
    }, 1000);

  } catch (err) {
    console.warn("quick recording error:", err);
    showToast("⚠️ 마이크 접근 권한이 필요합니다.");
  }
}

function stopQuickCapsuleRecording(save = true) {
  if (quickRecordTimer) {
    clearInterval(quickRecordTimer);
    quickRecordTimer = null;
  }
  if (quickRecordRecorder && quickRecordRecorder.state !== 'inactive') {
    try {
      if (typeof quickRecordRecorder.requestData === 'function') {
        quickRecordRecorder.requestData();
      }
    } catch (e) {}
    try { quickRecordRecorder.stop(); } catch (e) {}
  }
  if (quickRecordStream) {
    const streamToStop = quickRecordStream;
    quickRecordStream = null;
    setTimeout(() => {
      try {
        streamToStop.getTracks().forEach(t => { try { t.stop(); } catch (e) {} });
      } catch (e) {}
    }, 400);
  }
}

let activeModalPlayingBtn = null;

function stopModalSessionAudio() {
  currentTtsOnEndCallback = null;
  if (activeCapsuleAudio) {
    try {
      if (typeof activeCapsuleAudio.stop === 'function') {
        activeCapsuleAudio.stop();
      } else if (typeof activeCapsuleAudio.pause === 'function') {
        activeCapsuleAudio.pause();
        activeCapsuleAudio.currentTime = 0;
      }
    } catch (e) {}
    activeCapsuleAudio = null;
  }
  stopTTS();

  if (activeModalPlayingBtn) {
    activeModalPlayingBtn.classList.remove('is-playing');
    const hasVoice = activeModalPlayingBtn.classList.contains('has-voice');
    activeModalPlayingBtn.innerHTML = hasVoice
      ? '<span class="btn-icon">▶️</span> <span class="btn-label">내 목소리</span>'
      : '<span class="btn-icon">🎧</span> <span class="btn-label">성우 듣기</span>';
    activeModalPlayingBtn = null;
  }
}

async function handleModalSessionPlay(dateKey, sessionKey, quoteText, playBtn) {
  if (!isProUser()) {
    showToast("👑 음성 듣기 & 타임캡슐은 PRO VIP 전용 기능입니다.");
    openProModal();
    return;
  }

  // 이미 이 버튼이 재생 중이면 멈춤
  if (activeModalPlayingBtn === playBtn) {
    stopModalSessionAudio();
    return;
  }

  // 다른 오디오가 돌고 있으면 멈춤
  stopModalSessionAudio();
  stopCapsuleAudio();

  const voiceItem = await getSessionVoiceItem(dateKey, sessionKey);
  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const sLabel = sessionNames[sessionKey] || '';

  triggerHaptic('medium');
  playToneWaterDrop();

  activeModalPlayingBtn = playBtn;
  playBtn.classList.add('is-playing');
  playBtn.innerHTML = '<span class="btn-icon">⏹️</span> <span class="btn-label">멈춤</span>';

  if (voiceItem && voiceItem.blob && voiceItem.blob.size > 200) {
    // 실제 저장된 내 목소리 재생 (DataURL + Web Audio API 2단계 안심 재생)
    try {
      activeCapsuleAudio = await playRecordedAudioBlob(
        voiceItem.blob,
        () => {
          stopModalSessionAudio();
        },
        (err) => {
          console.warn("Recorded voice playback failed, falling back to TTS:", err);
          stopModalSessionAudio();
          fallbackTts();
        }
      );
    } catch (e) {
      console.warn("Exception playing voice blob:", e);
      stopModalSessionAudio();
      fallbackTts();
    }
  } else {
    fallbackTts();
  }

  function fallbackTts() {
    activeCapsuleAudio = {
      isTts: true,
      stop: () => { stopTTS(); },
      pause: () => { stopTTS(); },
      currentTime: 0
    };
    speakQuoteWithGender(quoteText, state.ttsGender || 'female', () => {
      stopModalSessionAudio();
    });
  }
}

async function handleModalSessionRecord(dateKey, sessionKey, recordBtn, playBtn) {
  if (!isProUser()) {
    showToast("👑 직접 목소리 녹음은 PRO VIP 전용 기능입니다.");
    openProModal();
    return;
  }

  stopModalSessionAudio();
  stopCapsuleAudio();
  stopQuickCapsuleRecording(false);

  const sessionNames = { morning: '아침', lunch: '점심', evening: '저녁' };
  const sLabel = sessionNames[sessionKey] || '';

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    quickRecordStream = stream;
    let chunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
    const recorder = new MediaRecorder(stream, { mimeType });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = async () => {
      if (chunks.length === 0) return;
      const blob = new Blob(chunks, { type: mimeType });
      await saveVoiceToDB(`${dateKey}_${sessionKey}`, blob, { duration: 5, dateKey, sessionKey });
      if (sessionKey === 'morning') {
        await saveVoiceToDB(dateKey, blob, { duration: 5, dateKey, sessionKey });
      }

      // history에 반영
      const history = getStorage(STORAGE_KEYS.HISTORY, {});
      if (!history[dateKey]) history[dateKey] = {};
      if (!history[dateKey].quotes) history[dateKey].quotes = {};
      if (!history[dateKey].quotes[sessionKey]) {
        history[dateKey].quotes[sessionKey] = getDaySessionQuote(dateKey, sessionKey);
      }
      if (!history[dateKey].voices) history[dateKey].voices = {};
      history[dateKey].voices[sessionKey] = true;
      history[dateKey].hasVoice = true;
      setStorage(STORAGE_KEYS.HISTORY, history);

      // 메인 홈 화면의 타임캡슐 상태도 즉시 동기화
      if (DOM.missionCapsuleStatusText && DOM.missionCapsuleBtn && dateKey === getTodayKey() && sessionKey === (state.currentSession || 'morning')) {
        DOM.missionCapsuleStatusText.textContent = `✨ 오늘 ${sLabel} 내 목소리 보관됨`;
        DOM.missionCapsuleBtn.innerHTML = `▶️ 듣기`;
        DOM.missionCapsuleBtn.style.background = "#10b981";
      }

      triggerHaptic('complete');
      playToneWaterDrop();
      showToast(`🎉 [${sLabel}] 내 목소리가 저장되었습니다!`);

      if (recordBtn) {
        recordBtn.classList.remove('is-recording');
        recordBtn.innerHTML = '<span class="btn-icon">🎙️</span> <span class="btn-label">재녹음</span>';
      }
      if (playBtn) {
        playBtn.classList.add('has-voice');
        playBtn.innerHTML = '<span class="btn-icon">▶️</span> <span class="btn-label">내 목소리</span>';
      }
    };

    recorder.start();
    quickRecordRecorder = recorder;

    let countdown = 5;
    triggerHaptic('click');
    playToneWaterDrop();
    recordBtn.classList.add('is-recording');
    recordBtn.innerHTML = `<span class="btn-icon">🔴</span> <span class="btn-label">${countdown}s</span>`;
    showToast(`🎙️ 5초간 마이크에 ${sLabel} 확언을 소리 내어 말씀해주세요!`);

    quickRecordTimer = setInterval(() => {
      countdown--;
      if (recordBtn && countdown > 0) {
        recordBtn.innerHTML = `<span class="btn-icon">🔴</span> <span class="btn-label">${countdown}s</span>`;
      }
      if (countdown <= 0) {
        stopQuickCapsuleRecording(true);
      }
    }, 1000);

  } catch (err) {
    console.warn("quick record error:", err);
    showToast("⚠️ 마이크 접근 권한이 필요합니다.");
  }
}

// 날짜별 상세 모달 열기
function openDayDetailModal(dateKey) {
  if (!DOM.dayDetailModal) return;
  state.selectedModalDate = dateKey;

  const todayKey = getTodayKey();
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  const record = history[dateKey] || {};
  const isToday = (dateKey === todayKey);

  const parts = dateKey.split('-');
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);
  const dateObj = new Date(y, m - 1, d);
  const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeekStr = dayOfWeekNames[dateObj.getDay()];

  if (DOM.modalDayDate) {
    DOM.modalDayDate.textContent = `${y}년 ${m}월 ${d}일 (${dayOfWeekStr})`;
  }

  const completedCount = [record.morning, record.lunch, record.evening].filter(Boolean).length;
  const isFuture = (dateKey > todayKey);

  if (DOM.modalDayBadge) {
    if (completedCount === 3) {
      DOM.modalDayBadge.textContent = '🏅 오늘의 3회 달성 완료!';
      DOM.modalDayBadge.className = 'detail-day-badge gold';
    } else if (completedCount > 0) {
      DOM.modalDayBadge.textContent = `💮 ${completedCount}/3회 완료`;
      DOM.modalDayBadge.className = 'detail-day-badge partial';
    } else if (isToday) {
      DOM.modalDayBadge.textContent = '오늘 진행 중';
      DOM.modalDayBadge.className = 'detail-day-badge today';
    } else if (isFuture) {
      DOM.modalDayBadge.textContent = '🌱 다가올 긍정의 날 (내일 만나요)';
      DOM.modalDayBadge.className = 'detail-day-badge future';
    } else {
      DOM.modalDayBadge.textContent = '미완료';
      DOM.modalDayBadge.className = 'detail-day-badge none';
    }
  }

  // 마음 상태
  if (DOM.modalDayMood) {
    if (record.mood && MOOD_DATA[record.mood]) {
      DOM.modalDayMood.textContent = `${MOOD_DATA[record.mood].emoji} ${MOOD_DATA[record.mood].label}`;
    } else {
      DOM.modalDayMood.textContent = '기록 없음';
    }
  }

  // 아침 · 점심 · 저녁 3가지 확언 코스 각각 조회 및 올인원 음성 액션 렌더링
  const sessions = [
    { key: 'morning', cap: 'Morning', quoteEl: DOM.modalMorningQuote, tagEl: DOM.modalMorningDoneTag, cardEl: DOM.modalQuoteCardMorning },
    { key: 'lunch', cap: 'Lunch', quoteEl: DOM.modalLunchQuote, tagEl: DOM.modalLunchDoneTag, cardEl: DOM.modalQuoteCardLunch },
    { key: 'evening', cap: 'Evening', quoteEl: DOM.modalEveningQuote, tagEl: DOM.modalEveningDoneTag, cardEl: DOM.modalQuoteCardEvening }
  ];

  sessions.forEach(sess => {
    const quoteText = getDaySessionQuote(dateKey, sess.key);

    if (sess.quoteEl) {
      sess.quoteEl.textContent = `"${quoteText}"`;
    }

    const isDone = Boolean(record[sess.key]);
    if (sess.tagEl) {
      sess.tagEl.textContent = isDone ? '✓ 완료' : '미완료';
      sess.tagEl.className = `quote-done-status ${isDone ? 'done' : 'undone'}`;
    }

    const playBtn = document.getElementById(`modalPlayBtn${sess.cap}`);
    const recordBtn = document.getElementById(`modalRecordBtn${sess.cap}`);

    // 각 세션별 육성 보관 여부 확인 및 버튼 UI 동기화
    getSessionVoiceItem(dateKey, sess.key).then(vItem => {
      const hasVoice = Boolean(vItem);
      if (playBtn) {
        playBtn.classList.remove('is-playing');
        playBtn.classList.toggle('has-voice', hasVoice);
        playBtn.innerHTML = hasVoice
          ? '<span class="btn-icon">▶️</span> <span class="btn-label">내 목소리</span>'
          : '<span class="btn-icon">🎧</span> <span class="btn-label">성우 듣기</span>';

        playBtn.onclick = (e) => {
          e.stopPropagation();
          handleModalSessionPlay(dateKey, sess.key, quoteText, playBtn);
        };
      }

      if (recordBtn) {
        recordBtn.classList.remove('is-recording');
        recordBtn.innerHTML = hasVoice
          ? '<span class="btn-icon">🎙️</span> <span class="btn-label">재녹음</span>'
          : '<span class="btn-icon">🎙️</span> <span class="btn-label">녹음</span>';

        recordBtn.onclick = (e) => {
          e.stopPropagation();
          if (isFuture) {
            showToast('🌱 아직 오지 않은 날짜입니다. 당일에 읽고 녹음할 수 있어요!');
            return;
          }
          handleModalSessionRecord(dateKey, sess.key, recordBtn, playBtn);
        };
      }
    });
  });

  if (DOM.modalDayQuote && DOM.modalMorningQuote) {
    DOM.modalDayQuote.textContent = DOM.modalMorningQuote.textContent;
  }

  // 오늘인 경우 '오늘 확언 하러가기' 버튼 노출
  if (DOM.modalGoMissionBtn) {
    DOM.modalGoMissionBtn.style.display = isToday ? 'flex' : 'none';
  }

  DOM.dayDetailModal.classList.remove('hidden');
  DOM.dayDetailModal.setAttribute('aria-hidden', 'false');
  triggerHaptic('click');
}

function closeDayDetailModal() {
  stopModalSessionAudio();
  stopCapsuleAudio();
  stopQuickCapsuleRecording(false);
  stopTTS();
  if (DOM.dayDetailModal) {
    DOM.dayDetailModal.classList.add('hidden');
    DOM.dayDetailModal.setAttribute('aria-hidden', 'true');
  }
}

function renderCalendar() {
  const year = state.currentCalendarMonth.getFullYear();
  const month = state.currentCalendarMonth.getMonth();

  DOM.calendarMonthTitle.textContent = `${year}년 ${month + 1}월`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  const todayKey = getTodayKey();

  let html = '';

  // 이전 달 채우기
  for (let i = firstDayIndex; i > 0; i--) {
    const day = prevLastDate - i + 1;
    html += `
      <div class="calendar-day-cell other-month">
        <div class="cell-top-row">
          <span class="cell-day-num">${day}</span>
        </div>
        <div class="cell-bottom-row"></div>
      </div>
    `;
  }

  // 이번 달 일자
  for (let day = 1; day <= lastDate; day++) {
    const dayKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = dayKey === todayKey;
    const record = history[dayKey];
    const dayOfWeek = new Date(year, month, day).getDay();
    const weekendClass = dayOfWeek === 0 ? 'sunday' : (dayOfWeek === 6 ? 'saturday' : '');

    let badge = '';
    if (record) {
      const completedCount = [record.morning, record.lunch, record.evening].filter(Boolean).length;
      if (completedCount === 3) {
        badge = '<span class="day-badge" title="하루 3회 달성! 황금 배지">🏅</span>';
      } else if (completedCount > 0) {
        badge = '<span class="day-badge" title="부분 달성 칭찬 도장">💮</span>';
      }
    }

    let moodTag = '';
    if (record && record.mood && MOOD_DATA[record.mood]) {
      moodTag = `<span class="day-mood-icon" title="마음 상태: ${MOOD_DATA[record.mood].label}">${MOOD_DATA[record.mood].emoji}</span>`;
    }

    html += `
      <div class="calendar-day-cell ${isToday ? 'today' : ''} ${weekendClass} ${record ? 'has-record' : ''}" data-date="${dayKey}">
        <div class="cell-top-row">
          <span class="cell-day-num">${day}</span>
          ${moodTag}
        </div>
        <div class="cell-bottom-row">
          ${badge}
        </div>
      </div>
    `;
  }

  // 다음 달 채우기 (7배수 맞추기)
  const totalCells = firstDayIndex + lastDate;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `
      <div class="calendar-day-cell other-month">
        <div class="cell-top-row">
          <span class="cell-day-num">${i}</span>
        </div>
        <div class="cell-bottom-row"></div>
      </div>
    `;
  }

  DOM.calendarDaysGrid.innerHTML = html;

  // 일자 셀 클릭 시 상세 모달 오픈 이벤트 연결
  DOM.calendarDaysGrid.querySelectorAll('.calendar-day-cell[data-date]').forEach(cell => {
    cell.addEventListener('click', () => {
      const dKey = cell.dataset.date;
      if (dKey) {
        openDayDetailModal(dKey);
      }
    });
  });

  // 상단 통계 위젯 동기화
  updateStatsWidget();
}

// 13. 나만의 확언 관리 & 시간대별 노출 설정
function loadCustomAffirmations() {
  const defaultCustoms = [
    { id: 1, text: "나는 내 능력과 가능성을 믿고 용기 있게 도전한다.", session: "morning" },
    { id: 2, text: "잠시 숨을 고르고, 내 안의 평온과 에너지를 되찾는다.", session: "lunch" },
    { id: 3, text: "충분한 지혜와 용기가 이미 내 안에 가득하다.", session: "evening" }
  ];
  let list = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, defaultCustoms);

  // 초기 실행 시 assigned 객체가 없으면 기본 3개를 각 루틴에 초기 매핑
  let assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, null);
  if (!assigned) {
    assigned = {
      morning: defaultCustoms[0].text,
      lunch: defaultCustoms[1].text,
      evening: defaultCustoms[2].text
    };
    setStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, assigned);
  }

  // 자동 노출 토글 상태 복원
  const autoApply = getStorage(STORAGE_KEYS.CUSTOM_AUTO_APPLY, false);
  if (DOM.customAutoApplyToggle) {
    DOM.customAutoApplyToggle.checked = autoApply;
  }

  // 시간대 선택 칩 기본 활성화 (현재 세션)
  state.newQuoteSession = state.currentSession || getAutoSession();
  if (DOM.newQuoteScheduleChips) {
    DOM.newQuoteScheduleChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.session === state.newQuoteSession);
    });
  }

  updateCustomCharCount();
  renderRoutineSlots();
  renderCustomAffirmations(list);
}

function renderRoutineSlots() {
  if (!DOM.routineSlotsList) return;
  const sessions = [
    { key: 'morning', name: '아침 루틴', time: '06~11시', emoji: '🌅' },
    { key: 'lunch', name: '점심 루틴', time: '11~17시', emoji: '☀️' },
    { key: 'evening', name: '저녁 루틴', time: '17~24시', emoji: '🌙' }
  ];

  DOM.routineSlotsList.innerHTML = sessions.map(sess => {
    const activeQuote = getActiveQuoteForSession(sess.key);
    const isCustom = !!(activeQuote && activeQuote.isCustom);
    const quoteText = activeQuote ? activeQuote.text : "등록된 확언이 없습니다.";
    const statusText = isCustom ? '👑 나만의 확언 적용 중' : '📜 오늘의 365 명언';
    const statusClass = isCustom ? 'custom' : 'daily365';

    return `
      <div class="routine-slot-item ${sess.key}">
        <div class="slot-item-header">
          <span class="slot-badge ${sess.key}">${sess.emoji} ${sess.name} <span style="font-size:10px; font-weight:normal; opacity:0.8;">(${sess.time})</span></span>
          <span class="slot-status-badge ${statusClass}">${statusText}</span>
        </div>
        <div class="slot-quote-text">"${escapeHtml(quoteText)}"</div>
        <div class="slot-actions">
          <button type="button" class="slot-btn primary" onclick="quickEditRoutineSlot('${sess.key}')">✍️ 직접 작성</button>
          ${isCustom ? `<button type="button" class="slot-btn secondary" onclick="resetRoutineSlotTo365('${sess.key}')">🔄 365 명언으로 복원</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleRoutineSlots() {
  if (!DOM.routineSlotsCard || !DOM.routineSlotsToggleBtn) return;
  const isCollapsed = DOM.routineSlotsCard.classList.toggle('is-collapsed');
  DOM.routineSlotsToggleBtn.textContent = isCollapsed ? '펼치기 ▾' : '접기 ▴';
  if (DOM.routineSlotsToggle) {
    DOM.routineSlotsToggle.setAttribute('aria-expanded', !isCollapsed);
  }
  triggerHaptic('click');
}

function updateCustomCharCount() {
  if (!DOM.customInput) return;
  const len = DOM.customInput.value.length;
  if (DOM.customCharCount) {
    DOM.customCharCount.textContent = `${len} / 100자`;
    DOM.customCharCount.classList.toggle('limit-near', len >= 80 && len < 100);
    DOM.customCharCount.classList.toggle('limit-full', len >= 100);
  }
  if (DOM.clearCustomInputBtn) {
    DOM.clearCustomInputBtn.classList.toggle('hidden', len === 0);
  }
}

function renderCustomAffirmations(list) {
  const isPro = isProUser();
  if (DOM.customCountBadge) {
    if (isPro) {
      DOM.customCountBadge.innerHTML = `${list.length}개 <span class="pro-chip small">👑 PRO 무제한</span>`;
    } else {
      DOM.customCountBadge.innerHTML = `${list.length}개 <span class="free-limit-tag" style="font-size:10px; color:var(--text-muted);">(무료 10개 한도)</span>`;
    }
  }

  if (!DOM.customAffirmationsList) return;

  const currentFilter = state.customFilter || 'all';
  const displayList = currentFilter === 'all' 
    ? list 
    : list.filter(item => (item.category || 'self') === currentFilter);

  if (displayList.length === 0) {
    DOM.customAffirmationsList.innerHTML = `<p style="color:var(--text-muted); font-size:13px; text-align:center; padding:18px;">${currentFilter === 'all' ? '등록된 나만의 확언이 없습니다.<br>위에서 나만의 문장을 추가해보세요!' : '선택된 카테고리에 등록된 확언이 없습니다.'}</p>`;
    return;
  }

  const assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, {});

  DOM.customAffirmationsList.innerHTML = displayList.map(item => {
    const isEditing = state.editingCustomId === item.id;
    const safeText = escapeHtml(item.text).replace(/'/g, "\\'");
    const isMorning = (assigned && assigned.morning === item.text);
    const isLunch = (assigned && assigned.lunch === item.text);
    const isEvening = (assigned && assigned.evening === item.text);

    return `
      <div class="custom-item ${isEditing ? 'is-editing' : ''}" data-id="${item.id}">
        <div class="custom-item-main">
          <span class="custom-item-text">
            "${escapeHtml(item.text)}"
          </span>
          <button type="button" class="custom-item-tts-btn" onclick="speakCustomQuote('${safeText}', this)" title="확언 음성 미리듣기" aria-label="음성 미리듣기">
            🔊
          </button>
        </div>
        <div class="custom-item-controls">
          <div class="custom-item-assign-row">
            <span class="assign-label">루틴 지정:</span>
            <button type="button" class="assign-routine-btn morning ${isMorning ? 'is-active' : ''}" onclick="assignQuoteToRoutine('morning', '${safeText}')" title="아침 루틴 확언으로 지정">🌅 아침${isMorning ? ' ✔' : ''}</button>
            <button type="button" class="assign-routine-btn lunch ${isLunch ? 'is-active' : ''}" onclick="assignQuoteToRoutine('lunch', '${safeText}')" title="점심 루틴 확언으로 지정">☀️ 점심${isLunch ? ' ✔' : ''}</button>
            <button type="button" class="assign-routine-btn evening ${isEvening ? 'is-active' : ''}" onclick="assignQuoteToRoutine('evening', '${safeText}')" title="저녁 루틴 확언으로 지정">🌙 저녁${isEvening ? ' ✔' : ''}</button>
          </div>
          <div class="custom-item-actions">
            <button class="custom-action-btn copy" onclick="copyCustomQuote('${safeText}')" title="클립보드 복사">📋 복사</button>
            <button class="custom-action-btn edit" onclick="startEditCustomQuote(${item.id})" title="문장 수정">✏️ 수정</button>
            <button class="custom-action-btn delete" onclick="deleteCustomQuote(${item.id})" title="확언 삭제">🗑️</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 나만의 확언 클립보드 복사
window.copyCustomQuote = function(text) {
  if (!text) return;
  triggerHaptic('click');
  const doFallbackCopy = (val) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = val;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast("확언 문장이 클립보드에 복사되었습니다! 📋");
    } catch (e) {
      showToast("클립보드 복사에 실패했습니다.");
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("확언 문장이 클립보드에 복사되었습니다! 📋");
    }).catch(() => {
      doFallbackCopy(text);
    });
  } else {
    doFallbackCopy(text);
  }
};

// 나만의 확언 수정 모드 시작
window.startEditCustomQuote = function(id) {
  const list = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
  const item = list.find(q => q.id === id);
  if (!item) return;

  state.editingCustomId = id;

  if (DOM.customInput) {
    DOM.customInput.value = item.text;
    updateCustomCharCount();
    DOM.customInput.focus();
  }

  // 시간대 선택 칩 동기화
  const session = item.session || 'all';
  state.newQuoteSession = session;
  if (DOM.newQuoteScheduleChips) {
    DOM.newQuoteScheduleChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.session === session);
    });
  }

  // 상단 카드 UI 수정 모드로 전환
  if (DOM.customCardTitle) DOM.customCardTitle.textContent = "나만의 확언 수정";
  if (DOM.customHeaderIcon) DOM.customHeaderIcon.textContent = "✏️";
  if (DOM.addCustomBtnText) DOM.addCustomBtnText.textContent = "확언 수정 완료";
  if (DOM.addCustomBtnIcon) DOM.addCustomBtnIcon.textContent = "💾";
  if (DOM.cancelEditCustomBtn) DOM.cancelEditCustomBtn.classList.remove('hidden');

  // 리스트 내 아이템 하이라이트
  document.querySelectorAll('.custom-item').forEach(el => {
    el.classList.toggle('is-editing', el.dataset.id == id);
  });

  if (DOM.customCard) {
    DOM.customCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  triggerHaptic('click');
  showToast("✏️ 확언 수정 모드로 전환되었습니다.");
};

// 나만의 확언 수정 모드 취소
window.cancelEditCustomQuote = function() {
  state.editingCustomId = null;

  if (DOM.customInput) {
    DOM.customInput.value = '';
    updateCustomCharCount();
  }

  state.newQuoteSession = state.currentSession || getAutoSession();
  if (DOM.newQuoteScheduleChips) {
    DOM.newQuoteScheduleChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.session === state.newQuoteSession);
    });
  }

  if (DOM.customCardTitle) DOM.customCardTitle.textContent = "나만의 확언 작성";
  if (DOM.customHeaderIcon) DOM.customHeaderIcon.textContent = "✍️";
  if (DOM.addCustomBtnText) DOM.addCustomBtnText.textContent = "확언 등록하기";
  if (DOM.addCustomBtnIcon) DOM.addCustomBtnIcon.textContent = "✨";
  if (DOM.cancelEditCustomBtn) DOM.cancelEditCustomBtn.classList.add('hidden');

  document.querySelectorAll('.custom-item').forEach(el => el.classList.remove('is-editing'));

  triggerHaptic('click');
};

// 보관함 확언 TTS 미리듣기
window.speakCustomQuote = function(text, btnEl) {
  if (!text) return;
  triggerHaptic('click');

  if (state.activeCustomTtsBtn) {
    state.activeCustomTtsBtn.classList.remove('playing');
    if (state.activeCustomTtsBtn === btnEl) {
      state.activeCustomTtsBtn = null;
      if (window.AndroidBridge && typeof window.AndroidBridge.stopTTS === 'function') {
        window.AndroidBridge.stopTTS();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }
  }

  if (btnEl) {
    btnEl.classList.add('playing');
    state.activeCustomTtsBtn = btnEl;
  }

  const onEnd = () => {
    if (btnEl) btnEl.classList.remove('playing');
    if (state.activeCustomTtsBtn === btnEl) state.activeCustomTtsBtn = null;
  };

  // 1순위: 안드로이드 네이티브 브릿지
  if (window.AndroidBridge && typeof window.AndroidBridge.speak === 'function') {
    window.AndroidBridge.speak(text);
    setTimeout(onEnd, Math.max(1800, text.length * 280));
    return;
  }

  // 2순위: Web Speech API
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const koVoice = voices.find(v => v.lang.includes('ko') || v.lang.includes('KO'));
      if (koVoice) utterance.voice = koVoice;
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
      window.speechSynthesis.speak(utterance);
      return;
    } catch (e) {
      console.warn("speechSynthesis error:", e);
    }
  }

  playTtsFallback(text);
  setTimeout(onEnd, Math.max(1800, text.length * 300));
};

// 추천 확언 보관함 원터치 바로 담기
window.quickAddCustomAffirmation = function(quoteText) {
  if (!quoteText) return;
  const session = state.currentSession || 'all';
  const list = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);

  // 무료 플랜 최대 3개 제한 검사 (PRO는 무제한)
  if (!isProUser() && list.length >= 3) {
    showToast("👑 무료 플랜은 최대 3개까지 등록 가능합니다. PRO로 무제한 저장해 보세요!");
    openProModal();
    return;
  }

  // 중복 체크
  const exists = list.some(item => item.text === quoteText);
  if (exists) {
    showToast("이미 보관함에 동일한 확언이 담겨 있습니다. 📂");
    triggerHaptic('click');
    return;
  }

  list.push({
    id: Date.now(),
    text: quoteText,
    session: session
  });
  setStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, list);
  renderCustomAffirmations(list);

  const autoApply = getStorage(STORAGE_KEYS.CUSTOM_AUTO_APPLY, false);
  if (autoApply && (session === state.currentSession || session === 'all')) {
    state.currentQuote = getActiveQuoteForSession(state.currentSession);
    updateQuoteUI();
  }

  triggerHaptic('success');
  showToast(`💡 보관함에 바로 담았습니다!`);
};

function addCustomAffirmation() {
  const text = DOM.customInput ? DOM.customInput.value.trim() : '';
  if (!text || text.length < 2) {
    showToast("확언 문장을 2글자 이상 입력해주세요.");
    return;
  }
  const session = state.newQuoteSession || 'stored';
  let list = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);

  // 중복 문장 등록 방지 (수정 중일 때는 타 항목과 중복 비교)
  const isDuplicate = list.some(item => item.id !== state.editingCustomId && item.text.trim() === text);
  if (isDuplicate) {
    showToast("이미 동일한 확언 문장이 등록되어 있습니다. 📂");
    triggerHaptic('click');
    return;
  }

  // 무료 플랜은 10개 이상 등록 시에만 안내 (신규 작성 차단 방지)
  if (!isProUser() && list.length >= 10 && !state.editingCustomId && session === 'stored') {
    showToast("👑 무료 플랜은 보관함에 최대 10개까지 저장 가능합니다. PRO로 무제한 저장해보세요!");
    openProModal();
    return;
  }

  const sessionLabels = {
    morning: '🌅 아침 루틴',
    lunch: '☀️ 점심 루틴',
    evening: '🌙 저녁 루틴',
    stored: '📂 보관함'
  };

  if (state.editingCustomId) {
    list = list.map(item => {
      if (item.id === state.editingCustomId) {
        return { ...item, text, session };
      }
      return item;
    });
    setStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, list);

    if (session === 'morning' || session === 'lunch' || session === 'evening') {
      let assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, {});
      assigned[session] = text;
      setStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, assigned);
    }
    showToast(`'${text}' 확언 수정이 저장되었습니다!`);
    cancelEditCustomQuote();
  } else {
    list.unshift({
      id: Date.now(),
      text,
      session: session
    });
    setStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, list);

    if (session === 'morning' || session === 'lunch' || session === 'evening') {
      let assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, {});
      assigned[session] = text;
      setStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, assigned);
      showToast(`${sessionLabels[session]} 확언으로 등록 및 지정되었습니다! ✨`);
    } else {
      showToast(`보관함에 확언이 저장되었습니다. 📂`);
    }

    if (DOM.customInput) DOM.customInput.value = '';
    updateCustomCharCount();
  }

  if (session === state.currentSession) {
    state.currentQuote = getActiveQuoteForSession(state.currentSession);
    updateQuoteUI();
  }

  renderRoutineSlots();
  renderCustomAffirmations(list);
  triggerHaptic('success');
}

window.deleteCustomQuote = function(id) {
  if (!window.confirm("정말 이 확언을 삭제하시겠습니까?\n삭제된 문장은 복구할 수 없습니다.")) {
    return;
  }
  if (state.editingCustomId === id) {
    cancelEditCustomQuote();
  }
  let list = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
  const itemToDelete = list.find(item => item.id === id);
  list = list.filter(item => item.id !== id);
  setStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, list);

  if (itemToDelete) {
    let assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, {});
    let changed = false;
    ['morning', 'lunch', 'evening'].forEach(s => {
      if (assigned[s] === itemToDelete.text) {
        assigned[s] = null;
        changed = true;
      }
    });
    if (changed) {
      setStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, assigned);
      state.currentQuote = getActiveQuoteForSession(state.currentSession);
      updateQuoteUI();
    }
  }

  renderRoutineSlots();
  renderCustomAffirmations(list);
  triggerHaptic('click');
  showToast("확언이 삭제되었습니다.");
};

window.assignQuoteToRoutine = function(sessionKey, text) {
  if (!text) return;
  const sessionLabels = { morning: '🌅 아침', lunch: '☀️ 점심', evening: '🌙 저녁' };
  let assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, {});
  assigned[sessionKey] = text;
  setStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, assigned);

  // 보관함에 없는 경우 추가
  let list = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
  if (!list.some(item => item.text === text)) {
    list.unshift({ id: Date.now(), text, session: sessionKey });
    setStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, list);
  }

  if (state.currentSession === sessionKey) {
    state.currentQuote = getActiveQuoteForSession(sessionKey);
    updateQuoteUI();
  }

  renderRoutineSlots();
  renderCustomAffirmations(getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []));
  triggerHaptic('success');
  showToast(`${sessionLabels[sessionKey] || sessionKey} 루틴 확언으로 지정되었습니다! ✨`);
};

window.resetRoutineSlotTo365 = function(sessionKey) {
  const sessionLabels = { morning: '🌅 아침', lunch: '☀️ 점심', evening: '🌙 저녁' };
  let assigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, {});
  assigned[sessionKey] = null;
  setStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, assigned);

  if (state.currentSession === sessionKey) {
    state.currentQuote = getActiveQuoteForSession(sessionKey);
    updateQuoteUI();
  }

  renderRoutineSlots();
  renderCustomAffirmations(getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []));
  triggerHaptic('click');
  showToast(`${sessionLabels[sessionKey] || sessionKey} 루틴이 오늘의 365 명언으로 복원되었습니다. 🔄`);
};

window.quickEditRoutineSlot = function(sessionKey) {
  const sessionLabels = { morning: '🌅 아침 루틴', lunch: '☀️ 점심 루틴', evening: '🌙 저녁 루틴' };
  state.newQuoteSession = sessionKey;
  if (DOM.newQuoteScheduleChips) {
    DOM.newQuoteScheduleChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.session === sessionKey);
    });
  }
  if (DOM.customCard) {
    DOM.customCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (DOM.customInput) {
    DOM.customInput.focus();
  }
  triggerHaptic('click');
  showToast(`${sessionLabels[sessionKey]}에 지정할 확언을 작성해주세요. ✍️`);
};

window.applyCustomQuote = function(text, session = 'all') {
  const sessionLabels = {
    morning: '아침 루틴',
    lunch: '점심 루틴',
    evening: '저녁 루틴',
    all: '나의 다짐',
    manual: '직접 선택'
  };
  state.currentQuote = {
    text: text,
    author: `나만의 긍정 확언 (${sessionLabels[session] || '나의 다짐'})`,
    isCustom: true
  };
  updateQuoteUI();
  state.completedSteps = 0;
  state.isProcessingSuccess = false;
  updateStepsUI();
  closeSuccessModal();
  resetInputs();

  // 첫 번째 탭(미션 화면)으로 이동
  switchTab('tab-mission');
  triggerHaptic('success');
  showToast(`'${text}' 확언이 오늘의 목표로 적용되었습니다!`);
};

// 14. 탭 전환 및 이벤트 리스너
function switchTab(targetId, slideDirection = null) {
  triggerHaptic('click');
  const prevTab = state.activeTab;
  state.activeTab = targetId;
  setStorage(STORAGE_KEYS.ACTIVE_TAB, targetId);

  // 슬라이드 애니메이션 방향 자동 계산 (지정되지 않은 경우 탭 순서 비교)
  const TABS_ORDER = ['tab-mission', 'tab-calendar', 'tab-garden', 'tab-custom'];
  if (!slideDirection && prevTab && prevTab !== targetId) {
    const prevIdx = TABS_ORDER.indexOf(prevTab);
    const targetIdx = TABS_ORDER.indexOf(targetId);
    if (prevIdx !== -1 && targetIdx !== -1) {
      slideDirection = targetIdx > prevIdx ? 'slide-left' : 'slide-right';
    }
  }

  DOM.tabPanels.forEach(panel => {
    const isTarget = panel.id === targetId;
    panel.classList.remove('slide-left', 'slide-right');
    if (isTarget) {
      if (slideDirection) {
        panel.classList.add(slideDirection);
      }
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  DOM.navTabs.forEach(tab => {
    const isTarget = tab.dataset.target === targetId;
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // 탭 전환 시 화면 상단으로 스크롤 이동
  const screenContent = document.querySelector('.screen-content');
  if (screenContent) {
    screenContent.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 탭별 진입 시 최신 상태 렌더링
  if (targetId === 'tab-garden') {
    updateTreeAndSidebar();
    renderGardenGallery();
  } else if (targetId === 'tab-calendar') {
    renderCalendar();
  } else if (targetId === 'tab-custom') {
    loadCustomAffirmations();
  }

  // 탭별 광고 노출 제어 (긍정울림 홈 화면은 광고 미노출)
  updateAdDisplayState();
}

function setupEvents() {
  // 시간대 세션 변경 (스마트 넛지: 미리 실천 및 보충 실천 안내)
  DOM.sessionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const targetSession = chip.dataset.session;
      const isAlreadyActive = chip.classList.contains('active');
      const realSession = getAutoSession();
      const targetOrder = getSessionOrder(targetSession);
      const realOrder = getSessionOrder(realSession);
      const isCompleted = isSessionCompletedToday(targetSession);

      setSession(targetSession, true);

      // 같은 칩을 연달아 누른 게 아닐 때 스마트 넛지 토스트 안내
      if (!isAlreadyActive && !isCompleted) {
        const hour = new Date().getHours();
        if (targetOrder > realOrder || (hour >= 0 && hour < 4 && targetSession === 'morning')) {
          if (targetSession === 'morning') {
            showToast('🌅 고요한 새벽에 일찍 아침 확언을 시작하시는군요! 멋진 하루가 될 거예요 ✨');
          } else if (targetSession === 'lunch') {
            showToast('☀️ 점심 확언을 미리 준비 중이시군요! 오늘 오후에도 활력을 채워보세요 🌿');
          } else if (targetSession === 'evening') {
            showToast('🌙 저녁 확언을 미리 준비 중이시군요! 오늘 밤 하루를 마무리할 때 마음에 한 번 더 새겨보세요 ✨');
          }
        } else if (targetOrder < realOrder) {
          if (targetSession === 'morning') {
            showToast('🌅 아침 확언을 실천 중이시군요! 언제든 긍정 에너지를 채워보세요 🌿');
          } else if (targetSession === 'lunch') {
            showToast('☀️ 점심 확언을 실천 중이시군요! 활력을 채워보세요 🌿');
          }
        }
      }
    });
  });

  // 하단 탭 네비게이션
  DOM.navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.target);
    });
  });

  // 캘린더 바로가기 및 완료 모달 버튼
  if (DOM.moveToCalendarBtn) {
    DOM.moveToCalendarBtn.addEventListener('click', () => {
      closeSuccessModal();
      switchTab('tab-calendar');
    });
  }
  if (DOM.successCapsuleRecordBtn) {
    DOM.successCapsuleRecordBtn.addEventListener('click', async () => {
      // 1. 이미 재생 중인 경우 터치 시 즉시 멈춤
      if (activeSuccessModalAudio) {
        stopSuccessModalAudio();
        return;
      }

      const todayKey = getTodayKey();
      const curSession = state.currentSession || 'morning';

      // 2. 인메모리 캐시에서 방금 녹음된 blob 우선 확인 (지연 및 DB 비동기 락 0%)
      let targetBlob = null;
      if (state.lastRecordedSessionVoice &&
          state.lastRecordedSessionVoice.session === curSession &&
          state.lastRecordedSessionVoice.blob &&
          state.lastRecordedSessionVoice.blob.size > 200) {
        targetBlob = state.lastRecordedSessionVoice.blob;
      }

      // 3. 인메모리에 없으면 IndexedDB에서 안전 조회
      if (!targetBlob) {
        const voiceItem = await getSessionVoiceItem(todayKey, curSession);
        if (voiceItem && voiceItem.blob && voiceItem.blob.size > 200) {
          targetBlob = voiceItem.blob;
        }
      }

      if (targetBlob) {
        try {
          DOM.successCapsuleRecordBtn.innerHTML = `<span>⏹️</span> <span>재생 멈춤</span>`;
          DOM.successCapsuleRecordBtn.style.background = "#ef4444";
          activeSuccessModalAudio = await playRecordedAudioBlob(
            targetBlob,
            () => {
              stopSuccessModalAudio();
            },
            (err) => {
              console.warn("audio playback error:", err);
              stopSuccessModalAudio();
              showToast("오디오를 재생할 수 없습니다. 다시 시도해 주세요.");
            }
          );
        } catch(e) {
          console.warn("audio playback exception:", e);
          stopSuccessModalAudio();
          showToast("오디오를 재생할 수 없습니다.");
        }
      } else {
        // 음성이 아직 없는 경우에만 5초 남기기 모달로 안내
        closeSuccessModal();
        openDayDetailModal(todayKey);

        const sessCap = curSession === 'morning' ? 'Morning' : (curSession === 'lunch' ? 'Lunch' : 'Evening');
        setTimeout(() => {
          const recBtn = document.getElementById(`modalRecordBtn${sessCap}`);
          const playBtn = document.getElementById(`modalPlayBtn${sessCap}`);
          if (recBtn && playBtn) {
            handleModalSessionRecord(todayKey, curSession, recBtn, playBtn);
          }
        }, 350);
      }
    });
  }
  if (DOM.missionCapsuleBtn) {
    DOM.missionCapsuleBtn.addEventListener('click', async () => {
      const todayKey = getTodayKey();
      const curSession = state.currentSession || 'morning';
      let existingVoice = await loadVoiceFromDB(`${todayKey}_${curSession}`);
      if (!existingVoice && curSession === 'morning') {
        existingVoice = await loadVoiceFromDB(todayKey);
      }
      const hasVoice = Boolean(existingVoice && existingVoice.blob && existingVoice.blob.size > 200);

      openDayDetailModal(todayKey);
      if (hasVoice) {
        // 이미 보관된 육성이 있으므로 '다시듣기'를 누르면 즉시 재생!
        setTimeout(() => {
          playVoiceCapsuleAction();
        }, 400);
      }
      // 육성이 아직 없으면 모달만 열리고 강제 녹음하지 않음
    });
  }
  if (DOM.closeSuccessModalBtn) {
    DOM.closeSuccessModalBtn.addEventListener('click', closeSuccessModal);
  }
  if (DOM.dismissSuccessBtn) {
    DOM.dismissSuccessBtn.addEventListener('click', closeSuccessModal);
  }
  if (DOM.successModal) {
    DOM.successModal.addEventListener('click', (e) => {
      if (e.target === DOM.successModal) {
        closeSuccessModal();
      }
    });
  }

  // 선행듣기 TTS 성별 토글 버튼
  if (DOM.ttsGenderBtn) {
    DOM.ttsGenderBtn.addEventListener('click', toggleTtsGender);
  }

  // TTS 재생 버튼
  if (DOM.ttsBtn) {
    DOM.ttsBtn.addEventListener('click', speakQuote);
  }

  // ASMR 메인화면 헤더 아이콘 & 모달 컨트롤 이벤트 바인딩
  if (DOM.asmrBtn) {
    let asmrPressTimer = null;
    let isLongPress = false;

    // 모바일 터치 길게 누르기 감지 -> ASMR 모드 선택 모달 열기
    DOM.asmrBtn.addEventListener('touchstart', (e) => {
      isLongPress = false;
      asmrPressTimer = setTimeout(() => {
        isLongPress = true;
        triggerHaptic('long_press');
        toggleAsmrModal();
      }, 500);
    }, { passive: true });

    DOM.asmrBtn.addEventListener('touchmove', () => {
      if (asmrPressTimer) {
        clearTimeout(asmrPressTimer);
        asmrPressTimer = null;
      }
    }, { passive: true });

    DOM.asmrBtn.addEventListener('touchend', (e) => {
      if (asmrPressTimer) {
        clearTimeout(asmrPressTimer);
        asmrPressTimer = null;
      }
    });

    // 데스크탑 마우스 우클릭 -> ASMR 상세 모달 열기
    DOM.asmrBtn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      toggleAsmrModal();
    });

    // 1번 터치: 선택된 모드의 소리 재생, 또 한번 터치 시 정지
    DOM.asmrBtn.addEventListener('click', (e) => {
      if (isLongPress) {
        isLongPress = false;
        return;
      }
      toggleAsmrPlayback();
    });
  }
  if (DOM.closeAsmrModalBtn) {
    DOM.closeAsmrModalBtn.addEventListener('click', closeAsmrModal);
  }
  if (DOM.asmrModal) {
    DOM.asmrModal.addEventListener('click', (e) => {
      if (e.target === DOM.asmrModal) closeAsmrModal();
    });
  }
  if (DOM.asmrTrackCards) {
    DOM.asmrTrackCards.forEach(card => {
      card.addEventListener('click', () => {
        const snd = card.getAttribute('data-sound');
        const soundNames = { rain: '토닥토닥 빗소리', fire: '따뜻한 장작불', piano: '은은한 명상 음악', waves: '고요한 밤 파도' };
        if (snd !== 'rain' && !isProUser()) {
          showToast(`👑 [${soundNames[snd] || 'ASMR'}] 사운드는 PRO VIP 전용 혜택입니다.`);
          openProModal();
          return;
        }
        startAsmrSound(snd);
        showToast(`🎧 [${soundNames[snd] || 'ASMR'}] 재생 시작`);
      });
    });
  }
  if (DOM.asmrVolumeSlider) {
    DOM.asmrVolumeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) / 100;
      state.asmrVolume = val;
      saveAsmrSettings();
      if (DOM.asmrVolumePercent) DOM.asmrVolumePercent.textContent = `${e.target.value}%`;
      if (state.asmrNodes && state.asmrNodes.gainNode) {
        state.asmrNodes.gainNode.gain.setValueAtTime(val, state.audioCtx.currentTime);
      }
    });
  }
  if (DOM.asmrDuckingToggle) {
    DOM.asmrDuckingToggle.addEventListener('change', (e) => {
      state.asmrDucking = e.target.checked;
      saveAsmrSettings();
    });
  }
  const modalAutoPlay = document.getElementById('asmrModalAutoPlayToggle');
  if (modalAutoPlay) {
    modalAutoPlay.addEventListener('change', (e) => {
      state.asmrAutoPlay = e.target.checked;
      saveAsmrSettings();
      syncOptionsAsmrUI();
      showToast(e.target.checked ? '🎧 앱 시작 시 ASMR 자동 재생이 켜졌습니다.' : '🔇 앱 시작 시 ASMR 자동 재생이 꺼졌습니다.');
    });
  }
  if (DOM.asmrStopBtn) {
    DOM.asmrStopBtn.addEventListener('click', () => {
      stopAsmrSound();
      closeAsmrModal();
      showToast("⏹️ ASMR 사운드가 정지되었습니다.");
    });
  }
  if (DOM.asmrApplyBtn) {
    DOM.asmrApplyBtn.addEventListener('click', () => {
      if (!state.isAsmrPlaying) {
        startAsmrSound(state.asmrSound || 'rain');
      }
      closeAsmrModal();
      const soundNames = { rain: '토닥토닥 빗소리', fire: '따뜻한 장작불', piano: '은은한 명상 음악', waves: '고요한 밤 파도' };
      showToast(`🎧 [${soundNames[state.asmrSound] || 'ASMR'}] 사운드를 재생합니다.`);
    });
  }

  // 새로운 씨앗 심기 모달 이벤트 바인딩
  if (DOM.openSeedSelectBtn) {
    DOM.openSeedSelectBtn.addEventListener('click', openSeedSelectModal);
  }
  if (DOM.openSeedSelectFromGardenBtn) {
    DOM.openSeedSelectFromGardenBtn.addEventListener('click', openSeedSelectModal);
  }
  if (DOM.closeSeedModalBtn) {
    DOM.closeSeedModalBtn.addEventListener('click', closeSeedSelectModal);
  }
  if (DOM.seedSelectModal) {
    DOM.seedSelectModal.addEventListener('click', (e) => {
      if (e.target === DOM.seedSelectModal) closeSeedSelectModal();
    });
  }

  // 나의 정원 도감 모달 이벤트 바인딩
  if (DOM.openGardenGalleryBtn) {
    DOM.openGardenGalleryBtn.addEventListener('click', openGardenGalleryModal);
  }
  if (DOM.closeGardenModalBtn) {
    DOM.closeGardenModalBtn.addEventListener('click', closeGardenGalleryModal);
  }
  if (DOM.dismissGardenModalBtn) {
    DOM.dismissGardenModalBtn.addEventListener('click', closeGardenGalleryModal);
  }
  if (DOM.openPlantFromGardenBtn) {
    DOM.openPlantFromGardenBtn.addEventListener('click', () => {
      closeGardenGalleryModal();
      openSeedSelectModal();
    });
  }
  if (DOM.gardenGalleryModal) {
    DOM.gardenGalleryModal.addEventListener('click', (e) => {
      if (e.target === DOM.gardenGalleryModal) closeGardenGalleryModal();
    });
  }

  // 긍정 정원 서브탭 전환 (🌳 나의 긍정 나무 vs 🏛️ 피워낸 정원 도감)
  const subtabTreeBtn = document.getElementById('subtabTreeBtn');
  const subtabCollectionBtn = document.getElementById('subtabCollectionBtn');
  const gardenSubViewTree = document.getElementById('gardenSubViewTree');
  const gardenSubViewCollection = document.getElementById('gardenSubViewCollection');
  const gardenShortcutToCollection = document.getElementById('gardenShortcutToCollection');
  const openSeedSelectTreeBtn = document.getElementById('openSeedSelectTreeBtn');

  function switchGardenSubtab(tabName) {
    if (subtabTreeBtn && subtabCollectionBtn) {
      subtabTreeBtn.classList.toggle('active', tabName === 'tree');
      subtabCollectionBtn.classList.toggle('active', tabName === 'collection');
    }
    if (gardenSubViewTree && gardenSubViewCollection) {
      gardenSubViewTree.classList.toggle('hidden', tabName !== 'tree');
      gardenSubViewTree.classList.toggle('active', tabName === 'tree');
      gardenSubViewCollection.classList.toggle('hidden', tabName !== 'collection');
      gardenSubViewCollection.classList.toggle('active', tabName === 'collection');
    }
    if (tabName === 'collection') {
      renderGardenGallery();
    }
    triggerHaptic('click');
  }

  if (subtabTreeBtn) {
    subtabTreeBtn.addEventListener('click', () => switchGardenSubtab('tree'));
  }
  if (subtabCollectionBtn) {
    subtabCollectionBtn.addEventListener('click', () => switchGardenSubtab('collection'));
  }
  if (gardenShortcutToCollection) {
    gardenShortcutToCollection.addEventListener('click', () => switchGardenSubtab('collection'));
  }
  if (openSeedSelectTreeBtn) {
    openSeedSelectTreeBtn.addEventListener('click', openSeedSelectModal);
  }

  // 모드 변경 (STT vs 타이핑)
  DOM.modeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.modeTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      state.activeMode = mode;
      DOM.sttModeView.classList.toggle('active', mode === 'stt');
      DOM.typeModeView.classList.toggle('active', mode === 'type');

      // 타이핑 모드 시 상단 여백 축소 및 명언 포커스
      if (DOM.tabMission) {
        DOM.tabMission.classList.toggle('typing-active', mode === 'type');
      }

      updateQuoteUI();

      if (mode !== 'stt' && state.isRecording) {
        stopRecording();
      }
    });
  });

  // 마이크 버튼
  DOM.micBtn.addEventListener('click', () => {
    if (state.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  });

  // 타이핑 입력
  DOM.typingInput.addEventListener('input', handleTypingInput);
  DOM.typingInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTypingSubmit();
    }
  });
  DOM.submitTypingBtn.addEventListener('click', handleTypingSubmit);

  // 5번 개선: 복사-붙여넣기 방지 및 정성껏 직접 입력 넛지 안내
  DOM.typingInput.addEventListener('paste', (e) => {
    e.preventDefault();
    triggerHaptic('warning');
    showToast('✨ 마음에 깊이 새겨지도록 정성껏 한 글자씩 직접 입력해보세요 ✍️');
    if (DOM.typingInputWrapper) {
      DOM.typingInputWrapper.classList.add('shake');
      setTimeout(() => {
        DOM.typingInputWrapper.classList.remove('shake');
      }, 400);
    }
  });

  // 4번 개선: 🎲 다른 확언 추천(새로고침) & ❤️ 즐겨찾기(찜하기) 버튼
  if (DOM.shuffleQuoteBtn) {
    DOM.shuffleQuoteBtn.addEventListener('click', shuffleCurrentQuote);
  }
  if (DOM.favoriteQuoteBtn) {
    DOM.favoriteQuoteBtn.addEventListener('click', toggleFavoriteCurrentQuote);
  }

  // 2번 & 4번 개선: 키보드 포커스 시 하단 네비게이션 숨김 및 화면 중앙 스크롤
  DOM.typingInput.addEventListener('focus', () => {
    document.body.classList.add('keyboard-active');
    setTimeout(() => {
      DOM.typingInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 220);
  });

  DOM.typingInput.addEventListener('blur', () => {
    document.body.classList.remove('keyboard-active');
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      const isKeyboardOpen = window.visualViewport.height < window.innerHeight * 0.75;
      document.body.classList.toggle('keyboard-active', isKeyboardOpen);
      if (isKeyboardOpen && document.activeElement === DOM.typingInput) {
        DOM.typingInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // 감정 버튼 선택 (마음 상태 선택 및 맞춤 확언 매칭)
  DOM.moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mood = btn.dataset.mood;
      applyMood(mood, true, true);
    });
  });

  // 캘린더 이전/다음 달 이동
  DOM.prevMonthBtn.addEventListener('click', () => {
    state.currentCalendarMonth.setMonth(state.currentCalendarMonth.getMonth() - 1);
    renderCalendar();
  });
  DOM.nextMonthBtn.addEventListener('click', () => {
    state.currentCalendarMonth.setMonth(state.currentCalendarMonth.getMonth() + 1);
    renderCalendar();
  });

  // 캘린더 오늘 바로가기 버튼
  if (DOM.todayJumpBtn) {
    DOM.todayJumpBtn.addEventListener('click', () => {
      state.currentCalendarMonth = new Date();
      renderCalendar();
      triggerHaptic('click');
      showToast('오늘 캘린더로 이동했습니다 📅');
    });
  }

  // 나무 쓰다듬기 / 물주기 상호작용
  if (DOM.waterTreeBtn) {
    DOM.waterTreeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      patTree();
    });
  }
  if (DOM.treeVisualBox) {
    DOM.treeVisualBox.addEventListener('click', () => {
      patTree();
    });
  }

  // 날짜별 상세 모달 닫기 및 미션 바로가기
  if (DOM.closeDayDetailModalBtn) {
    DOM.closeDayDetailModalBtn.addEventListener('click', closeDayDetailModal);
  }
  if (DOM.dismissDayDetailBtn) {
    DOM.dismissDayDetailBtn.addEventListener('click', closeDayDetailModal);
  }
  if (DOM.dayDetailModal) {
    DOM.dayDetailModal.addEventListener('click', (e) => {
      if (e.target === DOM.dayDetailModal) {
        closeDayDetailModal();
      }
    });
  }
  if (DOM.modalGoMissionBtn) {
    DOM.modalGoMissionBtn.addEventListener('click', () => {
      closeDayDetailModal();
      switchTab('tab-mission');
    });
  }

  // 3대 루틴 확언 접기/펼치기 토글
  if (DOM.routineSlotsToggle) {
    DOM.routineSlotsToggle.addEventListener('click', toggleRoutineSlots);
  }

  // 테마별 추천 확언 접기/펼치기 토글
  const recommendToggle = document.getElementById('recommendToggle');
  if (recommendToggle) {
    recommendToggle.addEventListener('click', () => {
      const card = document.getElementById('recommendCard');
      const btn = document.getElementById('recommendToggleBtn');
      if (!card) return;
      const isCollapsed = card.classList.toggle('is-collapsed');
      if (btn) btn.textContent = isCollapsed ? '펼치기 ▾' : '접기 ▴';
      triggerHaptic('click');
    });
  }

  // 나만의 확언 추가 / 수정 버튼
  if (DOM.addCustomBtn) DOM.addCustomBtn.addEventListener('click', addCustomAffirmation);
  if (DOM.cancelEditCustomBtn) DOM.cancelEditCustomBtn.addEventListener('click', cancelEditCustomQuote);

  // 나만의 확언 입력창 글자수 세기 & 엔터키 등록 & 지우기
  if (DOM.customInput) {
    DOM.customInput.addEventListener('input', updateCustomCharCount);
    DOM.customInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addCustomAffirmation();
      }
    });
  }

  // 나만의 확언 입력 내용 원터치 지우기 버튼
  if (DOM.clearCustomInputBtn) {
    DOM.clearCustomInputBtn.addEventListener('click', () => {
      if (DOM.customInput) {
        DOM.customInput.value = '';
        DOM.customInput.focus();
        updateCustomCharCount();
        triggerHaptic('click');
      }
    });
  }

  // 나만의 확언 시간대 선택 칩 (언제 띄울까요?)
  if (DOM.newQuoteScheduleChips) {
    DOM.newQuoteScheduleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        DOM.newQuoteScheduleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.newQuoteSession = chip.dataset.session;
        triggerHaptic('click');
      });
    });
  }

  // 나만의 확언 자동 노출 토글
  if (DOM.customAutoApplyToggle) {
    DOM.customAutoApplyToggle.addEventListener('change', (e) => {
      setStorage(STORAGE_KEYS.CUSTOM_AUTO_APPLY, e.target.checked);
      state.currentQuote = getActiveQuoteForSession(state.currentSession);
      updateQuoteUI();
      triggerHaptic('click');
    });
  }

  // 추천 확언 칩 터치 시 입력창에 즉시 입력
  document.querySelectorAll('.recommend-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const quote = chip.getAttribute('data-quote');
      if (quote && DOM.customInput) {
        DOM.customInput.value = quote;
        updateCustomCharCount();
        DOM.customInput.focus();
        triggerHaptic('click');
        showToast('💡 추천 확언이 입력창에 채워졌습니다.');
      }
    });
  });

  // 추천 확언 '+ 담기' 버튼 클릭 시 보관함에 즉시 추가
  document.querySelectorAll('.chip-quick-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const quote = btn.getAttribute('data-quote');
      if (quote) {
        quickAddCustomAffirmation(quote);
      }
    });
  });

  // 옵션 및 알림 모달 열기/닫기 및 설정
  if (DOM.optionsBtn) DOM.optionsBtn.addEventListener('click', () => openOptionsModal('tab-opt-noti'));
  if (DOM.notiBtn) DOM.notiBtn.addEventListener('click', () => openOptionsModal('tab-opt-noti'));
  if (DOM.openTreeGuideBtn) DOM.openTreeGuideBtn.addEventListener('click', () => openOptionsModal('tab-opt-tree'));
  if (DOM.openTreeGuideFromCalBtn) DOM.openTreeGuideFromCalBtn.addEventListener('click', () => openOptionsModal('tab-opt-tree'));
  if (DOM.tutorialGoMissionBtn) {
    DOM.tutorialGoMissionBtn.addEventListener('click', () => {
      closeNotificationModal();
      switchTab('tab-mission');
    });
  }

  // 옵션 모달 내부 탭 전환
  document.querySelectorAll('.opt-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchOptionsTab(btn.dataset.tab);
      triggerHaptic('click');
    });
  });

  if (DOM.closeNotiModalBtn) DOM.closeNotiModalBtn.addEventListener('click', closeNotificationModal);
  if (DOM.notificationModal) {
    DOM.notificationModal.addEventListener('click', (e) => {
      if (e.target === DOM.notificationModal) closeNotificationModal();
    });
  }
  if (DOM.reqPermBtn) DOM.reqPermBtn.addEventListener('click', requestNotificationPermission);
  if (DOM.notiTestBtn) DOM.notiTestBtn.addEventListener('click', testRoutineNotification);
  if (DOM.saveNotiSettingsBtn) DOM.saveNotiSettingsBtn.addEventListener('click', () => {
    applyAndSaveNotiSettings();
    closeNotificationModal();
    showToast('루틴 알림 설정이 완료되었습니다.');
  });

  // 알림 토글 & 시각 변경 시 실시간 자동 저장 및 시각 효과
  const syncToggleStyle = (toggleEl, selector) => {
    const item = DOM.routineNotiList ? DOM.routineNotiList.querySelector(selector) : null;
    if (toggleEl && item) {
      item.classList.toggle('disabled', !toggleEl.checked);
    }
  };

  const autoSaveNoti = () => {
    applyAndSaveNotiSettings();
    showToast('💾 알림 설정이 자동 저장되었습니다.');
  };

  if (DOM.notiMorningToggle) {
    DOM.notiMorningToggle.addEventListener('change', () => {
      syncToggleStyle(DOM.notiMorningToggle, '.routine-noti-item.morning');
      autoSaveNoti();
    });
  }
  if (DOM.notiLunchToggle) {
    DOM.notiLunchToggle.addEventListener('change', () => {
      syncToggleStyle(DOM.notiLunchToggle, '.routine-noti-item.lunch');
      autoSaveNoti();
    });
  }
  if (DOM.notiEveningToggle) {
    DOM.notiEveningToggle.addEventListener('change', () => {
      syncToggleStyle(DOM.notiEveningToggle, '.routine-noti-item.evening');
      autoSaveNoti();
    });
  }
  if (DOM.notiMasterToggle) {
    DOM.notiMasterToggle.addEventListener('change', () => {
      if (DOM.routineNotiList) {
        DOM.routineNotiList.style.opacity = DOM.notiMasterToggle.checked ? '1' : '0.45';
        DOM.routineNotiList.style.pointerEvents = DOM.notiMasterToggle.checked ? 'auto' : 'none';
      }
      autoSaveNoti();
    });
  }
  if (DOM.notiSmartSkipCheck) {
    DOM.notiSmartSkipCheck.addEventListener('change', autoSaveNoti);
  }
  if (DOM.notiTtsVoiceToggle) {
    DOM.notiTtsVoiceToggle.addEventListener('click', (e) => {
      if (!isProUser()) {
        e.preventDefault();
        DOM.notiTtsVoiceToggle.checked = false;
        triggerHaptic('warning');
        openProModal('alarm_tts_voice');
        showToast('👑 확언 음성 리마인더는 PRO 전용 기능입니다.');
        return;
      }
      const isChecked = DOM.notiTtsVoiceToggle.checked;
      setStorage(STORAGE_KEYS.NOTI_TTS_VOICE, isChecked);
      applyAndSaveNotiSettings();
      triggerHaptic('success');
      showToast(isChecked ? '🔊 알림 시 확언 음성 읽기가 켜졌습니다.' : '알림 시 확언 음성 읽기가 꺼졌습니다.');
    });
  }
  if (DOM.notiGenderFemaleBtn) {
    DOM.notiGenderFemaleBtn.addEventListener('click', () => setNotiTtsGender('female'));
  }
  if (DOM.notiGenderMaleBtn) {
    DOM.notiGenderMaleBtn.addEventListener('click', () => setNotiTtsGender('male'));
  }
  if (DOM.notiMorningTime) DOM.notiMorningTime.addEventListener('change', autoSaveNoti);
  if (DOM.notiLunchTime) DOM.notiLunchTime.addEventListener('change', autoSaveNoti);
  if (DOM.notiEveningTime) DOM.notiEveningTime.addEventListener('change', autoSaveNoti);

  // 일반 설정: 소리 및 햅틱 토글 바인딩
  const soundEffectToggle = document.getElementById('soundEffectToggle');
  const hapticFeedbackToggle = document.getElementById('hapticFeedbackToggle');

  if (soundEffectToggle) {
    soundEffectToggle.addEventListener('change', (e) => {
      setStorage('posiecho_sound_enabled', e.target.checked);
      if (e.target.checked) playToneWaterDrop();
      showToast(e.target.checked ? '🔊 효과음이 켜졌습니다.' : '🔇 효과음이 꺼졌습니다.');
    });
  }

  if (hapticFeedbackToggle) {
    hapticFeedbackToggle.addEventListener('change', (e) => {
      setStorage('posiecho_haptic_enabled', e.target.checked);
      if (e.target.checked) triggerHaptic('click');
      showToast(e.target.checked ? '📳 햅틱 진동 피드백이 켜졌습니다.' : '📴 햅틱 진동 피드백이 꺼졌습니다.');
    });
  }

  // 일반 설정: ASMR 사운드 & 앱 시작 시 자동 재생 이벤트 바인딩
  const asmrAutoPlayToggle = document.getElementById('asmrAutoPlayToggle');
  if (asmrAutoPlayToggle) {
    asmrAutoPlayToggle.addEventListener('change', (e) => {
      state.asmrAutoPlay = e.target.checked;
      saveAsmrSettings();
      syncAsmrModalUI();
      syncOptionsAsmrUI();
      showToast(e.target.checked ? '🎧 앱 시작 시 ASMR 자동 재생이 켜졌습니다.' : '🔇 앱 시작 시 ASMR 자동 재생이 꺼졌습니다.');
    });
  }

  const optAsmrChips = document.querySelectorAll('.opt-asmr-chip');
  if (optAsmrChips) {
    optAsmrChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const snd = chip.getAttribute('data-sound');
        const soundNames = { rain: '토닥토닥 빗소리', fire: '따뜻한 장작불', piano: '은은한 명상 음악', waves: '고요한 밤 파도' };
        if (snd !== 'rain' && !isProUser()) {
          showToast(`👑 [${soundNames[snd] || 'ASMR'}] 사운드는 PRO VIP 전용 혜택입니다.`);
          openProModal();
          return;
        }
        state.asmrSound = snd;
        saveAsmrSettings();
        updateAsmrHeaderBtn();
        syncAsmrModalUI();
        syncOptionsAsmrUI();
        triggerHaptic('click');
        if (state.isAsmrPlaying) {
          startAsmrSound(snd);
          showToast(`🎧 [${soundNames[snd] || 'ASMR'}] 사운드로 변경되었습니다.`);
        } else {
          showToast(`🎧 [${soundNames[snd] || 'ASMR'}] 사운드가 선택되었습니다.`);
        }
      });
    });
  }

  const openAsmrDetailBtn = document.getElementById('openAsmrDetailModalBtn');
  if (openAsmrDetailBtn) {
    openAsmrDetailBtn.addEventListener('click', () => {
      closeNotificationModal();
      toggleAsmrModal();
    });
  }

  // 일반 설정: 데이터 백업, 복원, 초기화 바인딩
  const backupDataBtn = document.getElementById('backupDataBtn');
  const restoreDataBtn = document.getElementById('restoreDataBtn');
  const restoreFileInput = document.getElementById('restoreFileInput');
  const resetAllDataBtn = document.getElementById('resetAllDataBtn');

  if (backupDataBtn) {
    backupDataBtn.addEventListener('click', () => {
      exportPosiEchoData();
    });
  }

  if (restoreDataBtn) {
    restoreDataBtn.addEventListener('click', () => {
      openRestoreModal();
    });
  }

  // 복원 모달 닫기
  if (DOM.closeRestoreModalBtn) DOM.closeRestoreModalBtn.addEventListener('click', closeRestoreModal);
  if (DOM.dismissRestoreModalBtn) DOM.dismissRestoreModalBtn.addEventListener('click', closeRestoreModal);
  if (DOM.restoreDataModal) {
    DOM.restoreDataModal.addEventListener('click', (e) => {
      if (e.target === DOM.restoreDataModal) closeRestoreModal();
    });
  }

  // 모달 내 파일 선택 버튼
  if (DOM.selectRestoreFileBtn) {
    DOM.selectRestoreFileBtn.addEventListener('click', () => {
      if (window.AndroidBridge && typeof window.AndroidBridge.importBackup === 'function') {
        window.AndroidBridge.importBackup();
      } else if (restoreFileInput) {
        restoreFileInput.value = '';
        restoreFileInput.click();
      }
    });
  }

  // 파일 input change 리스너
  if (restoreFileInput) {
    restoreFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importPosiEchoData(e.target.files[0]);
      }
      restoreFileInput.value = '';
    });
  }

  // 클립보드 붙여넣기 버튼
  if (DOM.pasteFromClipboardBtn) {
    DOM.pasteFromClipboardBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (DOM.restoreJsonTextarea) {
            DOM.restoreJsonTextarea.value = text;
            showToast('📋 클립보드 텍스트를 붙여넣었습니다.');
          }
        } else {
          showToast('텍스트 영역을 길게 눌러 직접 [붙여넣기]를 해주세요.');
        }
      } catch (err) {
        showToast('텍스트 영역을 길게 눌러 직접 [붙여넣기]를 해주세요.');
      }
    });
  }

  // 텍스트로 즉시 복원 적용 버튼
  if (DOM.applyJsonRestoreBtn) {
    DOM.applyJsonRestoreBtn.addEventListener('click', () => {
      const val = DOM.restoreJsonTextarea ? DOM.restoreJsonTextarea.value : '';
      if (!val || !val.trim()) {
        showToast('⚠️ 붙여넣은 백업 텍스트가 없습니다.');
        return;
      }
      importPosiEchoDataFromJsonString(val);
    });
  }

  if (resetAllDataBtn) {
    resetAllDataBtn.addEventListener('click', resetPosiEchoAllData);
  }

  // 상단 헤더 PRO 버튼 바인딩
  if (DOM.headerProBtn) {
    DOM.headerProBtn.addEventListener('click', () => {
      if (isProUser()) {
        showToast('👑 평생 VIP 혜택이 온전히 적용되어 있습니다 ✨');
      } else {
        openProModal();
      }
    });
  }

  // 모달 내 실시간 데모 전환 버튼
  if (DOM.proModalDemoToggleBtn) DOM.proModalDemoToggleBtn.addEventListener('click', toggleDemoAdMode);

  // 정원 2배 성장 부스터 버튼
  if (DOM.gardenBoosterBtn) {
    DOM.gardenBoosterBtn.addEventListener('click', () => {
      if (!isProUser()) {
        showToast("👑 광고 없는 2배 성장 부스터는 PRO VIP 전용 혜택입니다.");
        openProModal();
        return;
      }
      const plant = getCurrentPlantData();
      if (plant.currentDays >= 15) {
        showToast("🌸 이미 나무가 15일 만개하여 완전히 자랐습니다! 상단의 [새로운 씨앗 심기]를 눌러 새 나무를 키워보세요.");
        openSeedSelectModal();
        return;
      }

      const todayKey = getTodayKey();
      const lastBoosterDate = getStorage(STORAGE_KEYS.BOOSTER_LAST_DATE, '');
      if (lastBoosterDate === todayKey) {
        triggerHaptic('warning');
        showToast("🌱 오늘의 영양제를 이미 투여했습니다! 내일 다시 사랑을 나눠주세요 ✨");
        return;
      }

      // [방안 1] 당일 낭독을 최소 1세트 이상 완료했는지 검증
      const todayHistory = getStorage(STORAGE_KEYS.HISTORY, {})[todayKey] || {};
      const completedSets = (todayHistory.morning ? 1 : 0) + (todayHistory.lunch ? 1 : 0) + (todayHistory.evening ? 1 : 0);
      if (completedSets < 1) {
        triggerHaptic('warning');
        showToast("🔒 1세트 이상 수행 시 영양제를 사용할 수 있어요! 긍정 확언을 먼저 실천해보세요 🌱");
        return;
      }

      triggerHaptic('success');
      const prevDays = plant.currentDays || 0;
      plant.currentDays = Math.min(15, prevDays + 1);
      setStorage(STORAGE_KEYS.CURRENT_PLANT, plant);
      setStorage(STORAGE_KEYS.BOOSTER_LAST_DATE, todayKey);
      if (plant.currentDays >= 15) {
        checkAndSaveGardenTree(plant);
      }

      const pDef = getPlantDefinition(plant.type);

      // 나무 바운스 애니메이션
      if (DOM.treeArt) {
        DOM.treeArt.classList.remove('bounce');
        void DOM.treeArt.offsetWidth;
        DOM.treeArt.classList.add('bounce');
      }

      updateTreeAndSidebar();
      showTreeGrowthEffect(1, plant.currentDays);
      syncWidgetData();
      playToneWaterDrop();

      if (window.confetti) {
        window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }

      showToast(`⚡ [영양제 투여 완료] ${pDef.name}가 쑥쑥 자라납니다! (${plant.currentDays}일 / 15일) 🌳✨`);
    });
  }

  // 낭독 음성 타임캡슐 재생 & 5초 즉시 녹음 리스너
  if (DOM.playVoiceCapsuleBtn) {
    DOM.playVoiceCapsuleBtn.addEventListener('click', playVoiceCapsuleAction);
  }
  if (DOM.recordQuickCapsuleBtn) {
    DOM.recordQuickCapsuleBtn.addEventListener('click', startQuickCapsuleRecording);
  }

  // 카테고리 선택 칩 리스너 (나만의 확언 추가 시)
  const catChips = document.querySelectorAll('#customCategoryChips .cat-chip');
  if (catChips) {
    catChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cat = chip.getAttribute('data-cat') || 'self';
        const catNames = { self: '자존감', wealth: '부자·재정', career: '성공·도전', peace: '평온·치유' };
        if (cat !== 'self' && !isProUser()) {
          showToast(`👑 [${catNames[cat] || cat}] 테마 폴더는 PRO 전용 기능입니다. PRO로 해금해 보세요!`);
          openProModal();
          return;
        }
        state.selectedCategory = cat;
        catChips.forEach(c => c.classList.toggle('active', c === chip));
        triggerHaptic('click');
        showToast(`🏷️ [${catNames[cat] || cat}] 카테고리가 선택되었습니다.`);
      });
    });
  }

  // 카테고리 필터 바 리스너 (보관함 목록 필터)
  const filterBtns = document.querySelectorAll('#customFilterBar .filter-cat-btn');
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        const catNames = { all: '전체', self: '자존감', wealth: '부자·재정', career: '성공·도전', peace: '평온·치유' };
        if (filter !== 'all' && filter !== 'self' && !isProUser()) {
          showToast(`👑 [${catNames[filter] || filter}] 카테고리 필터링은 PRO 전용 기능입니다.`);
          openProModal();
          return;
        }
        state.customFilter = filter;
        filterBtns.forEach(b => b.classList.toggle('active', b === btn));
        triggerHaptic('click');
        const list = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
        renderCustomAffirmations(list);
      });
    });
  }

  // 위젯 스튜디오 테마 선택 및 적용 리스너
  const widgetThemeCards = document.querySelectorAll('#widgetThemeSelector .widget-theme-card');
  if (widgetThemeCards) {
    widgetThemeCards.forEach(card => {
      card.addEventListener('click', () => {
        const theme = card.getAttribute('data-theme') || 'simple';
        if (theme !== 'simple' && !isProUser()) {
          showToast("👑 글래스 & 다크골드 위젯 테마는 PRO 전용 기능입니다.");
          openProModal();
          return;
        }
        widgetThemeCards.forEach(c => c.classList.toggle('active', c === card));
        state.selectedWidgetTheme = theme;
        triggerHaptic('click');
      });
    });
  }

  if (DOM.applyWidgetThemeBtn) {
    DOM.applyWidgetThemeBtn.addEventListener('click', () => {
      const theme = state.selectedWidgetTheme || 'simple';
      if (theme !== 'simple' && !isProUser()) {
        showToast("👑 글래스 & 다크골드 위젯 테마는 PRO 전용 기능입니다.");
        openProModal();
        return;
      }
      setStorage('posiecho_widget_theme', theme);
      triggerHaptic('success');
      syncWidgetData();
    });
  }

  const pinWidgetBtn = document.getElementById('pinWidgetBtn');
  if (pinWidgetBtn) {
    pinWidgetBtn.addEventListener('click', () => {
      triggerHaptic('click');
      if (window.AndroidBridge && typeof window.AndroidBridge.requestPinWidget === 'function') {
        window.AndroidBridge.requestPinWidget();
      } else {
        showToast("📱 홈 화면 빈 곳을 길게 눌러 [위젯] -> '긍정 메아리'를 선택해 주세요!");
      }
    });
  }

  // 광고 제거 및 PRO 멤버십 관련 이벤트
  if (DOM.adRemoveBtnCal) DOM.adRemoveBtnCal.addEventListener('click', openProModal);
  if (DOM.adRemoveBtnSetting) DOM.adRemoveBtnSetting.addEventListener('click', openProModal);
  if (DOM.calendarAdActionBtn) DOM.calendarAdActionBtn.addEventListener('click', openProModal);
  if (DOM.settingsAdActionBtn) DOM.settingsAdActionBtn.addEventListener('click', openProModal);
  if (DOM.adRemoveBtnTree) DOM.adRemoveBtnTree.addEventListener('click', openProModal);
  if (DOM.adRemoveBtnGarden) DOM.adRemoveBtnGarden.addEventListener('click', openProModal);
  if (DOM.treeAdActionBtn) DOM.treeAdActionBtn.addEventListener('click', openProModal);
  if (DOM.gardenAdActionBtn) DOM.gardenAdActionBtn.addEventListener('click', openProModal);
  if (DOM.closeProModalBtn) DOM.closeProModalBtn.addEventListener('click', closeProModal);
  if (DOM.dismissProModalBtn) DOM.dismissProModalBtn.addEventListener('click', closeProModal);
  if (DOM.buyPlanBtn) DOM.buyPlanBtn.addEventListener('click', executePurchaseFlow);
  if (DOM.restorePurchasesBtn) DOM.restorePurchasesBtn.addEventListener('click', restoreUserPurchases);

  // 플랜 선택 카드 클릭 리스너
  document.querySelectorAll('.pro-plan-option').forEach(opt => {
    opt.addEventListener('click', () => selectProPlan(opt));
  });

  if (DOM.proModal) {
    DOM.proModal.addEventListener('click', (e) => {
      if (e.target === DOM.proModal) closeProModal();
    });
  }

  // 좌/우 스와이프 제스처로 탭 전환 리스너 등록
  setupSwipeNavigation();

  // 백그라운드 -> 포그라운드 복귀 및 자정 날짜/시간대 변경 자동 동기화
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkAndSyncDateChange(false, true);
    }
  });
  window.addEventListener('focus', () => {
    checkAndSyncDateChange(false, true);
  });
  setInterval(() => {
    checkAndSyncDateChange(false, false);
  }, 60000);
  window.onPosiEchoResume = function() {
    checkAndSyncDateChange(false, true);
  };
}

// 14-0. 광고 배너 및 PRO 클린 모드 / Google Play 인앱 결제 관리
function isProUser() {
  return getStorage('posiecho_pro_active', false) === true;
}

function isAdsRemoved() {
  return isProUser() || getStorage('posiecho_ads_removed', false) === true;
}

let selectedProPlan = {
  id: 'posiecho_pro_lifetime',
  type: 'inapp',
  price: '16,900원',
  title: '평생 VIP 패스'
};

function updateProUI() {
  const isPro = isProUser();
  const adsRemoved = isAdsRemoved();

  document.body.classList.toggle('ads-removed', adsRemoved);
  document.body.classList.toggle('pro-user-active', isPro);

  // 상단 헤더 PRO 뱃지 갱신
  if (DOM.headerProText) {
    DOM.headerProText.textContent = isPro ? 'VIP' : 'PRO';
  }
  if (DOM.headerProBtn) {
    DOM.headerProBtn.title = isPro ? '👑 PosiEcho PRO VIP 회원 이용 중' : '👑 PosiEcho PRO 멤버십';
  }

  // 정원 부스터 카드 갱신
  updateGardenBoosterUI();

  // 나만의 확언 카운트 갱신
  const customList = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
  if (DOM.customCountBadge) {
    if (isPro) {
      DOM.customCountBadge.innerHTML = `${customList.length}개 <span class="pro-chip small">👑 PRO 무제한</span>`;
    } else {
      DOM.customCountBadge.innerHTML = `${customList.length} / 3개 <span class="free-limit-tag" style="font-size:10px; color:var(--text-muted);">(무료 3개 한도)</span>`;
    }
  }

  if (DOM.proStatusNotice) {
    if (isPro) {
      DOM.proStatusNotice.innerHTML = '👑 <strong>PosiEcho PRO VIP 회원권</strong>을 이용 중입니다. 모든 혜택이 평생 열려있습니다 ✨';
    } else if (adsRemoved) {
      DOM.proStatusNotice.innerHTML = '✨ 광고 없는 클린 모드가 활성화되어 있습니다. PRO 혜택도 함께 누려보세요!';
    } else {
      DOM.proStatusNotice.textContent = '광고 없는 온전한 몰입과 PRO 프리미엄 혜택을 누려보세요.';
    }
  }

  if (DOM.buyBtnText) {
    if (isPro) {
      DOM.buyBtnText.textContent = '👑 이미 모든 PRO 혜택 이용 중';
      if (DOM.buyPlanBtn) DOM.buyPlanBtn.style.opacity = '0.7';
    } else {
      DOM.buyBtnText.textContent = `${selectedProPlan.price}으로 ${selectedProPlan.title} 시작하기`;
      if (DOM.buyPlanBtn) DOM.buyPlanBtn.style.opacity = '1';
    }
  }

  // ASMR 모달 UI 동기화
  syncAsmrModalUI();
}

function selectProPlan(optionEl) {
  if (!optionEl) return;
  document.querySelectorAll('.pro-plan-option').forEach(el => el.classList.remove('selected'));
  optionEl.classList.add('selected');

  selectedProPlan = {
    id: optionEl.dataset.plan || 'posiecho_pro_lifetime',
    type: optionEl.dataset.type || 'inapp',
    price: optionEl.dataset.price || '16,900원',
    title: optionEl.dataset.title || '평생 VIP 패스'
  };

  triggerHaptic('click');
  updateProUI();
}

function executePurchaseFlow() {
  if (isProUser()) {
    showToast('👑 이미 모든 PRO 혜택을 이용 중이십니다!');
    return;
  }

  triggerHaptic('medium');

  // 안드로이드 네이티브 Google Play Billing 호출
  if (window.AndroidBridge && typeof window.AndroidBridge.launchPurchase === 'function') {
    showToast(`Google Play 결제창을 호출합니다...`);
    window.AndroidBridge.launchPurchase(selectedProPlan.id);
  } else {
    showToast('스마트폰 구글 플레이 앱에서 결제를 진행해 주세요.');
  }
}

let isUserInitiatedRestore = false;

function restoreUserPurchases() {
  triggerHaptic('click');
  isUserInitiatedRestore = true;
  if (window.AndroidBridge && typeof window.AndroidBridge.restorePurchases === 'function') {
    showToast('Google Play 구매 내역을 확인하고 있습니다...');
    window.AndroidBridge.restorePurchases();
  } else {
    if (isProUser() || isAdsRemoved()) {
      showToast('👑 평생 VIP 권한이 정상적으로 확인되었습니다 ✨');
    } else {
      showToast('복원할 구매 내역이 없습니다.');
    }
    isUserInitiatedRestore = false;
  }
}

function applyPurchaseSuccess(products) {
  const pStr = String(products || '');
  const isProProduct = pStr.includes('posiecho_pro_lifetime') || 
                       pStr.includes('posiecho_pro_yearly') || 
                       pStr.includes('posiecho_pro_monthly');

  const wasAlreadyPro = isProUser();
  const wasAlreadyAdsRemoved = isAdsRemoved();

  if (isProProduct) {
    setStorage('posiecho_pro_active', true);
    setStorage('posiecho_ads_removed', true);
    // 💡 이미 VIP로 등록되어 있는 경우, 앱 시작 시 백그라운드 확인에는 아무 토스트나 팡파레 없이 조용히 유지
    if (!wasAlreadyPro || isUserInitiatedRestore) {
      if (window.confetti && !wasAlreadyPro) {
        window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
      }
      if (!wasAlreadyPro) playToneFanfare();
      showToast('👑 PosiEcho 평생 VIP 권한이 활성화되었습니다 ✨');
    }
  } else if (pStr.includes('posiecho_remove_ads')) {
    setStorage('posiecho_ads_removed', true);
    if ((!wasAlreadyAdsRemoved && !wasAlreadyPro) || isUserInitiatedRestore) {
      showToast('✨ 모든 광고가 영구 제거되었습니다.');
    }
  } else {
    // 기타 상품도 PRO 활성화 기본 처리
    setStorage('posiecho_pro_active', true);
    setStorage('posiecho_ads_removed', true);
    if (!wasAlreadyPro || isUserInitiatedRestore) {
      showToast('👑 VIP 권한이 정상 활성화되었습니다.');
    }
  }

  isUserInitiatedRestore = false;
  updateProUI();
  updateAdDisplayState();
  closeProModal();
}

// Google Play 결제 네이티브 콜백 전역 바인딩
window.onPurchaseSuccess = function(products) {
  applyPurchaseSuccess(products || '');
};

window.onPurchaseError = function(errorMsg) {
  showToast('결제 오류: ' + (errorMsg || '처리 중 오류가 발생했습니다.'));
};

window.onPurchaseCanceled = function() {
  showToast('결제가 취소되었습니다.');
};

window.onPurchaseNotice = function(sku, notice) {
  showToast(notice || '결제 안내');
};

function updateAdDisplayState() {
  const removed = isAdsRemoved();
  document.body.classList.toggle('ads-removed', removed);
  if (window.AndroidBridge && typeof window.AndroidBridge.setAdVisibility === 'function') {
    // 긍정울림(tab-mission) 홈 화면에서는 온전한 확언 실천 몰입을 위해 광고를 숨기고,
    // 캘린더/긍정 정원/나만의 확언 등 서브 탭 화면에서만 광고를 노출합니다.
    const isHomeTab = (!state.activeTab || state.activeTab === 'tab-mission');
    const shouldShow = !removed && !isHomeTab;
    window.AndroidBridge.setAdVisibility(shouldShow);
  }
  updateProUI();
}

function openProModal() {
  if (!DOM.proModal) return;
  updateProUI();
  updateAdDisplayState();
  DOM.proModal.classList.remove('hidden');
  DOM.proModal.setAttribute('aria-hidden', 'false');
  triggerHaptic('click');
}

function closeProModal() {
  if (!DOM.proModal) return;
  DOM.proModal.classList.add('hidden');
  DOM.proModal.setAttribute('aria-hidden', 'true');
  triggerHaptic('click');
}

// 14-1. 좌/우 스와이프 제스처로 탭 전환 (미션 <-> 캘린더 <-> 긍정 정원 <-> 나만의 확언)
function setupSwipeNavigation() {
  const container = document.querySelector('.screen-content') || document.querySelector('.app-main');
  if (!container) return;

  const TABS_ORDER = ['tab-mission', 'tab-calendar', 'tab-garden', 'tab-custom'];
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isSwipeCancelled = false;

  container.addEventListener('touchstart', (e) => {
    // 1. 모달(축하 모달, 알림 모달, 날짜 상세 모달, 씨앗 선택 모달, PRO 모달 등)이 열려있으면 스와이프 차단
    const anyModalOpen = document.querySelector('.modal-backdrop:not(.hidden)');
    if (anyModalOpen) {
      isSwipeCancelled = true;
      return;
    }

    // 2. 가로 스크롤 요소, 텍스트 입력창, 칩 내부 터치 시 탭 전환 방지
    const target = e.target;
    if (
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('select') ||
      target.closest('.schedule-chips-row') ||
      target.closest('.recommend-chips-grid') ||
      target.closest('.session-chips') ||
      target.closest('.toggle-switch') ||
      target.closest('.mic-button')
    ) {
      isSwipeCancelled = true;
      return;
    }

    if (e.touches.length !== 1) {
      isSwipeCancelled = true;
      return;
    }

    isSwipeCancelled = false;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (isSwipeCancelled) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const dx = currentX - touchStartX;
    const dy = currentY - touchStartY;

    // 수직 스크롤이 지배적이면 스와이프 취소 (자연스러운 상하 페이지 스크롤 보장)
    if (Math.abs(dy) > Math.abs(dx) * 1.35 && Math.abs(dy) > 18) {
      isSwipeCancelled = true;
    }
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (isSwipeCancelled) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const duration = Date.now() - touchStartTime;

    // 가로 이동 거리 45px 이상, 수평 각도 유지, 시간 650ms 이내
    if (Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25 && duration < 650) {
      const currentTab = state.activeTab || 'tab-mission';
      const currentIndex = TABS_ORDER.indexOf(currentTab);
      if (currentIndex === -1) return;

      if (deltaX < 0) {
        // 오른쪽에서 왼쪽으로 스와이프 (다음 탭으로 이동)
        if (currentIndex < TABS_ORDER.length - 1) {
          const nextTab = TABS_ORDER[currentIndex + 1];
          switchTab(nextTab, 'slide-left');
        }
      } else {
        // 왼쪽에서 오른쪽으로 스와이프 (이전 탭으로 이동)
        if (currentIndex > 0) {
          const prevTab = TABS_ORDER[currentIndex - 1];
          switchTab(prevTab, 'slide-right');
        }
      }
    }
  }, { passive: true });
}

// 15. 유틸리티 함수
let lastToastMsg = '';
let lastToastTime = 0;

function showToast(msg) {
  if (!msg) return;
  const now = Date.now();
  // 동일 메시지는 2.5초 이내 재표시 방지, 연속된 다른 메시지도 700ms 이내 과다 스팸 방지
  if (msg === lastToastMsg && (now - lastToastTime < 2500)) return;
  if (now - lastToastTime < 700) return;
  lastToastMsg = msg;
  lastToastTime = now;

  if (window.AndroidBridge && typeof window.AndroidBridge.toast === 'function') {
    window.AndroidBridge.toast(msg);
  } else {
    // 웹 브라우저 환경에서는 alert 대신 간단한 플로팅 메시지 또는 alert
    try {
      const existing = document.getElementById('posiechoToast');
      if (existing) existing.remove();
      const toastEl = document.createElement('div');
      toastEl.id = 'posiechoToast';
      toastEl.textContent = msg;
      toastEl.style.cssText = 'position:fixed; bottom:85px; left:50%; transform:translateX(-50%); background:rgba(15,23,42,0.9); color:white; padding:10px 18px; border-radius:999px; font-size:12.5px; font-weight:700; z-index:99999; box-shadow:0 6px 18px rgba(0,0,0,0.25); text-align:center; max-width:90%; pointer-events:none; transition:opacity 0.3s;';
      document.body.appendChild(toastEl);
      setTimeout(() => {
        toastEl.style.opacity = '0';
        setTimeout(() => toastEl.remove(), 300);
      }, 2500);
    } catch (e) {
      alert(msg);
    }
  }
}

function escapeHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// ==========================================================================
// 16. 하루 3번 루틴 알림(리마인더) 시스템
// ==========================================================================

const DEFAULT_NOTI_SETTINGS = {
  enabled: true,
  smartSkip: true,
  ttsVoice: false,
  sessions: {
    morning: { enabled: true, time: '08:00' },
    lunch: { enabled: true, time: '12:30' },
    evening: { enabled: true, time: '21:00' }
  }
};

const NOTI_SESSION_MESSAGES = {
  morning: {
    title: '☀️ 아침 긍정 확언 시간이에요',
    body: '상쾌한 아침입니다! 활력을 채우는 긍정 확언 3회를 마음에 새겨보세요 🌿'
  },
  lunch: {
    title: '🌤️ 점심 긍정 확언 시간이에요',
    body: '나른한 오후, 지친 마음에 힘을 불어넣는 긍정의 메아리 한마디 어떠세요?'
  },
  evening: {
    title: '🌙 저녁 긍정 확언 시간이에요',
    body: '오늘 하루도 고생 많으셨어요. 평온한 밤을 위한 확언으로 하루를 마무리해요 ✨'
  }
};

function getNotiSettings() {
  const saved = getStorage(STORAGE_KEYS.NOTI_SETTINGS, null);
  const ttsVoiceSaved = getStorage(STORAGE_KEYS.NOTI_TTS_VOICE, false);
  if (!saved) return { ...JSON.parse(JSON.stringify(DEFAULT_NOTI_SETTINGS)), ttsVoice: Boolean(ttsVoiceSaved) };
  return {
    enabled: saved.enabled !== undefined ? saved.enabled : true,
    smartSkip: saved.smartSkip !== undefined ? saved.smartSkip : true,
    ttsVoice: saved.ttsVoice !== undefined ? Boolean(saved.ttsVoice) : Boolean(ttsVoiceSaved),
    sessions: {
      morning: { ...DEFAULT_NOTI_SETTINGS.sessions.morning, ...(saved.sessions?.morning || {}) },
      lunch: { ...DEFAULT_NOTI_SETTINGS.sessions.lunch, ...(saved.sessions?.lunch || {}) },
      evening: { ...DEFAULT_NOTI_SETTINGS.sessions.evening, ...(saved.sessions?.evening || {}) }
    }
  };
}

function hasNativeNotification() {
  return typeof window.AndroidBridge !== 'undefined' && typeof window.AndroidBridge.showNotification === 'function';
}

function syncNativeAlarms(settings) {
  if (window.AndroidBridge) {
    try {
      const todayKey = getTodayKey();
      const history = getStorage(STORAGE_KEYS.HISTORY, {});
      const todayHistory = history[todayKey] || {};
      const morningDone = Boolean(todayHistory.morning === true);
      const lunchDone = Boolean(todayHistory.lunch === true);
      const eveningDone = Boolean(todayHistory.evening === true);
      const smartSkip = settings.smartSkip !== undefined ? Boolean(settings.smartSkip) : true;
      const ttsVoice = Boolean(settings.ttsVoice);
      const ttsGender = state.ttsGender || 'female';

      const morningQuoteObj = getActiveQuoteForSession('morning');
      const lunchQuoteObj = getActiveQuoteForSession('lunch');
      const eveningQuoteObj = getActiveQuoteForSession('evening');

      const morningQuote = (morningQuoteObj && morningQuoteObj.text) ? morningQuoteObj.text : '';
      const lunchQuote = (lunchQuoteObj && lunchQuoteObj.text) ? lunchQuoteObj.text : '';
      const eveningQuote = (eveningQuoteObj && eveningQuoteObj.text) ? eveningQuoteObj.text : '';

      if (typeof window.AndroidBridge.syncAlarmsWithVoice === 'function') {
        window.AndroidBridge.syncAlarmsWithVoice(
          Boolean(settings.enabled),
          smartSkip,
          Boolean(settings.sessions?.morning?.enabled),
          String(settings.sessions?.morning?.time || '08:00'),
          morningQuote,
          morningDone,
          Boolean(settings.sessions?.lunch?.enabled),
          String(settings.sessions?.lunch?.time || '12:30'),
          lunchQuote,
          lunchDone,
          Boolean(settings.sessions?.evening?.enabled),
          String(settings.sessions?.evening?.time || '21:00'),
          eveningQuote,
          eveningDone,
          ttsVoice,
          ttsGender,
          todayKey
        );
      } else if (typeof window.AndroidBridge.syncAlarms === 'function') {
        window.AndroidBridge.syncAlarms(
          Boolean(settings.enabled),
          smartSkip,
          Boolean(settings.sessions?.morning?.enabled),
          String(settings.sessions?.morning?.time || '08:00'),
          morningDone,
          Boolean(settings.sessions?.lunch?.enabled),
          String(settings.sessions?.lunch?.time || '12:30'),
          lunchDone,
          Boolean(settings.sessions?.evening?.enabled),
          String(settings.sessions?.evening?.time || '21:00'),
          eveningDone,
          todayKey
        );
      }
    } catch (e) {
      console.warn('Failed to sync native alarms:', e);
    }
  }
}

function updateNotiPermissionUI() {
  if (hasNativeNotification()) {
    if (!DOM.notiPermissionBanner) return;
    const hasPerm = (window.AndroidBridge && typeof window.AndroidBridge.hasNotificationPermission === 'function')
      ? window.AndroidBridge.hasNotificationPermission()
      : true;

    if (hasPerm) {
      DOM.notiPermissionBanner.className = 'noti-permission-banner granted';
      if (DOM.notiPermIcon) DOM.notiPermIcon.textContent = '✅';
      if (DOM.notiPermMsg) DOM.notiPermMsg.textContent = '스마트폰 앱 알림이 활성화되었습니다. 설정한 시간에 루틴 알림이 배달됩니다.';
      if (DOM.reqPermBtn) DOM.reqPermBtn.style.display = 'none';
    } else {
      DOM.notiPermissionBanner.className = 'noti-permission-banner';
      if (DOM.notiPermIcon) DOM.notiPermIcon.textContent = '📢';
      if (DOM.notiPermMsg) DOM.notiPermMsg.textContent = '루틴 알림을 받으시려면 스마트폰 알림 권한 허용이 필요합니다.';
      if (DOM.reqPermBtn) {
        DOM.reqPermBtn.style.display = 'block';
        DOM.reqPermBtn.textContent = '권한 허용';
      }
    }
    return;
  }

  if (!('Notification' in window)) {
    if (DOM.notiPermissionBanner) {
      DOM.notiPermissionBanner.className = 'noti-permission-banner denied';
      if (DOM.notiPermIcon) DOM.notiPermIcon.textContent = '⚠️';
      if (DOM.notiPermMsg) DOM.notiPermMsg.textContent = '현재 브라우저는 웹 알림을 지원하지 않습니다.';
      if (DOM.reqPermBtn) DOM.reqPermBtn.style.display = 'none';
    }
    return;
  }

  const permission = Notification.permission;
  if (!DOM.notiPermissionBanner) return;

  if (permission === 'granted') {
    DOM.notiPermissionBanner.className = 'noti-permission-banner granted';
    if (DOM.notiPermIcon) DOM.notiPermIcon.textContent = '✅';
    if (DOM.notiPermMsg) DOM.notiPermMsg.textContent = '알림 권한이 허용되었습니다. 지정 시각에 알림이 발송됩니다.';
    if (DOM.reqPermBtn) DOM.reqPermBtn.style.display = 'none';
  } else if (permission === 'denied') {
    DOM.notiPermissionBanner.className = 'noti-permission-banner denied';
    if (DOM.notiPermIcon) DOM.notiPermIcon.textContent = '⚠️';
    if (DOM.notiPermMsg) DOM.notiPermMsg.textContent = '알림이 차단되어 있습니다. 브라우저 주소창 좌측 설정에서 허용해주세요.';
    if (DOM.reqPermBtn) DOM.reqPermBtn.style.display = 'none';
  } else {
    // 'default'
    DOM.notiPermissionBanner.className = 'noti-permission-banner';
    if (DOM.notiPermIcon) DOM.notiPermIcon.textContent = '📢';
    if (DOM.notiPermMsg) DOM.notiPermMsg.textContent = '루틴 알림을 받으시려면 알림 권한 허용이 필요합니다.';
    if (DOM.reqPermBtn) {
      DOM.reqPermBtn.style.display = 'block';
      DOM.reqPermBtn.textContent = '권한 허용';
    }
  }
}

function requestNotificationPermission(onSuccess) {
  if (hasNativeNotification()) {
    if (window.AndroidBridge && typeof window.AndroidBridge.requestNotificationPermission === 'function') {
      window.AndroidBridge.requestNotificationPermission();
    }
    setTimeout(() => {
      updateNotiPermissionUI();
      if (typeof onSuccess === 'function') onSuccess();
    }, 600);
    return;
  }

  if (!('Notification' in window)) {
    alert('현재 환경에서는 알림 기능을 지원하지 않습니다.');
    return;
  }

  Notification.requestPermission().then((permission) => {
    updateNotiPermissionUI();
    if (permission === 'granted' && typeof onSuccess === 'function') {
      onSuccess();
    }
  });
}

function switchOptionsTab(tabId) {
  const btns = document.querySelectorAll('.opt-nav-btn');
  const panels = document.querySelectorAll('.opt-panel');

  btns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  panels.forEach(panel => {
    panel.classList.toggle('active', panel.id === tabId);
  });

  const titleEl = document.getElementById('optionsModalTitle');
  const iconEl = document.getElementById('optionsModalIcon');
  if (titleEl && iconEl) {
    if (tabId === 'tab-opt-noti') {
      iconEl.textContent = '⏰';
      titleEl.textContent = '루틴 알림 설정';
    } else if (tabId === 'tab-opt-general') {
      iconEl.textContent = '⚙️';
      titleEl.textContent = '소리 및 일반 설정';
    } else if (tabId === 'tab-opt-tree') {
      iconEl.textContent = '💡';
      titleEl.textContent = '나무 성장 가이드';
    }
  }
}

function openOptionsModal(targetTab = 'tab-opt-noti') {
  switchOptionsTab(targetTab);

  const settings = getNotiSettings();

  if (DOM.notiMasterToggle) DOM.notiMasterToggle.checked = settings.enabled;
  if (DOM.notiSmartSkipCheck) DOM.notiSmartSkipCheck.checked = settings.smartSkip;
  if (DOM.notiTtsVoiceToggle) DOM.notiTtsVoiceToggle.checked = Boolean(settings.ttsVoice);
  syncNotiGenderUI();

  if (DOM.notiMorningToggle) DOM.notiMorningToggle.checked = settings.sessions.morning.enabled;
  if (DOM.notiMorningTime) DOM.notiMorningTime.value = settings.sessions.morning.time;

  if (DOM.notiLunchToggle) DOM.notiLunchToggle.checked = settings.sessions.lunch.enabled;
  if (DOM.notiLunchTime) DOM.notiLunchTime.value = settings.sessions.lunch.time;

  if (DOM.notiEveningToggle) DOM.notiEveningToggle.checked = settings.sessions.evening.enabled;
  if (DOM.notiEveningTime) DOM.notiEveningTime.value = settings.sessions.evening.time;

  // 비활성화 스타일 동기화
  const syncToggle = (toggleEl, selector) => {
    const item = DOM.routineNotiList ? DOM.routineNotiList.querySelector(selector) : null;
    if (toggleEl && item) item.classList.toggle('disabled', !toggleEl.checked);
  };
  syncToggle(DOM.notiMorningToggle, '.routine-noti-item.morning');
  syncToggle(DOM.notiLunchToggle, '.routine-noti-item.lunch');
  syncToggle(DOM.notiEveningToggle, '.routine-noti-item.evening');

  if (DOM.routineNotiList) {
    DOM.routineNotiList.style.opacity = settings.enabled ? '1' : '0.45';
    DOM.routineNotiList.style.pointerEvents = settings.enabled ? 'auto' : 'none';
  }

  // 일반 설정 토글 상태 동기화
  const soundToggle = document.getElementById('soundEffectToggle');
  const hapticToggle = document.getElementById('hapticFeedbackToggle');
  if (soundToggle) soundToggle.checked = isSoundEnabled();
  if (hapticToggle) hapticToggle.checked = isHapticEnabled();
  syncOptionsAsmrUI();

  updateNotiPermissionUI();

  if (DOM.notificationModal) {
    DOM.notificationModal.classList.remove('hidden');
    DOM.notificationModal.setAttribute('aria-hidden', 'false');
  }
}

function openNotificationModal() {
  openOptionsModal('tab-opt-noti');
}

function closeNotificationModal() {
  if (DOM.notificationModal) {
    DOM.notificationModal.classList.add('hidden');
    DOM.notificationModal.setAttribute('aria-hidden', 'true');
  }
}

function applyAndSaveNotiSettings() {
  const ttsVoice = DOM.notiTtsVoiceToggle ? DOM.notiTtsVoiceToggle.checked : false;
  const settings = {
    enabled: DOM.notiMasterToggle ? DOM.notiMasterToggle.checked : true,
    smartSkip: DOM.notiSmartSkipCheck ? DOM.notiSmartSkipCheck.checked : true,
    ttsVoice: ttsVoice,
    sessions: {
      morning: {
        enabled: DOM.notiMorningToggle ? DOM.notiMorningToggle.checked : true,
        time: DOM.notiMorningTime ? DOM.notiMorningTime.value : '08:00'
      },
      lunch: {
        enabled: DOM.notiLunchToggle ? DOM.notiLunchToggle.checked : true,
        time: DOM.notiLunchTime ? DOM.notiLunchTime.value : '12:30'
      },
      evening: {
        enabled: DOM.notiEveningToggle ? DOM.notiEveningToggle.checked : true,
        time: DOM.notiEveningTime ? DOM.notiEveningTime.value : '21:00'
      }
    }
  };
  setStorage(STORAGE_KEYS.NOTI_SETTINGS, settings);
  setStorage(STORAGE_KEYS.NOTI_TTS_VOICE, ttsVoice);
  syncNativeAlarms(settings);
  return settings;
}

function triggerNotification(title, body, sessionKey = '') {
  if (hasNativeNotification()) {
    try {
      window.AndroidBridge.showNotification(title, body);
      return;
    } catch (e) {
      console.warn('Native notification failed:', e);
    }
  }

  const options = {
    body: body,
    icon: './icon-192.png',
    badge: './icon-badge.png',
    tag: `posiecho-${sessionKey || 'alert'}`,
    vibrate: [200, 100, 200],
    data: {
      session: sessionKey,
      url: window.location.href
    }
  };

  // 서비스 워커 알림 우선 시도
  if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
    navigator.serviceWorker.ready
      .then((reg) => {
        reg.showNotification(title, options);
      })
      .catch(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, options);
        }
      });
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

function testRoutineNotification() {
  const currentQuoteObj = state.currentQuote || getActiveQuoteForSession(state.currentSession || 'morning');
  const quoteText = currentQuoteObj ? currentQuoteObj.text : '나는 매 순간 더 지혜롭고 단단해지고 있다.';
  const isTtsVoiceEnabled = DOM.notiTtsVoiceToggle ? DOM.notiTtsVoiceToggle.checked : Boolean(getStorage(STORAGE_KEYS.NOTI_TTS_VOICE, false));

  const playVoiceIfEnabled = () => {
    if (isTtsVoiceEnabled) {
      setTimeout(() => {
        speakQuote();
      }, 400);
      showToast('🔔 테스트 알림과 함께 확언 음성이 재생됩니다 🌿');
    } else {
      showToast('🔔 테스트 알림이 발송되었습니다.');
    }
  };

  if (hasNativeNotification()) {
    const hasPerm = (window.AndroidBridge && typeof window.AndroidBridge.hasNotificationPermission === 'function')
      ? window.AndroidBridge.hasNotificationPermission()
      : true;

    if (!hasPerm) {
      requestNotificationPermission(() => {
        setTimeout(() => {
          triggerNotification(
            '🔔 긍정 메아리 루틴 알림 테스트',
            quoteText,
            state.currentSession
          );
          playVoiceIfEnabled();
        }, 500);
      });
      return;
    }

    triggerNotification(
      '🔔 긍정 메아리 루틴 알림 테스트',
      quoteText,
      state.currentSession
    );
    playVoiceIfEnabled();
    return;
  }

  if (!('Notification' in window)) {
    alert('현재 브라우저에서는 알림을 지원하지 않습니다.');
    return;
  }

  if (Notification.permission === 'denied') {
    alert('알림이 차단되어 있습니다. 브라우저 주소창 왼쪽의 자물쇠/사이트 설정 아이콘에서 알림을 [허용]으로 변경해주세요.');
    return;
  }

  if (Notification.permission === 'default') {
    requestNotificationPermission(() => {
      setTimeout(() => {
        triggerNotification(
          '🔔 긍정 메아리 루틴 알림 테스트',
          quoteText,
          state.currentSession
        );
        playVoiceIfEnabled();
      }, 500);
    });
    return;
  }

  // 권한이 이미 허용된 경우
  triggerNotification(
    '🔔 긍정 메아리 루틴 알림 테스트',
    quoteText,
    state.currentSession
  );
  playVoiceIfEnabled();
}

function checkRoutineNotificationScheduler() {
  const settings = getNotiSettings();
  if (!settings.enabled) return;

  const isNative = hasNativeNotification();
  if (isNative) {
    // 안드로이드 네이티브 앱 환경에서는 백그라운드 및 포그라운드 모두 AlarmManager와 RoutineAlarmReceiver가
    // 배터리 절전 및 스마트 건너뛰기 로직과 함께 정밀하게 알림을 전담 처리합니다.
    return;
  }

  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const now = new Date();
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHours}:${currentMinutes}`;

  const todayKey = getTodayKey();
  const lastNotified = getStorage(STORAGE_KEYS.LAST_NOTIFIED, {});
  const history = getStorage(STORAGE_KEYS.HISTORY, {});
  const todayHistory = history[todayKey] || { morning: false, lunch: false, evening: false };
  const isAllDone = Boolean(todayHistory.morning && todayHistory.lunch && todayHistory.evening);

  const sessions = ['morning', 'lunch', 'evening'];

  sessions.forEach((sess) => {
    const sessConfig = settings.sessions[sess];
    if (!sessConfig || !sessConfig.enabled) return;

    // 설정된 시간과 현재 분(minute)이 일치하는지 확인
    if (sessConfig.time === currentTimeStr) {
      // 오늘 이미 해당 세션의 알림을 발송했는지 검사
      if (lastNotified[sess] === todayKey) return;

      // 스마트 스킵: 오늘 이미 3회를 모두 마친 세션이거나 오늘 3대 루틴을 모두 완료한 경우 알림 건너뛰기
      if (settings.smartSkip && (todayHistory[sess] === true || isAllDone)) {
        // 이미 완료했으므로 알림을 보내지 않고 오늘 발송 완료로 마킹만 함
        lastNotified[sess] = todayKey;
        setStorage(STORAGE_KEYS.LAST_NOTIFIED, lastNotified);
        return;
      }

      // 알림 발송! (나만의 확언이 지정되어 있으면 알림 본문에 문구 반영)
      const msg = NOTI_SESSION_MESSAGES[sess] || {
        title: '🌱 긍정 확언 루틴 시간',
        body: '소리 내어 3회 긍정 확언을 읽고 마음에 새겨보세요!'
      };

      const activeQ = getActiveQuoteForSession(sess);
      let notiBody = msg.body;
      if (activeQ && activeQ.text) {
        notiBody = `"${activeQ.text}" - 3회 소리 내어 읽고 마음에 새겨보세요! 🌿`;
      }

      triggerNotification(msg.title, notiBody, sess);

      // 오늘 발송 기록
      lastNotified[sess] = todayKey;
      setStorage(STORAGE_KEYS.LAST_NOTIFIED, lastNotified);
    }
  });
}

function initNotificationScheduler() {
  // 15초마다 시간 체크하여 알림 발송 조건 확인
  setInterval(checkRoutineNotificationScheduler, 15000);

  // 전역 노출 (안드로이드 네이티브 브릿지에서 호출 가능)
  window.updateNotiPermissionUI = updateNotiPermissionUI;
  window.setSession = setSession;
  window.switchTab = switchTab;
  window.openOptionsModal = openOptionsModal;
  window.openNotificationModal = openNotificationModal;
  window.closeNotificationModal = closeNotificationModal;
  window.openSuccessModal = openSuccessModal;
  window.closeSuccessModal = closeSuccessModal;
  window.testRoutineNotification = testRoutineNotification;
  window.loadCustomAffirmations = loadCustomAffirmations;
  window.renderRoutineSlots = renderRoutineSlots;
  window.toggleRoutineSlots = toggleRoutineSlots;
  window.getActiveQuoteForSession = getActiveQuoteForSession;
  window.assignQuoteToRoutine = assignQuoteToRoutine;
  window.resetRoutineSlotTo365 = resetRoutineSlotTo365;
  window.quickEditRoutineSlot = quickEditRoutineSlot;

  window.openDayDetailModal = openDayDetailModal;
  window.closeDayDetailModal = closeDayDetailModal;
  window.patTree = patTree;
  window.openProModal = openProModal;
  window.closeProModal = closeProModal;

  // 안드로이드 물리 뒤로가기 버튼 처리 (모달 닫기 -> 메인 탭 복귀 -> 2회 터치 종료)
  window.handleAndroidBackPressed = function() {
    if (DOM.proModal && !DOM.proModal.classList.contains('hidden')) {
      closeProModal();
      return true;
    }
    if (DOM.dayDetailModal && !DOM.dayDetailModal.classList.contains('hidden')) {
      closeDayDetailModal();
      return true;
    }
    if (DOM.successModal && !DOM.successModal.classList.contains('hidden')) {
      closeSuccessModal();
      return true;
    }
    if (DOM.notificationModal && !DOM.notificationModal.classList.contains('hidden')) {
      closeNotificationModal();
      return true;
    }
    if (state.activeTab && state.activeTab !== 'tab-mission') {
      switchTab('tab-mission');
      return true;
    }
    return false;
  };

  // 서비스 워커로부터 알림 클릭 메시지 수신 (알림 클릭 시 해당 루틴 세션으로 전환)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SWITCH_SESSION' && event.data.session) {
        setSession(event.data.session);
        switchTab('tab-mission');
      }
    });
  }
}

function triggerHaptic(type = 'click') {
  if (!isHapticEnabled()) return;
  if (window.AndroidBridge && typeof window.AndroidBridge.haptic === 'function') {
    try {
      window.AndroidBridge.haptic(type);
    } catch (e) {}
  }
}

// 모달 열기/닫기
function openRestoreModal() {
  if (DOM.restoreDataModal) {
    if (DOM.restoreJsonTextarea) DOM.restoreJsonTextarea.value = '';
    DOM.restoreDataModal.classList.remove('hidden');
    DOM.restoreDataModal.setAttribute('aria-hidden', 'false');
  }
}

function closeRestoreModal() {
  if (DOM.restoreDataModal) {
    DOM.restoreDataModal.classList.add('hidden');
    DOM.restoreDataModal.setAttribute('aria-hidden', 'true');
  }
}

// 데이터 내보내기 (백업)
function exportPosiEchoData() {
  try {
    const history = getStorage(STORAGE_KEYS.HISTORY, {});
    const plant = getStorage(STORAGE_KEYS.CURRENT_PLANT, null);
    const gardenTrees = getStorage(STORAGE_KEYS.GARDEN_TREES, []);
    const customs = getStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, []);
    const totalSuccess = getStorage(STORAGE_KEYS.TOTAL_SUCCESS, getCompletedDaysCount());
    const favorites = getStorage(STORAGE_KEYS.FAVORITES, []);
    const customAutoApply = getStorage(STORAGE_KEYS.CUSTOM_AUTO_APPLY, false);
    const routineAssigned = getStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, null);
    const notiSettings = getStorage(STORAGE_KEYS.NOTI_SETTINGS, null);
    const ttsGender = getStorage(STORAGE_KEYS.TTS_GENDER, 'female');
    const asmrSettings = getStorage(STORAGE_KEYS.ASMR_SETTINGS, null);
    const widgetTheme = getStorage('posiecho_widget_theme', 'simple');
    const soundEnabled = isSoundEnabled();
    const hapticEnabled = isHapticEnabled();
    const proActive = isProUser();
    const adsRemoved = isAdsRemoved();

    const backupPayload = {
      appName: 'PosiEcho',
      schemaVersion: '2.1',
      exportDate: new Date().toISOString(),
      // 이전 버전(2.1 이하) 백업 포맷과의 100% 하위 호환 루트 필드
      plant: plant,
      gardenTrees: gardenTrees,
      customs: customs,
      history: history,
      streak: totalSuccess,
      soundEnabled: soundEnabled,
      hapticEnabled: hapticEnabled,
      // 전체 복원용 최신 데이터
      data: {
        history,
        totalSuccess,
        plant,
        gardenTrees,
        customs,
        customAutoApply,
        routineAssigned,
        favorites,
        notiSettings,
        ttsGender,
        asmrSettings,
        widgetTheme,
        soundEnabled,
        hapticEnabled,
        proActive,
        adsRemoved
      }
    };

    let jsonStr;
    try {
      jsonStr = JSON.stringify(backupPayload, null, 2);
    } catch (e) {
      showToast('⚠️ 백업 데이터 생성 실패: JSON 변환 오류');
      return;
    }

    const fileName = `PosiEcho_Backup_${getTodayKey()}.json`;

    // 1. Android 네이티브 브릿지 환경 지원: 시스템 저장/공유 연동
    if (window.AndroidBridge && typeof window.AndroidBridge.exportBackup === 'function') {
      try {
        window.AndroidBridge.exportBackup(jsonStr, fileName);
        return;
      } catch (e) {
        console.warn('AndroidBridge exportBackup failed, fallback to web download:', e);
      }
    }

    // 2. 일반 웹 브라우저 Blob 다운로드
    try {
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (e) {}
      }, 300);
      showToast('💾 백업 파일 다운로드가 시작되었습니다!');
    } catch (err) {
      showToast('⚠️ 백업 파일 다운로드 생성 중 오류가 발생했습니다.');
    }
  } catch (globalErr) {
    console.error('exportPosiEchoData error:', globalErr);
    showToast('⚠️ 백업 진행 중 예기치 않은 오류가 발생했습니다.');
  }
}

// JSON 문자열로부터 데이터 복원 처리 (웹/네이티브 공통)
function importPosiEchoDataFromJsonString(jsonStr) {
  try {
    if (!jsonStr || typeof jsonStr !== 'string' || !jsonStr.trim()) {
      showToast('⚠️ 백업 데이터가 비어 있습니다.');
      return false;
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonStr.trim());
    } catch (e) {
      showToast('⚠️ 올바른 JSON 형식의 파일이 아닙니다.');
      return false;
    }

    // 객체 유효성 검사 (배열, null, 숫자 등 차단)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      showToast('⚠️ 백업 파일의 루트 데이터 형식이 올바르지 않습니다.');
      return false;
    }

    // PosiEcho 백업 포맷 검증 (신버전/구버전/부분백업 호환)
    const hasPosiEchoMarkers = (
      parsed.appName === 'PosiEcho' ||
      Boolean(parsed.plant) ||
      Boolean(parsed.history) ||
      Boolean(parsed.customs) ||
      Boolean(parsed.gardenTrees) ||
      Boolean(parsed.data && typeof parsed.data === 'object' && (parsed.data.history || parsed.data.plant || parsed.data.customs))
    );

    if (!hasPosiEchoMarkers) {
      showToast('⚠️ PosiEcho의 백업 데이터가 아닙니다. 파일을 확인해주세요.');
      return false;
    }

    // 복원 전 안전 확인
    const confirmed = window.confirm(
      '📥 백업 데이터를 복원하시겠습니까?\n\n현재 기기의 기록이 백업 파일의 내용으로 안전하게 갱신됩니다.'
    );
    if (!confirmed) {
      showToast('데이터 복원이 취소되었습니다.');
      return false;
    }

    const d = (parsed.data && typeof parsed.data === 'object' && !Array.isArray(parsed.data)) ? parsed.data : {};

    // 1. 실천 기록 복원 (반드시 객체 타입)
    const rawHistory = d.history || parsed.history;
    if (rawHistory && typeof rawHistory === 'object' && !Array.isArray(rawHistory)) {
      setStorage(STORAGE_KEYS.HISTORY, rawHistory);
    }

    // 2. 누적 실천일수 복원 (기록 기반 재계산 연동)
    const calcDays = getCompletedDaysCount();
    let totalDays = d.totalSuccess !== undefined ? d.totalSuccess : (parsed.streak !== undefined ? parsed.streak : calcDays);
    totalDays = Number.isFinite(Number(totalDays)) ? Math.max(0, parseInt(totalDays, 10)) : calcDays;
    setStorage(STORAGE_KEYS.TOTAL_SUCCESS, totalDays);

    // 3. 현재 식물(나무) 복원 (필드별 유효성 보정)
    const rawPlant = d.plant || parsed.plant;
    if (rawPlant && typeof rawPlant === 'object' && !Array.isArray(rawPlant)) {
      const validPlant = {
        type: typeof rawPlant.type === 'string' && rawPlant.type ? rawPlant.type : 'sunflower',
        stage: Number.isFinite(Number(rawPlant.stage)) ? Math.max(0, parseInt(rawPlant.stage, 10)) : 0,
        growthPoints: Number.isFinite(Number(rawPlant.growthPoints)) ? Math.max(0, parseInt(rawPlant.growthPoints, 10)) : 0,
        cycle: Number.isFinite(Number(rawPlant.cycle)) ? Math.max(1, parseInt(rawPlant.cycle, 10)) : 1,
        currentDays: Number.isFinite(Number(rawPlant.currentDays)) ? Math.max(0, parseInt(rawPlant.currentDays, 10)) : 0,
        plantedDate: typeof rawPlant.plantedDate === 'string' && rawPlant.plantedDate ? rawPlant.plantedDate : getTodayKey(),
        lastWateredDate: typeof rawPlant.lastWateredDate === 'string' ? rawPlant.lastWateredDate : ''
      };
      setStorage(STORAGE_KEYS.CURRENT_PLANT, validPlant);
    }

    // 4. 정원 완성 나무 보관함 복원 (배열)
    const rawGardenTrees = d.gardenTrees || parsed.gardenTrees;
    if (Array.isArray(rawGardenTrees)) {
      setStorage(STORAGE_KEYS.GARDEN_TREES, rawGardenTrees);
    }

    // 5. 나만의 확언 복원 (배열)
    const rawCustoms = d.customs || parsed.customs;
    if (Array.isArray(rawCustoms)) {
      setStorage(STORAGE_KEYS.CUSTOM_AFFIRMATIONS, rawCustoms);
    }

    // 6. 즐겨찾기 복원 (배열)
    const rawFavorites = d.favorites || parsed.favorites;
    if (Array.isArray(rawFavorites)) {
      setStorage(STORAGE_KEYS.FAVORITES, rawFavorites);
    }

    // 7. 루틴 배정 및 자동 적용 복원
    if (typeof d.customAutoApply === 'boolean') {
      setStorage(STORAGE_KEYS.CUSTOM_AUTO_APPLY, d.customAutoApply);
    }
    if (d.routineAssigned && typeof d.routineAssigned === 'object' && !Array.isArray(d.routineAssigned)) {
      setStorage(STORAGE_KEYS.ROUTINE_ASSIGNED_QUOTES, d.routineAssigned);
    }

    // 8. 알림 설정 복원 & 네이티브 알림 스케줄 동기화
    const rawNoti = d.notiSettings || parsed.notiSettings;
    if (rawNoti && typeof rawNoti === 'object' && !Array.isArray(rawNoti)) {
      setStorage(STORAGE_KEYS.NOTI_SETTINGS, rawNoti);
      try {
        syncNativeAlarms(rawNoti);
      } catch (e) {
        console.warn('syncNativeAlarms error during restore:', e);
      }
    }

    // 9. 사운드 / 햅틱 / TTS 성별 / ASMR / 위젯 테마 복원
    const soundEnabled = d.soundEnabled !== undefined ? d.soundEnabled : parsed.soundEnabled;
    if (typeof soundEnabled === 'boolean') setStorage('posiecho_sound_enabled', soundEnabled);

    const hapticEnabled = d.hapticEnabled !== undefined ? d.hapticEnabled : parsed.hapticEnabled;
    if (typeof hapticEnabled === 'boolean') setStorage('posiecho_haptic_enabled', hapticEnabled);

    if (typeof d.ttsGender === 'string') setStorage(STORAGE_KEYS.TTS_GENDER, d.ttsGender);
    if (d.asmrSettings && typeof d.asmrSettings === 'object' && !Array.isArray(d.asmrSettings)) {
      setStorage(STORAGE_KEYS.ASMR_SETTINGS, d.asmrSettings);
    }
    if (typeof d.widgetTheme === 'string') setStorage('posiecho_widget_theme', d.widgetTheme);

    // 10. PRO VIP 권한 및 광고 제거 복원
    if (d.proActive === true || parsed.proActive === true) {
      setStorage('posiecho_pro_active', true);
      setStorage('posiecho_ads_removed', true);
    }
    if (d.adsRemoved === true || parsed.adsRemoved === true) {
      setStorage('posiecho_ads_removed', true);
    }

    // 11. 네이티브 위젯 동기화
    if (window.AndroidBridge && typeof window.AndroidBridge.updateWidget === 'function') {
      try {
        const curQuote = state.currentQuote || DEFAULT_QUOTES.morning[0];
        window.AndroidBridge.updateWidget(
          curQuote.text,
          curQuote.author,
          state.currentSession,
          d.widgetTheme || 'simple'
        );
      } catch (e) {
        console.warn('AndroidBridge.updateWidget error during restore:', e);
      }
    }

    showToast('🎉 데이터 복원이 성공적으로 완료되었습니다! 화면을 갱신합니다.');
    closeRestoreModal();
    setTimeout(() => {
      try {
        window.location.reload();
      } catch (e) {
        window.location.href = window.location.href;
      }
    }, 900);
    return true;
  } catch (err) {
    console.error('importPosiEchoDataFromJsonString error:', err);
    showToast('⚠️ 데이터 복원 처리 중 오류가 발생했습니다.');
    return false;
  }
}

// 파일 객체로부터 복원 처리
function importPosiEchoData(file) {
  if (!file) return;

  // 파일 용량 제한 (최대 20MB 방어)
  if (file.size > 20 * 1024 * 1024) {
    showToast('⚠️ 백업 파일 크기가 너무 큽니다. (최대 20MB)');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      importPosiEchoDataFromJsonString(e.target.result);
    } catch (err) {
      showToast('⚠️ 백업 파일 해석 중 오류가 발생했습니다.');
    }
  };
  reader.onerror = () => {
    showToast('⚠️ 파일을 열 수 없습니다. 권한 설정을 확인해주세요.');
  };
  reader.onabort = () => {
    showToast('파일 읽기 작업이 중단되었습니다.');
  };

  try {
    reader.readAsText(file, 'utf-8');
  } catch (e) {
    showToast('⚠️ 파일을 읽는 도중 오류가 발생했습니다.');
  }
}

// 안드로이드 네이티브 브릿지에서 전달하는 Base64 백업 데이터 수신
window.onNativeBackupBase64Loaded = function(base64Str) {
  try {
    if (!base64Str || typeof base64Str !== 'string') {
      showToast('⚠️ 전달된 백업 데이터가 없습니다.');
      return;
    }
    const binaryStr = atob(base64Str);
    let decodedJson;
    if (typeof TextDecoder !== 'undefined') {
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      decodedJson = new TextDecoder('utf-8').decode(bytes);
    } else {
      decodedJson = decodeURIComponent(escape(binaryStr));
    }
    importPosiEchoDataFromJsonString(decodedJson);
  } catch (e) {
    console.error('onNativeBackupBase64Loaded error:', e);
    showToast('⚠️ 네이티브 백업 파일 해석 중 오류가 발생했습니다.');
  }
};

// 전체 데이터 초기화
function resetPosiEchoAllData() {
  const confirmed = window.confirm(
    '⚠️ 정말로 모든 실천 기록과 정원 데이터를 초기화하시겠습니까?\n\n기존의 모든 긍정나무와 확언 보관함이 삭제되며 되돌릴 수 없습니다.\n필요하다면 먼저 [데이터 백업]을 진행해주세요.'
  );
  if (confirmed) {
    const doubleConfirm = window.confirm('🚨 마지막 확인입니다. 모든 기록을 초기화하고 처음 상태로 되돌립니다.');
    if (doubleConfirm) {
      localStorage.clear();
      showToast('🔄 모든 데이터가 초기화되었습니다.');
      setTimeout(() => window.location.reload(), 600);
    }
  }
}

// 페이지 로드 시 앱 시작
document.addEventListener('DOMContentLoaded', init);
