# CLAUDE.md — KyungJun Lee UX Portfolio (uookie.net)

> 이 파일은 Claude Code가 프로젝트를 시작할 때 자동으로 읽는 프로젝트 브리프입니다.
> 저장소 루트에 `CLAUDE.md`라는 이름으로 두세요. 모든 콘텐츠와 사실 정보는 아래 "콘텐츠 소스"를 유일한 기준으로 삼습니다.

---

## 0. 사용 방법 (사람용)

1. 새 폴더를 만들고 이 파일을 `CLAUDE.md`로 저장합니다.
2. 폴더에서 Claude Code를 실행하고 이렇게 시작합니다.
   - `CLAUDE.md를 읽고 Phase 1부터 진행해줘. 각 Phase가 끝나면 멈추고 확인받아줘.`
3. Phase마다 결과를 확인하고 다음 Phase로 넘어갑니다.
4. 사실 관계가 바뀌면 이 파일의 "콘텐츠 소스"를 먼저 고친 뒤 Claude Code에 반영을 요청합니다.

---

## 1. 프로젝트 개요

- **목적**: 이직용 UX 포트폴리오 웹사이트. 같은 콘텐츠로 **웹사이트 + PDF(전체본·요약본) + Figma 원본**을 만든다.
- **주인공**: 이경준 (KyungJun Lee), 삼성전자 Principal UX Designer
- **포지셔닝**: "Designing with AI & for AI" — AI 경험을 설계하고, AI로 일하는 UX 리더. 공간 IoT·Digital Twin·UX 리서치 전문, SW 엔지니어 출신.
- **도메인**: `uookie.net` — DNS가 GitHub Pages에 연결됨. 배포는 사용자가 요청할 때만 (9장)
- **대상 독자**: 국내 대기업·글로벌 빅테크·AI 기업의 채용 담당자와 디자인 리더
- **언어**: 한국어(기본) + 영어(`/en`). 콘텐츠는 두 언어를 같은 구조로 관리한다.

### 핵심 원칙

1. **섹션 하나 = PDF 한 페이지.** 모든 케이스 스터디 섹션은 16:9 한 페이지에 들어가도록 설계한다. 화면에서는 자연스러운 스크롤 웹사이트, 인쇄 시에는 페이지 단위 PDF가 되어야 한다.
2. **콘텐츠와 디자인 분리.** 모든 텍스트는 `src/content/`의 파일로 관리하고 컴포넌트에 하드코딩하지 않는다.
3. **시각 자료는 코드로.** 다이어그램·차트·재구성 UI 목업은 인라인 SVG 컴포넌트로 만든다. SVG는 Figma에 붙여넣으면 편집 가능한 레이어가 되므로 Figma 전환에도 쓰인다.
4. **대외비 보호.** 아래 "10. 보안·대외비 규칙"을 반드시 지킨다.

---

## 2. 기술 스택

| 항목 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | **Astro** (TypeScript) | 정적 HTML 출력, Content Collections로 콘텐츠 관리, 빠름 |
| 스타일 | 순수 CSS + **CSS 변수 디자인 토큰** | Figma 변수로 옮기기 쉬움. 디자인 토큰 자체가 포트폴리오 스토리(AI-ready 토큰)와 연결됨 |
| 폰트 | **Pretendard** (한글·영문), 폴백 `system-ui, sans-serif` | Figma에서도 바로 사용 가능 |
| 다이어그램 | 인라인 SVG 컴포넌트 (`.astro`) | Figma 붙여넣기 가능 |
| PDF 생성 | **Playwright** (Chromium) 스크립트 | 인쇄 CSS 기반으로 페이지 단위 PDF 생성 |
| 호스팅 | **GitHub Pages** (무료, `gh-pages` 브랜치) | 저장소 `kj197835/Uookie`. 로컬에서 빌드한 `dist/`를 `npm run deploy`로 SSH 푸시. 커스텀 도메인 `uookie.net` (2026-09-26 Cloudflare Pages에서 변경) |
| 분석 (선택) | Cloudflare Web Analytics | 쿠키 없음, 무료 |

외부 JS 프레임워크(React 등)는 인터랙션이 꼭 필요한 곳에만 Astro Island로 제한적으로 쓴다.

---

## 3. 사이트 구조

```
/                        홈: 히어로(이름·태그라인·요약 + 시그니처 드로잉) + 핵심 숫자 5개 → 대표 작업 카드 6개
                         → 핵심 역량 4개 → 커리어 흐름 → 수상 6회+ · 특허 13건+
                         → "포트폴리오에 대해 이야기 나누고 싶다면"(이메일 + 복사 버튼, LinkedIn)
/work                    Work: 9개 작업을 6개 챕터로 묶은 커리어 타임라인 (최신 → 과거, 6.13). 상단 챕터 스트립(CH.1 → CH.6)
/work/genai              01 GenAI UX & AI 디자인 자동화              (CH.6) ← 이미지·대외비 표시까지 완성
/work/interactive-view   02 SmartThings Pro Interactive View         (CH.5)
/work/digital-twin       03 삼성 최초 Digital Twin                    (CH.5) ← 여정 다이어그램 포함
/work/map-view           04 SmartThings Map View                     (CH.4)
/work/apartment-research 05 스마트 아파트 IoT 사용성 리서치            (CH.3)
/work/b2b-iot-research   06 B2B Home IoT 기회 발굴 및 사업화           (CH.3)
/work/mde                07 MDE Effortless Connection · 연결성 · Voice UX (CH.2)
/work/advanced-ux        08 Advanced UX — 새 폼팩터 USP                (CH.2)
/work/engineer           09 Software Engineer                        (CH.1)
/about                   스토리(3단계) → 경력 타임라인 표 → 보유 기술 → 사용 툴 + 학력·자격
/recognition             수상(대표 6건, "이 밖의 수상도 있음") → 특허·GUI 디자인 표(13건+, Google Patents 링크) → 전시
/resume                  요약·숫자(+ PDF 다운로드 칸: public/pdf/에 파일이 있을 때만 표시)
                         → 경력 → 학력·자격 → 보유 기술·사용 툴 → (PDF가 없으면) 맨 아래 작은 글씨 "PDF 이력서·경력기술서가 필요하시면 이메일로 요청" + 복사 버튼
/en/...                  영문판 — 위와 같은 구조·같은 컴포넌트, 콘텐츠만 EN 파일에서 읽음
/dev/styleguide, /dev/og 작업용 (noindex, robots.txt Disallow). /dev/og는 링크 미리보기 이미지(1200×630) 원본
```

- 헤더: 로고 텍스트 **"Home"** · Work · About · Recognition · Resume · EN · 다크 모드 토글
- 푸터: `© 2026 KyungJun Lee · Designed & built with Claude` 한 줄, 오른쪽 정렬. **연락처 영역 없음** (연락처는 홈 하단 한 곳에만)

### 실제 폴더 구조

```
src/
  content.config.ts            # 케이스 컬렉션 스키마 (Zod)
  content/
    cases/ko/*.md cases/en/*.md  # 케이스 9개 — 본문 대부분이 frontmatter 데이터 (5장). EN은 KO와 같은 slug·구조(이미지 경로·URL·다이어그램 키 동일), 글자만 번역
    chapters.ko.json chapters.en.json   # Work 챕터 6개 (6.13)
    profile.ko.json profile.en.json     # 이름·요약·숫자·핵심 역량·스토리·보유 기술(skills)·사용 툴(tools)·학력·자격
    career.ko.json career.en.json       # 경력 타임라인 9개 (케이스 slug·era 연결)
    recognition.json           # 수상·특허·전시 (특허 제목은 {ko, en})
    visuals.ko.json visuals.en.json     # 코드로 그린 다이어그램·목업 속 글자 (두 파일의 키 구조가 같아야 함)
    ui.ko.json ui.en.json      # UI 문자열 (두 파일의 키 구조가 같아야 함)
    site.json                  # 도메인·이메일·LinkedIn
  components/
    Section.astro              # 16:9 페이지 섹션 (tone: default/alt/navy, pdf: full/summary/none)
    CopyText.astro             # 이메일 복사 버튼 (아이콘만)
    layout/                    # Header, Footer, ThemeToggle
    pages/                     # HomePage, WorkPage, CasePage, AboutPage, RecognitionPage, ResumePage, PlaceholderPage
    work/                      # CaseCard, VisualSlot(이미지 자리), ConceptFigure(캡션·출처·대외비), StatusBadges
    about/                     # CareerFlow, SkillTable
    brand/HeroSignature.astro  # 홈 시그니처 드로잉 (2D PLAN → SPATIAL IOT → AI-READY TOKENS)
    diagrams/Journey.astro     # 여정 다이어그램 (Digital Twin)
    mockups/                   # 케이스별 컨셉 이미지 (GenAIHero, GenAIChatbot, GenAIPipeline)
  lib/cases.ts                 # getCases, getChapters(챕터 누락·중복 시 빌드 실패), chapterOf …
  lib/content.ts               # getProfile / getCareer / getVisuals(lang) — 컴포넌트는 JSON을 직접 import하지 않고 이 함수로 언어별 데이터를 읽는다
  i18n/utils.ts                # 언어 판별·경로·번역
  tokens/tokens.json           # 디자인 토큰 단일 원천 → styles/tokens.css, export/tokens.json 생성
  styles/                      # base.css, section.css(16:9·--px 스케일), print.css, tokens.css(생성물)
scripts/
  build-tokens.ts              # 토큰 → CSS·JSON
  deploy-pages.mjs             # dist/ → gh-pages 브랜치 (npm run deploy)
  pdf-config.ts                # PDF 페이지 구성 (섹션 id 목록)
  build-pdf.ts                 # 포트폴리오 PDF 4종 → public/pdf/ (npm run pdf)
  export-svg.ts                # Figma용 다이어그램 SVG → export/svg/ (npm run export-svg)
  preview-server.ts            # 위 두 스크립트용 astro preview 시작·종료
public/
  images/<케이스>/             # 공개 자료 이미지 (예: images/genai/smartthings-pro-dashboard.jpg)
  images/<케이스>/refer/       # 이미지 제작 시 참조한 원본 + SOURCES.md(출처·용도·수집일)
  og-image.png                 # 링크 미리보기 (/dev/og 스크린샷)
  CNAME  robots.txt  favicon.svg
  pdf/                         # 생성된 포트폴리오 PDF 4종 (npm run pdf)
```

