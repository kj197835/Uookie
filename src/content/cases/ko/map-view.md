---
order: 4
group: featured
theme: Spatial IoT
title: SmartThings Map View
subtitle: 3D 도면 기반 스마트홈
summary: 아이콘 목록 대신 실제 집 구조의 3D 도면 위에서 기기를 보고 제어하는 SmartThings 경험을 제안하고, 스마트 아파트부터 적용했습니다.
period: 2023.01 – 2023.12
role: UI/UX 디자인 리드 (2022년 선행 콘셉트 제안·채택 후 구현)
awards:
  - year: 2024
    name: iF Design Award
    url: https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
coverImage:
  src: /images/map-view/cover-if2024.jpg
  alt: SmartThings Map View 키 비주얼. 스마트폰 화면에 집 구조 도면이 표시되고, 방마다 조명·에어컨 등 기기 아이콘과 'Stand lamp On' 제어 팝업이 떠 있다.
  caption: 2024 iF Design Award — SmartThings Map View
  source:
    label: iF Design — SmartThings Map View
    url: https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
background:
  problem: 아이콘 목록 중심의 기기 제어로는 집 안 기기의 상태와 위치를 직관적으로 파악하기 어려웠습니다.
  context:
    - title: 위치가 사라진 목록
      body: 기기가 목록으로만 보이면, 어느 방의 어떤 기기인지 이름으로 기억해야 합니다.
    - title: 도면 준비의 부담
      body: 사용자가 집 구조를 직접 그리게 하면 첫 사용부터 허들이 생깁니다.
    - title: 스마트 아파트 연결
      body: 스마트 아파트는 설계 도면과 설치 기기 정보가 있어, 이를 활용할 여지가 있었습니다.
approach:
  heading: 선행 콘셉트에서 실제 앱 출시까지
  items:
    - title: 2022 콘셉트 제안·채택
      body: SmartThings를 실제 집 구조의 3D 도면 위에 표현하는 콘셉트를 제안해 채택됐습니다.
    - title: 2023 앱 구현
      body: 채택된 콘셉트를 UI/UX 디자인 리드로서 SmartThings 앱에 구현했습니다.
    - title: 건설사와 협의
      body: 신축 건설사와 협의해 모든 방까지 연동하고, 공간별 기기 자동 배치를 적용했습니다.
