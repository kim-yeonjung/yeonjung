---
title: '크롤링 그리고 파싱 #2'
thumbnail: /image/crawling/crawling_0.png
date: 2019-05-20 12:48:28
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
3. [크롤링을 하는데 알야야 할 것은?](https://duswnd25.github.io/2019/05/20/Crawling/crawling-parsing-03)

---

# 꼭 Python, Node.js 로만 가능할까?

정답부터 말하면 그렇지 않다.

크롤링 강좌, 자료 등에는 자주 등장하는 조합이 몇가지 있다. 가장 많이 등장하는 조합은

* Python + BeautifulSoup
* Python + Selenium
* Node.js + cheerio
* Node.js + Selenium

이런 조합이 가장 많이 눈에 띄는데 가장 눈에 띄는 조합은 당연 Python + BeautifulSoup 이다.

<!-- more -->

> 가장 아름다운 하나의 답이 존재한다

라는 디자인 철학에서 알 수 있듯이 주변에서 사용해본 사람들은 모두 쉽고 빠른 속도로 개발할 수 있다고 한다. 심지어 웬만한 작업 (머신러닝, 웹서버, etc) 은 모두 할 수 있으니 관련 자료가 많지 않나 싶다. (심지어 Node.js 설치하다보면 파이썬이 같이 설치된다)

물론 나는 그런 내용과 관계 없이 크롤링 작업에 파이썬을 써본적은 없다. 주로

* Java + Selenium + Jsoup
* Java + OkHttp + Jsoup
* Node.js + request + cheerio
* Node.js + puppeteer + cheerio

이런 조합으로 많이 작업했다. 물론 따로 특정 환경에서 필요하면 그 환경에 맞춰서 작업했다.

C# 코드를 작성한적도 있고 JQuery를 사용한적도 있다. 즉, 크롤링을 하는데 있어서 사용하는 언어 등은 전혀 문제가 되지 않는다. 환경에 따라 난이도의 차이는 있을지 몰라도 '저는 파이썬을 할 줄 몰라서 못할것 같아요' 같은 일은 없다는 것이다.

당연히 저는 프로그래밍을 못해서 크롤링을 못해요 라는 말도 하지 않아도 된다. 이미 다양한 자료가 있고 심지어 VBA 등에서도 크롤링이 가능하다. 구글 스프레드시트를 사용해서 하는 크롤링도 본 적 있으니 그저 찾아보기만 하면 된다.

대부분의 경우에 내가 해야 할 작업은 이미 누군가가 열심히 삽질해서 얻은 노하우를 인터넷에 공개해 놓았기 때문에 처음부터 끝까지 홀로 삽질할 걱정은 하지 않아도 된다.
