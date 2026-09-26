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
- **도메인**: `uookie.net` (구매만 완료, 호스팅 미설정)
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
| 호스팅 | **GitHub Pages** (무료, GitHub Actions 빌드) | 저장소 `kj197835/Uookie`, 배포는 요청 시 수동 실행, 커스텀 도메인 `uookie.net` (2026-09-26 Cloudflare Pages에서 변경) |
| 분석 (선택) | Cloudflare Web Analytics | 쿠키 없음, 무료 |

외부 JS 프레임워크(React 등)는 인터랙션이 꼭 필요한 곳에만 Astro Island로 제한적으로 쓴다.

---

## 3. 사이트 구조

```
/                      홈: 히어로, 핵심 숫자, 대표 케이스 카드, 커리어 흐름
/work/genai            케이스 1: GenAI UX & AI 디자인 자동화
/work/interactive-view 케이스 2: SmartThings Pro Interactive View
/work/digital-twin     케이스 3: 삼성 최초 Digital Twin
/work/map-view         케이스 4: SmartThings Map View
/work/apartment-research 케이스 5: 스마트 아파트 사용성 리서치
/work/b2b-iot-research 케이스 6: B2B Home IoT 기회 발굴
/work                  Work: 9개 작업을 6개 챕터로 묶은 커리어 타임라인 (최신 → 과거, 6.13 참고)
/work/mde              초기 경력 1: MDE Effortless Connection · 연결성 · Voice UX
/work/advanced-ux      초기 경력 2: Advanced UX — 새 폼팩터 USP
/work/engineer         초기 경력 3: Software Engineer
/about                 스토리(엔지니어→UX 리더), 전체 경력 타임라인, 보유 기술·사용 툴
/recognition           대표 수상 6건(6회+), 특허·GUI 디자인 등록 목록(12건+)
/resume                이력서·경력기술서·포트폴리오 PDF 다운로드
/en/...                위와 동일 구조의 영문판
```

### 권장 폴더 구조

```
src/
  content/
    cases/ko/*.md   cases/en/*.md     # 케이스 스터디 본문 (frontmatter + 섹션)
    profile.ko.json profile.en.json   # 헤드라인, 요약, 숫자, 타임라인
    recognition.json                  # 수상·특허 (언어 공통 데이터)
  components/
    diagrams/       # SVG 다이어그램 컴포넌트
    mockups/        # 재구성 UI 목업 SVG
    Section.astro   # 16:9 페이지 섹션 래퍼
  styles/
    tokens.css      # 디자인 토큰
    print.css       # PDF용 인쇄 스타일
scripts/
  build-pdf.ts      # Playwright PDF 생성
public/
  pdf/              # 생성된 PDF
  images/           # 공개 자료 이미지 (사용자가 직접 추가)
```

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

---

## 5. 케이스 스터디 공통 구조

모든 케이스는 아래 순서의 섹션(= PDF 페이지)으로 구성한다. 케이스당 4–6 페이지.

1. **커버**: 프로젝트명, 한 줄 요약, 기간, 역할, 수상 배지
2. **배경 · 문제**: 해결해야 했던 문제와 제약
3. **내 역할 · 접근**: 무엇을 어떻게 판단했는지 (의사결정 중심)
4. **핵심 설계**: 다이어그램 또는 재구성 목업과 설명
5. **결과 · 임팩트**: 숫자, 출시, 수상, 특허
6. (선택) **배운 점**: 다음에 다르게 할 것

---

## 6. 콘텐츠 소스 (사실 정보의 유일한 기준)

### 6.1 프로필

