---
order: 4
group: featured
theme: Spatial IoT
title: SmartThings Map View
subtitle: The smart home on a 3D floor plan
summary: Proposed a SmartThings experience where you see and control devices on a 3D plan of your actual home instead of a list of icons — and launched it first for smart apartments.
period: 2023.01 – 2023.12
role: UI/UX design lead (proposed and adopted as an advanced concept in 2022, then built)
awards:
  - year: 2024
    name: iF Design Award
    url: https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
coverImage:
  src: /images/map-view/cover-if2024.jpg
  alt: SmartThings Map View key visual — a phone showing a home floor plan with device icons such as lights and air conditioners in each room, and a 'Stand lamp On' control pop-up.
  caption: 2024 iF Design Award — SmartThings Map View
  source:
    label: iF Design — SmartThings Map View
    url: https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
background:
  problem: With icon lists for device control, it was hard to grasp at a glance where devices are in the home and what state they're in.
  context:
    - title: Lists lose location
      body: When devices only appear in a list, you have to remember by name which device is in which room.
    - title: The burden of drawing a plan
      body: Asking users to draw their home themselves adds friction from the very first use.
    - title: The smart-apartment link
      body: Smart apartments already have floor plans and installed-device data that could be put to use.
approach:
  heading: From advanced concept to app launch
  items:
    - title: 2022 concept proposed and adopted
      body: Proposed showing SmartThings on a 3D plan of the actual home, and the concept was adopted.
    - title: 2023 built into the app
      body: As UI/UX design lead, brought the adopted concept into the SmartThings app.
    - title: Worked with builders
      body: Worked with builders of new complexes to connect every room and place devices automatically by space.
design:
  - label: Map View creation flow
    layout: wide
    heading: Automatic floor plans + automatic device placement
    visual:
      id: map-view-flow
      description: Six-step screen flow for creating a Map View in the SmartThings app
      flow:
        autoLabel: Auto in smart apts
        caption: Creating a Map View in the SmartThings app (general-user screens, 2023.10)
        source:
          label: Naver blog — how to make a SmartThings Map View
          url: https://m.blog.naver.com/sunshine_308/223251472006
        steps:
          - src: /images/map-view/flow-1-start.jpg
            alt: The Create Map View screen offering four ways as cards — find a floor plan, photograph a plan, draw by hand, or place rooms and walls.
            title: Create Map View
            sub: Find, photograph or draw a plan
          - src: /images/map-view/flow-2-find-complex.jpg
            alt: The find-a-floor-plan screen — locate and select the apartment complex on a map and tap to view floor plans.
            title: Find the complex
            sub: Choose it by map or search
            auto: true
          - src: /images/map-view/flow-3-select-size.jpg
            alt: The select-a-floor-plan screen showing the complex's plans by unit size.
            title: Pick the unit size
            sub: The complex's plans by size
            auto: true
          - src: /images/map-view/flow-4-3d-plan.jpg
            alt: The Map View editor, with the chosen plan turned into a room layout and tabs for layout, interior and devices.
            title: 3D plan created
            sub: Map View from the chosen plan
          - src: /images/map-view/flow-5-place-devices.jpg
            alt: The devices tab of the Map View editor — drag spaces such as laundry, kitchen and bedroom onto the plan to place devices.
            title: Place devices
            sub: Devices placed by space
            auto: true
          - src: /images/map-view/flow-6-done.jpg
            alt: A finished Map View with device icons placed in each room of the home plan.
            title: Map View done
            sub: Check and control on the space
    points:
      - title: Complex & size found
        body: In SmartThings-linked smart apartments, the complex and unit size are found and the plan loaded automatically. (②·③)
      - title: 3D plan, automatically
        body: The loaded plan becomes a 3D plan of the actual home automatically. (④)
      - title: Devices auto-placed
        body: Entrance, living-room and kitchen IoT devices land in the right spots on the plan. (⑤)
      - title: Every room
        body: Working with builders of new complexes, every room is connected and devices are placed automatically by space.
  - label: Smart apartments first
    heading: Map View launched first for smart apartments
    visual:
      id: map-view-launch
      description: SmartThings Map View for smart apartments announced (2023.07.06)
      image:
        src: /images/map-view/smart-apartment-news1.jpg
        alt: A model in a smart-apartment living room showing the SmartThings Map View on a foldable phone.
        caption: SmartThings Map View for smart apartments announced (2023.07.06, courtesy of Samsung)
        source:
          label: News1 — Samsung unveils Map View-based SmartThings home IoT
          url: https://www.news1.kr/photos/6086779
    points:
      - title: Smart apartments first
        body: Introduced a Map View-based home IoT solution for smart apartments with SmartThings (announced 2023.07.06).
      - title: About four months ahead of Amazon
        body: Announced about four months before Amazon Alexa's Map View (reported 2023.11.15).
      - title: A first for IoT solutions
        body: The first IoT solution to automatically convert 2D plans to 3D and place devices automatically.
      - title: 2024 iF Design Award
        body: SmartThings Map View won a 2024 iF Design Award.
impact:
  metrics:
    - value: First
      label: IoT solution with automatic 2D→3D conversion and device placement
    - value: ~4 months
      label: Announced ahead of Amazon Alexa Map View
  results:
    - The first IoT solution with automatic 2D→3D conversion and automatic device placement
    - Announced for smart apartments on 2023.07.06, about four months ahead of Amazon Alexa's Map View (reported 2023.11.15)
    - 2024 iF Design Award
links:
  - label: News1 — Map View for smart apartments (2023.07.06)
    url: https://www.news1.kr/photos/6086779
  - label: Samsung Newsroom — 3D Map View announcement
    url: https://news.samsung.com/global/samsung-launches-3d-map-view-feature-based-on-smartthings-and-ai
  - label: iF Design Award 2024 — SmartThings Map View
    url: https://ifdesign.com/en/winner-ranking/project/smartthings-map-view/644344
  - label: Digital Today — Amazon Map View report
    url: https://www.digitaltoday.co.kr/news/articleView.html?idxno=494459
---