npm 스크립트: `dev`, `build`(토큰 → astro check → build), `preview`, `deploy`(build → gh-pages 푸시), `pdf`(build → PDF 4종), `export-svg`(build → Figma용 SVG), `tokens`.

---

## 4. 디자인 방향

이력서·경력기술서와 같은 톤으로 통일한다.

- **무드**: 절제된 에디토리얼. 여백이 넉넉하고, 숫자와 성과가 먼저 보이는 구조. 과한 애니메이션 금지.
- **컬러 토큰 (초안)**
  - `--color-navy: #1F3864` (제목, 강조)
  - `--color-accent: #2E75B6` (링크, 숫자, 하이라이트)
  - `--color-text: #1A1A1A`, `--color-muted: #595959`
  - `--color-surface: #FFFFFF`, `--color-surface-alt: #EEF3F9`, `--color-line: #BFC9D6`
  - 다크 모드 토큰도 함께 정의한다.
- **타이포**: Pretendard. 히어로 56–72px, 섹션 제목 36–44px, 본문 17–18px, 캡션 14px.
- **그리드**: 12컬럼, 최대 폭 1280px. 16:9 섹션은 `aspect-ratio: 16 / 9` 기준으로 설계.
- **반응형**: 모바일에서는 16:9 제약을 풀고 세로로 자연스럽게 쌓는다. 인쇄 시에만 16:9 페이지를 강제한다.
- **접근성**: 색 대비 WCAG AA, 모든 SVG에 `role="img"`와 `aria-label`, 키보드 탐색 가능.
- **확정된 디자인 결정 (2026-09-26)**
  - 홈 대표 이미지: 사용자가 제공한 'Spatial IoT 개선이미지'(2D PLAN → SPATIAL IOT → AI-READY TOKENS 일러스트, 2026-09-26 교체) — `public/images/home/spatial-iot-hero.webp`. 원본 우측 하단의 Gemini 워터마크(✦)는 잘라내 제외. 흰 배경이라 라이트 모드는 multiply로 배경에 녹이고, 다크 모드는 둥근 카드로 표시. 이전 코드 드로잉(`HeroSignature.astro`)은 보관만 함
  - 홈 히어로에 버튼 없음. 핵심 숫자는 한 줄 5개 ("천억+"는 홈·이력서 숫자에서 제외)
  - 수상·특허는 "6회+", "13건+"처럼 **+**를 붙여 "더 있음"을 표현 (6.11·6.12)
  - 이메일은 링크(mailto)가 아니라 **텍스트 + 복사 아이콘 버튼**. 전화번호는 어디에도 없음
  - 코드로 그린 "화면" 목업은 고정 라이트 팔레트(스크린샷처럼 보이게), 화살표·라벨은 테마 색을 따름

---

## 5. 케이스 스터디 공통 구조

모든 케이스는 아래 순서의 섹션(= PDF 페이지)으로 구성한다. 케이스당 4–6 페이지. 섹션 배경은 자동으로 번갈아 바뀐다.

1. **커버**(navy): `Case 0N · 테마` → `CH.N · 챕터명`(Work 챕터로 링크) → 진행 중·대외비 배지 → 제목·부제·요약 → 기간·역할·수상 → note → 대표 이미지
2. **배경 · 문제**: 문제 한 문장 + 맥락 카드
3. **내 역할 · 접근**: 판단 카드 (의사결정 중심)
4. **핵심 설계** — 1개 이상. 여러 개면 `label`로 구분해 "핵심 설계 · GenAI 챗봇"처럼 표시
5. **결과 · 임팩트**: 숫자, 결과 목록, 관련 링크
6. (선택) **배운 점** — 근거 자료가 없어 현재 쓰지 않는다 (지어내지 않기)

하단 내비: `↑ 더 최근 작업` / `이전 작업 ↓` (Work 순서와 같은 방향). 챕터가 바뀌면 챕터명과 bridge 문장을 함께 보여준다.

### 케이스 파일 작성법 (`src/content/cases/ko/<slug>.md` frontmatter)

- 필수: `order`(01 = 최신), `group`(featured/earlier — 홈 대표 작업 카드용), `theme`, `title`, `summary`, `period`, `role`, `background`, `approach`, `impact`
- 선택
  - `design`: 객체 1개 또는 배열. 각 항목 `label?`, `layout?`(split 기본: 왼쪽 이미지 + 오른쪽 설명 / wide: 전체 폭 이미지 + 아래 설명 한 줄), `heading`, `points`, `visual{ id, description, diagram?, image?, flow?, journey? }`
    - `approach.items[].diagram`: 판단 카드 안에 넣는 작은 코드 도식 키 (예: MDE 01·02)
    - `visual.flow`: 번호 매긴 화면 흐름 `{ steps[{src, alt, title, sub?, auto?}], autoLabel?, caption?, source }` → `StepFlow` (주로 `layout: wide`와 함께)
    - `visual.diagram`: 코드 이미지 키 (`CasePage.astro`의 `diagrams` 목록에 등록) · `visual.image`: 공개 사진 `{ src, alt, caption?, source{label,url} }` · `visual.journey`: 여정 다이어그램 데이터 · 모두 없으면 "이미지·다이어그램 추가 예정" 자리 표시
  - `coverVisual`: 커버 코드 이미지 키 · `coverImage`: 커버 공개 사진 (형식은 `visual.image`와 같음) · 둘 다 없으면 자리 표시
  - `status: { inProgress, confidential }` → 커버·Work 카드에 "진행 중"·"대외비" 배지
  - `awards`, `links`, `note`, `subtitle`
- 날짜처럼 보이는 값은 따옴표로 감싼다 (`"2024.11"` — 안 그러면 숫자 2024.1이 됨)
- 새 케이스를 추가하면 `chapters.ko.json`에도 반드시 넣는다 (빠지면 빌드 실패)

### 이미지 규칙

- 코드로 그린 이미지(SVG)는 `src/components/mockups/`(케이스 컨셉)·`diagrams/`(도식)에, 그림 속 글자는 `visuals.ko.json` 또는 케이스 frontmatter에 둔다
- 컨셉 이미지는 `ConceptFigure`로 감싼다 → 기본 캡션 "컨셉 이미지 · 포트폴리오용으로 재구성했으며 실제 화면이 아닙니다"
  - 공개 공식 이미지를 바탕으로 했으면 캡션을 바꾸고 **출처 링크**를 단다 (예: GenAI 커버)
  - 대외비 업무의 컨셉 이미지에는 자물쇠 "대외비" 칩. 공개 자료 기반 이미지는 칩 없음 (`CasePage.astro` `diagrams`의 `confidential: false`)
- 사진 파일: `public/images/<케이스>/` (웹용으로 1600px 이하 JPEG로 줄여 저장 — `sharp` 사용), 참조 원본: `public/images/<케이스>/refer/` + `SOURCES.md` (public/ 아래는 배포 시 함께 공개됨)
- 공개 사진은 `PhotoFigure`(1장) / `PhotoGallery`(`visual.image`가 목록일 때: 첫 장 크게 + 나머지 한 줄, 번호 캡션)로 표시하며 **출처 링크가 필수**다 (스키마에서 `source` 필수)
- 핵심 설계 페이지에서 이미지 상단은 오른쪽 설명 ①번 상단과 맞춘다 (`.design { align-items: start }`)
- 커버: 상단 줄(Case 번호 · 챕터 · 배지)을 따로 두고, 그 아래에서 **제목과 대표 이미지의 상단을 맞춘다** (모든 케이스 공통)

---

## 6. 콘텐츠 소스 (사실 정보의 유일한 기준)

### 6.1 프로필