- **이름**: 이경준 / KyungJun Lee
- **연락처**: kj197835@gmail.com (이메일·링크드인만 사용. **전화번호는 웹·PDF 어디에도 쓰지 않는다**)
- **링크드인**: linkedin.com/in/kjlee35
- **헤드라인 (EN)**: Principal UX Designer @ Samsung | Designing with AI & for AI — GenAI UX, Conversational AI, AI Design Automation | Spatial IoT · Digital Twin · UX Research | 6+ Global Design Awards · 12+ Patents
- **요약 (KO)**: SW 엔지니어 9년, UX 디자이너 12년의 경험으로 복잡한 기술을 누구나 쉽게 쓰는 경험으로 바꾸는 Principal UX Designer. 삼성전자에서 GenAI 챗봇 UX와 AI 기반 디자인 자동화를 이끌고 있으며, 삼성 최초 Digital Twin 등 공간 기반 IoT 솔루션을 0에서 1로 만들어 글로벌 디자인 어워드 6회 이상 수상. 리서치로 사업 기회를 발굴하고, 필요하면 UX PM 역할까지 맡아 실제 출시와 사업 성과로 연결.
- **요약 (EN)**: Principal UX Designer with 21 years at Samsung Electronics — 9 as a software engineer and 12 in UX — who turns complex technology into experiences anyone can use. Currently leading GenAI chatbot UX and AI-driven design automation. Built Samsung's first Digital Twin and spatial IoT products from 0 to 1, earning 6+ global design awards and 12+ granted patents.

### 6.2 핵심 숫자 (홈 히어로)

| 숫자 | 설명 |
|---|---|
| 21년 | 삼성전자 경력 (SW 9년 · UX 12년) |
| 6회+ | 글로벌 디자인 어워드 (Red Dot · iF · IDEA · Good Design 등) |
| 12건+ | 등록 특허·GUI 디자인 (+ 출원 6건) |
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
  - AI 디자인 자동화 (개발 중): 기획 PRD의 기능 정의로부터 Figma UI 가이드를 AI가 자동 생성하는 시스템
  - AI-ready 디자인 토큰 개발·표준화, PRD–디자인 시스템–UI 가이드 간 매핑 구조 설계
  - UX 그룹 AI 툴(Gemini, ChatGPT, Claude, Midjourney, Firefly) 도입·운영
- **성과**
  - 생성형 AI 기반 B2B 솔루션 UX의 방향과 설계 원칙 수립
  - UI 가이드 제작 자동화로 디자인–개발 간 일관성과 생산성 향상 추진
- **시각 자료 아이디어**
  - PRD → AI-ready 토큰 → Figma UI 가이드 자동 생성 파이프라인 다이어그램
  - 챗봇 대화 UI 재구성 목업 (일반화된 B2B 시나리오)
  - 번역 가이드 체계 구조도 (원칙 / 톤 / 규칙 / 용어집)
- **메타 스토리**: 이 포트폴리오 사이트 자체를 AI(Claude)와 함께 설계·제작했다는 과정을 짧게 소개한다.
- **주의**: 개발 중인 내부 시스템이므로 방법론과 원칙 수준으로만 설명한다. 실제 화면·데이터 금지.

### 6.5 케이스 2 — SmartThings Pro Interactive View (2024.03 – 2026.01)

- **역할**: UI/UX 디자인 리드 (Interactive View 콘셉트 설계 포함), 전시 콘셉트 설계·운영
- **배경**: 기존 강자가 있는 빌딩 관리(BMS) 시장에 후발 주자로 진입하며 확실한 차별점이 필요
- **주요 업무**
  - SmartThings Pro 초기부터 참여. B2C Map View 경험을 B2B로 확장해 대규모 빌딩 운영자 효율에 맞게 재설계
  - 2D 건물 도면 → 3D 맵 자동 변환, B2B IoT와 B2C(SmartThings) 기기를 한 공간에서 배치·관리, 편집·필터 기능
  - 로봇: 빅웨이브로보틱스 연동, 배달·안내·청소 상업 로봇의 셋업·이동·상태를 3D 맵에서 실시간 표시 (4족 보행 로봇 확장 예정)
  - 선박: 삼성중공업과 협업, 전 세계 운항 선박의 위치·운영 관리
  - 히트맵: 히트맵 센서·CCTV로 3D 맵에 재실 히트맵 구현, 에너지 절감 솔루션에 적용
