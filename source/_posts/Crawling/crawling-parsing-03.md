---
title: '크롤링 그리고 파싱 #3'
thumbnail: /image/crawling/crawling_0.png
date: 2019-06-04 12:31:00
tags:
    - Crawling
    - Parsing
    - Scraping
    - 크롤링
    - 스크래핑
    - 파싱
---

> 크롤링 시리즈

1. [크롤링은 왜 하는걸까](https://duswnd25.github.io/2019/05/16/Crawling/crawling-parsing-01/)
2. [꼭 Python, Node.js 로만 가능할까?](https://duswnd25.github.io/2019/05/20/Crawling/crawling-parsing-02)
3. [크롤링을 하는데 알야야 할 것은?](https://duswnd25.github.io/2019/06/04/Crawling/crawling-parsing-03)

---

## 크롤링을 하는데 알아야 할 것은?

크롤링을 하려면 다음과 같은 내용을 한번 생각해 봐야한다.

1. 내가 원하는 정보가 정확히 무엇인가
2. 어떤 언어(환경)을 쓸것인가

특히 1번은 크롤링 뿐만 아니라 흔히 말하는 IT 서비스가 필요한 사람들 중 상당수의 문제이기도 하다.

<!-- more -->

실제로 아르바이트 하던 쇼핑몰에서 다른 쇼핑몰의 스마트폰 애플리케이션을 보고 우리도 저런 애플리케이션을 만들어달라는 요청을 했었다.

받은 내용을 보니 단순히 모바일 쇼핑몰 웹페이지를 앱으로 감싼 구조 였으며 PUSH 메시지 등의 기능은 전혀 없고 말 그대로 바로가기 정도의 역할을 하는 구조였다.

혹시나 싶어서 내용을 설명하고 이를 하기 위해 필요한 최소 비용을 설명하니 '아 그런거면 우리는 그런거 안하죠 그거 할거면 그 돈을 왜 써요' 라는 답변을 받았다.

저런 대화를 수십번을 하다보니 다른 아르바이트나 외주를 할 때도 항상 먼저 하는 작업이 정말로 원하는게 무엇인지 다시 물어보는 것 이었다. `의외로 많은 사람들이 이 작업을 왜 해야하는지 모르는 경우가 많았으며` 대화를 하다보면 처음 요구사항이 A 였다면 대화가 끝난뒤에는 Z 정도 되는 경우도 자주 있었다.

2번의 어떤 환경을 쓸것인가는 업무에 적합한 내용을 선택하면 되는 문제니 개인의 취향과 업무 환경에 맞추면 된다. VBA 쓰는 사람이면 VBA를 사용하면 되고 Node.js를 쓰면 Node.js 파이썬이면 파이썬 용도와 취향에 맞게 고르면 된다. 그럼에도 이렇게 언급하는 이유는 차후에 나올 Server Side Rendering 과 Client Side Rendering 의 차이 때문이다.

---

크롤링을 하기 위한 기본 지식

1. SSR (Server Side Rendering)과 CSR (Client Side Rendering) 덤으로 SPA
2. CSS Selector
3. Query와 Parameter 그리고 body

---

### SSR (Server Side Rendering)과 CSR (Client Side Rendering) 덤으로 SPA

결국에는 화면을 누가, 어떻게 렌더링하느냐는 책임전가의 문제이다. 자세한 내용은 알면 좋겠지만 핵심부터 말하자면 우리가 크롤링하려는 사이트가 데이터가 들어있는 상태로 응답을 하는가 응답먼저 하고 Javascript를 이용해서 데이터를 가져오는가 차이이다.

이 데이터의 로딩 시점의 차이 때문에 우리는 단순히 http request를 요청 할 것인가 headless browser를 사용 할 것인지 결정해야 한다. 만일 크롤링하려는 사이트가 데이터가 들어와 있는 상태의 html을 반환한다면 매우 편리하고 쉽겠지만 javascript를 사용해서 데이터를 로딩하는 사이트도 많기 때문에 headless browser또한 고려해야 한다.

웹 사이트를 분석해서 headless browser를 사용할지 결정할 수 도 있겠지만 단순히 Okhttp 등을 써서 요청을 날렸는데 받은 결과에서 데이터들이 안보인다 싶으면 사용하면 될 듯 하다.

참고로 headless browser는 웹 브라우저를 GUI없이 돌리는것을 의미한다. GUI만 빠지기 때문에 javascript를 사용할 수 있으며 스크린샷, 브라우저 테스트 등을 하는데 유용한다.

### Query와 Parameter

API를 컨트롤하기(웹페이지를 조건에 맞춰 띄우기) 위해 3가지를 쓸 수 있다.

1. parameter
2. query
3. body

3번 body의 경우에는 주로 form 등의 데이터를 담는데 사용된다. URL에서는 확인할 수 없고 크롤링 하려는 페이지가 form데이터나 json 등의 데이터 등을 전달해야 응답해주는 페이지라면 사용되겠지만 아직까지 그런 일은 거의 없었다.

1번 parameter는 URL에 포함되는 값 이다. 예를들어

https://duswnd25.github.io/2019/05/20/Crawling/crawling-parsing-02/

라는 주소에서 https://duswnd25.github.io 라는 웹사이트 주소 이후에 /값 형식으로 붙는것이 parameter라고 보면된다. 지금 주소에서는 각각 2019, 05, 20, Crawling, crawling-parsing-02 총 5개가 parameter라고 보면된다.

2번 query는 주소 이후 ? 다음부터 시작되는 값 이다. ?key=value&key=value 형태로 붙게된다.

https://www.google.com/?q=검색

이 주소에서 parameter는 없으며 q=검색 부분이 query 이다.

그렇다면 어떤 경우에는 query를 쓰고 어떤 경우에는 parameter를 쓸까? 정답은 없다. 이를 어떻게 사용하는가는 그 사이트를 또는 api를 개발한 개발자의 판단 또는 취향이기 때문에 딱히 뭐라고 하기 어렵다.

나같은 경우에는 보통 레이아웃 별로 parameter를 써서 url을 매핑하고 query를 써서 조건을 다는 편이다. 예를들어 집 주소를 parameter와 query를 써서 만든다고 한다면

http://지도.com/서울시/용산구/전자상가?건물=선인상가&호수=000

이런 식으로 자주 하는 편이다. 당연히 모든 parameter를 query로 바꿀수 도 있고 그 반대도 가능하다. 위의 주소도

http://지도.com/서울시/용산구/전자상가/선인상가/000

라던가

http://지도.com?도시=서울시&구=용산구&종류=전자상가&건물=선인상가&호수=100

처럼 바꿀 수 있다. 때문에 원하는 조건에 따라 크롤링을 하려면 둘 다 살펴봐야 한다.
