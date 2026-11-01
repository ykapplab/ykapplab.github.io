# 소담달력 (Sodam Calendar) 공식 랜딩페이지

한국의 결을 담은 정통 음력 달력 & 감성 위젯 앱 **'소담달력'**의 공식 웹사이트입니다.  
GitHub Pages를 통해 무료로 전 세계에 배포 및 호스팅할 수 있도록 제작되었습니다.

---

## 🌟 주요 기능 및 특징
- **100년 전통 음력 & 24절기**: 윤달 및 매일의 일진(육십간지) 지원
- **손 없는 날 & 길일 안내**: 이사, 개업, 계약 등 중요한 행사 택일
- **부모님 음력 생신 & 기일 자동 계산**: 매년 반복 및 소월(29일) 배려
- **실시간 달 위상 (Moon Phase)**: 초승달~보름달~그믐달 시각화
- **3종 홈 화면 위젯**: 2x2 오늘·음력 위젯, 4x2 콤팩트 주간 달력, 4x3 월간 달력
- **효도 큰 글씨**: 보통 / 크게 / 아주 크게(효도 폰트)
- **책상 위 탁상달력**: 가로 모드 2-Pane & 화면 켜짐 유지(Keep Screen On)
- **100% 로컬 저장**: 서버 없는 온디바이스 개인정보 안심 보장

---

## 📁 디렉토리 구조
```text
docs/
├── index.html            # 공식 메인 랜딩페이지
├── privacy.html          # 구글 플레이 등록용 정갈한 개인정보처리방침
├── styles.css            # 모던 & 전통 미학 반응형 스타일시트
├── script.js             # 인터랙티브 탭, 캐러셀, FAQ 아코디언 동작 스크립트
├── .nojekyll             # GitHub Pages Jekyll 우회 설정 파일
└── images/               # 최적화된 앱 아이콘, 피처 그래픽, 스크린샷 에셋
```

---

## 🚀 GitHub Pages 오픈 (배포) 방법

### 방법 1. 현재 저장소에서 `/docs` 폴더로 바로 오픈하기 (추천)
1. GitHub(https://github.com)에서 새로운 Repository를 생성합니다. (예: `sodam-calendar` 또는 `realcal`)
2. 터미널(Git Bash 또는 PowerShell)에서 아래 명령어를 순서대로 실행합니다:
   ```bash
   git init
   git add .
   git commit -m "feat: 소담달력 앱 및 랜딩페이지(docs/) 최초 커밋"
   git branch -M main
   git remote add origin https://github.com/<본인-깃허브-아이디>/<저장소-이름>.git
   git push -u origin main
   ```
3. GitHub 저장소 페이지의 상단 메뉴에서 **Settings** 탭을 클릭합니다.
4. 좌측 사이드바에서 **Pages**를 클릭합니다.
5. **Build and deployment** 항목에서 다음과 같이 설정합니다:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` 선택
   - **Folder**: `/docs` 선택 (기본값 `/ (root)` 대신 `/docs` 선택!)
6. **Save** 버튼을 누릅니다.
7. 약 1~2분 후 페이지 상단에 오픈된 웹사이트 링크가 생성됩니다!
   👉 `https://<본인-깃허브-아이디>.github.io/<저장소-이름>/`

---

### 방법 2. 랜딩페이지만 별도의 저장소(Public)로 오픈하기
만약 안드로이드 앱 코드는 Private로 두고, 웹 랜딩페이지만 별도로 오픈하고 싶다면:
1. GitHub에서 `sodam-calendar-web` (또는 `<본인-깃허브-아이디>.github.io`) 저장소를 새로 만듭니다.
2. `docs` 폴더 안의 파일들(`index.html`, `styles.css`, `script.js`, `privacy.html`, `images/`)만 새 저장소의 루트에 푸시하시면 됩니다.