- **성과**
  - 2024.11 SmartThings Pro 출시, Interactive View가 솔루션의 대표 차별화 기능으로 전면 배치
  - CES 2025 SmartThings Pro·선박 부스 콘셉트·디자인 리드 및 운영, KIES 2025·AW 2025 전시 화면 설계
  - SmartThings Pro와 기아 PV5 PBV 협업으로 모빌리티 연동 확장
  - **2025 Red Dot Design Award** (SmartThings Pro)
- **시각 자료 아이디어**: 2D 도면 → 3D 맵 변환 도식, 레이어(IoT·로봇·선박·히트맵) 구조도, 재구성 3D 플로어플랜 목업
- **공개 링크**: https://www.hyundaimotorgroup.com/ko/story/CONT0000000000171331 (기아 PV5와 SmartThings Pro 결합 언급)

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
  - CES 2024 VIP룸 소개
  - **2026 iF Design Award**, **2025 IDEA Design Award Silver**
- **공개 링크**
  - https://ifdesign.com/en/winner-ranking/project/samsung-biot-digital-twin/756774
  - https://www.idsa.org/awards-recognition/idea/idea-gallery/nbs-b-iot-digital-twin-solution/

### 6.7 케이스 4 — SmartThings Map View (2023.01 – 2023.12)

- **역할**: UI/UX 디자인 리드 (2022년 선행 콘셉트 제안·채택 후 구현)
- **배경**: 아이콘 목록 중심의 기기 제어로는 집 안 기기 상태와 위치를 직관적으로 파악하기 어려움
- **주요 업무**
  - 실제 집 구조의 3D 도면 위에 SmartThings를 표현하는 콘셉트를 2022년 제안·채택, 2023년 앱에 구현
  - 스마트 아파트는 도면을 자동으로 불러와 3D 도면을 생성하고 현관·거실·주방 IoT 기기 자동 배치
  - 신축 건설사와 협의해 모든 방까지 연동, 공간별 기기 자동 배치
- **성과**
  - IoT 솔루션 최초로 2D→3D 자동 변환·기기 자동 배치 구현
  - 2023.07.06 스마트 아파트용 발표, 아마존 알렉사 Map View(2023.11.15 보도)보다 약 4개월 앞섬
  - **2024 iF Design Award**
- **공개 링크**
  - https://news.samsung.com/global/samsung-launches-3d-map-view-feature-based-on-smartthings-and-ai
  - https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
  - https://www.digitaltoday.co.kr/news/articleView.html?idxno=494459 (아마존 Map View 보도)
- **시각 자료 아이디어**: 아이콘 목록 vs 3D 도면 Before/After, 출시 시점 비교 타임라인(삼성 2023.07 vs 아마존 2023.11)

### 6.8 케이스 5 — 스마트 아파트 IoT 사용성 리서치 (2021.11 – 2022.12)

- **역할**: UX 리서치 리드 (설계·운영·분석), 개선안 도출 및 적용
- **배경**: 스마트 아파트에 연동된 SmartThings의 실제 사용성을 검증하고, 낮은 연동률의 원인을 찾아 개선할 필요
- **대상 단지**: 래미안 리더스원(서초), 과천 센트럴파크 푸르지오(과천), 도화 더샵(인천)
- **방법**
  - 파일럿 조사 후 방법론을 개선하고 조사 인력·대상을 확대해 본조사 진행 (리서치 에이전시: Ipsos Korea)
  - 모집 공고·스크리너·쿼터 설계
  - 3일 사용 과제: 기기 제어, 서비스 알림, 모드, 자동화, 가족 초대·공유 (5개 시나리오)
  - 단지별 정량 조사(약 30세대), 좌담회(2그룹 × 4세대, 젊은 자녀 세대 / 중장년 세대), 가정 방문 조사
- **핵심 인사이트**: 연동·온보딩이 최대 허들 / 모드·자동화는 구체적 사용 장면을 떠올리지 못해 설정이 어려움 / 가족 구성원의 생활 패턴 차이 / 선호 프리셋(강력 환기, 외출 모드, 미세먼지 자동화)
- **성과**
  - 프리셋 기반 모드·자동화, 연동 간소화 등 개선 적용
  - SmartThings 연동률 **8% → 12%**, 자체 앱이 없는 단지는 **40~50% → 80~90%**
  - 세 단지에 동일하게 적용 가능한 반복형 리서치 프로세스 정립
