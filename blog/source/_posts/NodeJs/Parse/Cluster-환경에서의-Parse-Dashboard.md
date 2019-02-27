---
title: Cluster 환경에서의 Parse Dashboard
date: 2019-02-09 02:58:46
thumbnail: https://yeonjung.herokuapp.com/blog/image/form_tampered.png
tags:
  - parse-dashboard
  - cluster
  - node.js
---

Node.js와 웹 프레임워크를 사용해 구현한 웹 서버는 생산성이나 편의성 면에서 확실히 매력이 있습니다.

NPM의 방대한 라이브러리와 Javascript의 다양한 자료들은 부족한 실력에도 원하는 목적을 달성하게 도와줍니다.

저는 그중에서도 Node.js + Express + Parse Server + MongoDB + Parse Dashboard 구조를 주로 사용하는데

개인적으로는 Java를 좋아하지만, 학교 수업에서 배운 Tomcat + Servlet은 개인적으로는 취향에 맞지 않았고

SQL은 다들 사용하니 제 주변에선 잘 안 쓰는 MongoDB를 써보고 싶은 마음도 있긴 했지만

과거 Facebook에서 Parse.com이라는 서비스를 운영했을 때 사용한 경험이 좋아서 선호하는 경향도 있습니다.

Parse가 오픈소스가 아닌 Facebook에서 호스팅 서비스를 할 당시에는 서버 인프라를 제가 고려할 필요가 없었지만

<!-- more -->

서비스 종료 후 오픈소스로 공개된 이후에는 사용자에게는 두 가지 선택지가 생겼습니다.

Cloud 업체가 Parse를 호스팅하여 제공하는 서비스를 사용.

직접 Parse 서버를 호스팅하여 사용.

처음 이 소식을 접했을 때는 국내 업체는 Parse 호스팅을 제공하는 업체를 찾지 못하였고 외국 업체 일부가 있었으며

업체별로 어느 정도 커스텀이 들어갔기 때문에 제가 기억하는 Parse의 모습은 찾을 수 없었습니다.

또한, 당시에는 지금보다 더 지식이 없었기 때문에 외국 포럼을 검색하다 발견해서 커스텀하여 사용하고 있던

Cloud Job을 해당 호스팅 업체에 맞춰 마이그레이션 할 자신이 없었기 때문에 이왕 배우는 거 처음부터 손대보자는 생각으로

직접 Parse 호스팅에 도전하였습니다.

열심히 공부하면서 로컬에서 단순히 Node 서버만 띄웠을 때 (PM2나 cluster 사용 X)는 Dashboard에 접속하는 데 문제가 없었지만.

Cloud 서버에 올리고 더 나은 성능과 가용성을 위해 Cluster를 적용하게 되었고

기쁜 마음으로 Dashboard에 접속한 저에게는 하얀 화면의 검은 글씨가 기다릴 뿐이었습니다.

이 문제를 해결하기 위해 stack overflow도 검색하고 다양한 문서를 찾아봤지만, 해당 문제는 공식 문서에도 없었으며 (지금은 모르겠습니다)

다른 개발자들이 올린 질문의 답변도 어느 하나 저에게 도움이 되는 답변이 없었으며 엉뚱한 답변이 많았습니다.

그러던 중 해당 문제의 솔루션에 대해 언급한 내용을 github의 issues 중 하나의 댓글에서 발견하였고

(왜 이게 공식 문서에 포함이 되지 않는지 아직도 의문스러운데 어느 정도 규모있는 기업에서는 Parse Dashboard를 사용하지 않고 다른 솔루션을 사용하지 않을까 싶습니다)

해당 내용은 다음과 같습니다.

I ran into this issue after upgrading to 1.1.2 and I hunted down the root cause.

As per PR #774 (this line of code), the cookie secret will be set to a random value if you do not set it yourself. This is intentional and documented in the CLI.

So, if you are running in a load balanced environment (or in using NodeJS cluster) be sure to set your cookieSessionSecret:

From CLI:

```
--cookieSessionSecret "your-secret-here"
```

From NodeJS (options is the 2nd argument of constructor):

```
new ParseDashboard({
// settings here
}, {
  cookieSessionSecret: 'your-secret-here'
});
```

즉, 별도의 cookieSession값을 지정하지 않으면 랜덤으로 값이 지정되는데 cluster 환경 또는 로드밸런싱 환경에서는 프로세스마다 해당 값이 다르게 지정되기 때문에 발생하는 문제 같습니다.

이 문제에 대해 해결책을 알려준 JeremyPlease 에게 감사합니다.