design:
  - label: 맵 뷰 생성 흐름
    layout: wide
    heading: 도면 자동 생성 + 기기 자동 배치
    visual:
      id: map-view-flow
      description: SmartThings 앱에서 맵 뷰를 만드는 6단계 화면 흐름
      flow:
        autoLabel: 스마트 아파트 자동
        caption: SmartThings 앱의 맵 뷰 생성 과정 (일반 사용자 화면, 2023.10)
        source:
          label: 네이버 블로그 — 스마트싱스 맵 뷰 만드는법 사용후기
          url: https://m.blog.naver.com/sunshine_308/223251472006
        steps:
          - src: /images/map-view/flow-1-start.jpg
            alt: 맵 뷰 만들기 화면. 평면도 찾기, 평면도 촬영하기, 손으로 그리기, 방과 벽 배치하기 네 가지 방법이 카드로 제시된다.
            title: 맵 뷰 만들기
            sub: 평면도 찾기·촬영·그리기 중 선택
          - src: /images/map-view/flow-2-find-complex.jpg
            alt: 평면도 찾기 화면. 지도 위에서 아파트 단지를 찾아 선택하고 '평면도 보기' 버튼을 누른다.
            title: 아파트 단지 찾기
            sub: 지도·검색으로 단지 선택
            auto: true
          - src: /images/map-view/flow-3-select-size.jpg
            alt: 평면도 선택 화면. 선택한 단지의 평형별 평면도가 보이고 면적 크기를 고를 수 있다.
            title: 평형 선택
            sub: 단지의 평형별 평면도 선택
            auto: true
          - src: /images/map-view/flow-4-3d-plan.jpg
            alt: 맵 뷰 편집 화면. 선택한 평면도가 방 구조 도면으로 만들어지고 레이아웃·인테리어·기기 탭이 있다.
            title: 3D 도면 생성
            sub: 선택한 평면도로 맵 뷰 생성
          - src: /images/map-view/flow-5-place-devices.jpg
            alt: 맵 뷰 편집의 기기 탭. 하단의 세탁실·주방·침실 등 공간을 도면 위로 끌어다 기기를 배치한다.
            title: 기기 배치
            sub: 공간별로 기기 배치
            auto: true
          - src: /images/map-view/flow-6-done.jpg
            alt: 완성된 맵 뷰. 집 도면의 방마다 기기 아이콘이 배치되어 있다.
            title: 맵 뷰 완성
            sub: 공간 위에서 상태 확인·제어
    points:
      - title: 단지·평형 자동 선택
        body: SmartThings와 연동된 스마트 아파트는 단지와 평형을 자동으로 찾아 도면을 불러옵니다. (②·③)
      - title: 3D 도면 자동 생성
        body: 불러온 평면도로 실제 집 구조의 3D 도면을 자동으로 만듭니다. (④)
      - title: 기기 자동 배치
        body: 현관·거실·주방의 IoT 기기를 도면 위 제자리에 자동으로 배치합니다. (⑤)
      - title: 모든 방으로 확장
        body: 신축 건설사와 협의해 모든 방까지 연동하고, 공간별로 기기를 자동 배치합니다.
  - label: 스마트 아파트 적용
    heading: 스마트 아파트에 Map View를 먼저 적용
    visual:
      id: map-view-launch
      description: SmartThings 스마트 아파트용 Map View 발표 (2023.07.06)
      image:
        src: /images/map-view/smart-apartment-news1.jpg
        alt: 모델이 스마트 아파트 거실에서 폴더블 스마트폰으로 SmartThings Map View 화면을 보여주고 있다.
        caption: 스마트 아파트용 SmartThings Map View 발표 (2023.07.06, 삼성전자 제공)
        source:
          label: 뉴스1 — 삼성전자, '맵뷰' 기반 스마트싱스 홈 IoT 솔루션 선보여
          url: https://www.news1.kr/photos/6086779
    points:
      - title: 스마트 아파트부터 적용
        body: SmartThings를 적용한 스마트 아파트에 Map View 기반 홈 IoT 솔루션을 선보였습니다. (2023.07.06 발표)
      - title: 아마존보다 약 4개월 앞서
        body: 아마존 알렉사 Map View(2023.11.15 보도)보다 약 4개월 앞서 발표했습니다.
      - title: IoT 솔루션 최초
        body: IoT 솔루션 최초로 2D 도면 → 3D 도면 자동 변환과 기기 자동 배치를 구현했습니다.
      - title: 2024 iF Design Award
        body: SmartThings Map View로 2024 iF Design Award를 수상했습니다.
impact:
  metrics:
    - value: 최초
      label: IoT 솔루션 2D→3D 자동 변환·기기 자동 배치
    - value: 약 4개월
      label: 아마존 알렉사 Map View보다 앞선 발표
  results:
    - IoT 솔루션 최초로 2D→3D 자동 변환·기기 자동 배치 구현
    - 2023.07.06 스마트 아파트용 발표, 아마존 알렉사 Map View(2023.11.15 보도)보다 약 4개월 앞섬
    - 2024 iF Design Award
links:
  - label: 뉴스1 — 스마트 아파트용 Map View 발표 (2023.07.06)
    url: https://www.news1.kr/photos/6086779
  - label: Samsung Newsroom — 3D Map View 발표
    url: https://news.samsung.com/global/samsung-launches-3d-map-view-feature-based-on-smartthings-and-ai
  - label: iF Design Award 2024 — SmartThings Map View
    url: https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
  - label: 디지털투데이 — 아마존 Map View 보도
    url: https://www.digitaltoday.co.kr/news/articleView.html?idxno=494459
---