- **시각 자료 아이디어**: 리서치 퍼널(모집 → 3일 과제 → 정량 → 좌담회 → 가정 방문), 인사이트 → 개선 매핑, 연동률 막대 차트

### 6.9 케이스 6 — B2B Home IoT 기회 발굴 및 사업화 (2018.09 – 2021.10)

- **역할**: B2B IoT 리서치 리드, 스마트 아파트 B2B IoT UX 설계 (전사 B2B 프로젝트, 무선사업부 대표로 차출)
- **배경**: B2C 중심의 SmartThings를 B2B로 확장하기 위해, 어느 영역에 사업 기회가 있는지부터 찾아야 하는 상황
- **Phase 1 · 기회 발굴 (2018–2019)**
  - 스노볼 리서치: 가설 → 1차 내부 워크숍(2018.11) → 파일럿 IDI(미국 9, 한국 6) → 미국 워크숍(2018.12) → 한국 크리에이티브 워크숍(2019.01) → 2차 내부 워크숍·방향 재설정(2019.01) → 본조사(미국 25+16, 한국 24+16; IDI·섀도잉·가정 방문) → 미국(2019.02)·한국(2019.03) 종합 워크숍
  - 미국: 샌프란시스코, 애틀랜타, 댈러스, LA
  - 이해관계자 전체 매핑: 시행사·시공사·설계사·IoT 통합 업체·설치 업체·관리 업체·홈넷사·통신사·입주민
  - 결론: 한국은 **시공사**가 핵심 의사결정자, 공기질이 가장 강한 가치 / 미국은 **대형 멀티패밀리 개발사**가 핵심 타깃, 비용·에너지 절감과 ROI 증명이 핵심
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
- **시각 자료 아이디어**: 스노볼 리서치 프로세스(원이 점점 커지는 도식), 한·미 이해관계자 맵(기업명 없이 역할만), 기회 영역 도출 프레임

### 6.10 초기 경력 (Work 상세 페이지 `/work/mde`, `/work/advanced-ux`, `/work/engineer`)

- **MDE Effortless Connection · 연결성 · Voice UX (2016.09 – 2018.09)**
  - 역할: UX 리드 및 UX/UI 디자인
  - 배경: 기기가 늘어날수록 복잡해지는 기기 간 연결을 누구나 쉽게 만들 필요
  - MDE Effortless Connection (2017.01–2018.01): MX 첫 Multi Device Experience 콘셉트 UX 리드. 웨어러블·오디오·IoT 제품의 첫 연결(OOBE) 이지 페어링 UX 설계
  - 무선·가전·VD 사업부와 업계 표준까지 연결 방식 통합, CES 2018 전시관 콘셉트 설계
  - Bixby VUI: SmartThings와 연결성 기능(Bluetooth, BLE, Wi-Fi, 핫스팟)의 음성 인터랙션 설계
  - Bluetooth, Wi-Fi(Direct·미러링 포함), 모바일 네트워크, 핫스팟 UX/UI 담당. 엔지니어 배경으로 복잡한 무선 기술을 쉬운 경험으로 설계
  - SmartThings(Samsung Connect) 워치 UX, 모바일 Quick Panel UX 담당
  - 성과: CES 2018 MDE 첫 주제 선정, 모든 삼성 모바일 제품에 적용 / 특허 출원 US 16/014,716(BLE 기반 Adaptive Easy Pairing), US 16/960,862(클라우드 기반 Connection Switching)