- **이름**: 이경준 / KyungJun Lee
- **연락처**: kj197835@gmail.com (이메일·링크드인만 사용. **전화번호는 웹·PDF 어디에도 쓰지 않는다**)
- **링크드인**: linkedin.com/in/kjlee35
- **헤드라인 (EN)**: Principal UX Designer @ Samsung | Designing with AI & for AI — GenAI UX, Conversational AI, AI Design Automation | Spatial IoT · Digital Twin · UX Research | 6+ Global Design Awards · 13+ Patents
- **요약 (KO)**: SW 엔지니어 9년, UX 디자이너 12년의 경험으로 복잡한 기술을 누구나 쉽게 쓰는 경험으로 바꾸는 Principal UX Designer. 삼성전자에서 GenAI 챗봇 UX와 AI 기반 디자인 자동화를 이끌고 있으며, 삼성 최초 Digital Twin 등 공간 기반 IoT 솔루션을 0에서 1로 만들어 글로벌 디자인 어워드 6회 이상 수상. 리서치로 사업 기회를 발굴하고, 필요하면 UX PM 역할까지 맡아 실제 출시와 사업 성과로 연결.
- **요약 (EN)**: Principal UX Designer with 21 years at Samsung Electronics — 9 as a software engineer and 12 in UX — who turns complex technology into experiences anyone can use. Currently leading GenAI chatbot UX and AI-driven design automation. Built Samsung's first Digital Twin and spatial IoT products from 0 to 1, earning 6+ global design awards and 13+ granted patents.

### 6.2 핵심 숫자 (홈 히어로)

| 숫자 | 설명 |
|---|---|
| 21년 | 삼성전자 경력 (SW 9년 · UX 12년) |
| 6회+ | 글로벌 디자인 어워드 (Red Dot · iF · IDEA · Good Design 등) |
| 13건+ | 등록 특허·GUI 디자인 (+ 출원 5건) — 같은 특허(여러 나라·연속 출원)는 1건으로 센다 |
| 13만+ | SmartThings 연동 스마트 아파트 가구 |
| 8% → 12% | 사용성 개선 후 SmartThings 연동률 |

### 6.3 경력 타임라인 (모두 ㈜삼성전자)

| 기간 | 직함 | 핵심 |
|---|---|---|
| 2026.01 – 현재 | Principal UX Designer · GenAI UX & Design Automation Lead | GenAI 챗봇, AI 디자인 자동화 |
| 2024.03 – 2026.01 | Principal UX Designer · B2B Spatial IoT UX Lead (SmartThings Pro) | Interactive View |
| 2023.09 – 2024.04 | Principal UX Designer · UX PM, Digital Twin | 삼성 최초 Digital Twin |
| 2023.01 – 2023.12 | Principal UX Designer · Spatial UX Lead (SmartThings Map View) | Map View |
| 2021.11 – 2022.12 | Senior UX Researcher & Designer · Smart Apartment IoT | 사용성 리서치 |
| 2018.09 – 2021.10 | Senior UX Designer & Researcher · B2B Home IoT Strategy | 기회 발굴·사업화 |
| 2016.09 – 2018.09 | Senior UX Designer · Connectivity & Multi-Device Experience Lead, Mobile (MX) | MDE, Bixby VUI |
| 2014.04 – 2016.09 | Senior UX Designer · Advanced UX Concept & Prototyping, Mobile (MX) | 새 폼팩터 USP |
| 2005.02 – 2014.03 | Software Engineer · Mobile Protocol, System & SIM/eSIM, Mobile (MX) | 통신·GPS·eSIM |

학력: 동국대학교 컴퓨터공학 학사 (2005). 자격: Samsung Data Science Level 2 (2025.02), TRIZ Expert Level 2 (2017.01) · 사내 강사 Level 1.

---

### 6.4 케이스 1 — GenAI UX & AI 디자인 자동화 (2026.01 – 현재)

