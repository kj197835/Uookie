---
order: 1
group: featured
theme: AI UX
title: GenAI UX & AI 디자인 자동화
subtitle: SmartThings Pro × AI
summary: SmartThings Pro에 AI를 결합해 복잡한 B2B 솔루션을 대화 하나로 쓰게 하고, PRD에서 Figma UI 가이드까지 디자인 작업을 AI로 자동화합니다.
period: 2026.01 – 현재
role: GenAI UX 리드, AI 디자인 자동화 기획·개발
note: 진행 중인 대외비 업무라 실제 화면·데이터 대신 원칙과 구조 수준의 컨셉 이미지로 소개합니다.
status:
  inProgress: true
  confidential: true
coverVisual: genai-hero
background:
  problem: 기능이 많고 복잡한 B2B 관리 솔루션을 누구나 쉽게 쓰게 하고, 반복되는 UI 가이드 제작을 줄여야 했습니다.
  context:
    - title: 복잡한 B2B 기능
      body: SmartThings Pro는 빌딩·공간 운영을 위한 기능이 많아, 운영자가 원하는 기능을 찾고 쓰기까지 학습 부담이 큽니다.
    - title: 반복되는 UI 가이드 제작
      body: 기획 PRD가 바뀔 때마다 디자이너가 UI 가이드를 다시 만들어야 해, 디자인–개발 간 일관성과 속도가 떨어집니다.
    - title: 다국어 품질
      body: 글로벌 솔루션으로서 자동 번역 결과의 용어와 톤이 제각각이면 제품 신뢰도가 떨어집니다.
approach:
  heading: AI를 '기능'이 아니라 '경험 설계와 작업 방식' 양쪽에 적용
  items:
    - title: GenAI 챗봇 — 기능을 대체·보강
      body: SmartThings Pro 기능을 대화로 대체·보강하는 생성형 AI 챗봇의 상위 솔루션 아키텍처와 대화형 UI를 설계했습니다.
    - title: AI 번역 체계 — 규칙부터 정의
      body: 자동 다국어 번역 기능이 일관되게 동작하도록 핵심 원칙, 톤 앤드 매너, 포맷·현지화 규칙, 용어집으로 가이드라인을 구성했습니다.
    - title: AI 디자인 자동화 — PRD에서 UI 가이드로
      body: Confluence·Jira의 PRD를 읽어 Figma UI 가이드를 자동으로 만드는 시스템을 Claude와 Figma MCP로 기획·개발하고 있습니다.
    - title: 조직의 AI 전환
      body: UX 그룹 AI 툴(Gemini, ChatGPT, Claude, Midjourney, Firefly 등)의 도입과 운영을 맡았습니다.
design:
  - label: GenAI 챗봇
    heading: 메뉴를 찾는 대신, 대화 하나로
    visual:
      id: genai-chatbot
      diagram: genai-chatbot
      description: SmartThings Pro의 여러 기능 메뉴가 AI 챗봇 대화 하나로 모이는 컨셉 이미지
    points:
      - title: 기능을 대화로 대체·보강
        body: 기기 제어, 스케쥴, 에너지 리포트처럼 메뉴를 찾아 들어가야 했던 SmartThings Pro 기능을 대화로 실행·조회하도록 설계했습니다.
      - title: 상위 솔루션 아키텍처
        body: 챗봇이 SmartThings Pro의 기능과 데이터에 어떻게 닿는지, 생성형 AI 챗봇의 상위 구조를 설계했습니다.
      - title: 대화형 UI
        body: 요청 한 줄에서 실행 결과를 확인하기까지 이어지는 대화형 UI를 설계했습니다.
      - title: SmartThings Pro 기능으로 판매
        body: AI 챗봇은 SmartThings Pro에서 지원하는 기능으로 판매되었습니다. 고객사는 대외비라 밝히지 않습니다.
  - label: AI 디자인 자동화
    heading: PRD → AI-ready 디자인 토큰 → Figma UI 가이드
    visual:
      id: genai-pipeline
      diagram: genai-pipeline
      description: Confluence·Jira PRD와 AI-ready 디자인 토큰을 Claude가 Figma MCP로 읽고 매핑해 Figma UI 가이드를 자동 생성하는 흐름의 컨셉 이미지
    points:
      - title: PRD가 원천
        body: Confluence와 Jira에 있는 PRD의 기능 정의를 UI 가이드의 출발점으로 삼습니다.
      - title: AI-ready 디자인 토큰
        body: Atlassian 디자인 토큰 체계를 기반으로, AI가 요구사항을 해석할 수 있는 디자인 토큰을 개발·표준화했습니다.
      - title: Claude + Figma MCP로 자동 생성
        body: Claude가 Figma MCP로 PRD와 토큰을 매핑해 Figma에 UI 가이드를 자동으로 만듭니다.
      - title: 매핑 구조
        body: PRD–디자인 시스템–UI 가이드 사이의 매핑 구조를 설계해, 기능 정의가 어떤 컴포넌트와 토큰으로 이어지는지 명확히 했습니다.
impact:
  results:
    - AI 챗봇이 SmartThings Pro 지원 기능으로 판매 (고객사 비공개)
    - 생성형 AI 기반 B2B 솔루션 UX의 방향과 설계 원칙 수립
    - UI 가이드 제작 자동화로 디자인–개발 간 일관성과 생산성 향상 추진 (진행 중)
    - UX 그룹의 AI 툴 도입·운영으로 팀 작업 방식 전환
    - 이 포트폴리오 사이트도 Claude와 함께 설계·제작 — 하나의 디자인 토큰 원천에서 웹·PDF·Figma를 만드는 구조
links:
  - label: SmartThings Pro — 삼성전자 비즈니스 (공식)
    url: https://www.samsung.com/sec/business/smartthingspro/
---