- **Advanced UX — 모바일 새 폼팩터 USP 발굴 (2014.04 – 2016.09)**
  - 역할: 콘셉트 발굴, UX 디자인, 안드로이드 실제 프로토타이핑 (1인 3역)
  - 배경: 새 폼팩터에 맞는 차별화 경험(USP)을 발굴하고 기술 구현 가능성까지 빠르게 검증할 필요
  - 개발에서 UX로 전환해, 콘셉트 제안부터 디자인과 실제 동작 프로토타입까지 한 번에 검증하는 Advanced UX 그룹에서 활동
  - Android Studio(Java)로 실제 프로토타입 제작, Voice Avatar·Implicit Voice·Camera Vision 등 선행 과제 수행
  - TRIZ 방법론을 활용한 UX 콘셉트·특허 발굴
  - 성과: Flexible SW Navigation 등 새 폼팩터 콘셉트 발굴, 갤럭시 S8 적용 / 전면 카메라 펀치홀 USP 콘셉트 발굴 / 듀얼 디스플레이 카메라 UX 발굴, 갤럭시 폴드 USP 적용(US10681263)
- **Software Engineer — 무선사업부 (2005.02 – 2014.03)**
  - 역할: 모바일 통신 프로토콜, 시스템 SW, SIM/eSIM 개발 (C, Trace32)
  - SIM & eSIM (2011–2014): 삼성 SIM·eSIM 기능 글로벌 담당. 미국 Sprint와 삼성 최초 eSIM 구현 주도, SIM 팀 코드 리뷰어 리드
  - System SW (2008–2011): AT&T, T-Mobile, Verizon 안드로이드폰 시스템 SW 담당, GPS 드라이버 개발, 삼성 첫 안드로이드폰(갤럭시 A, 갤럭시 S) 메모리 디버깅
  - 통신 프로토콜 (2005–2008): 글로벌 GSM 모듈 주요 담당. RRM, E-GPRS 개발. 미국 전역, 폴란드, 중국 광저우, 인도, 베트남, 인도네시아 현장 테스트·검증·수정까지 종합 수행

### 6.10b 핵심 역량 · 보유 기술 · 사용 툴 (경력기술서 기준)

- **핵심 역량 4개**
  - **AI UX & 디자인 자동화**: GenAI 챗봇 UX·솔루션 아키텍처, AI 번역 가이드 체계, PRD 기반 Figma UI 가이드 자동 생성과 AI-ready 디자인 토큰 표준화. UX 그룹 AI 툴 도입·운영 담당.
  - **복잡계 B2B 공간 UX**: Digital Twin, 3D 도면 기반 IoT·로봇·선박·히트맵 관리 등 빌딩·산업 현장의 복잡한 정보를 직관적인 공간 경험으로 설계.
  - **UX 리서치 & 사업 전략**: 한·미 이해관계자 인터뷰·섀도잉·가정 방문으로 B2B 기회 영역 발굴, 정량 조사·좌담회·가정 방문 조사를 결합한 리서치로 사용성 개선과 연동률 향상. ("80+ 인터뷰" 표현은 쓰지 않는다)
  - **기술 기반 혁신**: 통신 프로토콜·GPS·eSIM SW 엔지니어 9년 경력, 새 폼팩터 USP 발굴, 미·유럽·중국·한국 등록 특허 12건 이상.
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
| 방법론·분석 | TRIZ, 데이터 분석, 특허 발굴 | TRIZ Expert Level 2·사내 강사, Data Science Level 2, 등록 특허 12건 이상 |

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

### 6.12 특허 · GUI 디자인 (대표 등록 12건 · 출원 6건 — 이 밖의 등록 특허도 있으므로 "12건+"로 표기)