- **역할**: GenAI UX 리드, AI 디자인 자동화 기획·개발
- **배경**: B2B 관리 솔루션(SmartThings Pro)의 복잡한 기능을 대화형 AI로 쉽게 쓰게 하고, 반복적인 UI 가이드 제작을 AI로 자동화할 필요
- **주요 업무**
  - GenAI 챗봇: SmartThings Pro 기능을 대체·보강하는 생성형 AI 챗봇의 상위 솔루션 아키텍처와 대화형 UI 설계
  - AI 번역 체계: 자동 다국어 번역 기능 가이드라인 (핵심 원칙, 톤 앤드 매너, 포맷·현지화 규칙, 용어집)
  - AI 디자인 자동화 (개발 중): 기획 PRD의 기능 정의로부터 Figma UI 가이드를 AI가 자동 생성하는 시스템. Confluence·Jira의 PRD를 Claude가 Figma MCP로 읽고, Atlassian 디자인 토큰 체계(https://atlassian.design/foundations/tokens/design-tokens) 기반의 AI-ready 토큰으로 매핑해 Figma에 UI 가이드를 만든다
  - AI-ready 디자인 토큰 개발·표준화, PRD–디자인 시스템–UI 가이드 간 매핑 구조 설계
  - UX 그룹 AI 툴(Gemini, ChatGPT, Claude, Midjourney, Firefly) 도입·운영
- **성과**
  - AI 챗봇은 SmartThings Pro에서 지원하는 기능으로 판매됨 (**판매 고객사는 대외비 — 절대 명시하지 않는다**)
  - 생성형 AI 기반 B2B 솔루션 UX의 방향과 설계 원칙 수립
  - UI 가이드 제작 자동화로 디자인–개발 간 일관성과 생산성 향상 추진
- **시각 자료 아이디어**
  - PRD → AI-ready 토큰 → Figma UI 가이드 자동 생성 파이프라인 다이어그램
  - 챗봇 대화 UI 재구성 목업 (일반화된 B2B 시나리오)
  - 번역 가이드 체계 구조도 (원칙 / 톤 / 규칙 / 용어집)
- **메타 스토리**: 이 포트폴리오 사이트 자체를 AI(Claude)와 함께 설계·제작했다는 과정을 짧게 소개한다.
- **주의**: 진행 중·대외비 업무이므로 방법론과 원칙 수준으로만 설명한다. 실제 화면·데이터 금지. 시각 자료:
  - 커버: samsung.com 공개 SmartThings Pro 대시보드 이미지(`public/images/genai/smartthings-pro-dashboard.jpg`) 위에 AI 레이어(오브·대화 카드)를 결합. **대외비 아님** → 자물쇠 없이 "공식 화면에 AI를 결합한 컨셉" 캡션 + 출처 링크
  - 핵심 설계 · GenAI 챗봇 / 핵심 설계 · AI 디자인 자동화: 코드로 그린 컨셉 이미지 + "대외비" 자물쇠 + "컨셉 이미지 · 포트폴리오용으로 재구성, 실제 화면 아님" 캡션
  - 케이스 전체에는 "진행 중"·"대외비" 배지
- **참고 링크**: 공개 제품 페이지 https://www.samsung.com/sec/business/smartthingspro/ (실사용 사이트 smartthingspro.ai는 회원 전용이라 링크하지 않는다)

### 6.5 케이스 2 — SmartThings Pro Interactive View (2024.03 – 2026.01)

- **역할**: UI/UX 디자인 리드 (Interactive View 콘셉트 설계 포함), 전시 콘셉트 설계·운영
- **배경**: 기존 강자가 있는 빌딩 관리(BMS) 시장에 후발 주자로 진입하며 확실한 차별점이 필요 — 기능 목록이 아니라, 건물을 실제 공간 그대로 정확하게 보여주고 그 위에서 관리하는 **공간 중심의 차별화된 솔루션**을 강조
- **주요 업무**
  - SmartThings Pro 초기부터 참여. B2C Map View 경험을 B2B로 확장해 대규모 빌딩 운영자 효율에 맞게 재설계
  - 2D 건물 도면 → 3D 맵 자동 변환(AI로 도면 분석 — ISE 2025 공개, rAVe [PUBS] 2025-02-06 보도), B2B IoT와 B2C(SmartThings) 기기를 한 공간에서 배치·관리, 편집·필터 기능
  - 로봇: 빅웨이브로보틱스 연동, 배달·안내·청소 상업 로봇의 셋업·이동·상태를 3D 맵에서 실시간 표시 (4족 보행 로봇 확장 예정). AW 2025(2025.03.12–14, 코엑스)에서 빅웨이브로보틱스가 SOLlink 엔터프라이즈 API로 SmartThings Pro와 연동해 별도 시스템 없이 여러 로봇을 통합 관리하는 기술을 시연
  - 선박: 삼성중공업과 협업, 전 세계 운항 선박의 위치·운영 관리
  - 히트맵: 히트맵 센서(재실 감지)·CCTV(혼잡도 감지)로 3D 맵에 재실 히트맵 구현, 에너지 절감 솔루션에 적용
  - 자동화: SmartThings Pro의 **Node-RED 기반 B2B 자동화 도구** — 노드를 선으로 이어 기기·조건·동작을 연결해 복잡한 B2B 자동화 흐름을 시각적으로 구성 (samsung.com에 편집 화면 공개. 페이지에 'Node-RED' 명칭은 없고 명칭은 사용자 확인 기준)
- **성과**
  - 2024.11 SmartThings Pro 출시, Interactive View가 솔루션의 대표 차별화 기능으로 전면 배치
  - CES 2025 SmartThings Pro·선박 부스 콘셉트·디자인 리드 및 운영, KIES 2025·AW 2025 전시 화면 설계
  - SmartThings Pro와 기아 PV5 PBV 협업으로 모빌리티 연동 확장 — 기아 EV 데이(2025.02.24, 스페인 타라고나)에서 삼성전자–기아 SmartThings Pro 모빌리티 전략 협업 발표. PV5 차량 내부를 공간 뷰로 보여주고, 차량과 매장·사업장 기기를 자동화 루틴으로 연결
  - **2025 Red Dot Design Award** (SmartThings Pro)
- **시각 자료 (적용 완료, 모두 공개 사진 + 출처 링크, `public/images/interactive-view/`, 원본·출처는 `refer/SOURCES.md`)**
  - 커버: ISE 2025 삼성전자 부스 Interactive View (뉴스1 사진)
  - 핵심 설계 4페이지: **IoT**(3D 맵 — rAVe [PUBS] + 재실 히트맵·Node-RED 자동화 — samsung.com, 사진 3장) · **로봇**(AW 2025 빅웨이브로보틱스 부스) · **선박**(CES 2025 SmartThings for Ships — Samsung Newsroom) · **자동차**(기아 PV5 Connected PBV — ZDNet Korea)
- **공개 링크**
  - https://www.hyundaimotorgroup.com/ko/story/CONT0000000000171331 (기아 PV5와 SmartThings Pro 결합 언급)
  - https://ravepubs.com/samsung-adds-ai-to-smartthings-pro-and-launches-new-interactive-models-wafx-p-that-leverage-it/ (ISE 2025, AI 2D→3D)
  - https://blog.naver.com/bigwaverobotics/223817608114 (AW 2025 로봇 연동)
  - https://news.samsung.com/global/ces-2025-beyond-the-home-samsung-expands-ai-for-a-smarter-world (CES 2025 선박)
  - https://zdnet.co.kr/view/?no=20250227155730 (기아 PV5 협업)

### 6.6 케이스 3 — 삼성 최초 Digital Twin (2023.09 – 2024.04)

- **역할**: UX PM (PRD 작성, 목표·우선순위·일정 설계), UI/UX 디자인 리드
- **배경**: 대규모 빌딩·단지의 운영과 에너지 관리를 공간 기반으로 통합할 삼성 최초의 Digital Twin 구축
- **주요 업무**
  - Digital Twin 필요성 발굴, 목표 설정, 기능 중요도와 개발 일정 설계
  - 공간 뷰와 에너지 절감 솔루션을 결합해 두 가치를 극대화하는 UX/UI 설계 완료
  - 빌딩 관리와 에너지 절약의 정확도를 높이는 방향으로 설계 기준 수립
  - **0→1로 시작해 출시까지 완료한 뒤, 전사 확산을 위해 동료에게 이관** (이관 사실을 정직하게 표현할 것)
- **성과 (이관 이후 성장 포함, "내가 시작한 솔루션이 이후 이렇게 성장했다"로 표현)**
  - 삼성 베트남·폴란드 사업장 시범 적용 후 전사 확대, 국내 R&D 빌딩 적용, 해외 판매·영업 활용
  - 국내 삼성전자 사업장 전체로 확대 적용 진행 중
  - **팩토리얼 성수** (성수역 인근 오피스 빌딩, 기획 단계부터 삼성전자와 'Tech Ready 빌딩' 협업): 삼성 b.IoT(디지털 트윈 — 실제 빌딩을 3D 모델로 구현해 설비 상태를 실시간 시각화·시뮬레이션) 적용, **국내 최초 WiredScore 스마트스코어(SmartScore) 골드** 획득 (2026.01.27 삼성전자 발표). b.IoT로 중앙 공조·시스템에어컨을 운영해 에너지 사용량 약 27% 절감 — **2025.06.01–09.30 부경대학교 연구팀의 냉방·공조 설비 중심 실증 기준**(이 조건과 함께만 쓴다. 디지털 트윈 단독 효과로 쓰지 않는다)
  - CES 2024 VIP룸 소개
  - **2026 iF Design Award**, **2025 IDEA Design Award Silver**
- **시각 자료**: 커버 = IDEA 2025 수상작 보드 이미지(IDSA 공개, `public/images/digital-twin/cover-idea2025.jpg`, 원본·출처 `refer/SOURCES.md`) · 핵심 설계 = 코드로 그린 0→1→출시→이관→확산 여정 다이어그램
- **공개 링크**
  - https://ifdesign.com/en/winner-ranking/project/samsung-biot-digital-twin/756774
  - https://www.idsa.org/awards-recognition/idea/idea-gallery/nbs-b-iot-digital-twin-solution/
  - https://www.samsung.com/sec/business/insights/news/news_260127_01/ (팩토리얼 성수, 2026.01.27)

### 6.7 케이스 4 — SmartThings Map View (2023.01 – 2023.12)

- **역할**: UI/UX 디자인 리드 (2022년 선행 콘셉트 제안·채택 후 구현)
- **배경**: 아이콘 목록 중심의 기기 제어로는 집 안 기기 상태와 위치를 직관적으로 파악하기 어려움
- **주요 업무**
  - 실제 집 구조의 3D 도면 위에 SmartThings를 표현하는 콘셉트를 2022년 제안·채택, 2023년 앱에 구현
  - 스마트 아파트는 도면을 자동으로 불러와 3D 도면을 생성하고 현관·거실·주방 IoT 기기 자동 배치
  - 신축 건설사와 협의해 모든 방까지 연동, 공간별 기기 자동 배치
- **성과**
  - IoT 솔루션 최초로 2D→3D 자동 변환·기기 자동 배치 구현
  - 2023.07.06 스마트 아파트용 발표 (뉴스1: "삼성전자는 스마트싱스를 적용한 스마트 아파트에 '맵 뷰' 기반의 홈 IoT 솔루션을 새롭게 선보인다"), 아마존 알렉사 Map View(2023.11.15 보도)보다 약 4개월 앞섬. 이후 2023.10경 전체 사용자에게 공개
  - "세계 최초" 표현은 근거 링크가 없어 쓰지 않는다 — 근거가 있는 "IoT 솔루션 최초" + 아마존보다 약 4개월 앞선 시점으로 표현
  - **2024 iF Design Award**
- **공개 링크**
  - https://news.samsung.com/global/samsung-launches-3d-map-view-feature-based-on-smartthings-and-ai
  - https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
  - https://www.digitaltoday.co.kr/news/articleView.html?idxno=494459 (아마존 Map View 보도)
  - https://www.news1.kr/photos/6086779 (2023.07.06 스마트 아파트용 발표)
  - https://m.blog.naver.com/sunshine_308/223251472006 (맵 뷰 생성 과정 사용후기, 화면 출처)
- **시각 자료 (적용 완료, `public/images/map-view/`, 원본·출처 `refer/SOURCES.md`)**
  - 커버: iF 2024 출품 키 비주얼 (iF 공개 이미지)
  - 핵심 설계 · 맵 뷰 생성 흐름(전체 폭): 앱 화면 6단계 ① 맵 뷰 만들기 → ② 아파트 단지 찾기 → ③ 평형 선택 → ④ 3D 도면 생성 → ⑤ 기기 배치 → ⑥ 완성·제어. ②③⑤는 SmartThings 연동 스마트 아파트에서 **자동** (단지·평형 자동 선택, 기기 자동 배치). 화면은 네이버 블로그 사용후기(2023.10, 일반 사용자 화면) 스크린샷
  - 핵심 설계 · 스마트 아파트 적용: 뉴스1 사진(2023.07.06, 삼성전자 제공)

### 6.8 케이스 5 — 스마트 아파트 IoT 사용성 리서치 (2021.11 – 2022.12)

- **역할**: **UX 리서처** · 리서치 리드 (설계·운영·분석), 개선안 도출 및 적용 — 리서치를 주도했으므로 UX 리서처 역할을 강조한다
- **배경**: 스마트 아파트에 연동된 SmartThings의 실제 사용성을 검증하고, 낮은 연동률의 원인을 찾아 개선할 필요
- **대상 단지**: 래미안 리더스원, 송도 더샵 트리플타워, 효창파크푸르지오 (2026-09-26 사용자 정정 — 이전 표기 '과천 센트럴파크 푸르지오·도화 더샵'은 쓰지 않는다). 세 단지 모두 같은 절차
- **방법**
  - 1차 파일럿 조사 후 방법을 개선하고 사용성 조사 인력을 늘려 2차 사용성 조사 진행 (리서치 에이전시: Ipsos Korea)
  - 2차 조사 절차 (단지마다 동일): ① 모집 — 관리사무소 확인을 받은 모집 공고, 스크리너·쿼터 ② 온보딩 — 앱 가입·월패드 연동 후 사진 인증 ③ 3일 사용 과제 ④ 정량 조사(온라인 설문) ⑤ 좌담회(설문 참여자 중 선별) ⑥ 홈 비짓(좌담회 참여자 중 선별, 더 깊은 관찰 — 하우스 투어·이용 상황·프리셋·조명 그룹화·UI 평가) → 결과 보고 → 개선 적용
  - 리서처가 직접 만든 문서: 모집 공고, 스크리너, 조사 가이드, 정량 설문지, 좌담회 가이드, 홈 비짓 가이드, 결과 보고서
  - 모집 공고·스크리너·쿼터 설계
  - 3일 사용 과제: 기기 제어, 서비스 알림, 모드, 자동화, 가족 초대·공유 (5개 시나리오)
  - 단지별 정량 조사(약 30세대), 좌담회(2그룹 × 4세대, 젊은 자녀 세대 / 중장년 세대), 가정 방문 조사
- **핵심 인사이트**: 연동·온보딩이 최대 허들 / 모드·자동화는 구체적 사용 장면을 떠올리지 못해 설정이 어려움 / 가족 구성원의 생활 패턴 차이 / 선호 프리셋(강력 환기, 외출 모드, 미세먼지 자동화) / (정성, 수치 없이) 알림은 기본 On이어야 쓰임 · 방별·아파트 단위 조명 그룹화 니즈 · 커뮤니티 시설(헬스장·수영장 등) 알림 기대 · 홈 화면에 기능이 길게 나열돼 불편
- **개선**: 적용 = 연동 간소화, 프리셋 모드·자동화 / 도출 = 가족 공유·멤버 설정, 알림 기본 On, 조명 그룹화, 홈 화면 구조 개선
- **성과**
  - 프리셋 기반 모드·자동화, 연동 간소화 등 개선 적용
  - SmartThings 연동률 **8% → 12%**, 자체 앱이 없는 단지는 **40~50% → 80~90%**
  - 세 단지에 동일하게 적용 가능한 반복형 리서치 프로세스 정립
- **맥락 (공개 기사)**: SmartThings 스마트 아파트는 2020.11 래미안 리더스원에 처음 적용, 2022.10 기준 10만 세대 돌파(18개 건설사 112개 단지) — 삼성전자 뉴스룸 2022.11 / 디지털데일리 2022.11.09 (https://www.ddaily.co.kr/page/view/2022110909582930476)
- **시각 자료 (적용 완료)**: 커버 = 삼성전자 뉴스룸 공식 사진(스마트 아파트 거실 TV의 SmartThings) / 핵심 설계 · 리서치 설계(전체 폭, 6단계 절차 도식) / 핵심 설계 · 인사이트 → 개선(매핑 도식, 적용·도출 구분). 모두 수치 없는 재구성 도식
- **원본 자료**: `D:\_Code_\Portfolilo_Refer\` 의 래미안 리더스원 2차 조사 문서(공고문, 스크리너, Ipsos 조사 가이드, 설문지, 좌담회 가이드, 홈 비짓 가이드, 결과 보고서 — 보고서는 Ipsos Confidential) — **저장소·사이트에 복사하지 않는다.** 연동 성공률·만족도 점수 등 보고서 수치, 응답자 정보는 쓰지 않는다
- **기간**: 케이스 기간은 2021.11 – 2022.12 유지 (조사 문서 날짜와 다르므로 리서치 과정 도식에는 날짜를 표시하지 않는다)

### 6.9 케이스 6 — B2B Home IoT 기회 발굴 및 사업화 (2018.09 – 2021.10)

- **역할**: B2B IoT 리서치 리드, 스마트 아파트 B2B IoT UX 설계 (전사 B2B 프로젝트, 무선사업부 대표로 차출)
- **배경**: B2C 중심의 SmartThings를 B2B로 확장하기 위해, 어느 영역에 사업 기회가 있는지부터 찾아야 하는 상황
- **Phase 1 · 기회 발굴 (2018–2019)**
  - 스노볼 리서치: 가설 → 1차 내부 워크숍(2018.11) → 파일럿 IDI(미국 9, 한국 6) → 미국 워크숍(2018.12) → 한국 크리에이티브 워크숍(2019.01) → 2차 내부 워크숍·방향 재설정(2019.01) → 본조사(미국 25+16, 한국 24+16; IDI·섀도잉·가정 방문) → 미국(2019.02)·한국(2019.03) 종합 워크숍
  - 미국: 샌프란시스코, 애틀랜타, 댈러스, LA
  - 이해관계자 전체 매핑: 시행사·시공사·설계사·IoT 통합 업체·설치 업체·관리 업체·홈넷사·통신사·입주민
  - 결론: 한국은 **시공사**가 핵심 의사결정자, 공기질이 가장 강한 가치 / 미국은 **대형 멀티패밀리 개발사**가 핵심 타깃, 비용·에너지 절감과 ROI 증명이 핵심
  - 시장 구조 (역할만): 미국 — Owner(투자자) → **Developer(의사결정)** → 설계팀(+구조·MEP·인테리어 컨설턴트)·General Contractor(+협력사)·Property Management(입주민 의견 전달·운영)는 제안·자문 역할 / 한국 — 분양 전: 시행사·조합, 신탁·금융, 설계사, **시공사(Home IoT 의사결정)**, 협력사, 홈넷사·통신사, 분양대행·입주 지원 → 입주 후: 입주자대표회의, 관리업체·관리 시스템, 입주민
  - 조사 도메인(2차 리서치 방향): 이해관계자 · 기기·맥락 · 비즈니스 로직
  - 기회 영역: **한국 스마트 아파트, 미국 MFU(멀티패밀리)**
- **Phase 2 · 사업화 (2020 – 2021.10)**
  - 건설사·아파트 SW 업체와 협업해 SmartThings–스마트 아파트 연동 UX 설계·적용, 영업용 파일럿 프로그램 제작
  - 스마트 아파트 SmartThings UX 빅데이터 담당, 삼성 빌딩 에너지 서비스(BEMS) UX 리드, 전사 네옴시티 신규 콘셉트 발굴 참여
- **성과**
  - **13만 가구 이상** SmartThings 연동
  - 영업 활동 지원으로 **연간 기여 매출 천억 이상**, 아파트 대상 생활·리빙 가전 매출 증대 기여
  - 스마트 아파트 GUI 디자인 3건 등록, B2B IoT UX 특허 출원
  - **2020 iF Design Award** (Immersive Home Experience), **2019 Good Design Award Silver** (Samsung Home IoT Resident App)
- **공개 링크**
  - https://award.kidp.or.kr/Exhibit/index_gd_view.do?idx_exhibit=5306
- **시각 자료 (적용 완료, 모두 코드로 그린 도식)**: 커버 = 스노볼 리서치(가설 → Pilot IDI → 조사 도메인 정의 → 본조사 → 기회 영역, 원이 점점 커짐) / 핵심 설계 · 미국 이해관계자 / 핵심 설계 · 한국 이해관계자 (기업명·인명 없이 역할만)
- **원본 자료**: `D:\_Code_\Portfolilo_Refer\` 의 홈IoT사업화TF 리서치 정리(2019.02.21), HRC 한국·미국 Home IoT 리서치 보고서, 미국 이해관계자 구조 이미지 — **내부 자료이므로 저장소·사이트에 복사하지 않는다.** 인터뷰 대상자 이름·소속 기업명(보고서에 있음)과 이 파일에 없는 수치는 쓰지 않고, 구조만 참고해 도식을 새로 그린다

### 6.10 초기 경력 (Work 상세 페이지 `/work/mde`, `/work/advanced-ux`, `/work/engineer`)

- **MDE Effortless Connection · 연결성 · Voice UX (2016.09 – 2018.09)**
  - 역할: UX 리드 및 UX/UI 디자인
  - 배경: 기기가 늘어날수록 복잡해지는 기기 간 연결을 누구나 쉽게 만들 필요
  - MDE Effortless Connection (2017.01–2018.01): MX 첫 Multi Device Experience 콘셉트 UX 리드. 웨어러블·오디오·IoT 제품의 첫 연결(OOBE) 이지 페어링 UX 설계
  - 무선·가전·VD 사업부와 업계 표준까지 연결 방식 통합, CES 2018 전시관 콘셉트 설계
  - Bixby VUI: SmartThings와 연결성 기능(Bluetooth, BLE, Wi-Fi, 핫스팟)의 음성 인터랙션 설계
  - Bluetooth, Wi-Fi(Direct·미러링 포함), 모바일 네트워크, 핫스팟 UX/UI 담당. 엔지니어 배경으로 복잡한 무선 기술을 쉬운 경험으로 설계
  - SmartThings(Samsung Connect) 워치 UX, 모바일 Quick Panel UX 담당
  - 성과: CES 2018 MDE 첫 주제 선정, 모든 삼성 모바일 제품에 적용 / 특허 등록 US10911920·EP3639538·KR 10-2301386(BLE 기반 Adaptive Easy Pairing), 특허 출원 US 16/960,862(클라우드 기반 Connection Switching)
  - Effortless Connection UX 원칙: **Instant · Intuitive · Consistent**. SmartThings의 전신인 **Samsung Connect**를 중심으로 초연결 경험을 만들어 적용. 시나리오: ① 폰으로 TV 설정 ② 자동 설정 — 액세서리 상자를 열면 주변 갤럭시 기기가 감지해 원클릭 연결(일관된 페어링 경험) ③ 계정 기반 자동 연결 — Samsung 계정·클라우드에 저장된 기기를 다른 기기에서 이어서 연결(오디오 기기 전환 등). 사용자 불만 1순위는 설정·연결 과정(정성)
  - 결과·임팩트: CES 2018 현장 사진(Simply connect 부스) + 현장 데모 영상 발췌 5컷(쉬운 폰 설정 안내 → 폰에서 TV 이름 지정 → 쉬운 앱, 서비스 추가 → 설정 완료 → 액세서리 자동 연결). 사용자 직접 촬영, `public/images/mde/`, 출처 `refer/SOURCES.md`. 원본 영상은 저장소에 넣지 않는다
  - 시각 자료: 커버 = Samsung Connect 허브 + 3원칙 도식 / 내 역할 01·02 카드에 자동 설정·계정 기반 연결 소도식 (모두 코드로 재구성). 원본 `MDE_챔피언 데모 보고_UX_1103.pptx`(내부 자료)는 저장소·사이트에 복사하지 않고, 슬라이드의 UT·트렌드 리포트 수치(%)는 쓰지 않는다
- **Advanced UX — 모바일 새 폼팩터 USP 발굴 (2014.04 – 2016.09)**
  - 역할: 콘셉트 발굴, UX 디자인, 안드로이드 실제 프로토타이핑 (1인 3역)
  - 배경: 새 폼팩터에 맞는 차별화 경험(USP)을 발굴하고 기술 구현 가능성까지 빠르게 검증할 필요
  - 개발에서 UX로 전환해, 콘셉트 제안부터 디자인과 실제 동작 프로토타입까지 한 번에 검증하는 Advanced UX 그룹에서 활동
  - Android Studio(Java)로 실제 프로토타입 제작, Voice Avatar·Implicit Voice·Camera Vision 등 선행 과제 수행
  - TRIZ 방법론을 활용한 UX 콘셉트·특허 발굴
  - 스토리: 갤럭시 S8의 새 폼팩터(길어진 화면, 물리 홈 키 대신 SW 내비게이션)에 맞는 신규 UX 발굴 → 특허 → 제품 적용. SW 내비게이션(US10852944)은 **S8에 적용**, 전면 카메라 펀치홀은 **USP 콘셉트 발굴**(S8 적용이라고 쓰지 않는다 — S8에는 펀치홀이 없음), 길어진 화면 멀티 윈도우는 특허 등록, 듀얼 디스플레이 카메라는 갤럭시 폴드 USP 적용
  - 커버: 화면별 내비게이션 바 유형 5종(잠금 화면 숨김 · 홈 투명 · 일반 앱 불투명 · 갤러리 상세 투명·반투명 · 동영상 재생 숨김). 폰 이미지는 `Flexible SW Navigation Key_in Extended Space(2016.04.15).pptx` 7페이지에서 폰만 잘라 사용(`public/images/advanced-ux/`), 슬라이드의 '직무발명서 양식'·'Samsung Confidential' 표시와 글자는 쓰지 않고 라벨은 사이트에서 새로 조판. 관련 특허 US10852944
  - 성과: Flexible SW Navigation 등 새 폼팩터 콘셉트 발굴, 갤럭시 S8 적용 / 전면 카메라 펀치홀 USP 콘셉트 발굴 / 듀얼 디스플레이 카메라 UX 발굴, 갤럭시 폴드 USP 적용(US10681263)
- **Software Engineer — 무선사업부 (2005.02 – 2014.03)**
  - 역할: 모바일 통신 프로토콜, 시스템 SW, SIM/eSIM 개발 (C, Trace32)
  - 커버 도식: 피처폰 시대 Samsung 피처폰(2005)부터 갤럭시 S(2010, 첫 안드로이드)·갤럭시 S4(2013)까지 무선사업부 SW 엔지니어로 참여 (S4는 사용자 확인 기준. 특정 모델 별칭은 쓰지 않는다) + 통신 프로토콜 → 시스템 SW → SIM·eSIM 세 시기
  - SIM & eSIM (2011–2014): 삼성 SIM·eSIM 기능 글로벌 담당. 미국 Sprint와 삼성 최초 eSIM 구현 주도, SIM 팀 코드 리뷰어 리드
  - System SW (2008–2011): AT&T, T-Mobile, Verizon 안드로이드폰 시스템 SW 담당, GPS 드라이버 개발, 삼성 첫 안드로이드폰(갤럭시 A, 갤럭시 S) 메모리 디버깅
  - 통신 프로토콜 (2005–2008): 글로벌 GSM 모듈 주요 담당. RRM, E-GPRS 개발. 미국 전역, 폴란드, 중국 광저우, 인도, 베트남, 인도네시아 현장 테스트·검증·수정까지 종합 수행

### 6.10b 핵심 역량 · 보유 기술 · 사용 툴 (경력기술서 기준)

- **핵심 역량 4개**
  - **AI UX & 디자인 자동화**: GenAI 챗봇 UX·솔루션 아키텍처, AI 번역 가이드 체계, PRD 기반 Figma UI 가이드 자동 생성과 AI-ready 디자인 토큰 표준화. UX 그룹 AI 툴 도입·운영 담당.
  - **복잡계 B2B 공간 UX**: Digital Twin, 3D 도면 기반 IoT·로봇·선박·히트맵 관리 등 빌딩·산업 현장의 복잡한 정보를 직관적인 공간 경험으로 설계.
  - **UX 리서치 & 사업 전략**: 한·미 이해관계자 인터뷰·섀도잉·가정 방문으로 B2B 기회 영역 발굴, 정량 조사·좌담회·가정 방문 조사를 결합한 리서치로 사용성 개선과 연동률 향상. ("80+ 인터뷰" 표현은 쓰지 않는다)
  - **기술 기반 혁신**: 통신 프로토콜·GPS·eSIM SW 엔지니어 9년 경력, 새 폼팩터 USP 발굴, 미·유럽·중국·한국 등록 특허 13건 이상.
- **보유 기술** (카테고리 · 기술 · 활용 근거)

| 카테고리 | 기술 | 활용 근거 |
|---|---|---|
| AI UX | Generative AI UX, Conversational Design, Voice UI(VUI), AI Design Automation, AI-ready Design Tokens, Prompt Engineering | GenAI 챗봇, AI 번역 체계, Figma UI 가이드 자동 생성, Bixby VUI |
| UX·UI 디자인 | UX Strategy, UI Design, Design Systems, Interaction Design, Spatial·3D UX, Multi-Device UX | Map View, Interactive View, Digital Twin, MDE |
| UX 리서치 | 정량 조사, 좌담회(FGD), IDI, 섀도잉, 가정 방문 조사, 사용성 평가, 이해관계자 매핑, 저니 맵 | 한·미 이해관계자 IDI·섀도잉·가정 방문, 스마트 아파트 3개 단지 사용성 리서치 ("80+ 인터뷰" 표현은 쓰지 않는다) |
| 기획·리더십 | UX PM(PRD 작성), 로드맵·우선순위 설계, 크로스펑셔널 리딩, 전시 콘셉트 설계 | Digital Twin UX PM, CES 2018·2024·2025 전시 |
| 도메인 | IoT, Smart Home, Smart Building, BMS, Digital Twin, 에너지 관리(BEMS), 로보틱스, B2B 솔루션 | SmartThings, SmartThings Pro, 삼성중공업·빅웨이브로보틱스 협업 |
| 프로그래밍 | Python, R, Java, C | 데이터 분석, 안드로이드 프로토타입, 임베디드 SW |
| 엔지니어링 | 모바일 통신 프로토콜(GSM, RRM, E-GPRS), GPS, SIM·eSIM, Bluetooth·BLE, Wi-Fi, 안드로이드 시스템 SW | SW 엔지니어 9년, 삼성 최초 eSIM, 연결성 UX |
| 방법론·분석 | TRIZ, 데이터 분석, 특허 발굴 | TRIZ Expert Level 2·사내 강사, Data Science Level 2, 등록 특허 13건 이상 |

- **사용 툴** (카테고리 · 툴 · 활용 근거)

| 카테고리 | 툴 | 활용 근거 |
|---|---|---|
| AI 툴 | Gemini, ChatGPT, Claude, Midjourney, Adobe Firefly, AI 영상·음악 생성 툴 | UX 그룹 AI 툴 도입·운영 담당, AI 디자인 자동화 개발 |
| 디자인 | Figma, Sketch | 조직 Figma 도입 담당, 전 경력 UI/UX 디자인 |
| 프로토타이핑·영상 | Android Studio, Final Cut Pro X, 모션 디자인 툴 | Advanced UX 실제 동작 프로토타입, MDE·연결성 UX 프로토타입 |
| 협업·문서 | PowerPoint, Confluence, Jira | PRD 작성, 리서치 보고, 전시 콘셉트 설계 |
| 개발·디버깅 | Trace32 | SW 엔지니어 시절 시스템·프로토콜 디버깅 |

- 병역·사외 교육 과정은 포트폴리오에 쓰지 않는다.

### 6.11 수상 (대표 6건 — 이 밖의 수상도 있으므로 "6회+"로 표기)

| 연도 | 어워드 | 수상작 |
|---|---|---|
| 2026 | iF Design Award | Samsung b.IoT Digital Twin |
| 2025 | Red Dot Design Award | SmartThings Pro |
| 2025 | IDEA Design Award, Silver | NBS b.IoT Digital Twin Solution |
| 2024 | iF Design Award | SmartThings Map View |
| 2020 | iF Design Award | Immersive Home Experience |
| 2019 | Good Design Award, Silver | Samsung Home IoT Resident App |

### 6.12 특허 · GUI 디자인 (등록 13건 · 출원 5건 — 같은 특허는 1건으로 세고, 이 밖의 등록 특허도 있으므로 "13건+"로 표기)

원본: `D:\_Code_\Portfolilo_Refer\특허_20251018.xlsx` (2023년까지 정리, 2026-09-26 반영). 표에는 연속 출원·해외 등록 번호를 모두 적는다.

| 분야 | 제목 | 국가 / 번호 | 상태 |
|---|---|---|---|
| Form Factor | Dual Display Camera Form Factor | US10681263, US11089206, CN ZL201780021199.8 | 등록 |
| Form Factor | Rotational UI for Upside-Down Device | US10560565, US11082551 | 등록 |
| Form Factor | 16:9 이상 디스플레이의 Flexible SW Navigation Key | US10852944 | 등록 |
| USP | Landscape Keypad with Multi Window | US10444920, US10642437, US11093049 | 등록 |
| USP | Extra Area in Multi Window | US10295870 | 등록 |
| Camera UX | 수중 촬영 판단 및 터치 없는 카메라 사용 | US11042240 | 등록 |
| Adaptive UI | Chameleon UX | EP3457268 (DE, IT), US10990196 | 등록 |
| Emotion UX | Emotion to Layer | US10078441 | 등록 |
| Voice UX | Voice UX | US10049662, CN ZL201610178076.2 | 등록 |
| MDE | BLE Advertisement 기반 Adaptive Easy Pairing | US10911920, EP3639538 (DE), KR 10-2301386 | 등록 (이전 '출원 US 16/014,716'에서 등록) |
| GUI Design | 스마트 아파트 엘리베이터·디머·온도조절기 GUI (디자인 3건) | KR 30-1059416, 30-1059418, 30-1059420 | 등록 |
| Spatial IoT | 2D/3D 맵에서의 IoT | PCT/KR2024/007937 | 출원 |
| Spatial IoT | IoT 기기·모드·자동화 사용성 개선을 위한 맵뷰 시스템 | US 19/191,822 | 출원 |
| B2B IoT | 관리자를 위한 IoT Location UX | KR P20200031273 | 출원 |
| AI | 머신러닝 기반의 보정된 신뢰성 있는 인포그래픽 제공 | PCT/KR2019/007522, US 17/268,767 | 출원 |
| MDE | 클라우드 정보를 이용한 Connection Switching | US 16/960,862 | 출원 |

등록 건수 = 특허 10건 + GUI 디자인 3건 = 13건. 종료(포기·미등록)된 출원(Snip it, Here and Now, Easy Peek View 등)은 싣지 않는다.

등록 특허는 Google Patents 링크를 건다 (`https://patents.google.com/patent/US10681263` 형식). 링크가 실제로 열리는지 반드시 확인한다.

### 6.13 Work 흐름 챕터 (`src/content/chapters.ko.json`)

Work 탭은 최신 챕터가 위, 가장 오래된 챕터가 아래. `bridge`는 앞 단계에서 이 단계로 넘어온 이유를 한 줄로 적는다.

| CH | 제목 | 기간 | 케이스 | bridge |
|---|---|---|---|---|
| 6 | AI UX & 디자인 자동화 | 2026.01 – 현재 | 01 GenAI | 복잡해진 B2B 솔루션을 누구나 쉽게 쓰도록, 대화형 AI와 디자인 자동화로 |
| 5 | B2B 공간 플랫폼 확장 | 2023.09 – 2026.01 | 02 Interactive View, 03 Digital Twin | B2C Map View에서 검증한 공간 경험을 빌딩·단지·선박 운영으로 확장 |
| 4 | 공간 UX 고도화 | 2023.01 – 2023.12 | 04 Map View | 스마트 아파트 연동으로 쌓은 도면·기기 경험을, 목록 대신 3D 공간에서 보는 경험으로 |
| 3 | B2B 신사업 리서치 → 사업화 | 2018.09 – 2022.12 | 05 스마트 아파트 리서치, 06 B2B Home IoT | 기기 연결 경험을 바탕으로, SmartThings를 B2B로 넓힐 기회를 리서치로 찾고 사업화 |
| 2 | Mobile UX | 2014.04 – 2018.09 | 07 MDE, 08 Advanced UX | 기술을 깊이 아는 엔지니어에서, 그 기술을 쓰는 사람의 경험을 설계하는 UX로 |
| 1 | Engineering | 2005.02 – 2014.03 | 09 Software Engineer | 통신·시스템·SIM/eSIM 개발로 기술의 깊이를 쌓은 출발점 |

---

## 7. PDF 생성 (완료 2026-09-26)

- `npm run pdf` = 빌드 → `scripts/build-pdf.ts`가 미리보기 서버(`scripts/preview-server.ts`, 포트 4455)를 띄우고 Playwright(Chromium, 라이트 모드)로 인쇄 → pdf-lib로 합쳐 `public/pdf/`에 4개 파일 생성
- 페이지 구성은 **`scripts/pdf-config.ts`** 한 곳에서 섹션 id로 정한다 (KO·EN 공통, 섹션 하나 = 1920×1080 한 페이지)
  - **전체본** `KyungJun_Lee_Portfolio_Full_{KO,EN}.pdf` (50p): 홈 hero·capabilities·career → 케이스 01–06 전체 → 07–09는 cover·impact만 → /recognition 전체 → 홈 recognition(수상·연락처)으로 마무리
  - **요약본** `…_Summary_{KO,EN}.pdf` (8p): 홈 hero → 케이스 01–03 cover·design(첫 핵심 설계) → 홈 recognition
- 인쇄 규칙 (`src/styles/print.css`): `@page 1920px 1080px`, 헤더·푸터·케이스 하단 내비(`.case-nav`)·복사 버튼 숨김, 배경색 출력
- **인쇄 시 데스크톱 레이아웃 강제**: Chromium PDF 인쇄는 폭 미디어쿼리를 종이 폭(약 816px)으로 판단한다. 그래서 데스크톱 규칙은 `@media (min-width: 1024px), print`, 태블릿·모바일 규칙은 `@media screen and (max-width: …)`로 쓴다 (새 미디어쿼리도 이 규칙을 따른다)
- 스크립트가 확인하는 것: 섹션 누락, 1080px 넘침, 페이지 수 = 선택한 섹션 수(빈 페이지 없음), 파일당 20MB 이하. 링크는 `https://uookie.net/…` 절대 주소로 바꿔 PDF에서도 클릭된다
- `public/pdf/`에 파일이 있으면 /resume에 다운로드 칸이 자동으로 나타나고 하단 "이메일로 요청" 문구는 사라진다
- 콘텐츠를 고친 뒤에는 `npm run pdf`를 다시 실행해 PDF를 최신으로 맞춘다

---

## 8. Figma 전환 (완료 2026-09-26)

Claude Code가 Figma에 직접 올릴 수는 없다 (Figma 쓰기 연결 없음). 파일을 만들고 사용자가 가져온다. `export/`는 생성물이라 git에 올리지 않는다.

- **다이어그램 SVG** — `npm run export-svg` (`scripts/export-svg.ts`) → `export/svg/{ko,en}/<케이스>--<키>.svg` (언어별 13개) + `export/svg/index.md`
  - 대상: `CasePage.astro`에서 `data-diagram="<키>"`로 표시한 코드 도식 (새 도식을 `diagrams` 목록에 추가하면 자동 포함)
  - 계산된 스타일을 속성으로 굳힘(CSS 변수·color-mix → 실제 색), class·style 제거, 글자는 `<text>` + `font-family="Pretendard"` 유지 (아웃라인 변환 금지)
  - 제외: Advanced UX 커버(사진 기반 HTML), 폼팩터 매트릭스(HTML 표). GenAI 커버 SVG는 사진 위 AI 레이어만 포함
  - Figma: Pretendard 설치 → SVG를 캔버스에 끌어다 놓기 → 편집 가능한 벡터·텍스트 레이어
- **디자인 토큰** — `npm run tokens`(빌드 시 자동) → `export/tokens.json`(원본, DTCG) + `export/tokens/light.tokens.json`·`dark.tokens.json`(모드별로 값을 푼 세트)
  - Figma: Tokens Studio 플러그인에서 두 파일을 light·dark 세트로 불러와 Variables로 내보내기
- 가져오기 안내는 `export/README.md`에 자동 생성된다
- (선택) 페이지 전체는 배포 후 html.to.design 플러그인으로 가져올 수 있다 — 레이아웃은 flex/grid 위주로 유지

---

## 9. 배포 (uookie.net)

1. 저장소: https://github.com/kj197835/Uookie (공개). 소스는 `master`, 빌드 결과는 `gh-pages` 브랜치
2. **배포는 요청 시에만**: `npm run deploy` → 빌드 후 `dist/`를 `gh-pages` 브랜치에 SSH로 강제 푸시(`scripts/deploy-pages.mjs`, `.nojekyll` 포함). `master` 푸시만으로는 사이트가 바뀌지 않는다.
3. GitHub Pages 설정: Settings → Pages → Source **Deploy from a branch** → `gh-pages` / `(root)` (최초 1회). `.github/workflows/deploy.yml`은 예비용(수동 실행 전용)
4. 커스텀 도메인: `public/CNAME` = `uookie.net` (DNS 연결 완료: A 레코드 185.199.108–111.153, `www` → `kj197835.github.io`). Settings → Pages에서 Enforce HTTPS
5. 공개 범위: **전체 공개로 결정 (2026-09-26).** 비밀번호 없이 누구나 볼 수 있게 하고, 검색 엔진 노출도 허용한다(`robots.txt` Allow). 작업용 페이지(`/dev/*`)와 준비 중 페이지만 `noindex`.
6. 폴더 안의 어떤 `.docx`(Word) 파일도 저장소에 올리지 않는다(`.gitignore`의 `*.docx`). GitHub 업로드(푸시)와 배포는 각각 사용자가 요청할 때만 한다.

- Claude Code는 사용자가 요청하면 **직접** 커밋·푸시(SSH `git@github.com:kj197835/Uookie.git`, `master`)와 배포(`npm run deploy`)를 진행한다. 요청이 없으면 하지 않는다. 푸시 전에 `.docx`·전화번호가 없는지 확인한다.
- 계정 설정(SSH 키 등록, Pages 설정, DNS)은 사용자가 직접 한다. 이 PC의 SSH 키 `~/.ssh/id_ed25519`는 GitHub 계정에 등록 완료.

---

## 10. 보안 · 대외비 규칙 (반드시 준수)

- **삼성 내부 문서·화면을 그대로 사용하지 않는다.** 사용자가 제공하는 이미지도 공개 자료(수상 페이지, 삼성 뉴스룸, CES 공개 자료)인지 확인한다.
- **리서치 보고서의 대외비 수치를 쓰지 않는다.** 만족도 점수 등 Ipsos·리서치 에이전시 보고서의 세부 수치 금지. 위 "콘텐츠 소스"에 있는 숫자만 사용한다.
- **인터뷰 대상 기업명·인물 사진 금지.** 이해관계자는 역할명(개발사, 관리 업체 등)으로만 표기한다.
- **재구성 목업·컨셉 이미지에는 캡션을 단다** (`ConceptFigure`가 자동 표시): "컨셉 이미지 · 포트폴리오용으로 재구성했으며 실제 화면이 아닙니다 / Reconstructed for portfolio, not a real screen". 공개 공식 이미지(samsung.com 등)를 쓰면 출처 링크를 함께 단다.
- 개발 중인 AI 시스템(케이스 1)은 원칙·구조 수준으로만 설명하고 진행 중·대외비 배지를 단다. **AI 챗봇 판매 고객사 이름은 절대 쓰지 않는다.**
- 개인 연락처가 든 원본 문서(경력기술서 `.docx` 등)는 저장소·사이트 어디에도 올리지 않는다.
- 확인되지 않은 비교 주장(예: 경쟁사보다 먼저)은 "콘텐츠 소스"에 근거 링크가 있는 것만 쓴다.

---

## 11. 확인 필요 항목 (TODO — 사용자 확인 후 반영)

- [ ] 연동 아파트 **단지 수** (현재는 가구 수 13만+만 사용. 1만 단지는 가구 수와 맞지 않아 제외함)
- [x] US 16/014,716 → 등록(US10911920 등) 확인, US 16/960,862는 출원 유지 (2026-09-26, 특허_20251018.xlsx 기준)
- [ ] P20200031273의 공식 출원번호, 2023년 이후 특허 상태
- [x] Map View "이후 LG도 도입 발표" — 근거 링크 없음, 사용하지 않기로 결정 (2026-09-25)
- [ ] Immersive Home Experience(iF 2020)의 구체적 설명과 공식 링크
- [ ] Red Dot 2025 공식 페이지 링크
- [ ] 케이스별로 사용할 수 있는 공개 이미지 목록 (사용자 제공) — 01–07 완료, 08–09는 "이미지·다이어그램 추가 예정" 자리 표시 상태
- [ ] `public/images/*/refer/` 참조 이미지를 사이트와 함께 공개할지, `public/` 밖(예: 루트 `refer/`)으로 옮길지
- [ ] B2B Home IoT 케이스(06)의 "천억+" 표기 유지 여부 (홈·이력서 숫자에서는 제외함)
- [x] 영문판(Phase 6) 콘텐츠 작성 (2026-09-26) — 영문 문구는 원어민 검토를 권장
- [x] 상세 케이스의 공개/비공개 범위 — 전체 공개 (2026-09-26)

---

## 12. 작업 단계 (Phase마다 멈추고 사용자 확인)

| Phase | 내용 | 상태 (2026-09-26) |
|---|---|---|
| 1 · 셋업 | Astro, 폴더 구조, 토큰, Pretendard, `Section`, 레이아웃·내비 | ✅ 완료 |
| 2 · 콘텐츠 구조화 | 콘텐츠 소스 → `src/content/` | ✅ KO·EN 완료 |
| 3 · 홈 + 케이스 3 시안 | 홈 전체, Digital Twin 여정 다이어그램 | ✅ 완료 |
| 4 · 나머지 케이스 | 케이스 9개 + Work 챕터 타임라인 | 🔶 내용 9개 완료, 이미지는 01–07 완료 (08–09 이미지 대기) |
| 5 · About / Recognition / Resume | | ✅ 완료 |
| 6 · 영문판 | `/en` | ✅ 완료 — 모든 페이지·케이스 9개·다이어그램 EN, 16:9 넘침 없음 |
| 7 · PDF | 전체본·요약본 KO·EN | ✅ 완료 — `npm run pdf` (전체본 50p, 요약본 8p) |
| 8 · SVG·토큰 내보내기 | Figma용 | ✅ 완료 — `npm run export-svg`, 토큰 light/dark 세트 |
| 9 · 점검 | Lighthouse 90+, 링크, 모바일, 맞춤법 | ⏳ 부분 (특허 링크·모바일·다크 모드·16:9 넘침은 수시 점검) |
| 10 · 배포 | GitHub Pages + uookie.net | ✅ 구성 완료 — GitHub 업로드·배포는 요청 시에만 |

### 작업 규칙 (Claude Code 운영 메모)

- **콘텐츠 스키마(`content.config.ts`)를 바꾸면 실행 중인 dev 서버를 재시작**한다 (안 하면 예전 화면이 계속 보임).
- 이 PC의 Claude Code 셸에서는 Node·git PATH가 비어 있을 수 있다 → PowerShell에서 Machine+User PATH를 다시 읽은 뒤 실행한다.
- 수정 후 확인: `npm run build`(0 errors) → 미리보기 서버에서 Playwright로 모든 페이지 200 · 콘솔 에러 없음 · 16:9 섹션 넘침 없음(1280 화면, 1920×1080 인쇄) → 필요하면 스크린샷(라이트·다크·모바일).
- 금지어 점검: `지멘스|Siemens|이후 LG|80\+` 와 전화번호 패턴 `01[016789][- ]?\d{3,4}[- ]?\d{4}` → `src/`에서 0건.
- 사실 정보가 바뀌면 이 파일 6장을 먼저 고친 뒤 콘텐츠에 반영한다.
- **KO 콘텐츠를 고치면 EN 파일(`cases/en`, `*.en.json`)도 같이 고친다.** 영문은 한글보다 길어서 16:9 넘침·다이어그램 글자 넘침이 잘 생긴다 → 넘치면 글꼴을 줄이지 말고 EN 문장을 줄인다. 도형 폭이 언어마다 달라야 하면 컴포넌트에서 `__lang`으로 나눈다 (예: ResearchProcess).

### 완료 기준

- `npm run build`, `npm run pdf`, `npm run export-svg`가 오류 없이 실행된다.
- 모든 케이스가 PDF에서 페이지 중간에 잘리지 않는다.
- "10. 보안·대외비 규칙" 위반 요소가 없다.
- 모든 사실 정보가 "6. 콘텐츠 소스"와 일치한다.