| 분야 | 제목 | 국가 / 번호 | 상태 |
|---|---|---|---|
| Form Factor | Dual Display Camera Form Factor | US10681263 | 등록 |
| Form Factor | Rotational UI for Upside-Down Device | US10560565 | 등록 |
| USP | Landscape Keypad with Multi Window | US10642437, US10444920 | 등록 |
| USP | Extra Area in Multi Window | US10295870 | 등록 |
| Adaptive UI | Chameleon UX | EP3457268 (DK, IT) | 등록 |
| Emotion UX | Emotion to Layer | US10078441 | 등록 |
| Voice UX | Voice UX | US10049662, CN ZL201610178076 | 등록 |
| GUI Design | 스마트 아파트 엘리베이터·디머·온도조절기 GUI | KR 30-1059416, 30-1059418, 30-1059420 | 등록 |
| Spatial IoT | 2D/3D 맵에서의 IoT | PCT/KR2024/007937 | 출원 |
| Spatial IoT | IoT 기기·모드·자동화 사용성 개선을 위한 맵뷰 시스템 | US 19/191,822 | 출원 |
| B2B IoT | 관리자를 위한 IoT Location UX | P20200031273 | 출원 |
| AI | 머신러닝 기반의 보정된 신뢰성 있는 인포그래픽 제공 | PCT/KR2019/007522 | 출원 |
| MDE | 클라우드 정보를 이용한 Connection Switching | US 16/960,862 | 출원 |
| MDE | BLE Advertisement 기반 Adaptive Easy Pairing | US 16/014,716 | 출원 |

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

## 7. PDF 생성 요구사항

- `scripts/build-pdf.ts`에서 Playwright(Chromium)로 빌드된 정적 페이지를 PDF로 출력한다.
- **페이지 크기**: 16:9 (1920×1080px, `@page { size: 1920px 1080px; margin: 0; }`)
- 각 `Section` 컴포넌트는 `break-after: page`, 페이지 안에서 잘리지 않게 `break-inside: avoid`.
- 인쇄 시 내비게이션·푸터·인터랙션 요소 숨김, 배경색 출력(`print-color-adjust: exact`).
- 링크는 PDF에서도 클릭 가능해야 한다.
- 출력물
  - `public/pdf/KyungJun_Lee_Portfolio_Full_KO.pdf` / `_EN.pdf` — 전체본 (20–30p)
  - `public/pdf/KyungJun_Lee_Portfolio_Summary_KO.pdf` / `_EN.pdf` — 요약본 (5–8p: 표지, 소개·숫자, 케이스 1–3 커버+핵심 1p씩, 수상·특허, 연락처)
- 목표 용량: 각 PDF 20MB 이하.
- `npm run pdf` 한 번으로 네 개 PDF가 모두 생성되게 한다.

---

## 8. Figma 전환 요구사항

- 모든 다이어그램·목업 SVG는 `npm run export-svg`로 `export/svg/` 폴더에 개별 파일로 내보낸다. (Figma에 코드 붙여넣기 또는 드래그 앤 드롭용)
- SVG 텍스트는 `<text>` 요소로 유지하고 `font-family: Pretendard`를 지정한다 (아웃라인 변환 금지).
- 디자인 토큰을 `export/tokens.json`으로도 내보낸다 (Figma Variables·Tokens Studio 가져오기용).
- 페이지 전체는 사용자가 html.to.design 플러그인으로 가져온다. 이를 위해 레이아웃은 flex/grid 위주의 단순한 구조로 유지한다.

---

## 9. 배포 (uookie.net)

1. 저장소: https://github.com/kj197835/Uookie (공개). 소스는 `master`, 빌드 결과는 `gh-pages` 브랜치
2. **배포는 요청 시에만**: `npm run deploy` → 빌드 후 `dist/`를 `gh-pages` 브랜치에 SSH로 강제 푸시(`scripts/deploy-pages.mjs`, `.nojekyll` 포함). `master` 푸시만으로는 사이트가 바뀌지 않는다.
3. GitHub Pages 설정: Settings → Pages → Source **Deploy from a branch** → `gh-pages` / `(root)` (최초 1회). `.github/workflows/deploy.yml`은 예비용(수동 실행 전용)
4. 커스텀 도메인: `public/CNAME` = `uookie.net` (DNS 연결 완료: A 레코드 185.199.108–111.153, `www` → `kj197835.github.io`). Settings → Pages에서 Enforce HTTPS
5. 공개 범위: **전체 공개로 결정 (2026-09-26).** 비밀번호 없이 누구나 볼 수 있게 하고, 검색 엔진 노출도 허용한다(`robots.txt` Allow). 작업용 페이지(`/dev/*`)와 준비 중 페이지만 `noindex`.
6. 폴더 안의 어떤 `.docx`(Word) 파일도 저장소에 올리지 않는다(`.gitignore`의 `*.docx`). GitHub 업로드(푸시)와 배포는 각각 사용자가 요청할 때만 한다.

Claude Code는 배포 설정 파일과 안내만 준비하고, 계정 로그인·DNS 변경은 사용자가 직접 한다.

---

## 10. 보안 · 대외비 규칙 (반드시 준수)

- **삼성 내부 문서·화면을 그대로 사용하지 않는다.** 사용자가 제공하는 이미지도 공개 자료(수상 페이지, 삼성 뉴스룸, CES 공개 자료)인지 확인한다.
- **리서치 보고서의 대외비 수치를 쓰지 않는다.** 만족도 점수 등 Ipsos·리서치 에이전시 보고서의 세부 수치 금지. 위 "콘텐츠 소스"에 있는 숫자만 사용한다.
- **인터뷰 대상 기업명·인물 사진 금지.** 이해관계자는 역할명(개발사, 관리 업체 등)으로만 표기한다.
- **재구성 목업에는 캡션을 단다**: "포트폴리오용으로 재구성한 화면입니다 / Reconstructed for portfolio".
- 개발 중인 AI 시스템(케이스 1)은 원칙·구조 수준으로만 설명한다.
- 확인되지 않은 비교 주장(예: 경쟁사보다 먼저)은 "콘텐츠 소스"에 근거 링크가 있는 것만 쓴다.

---

## 11. 확인 필요 항목 (TODO — 사용자 확인 후 반영)

- [ ] 연동 아파트 **단지 수** (현재는 가구 수 13만+만 사용. 1만 단지는 가구 수와 맞지 않아 제외함)
- [ ] 출원 특허 중 US 16/014,716, US 16/960,862의 등록 여부, P20200031273의 공식 출원번호
- [x] Map View "이후 LG도 도입 발표" — 근거 링크 없음, 사용하지 않기로 결정 (2026-09-25)
- [ ] Immersive Home Experience(iF 2020)의 구체적 설명과 공식 링크
- [ ] Red Dot 2025 공식 페이지 링크
- [ ] 케이스별로 사용할 수 있는 공개 이미지 목록 (사용자 제공)
- [x] 상세 케이스의 공개/비공개 범위 — 전체 공개 (2026-09-26)

---

## 12. 작업 단계 (Phase마다 멈추고 사용자 확인)

- **Phase 1 · 셋업**: Astro 프로젝트 생성, 폴더 구조, `tokens.css`, Pretendard 적용, `Section` 컴포넌트, 기본 레이아웃·내비게이션
- **Phase 2 · 콘텐츠 구조화**: "콘텐츠 소스"를 `src/content/`로 옮기기 (KO 먼저, EN은 영문 이력서·링크드인 문구 기준으로 번역)
- **Phase 3 · 홈 + 케이스 1개 시안**: 홈과 케이스 3(Digital Twin)을 먼저 완성해 디자인 방향 확정
- **Phase 4 · 나머지 케이스**: 케이스 1, 2, 4, 5, 6 순서로 제작, 다이어그램·재구성 목업 포함
- **Phase 5 · About / Recognition / Resume 페이지**
- **Phase 6 · 영문판** (`/en`)
- **Phase 7 · PDF 생성** (전체본·요약본, KO·EN) 및 인쇄 레이아웃 점검
- **Phase 8 · SVG·토큰 내보내기** (Figma용)
- **Phase 9 · 점검**: Lighthouse(성능·접근성 90+), 링크 확인, 모바일 확인, 맞춤법(표준어: "콘셉트", "스마트 아파트" 등)
- **Phase 10 · 배포 준비**: Cloudflare Pages 설정 안내, 도메인 연결 체크리스트

### 완료 기준

- `npm run build`, `npm run pdf`, `npm run export-svg`가 오류 없이 실행된다.
- 모든 케이스가 PDF에서 페이지 중간에 잘리지 않는다.
- "10. 보안·대외비 규칙" 위반 요소가 없다.
- 모든 사실 정보가 "6. 콘텐츠 소스"와 일치한다.
