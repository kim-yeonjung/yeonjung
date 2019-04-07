---
title: 'Smart Mirror #2'
thumbnail: /image/smart_mirror/smart_mirror_3.jpg
date: 2017-11-25 11:32:00
tags:
  - Smart Mirror
  - Android
  - Android Vision
---

# Android Vision 알아보기
먼저 목표인 기분에 따라 달라지는 인사말 을 책임져줄 Android Vision을 알아보기로 했습니다. 여기에서 Google Sample을 찾아볼 수 있는데요 저는 여기서 FaceTracker를 사용하려고 합니다.

# FaceTracker 실행하기
실행은 그저 소스를 받아와서 컴파일 하면 끝입니다. 실행시키면 다음과 같은 화면을 볼 수 있습니다.

<!-- more -->

![설명 이미지3](/image/smart_mirror/smart_mirror_3.jpg)

다만 이 화면은 FaceTracker는 기본적으로 후면 카메라를 사용하게 되어 있는데 거울을 만들기 위해 전면으로 바꿔놓은 상태라 캡쳐하기 좀 힘들어서 비틀다보니 몇몇 얼굴이 인식되지 않았는데요. 실제로는 인식률이 좋고 거울을 여러명이 같이 볼 일은 별로 없으니 상관 없을듯 합니다.

# Android Vision 소스 수정

## Class 분리

이제 제 필요와 실력에 맞게 너프할 차례입니다. 먼저, 제가 알아보기 쉽게 하나로 합쳐져 있던 클래스를 분리하고 변수명도 제 취향에 맞게 정리하였습니다.

![설명 이미지4](/image/smart_mirror/smart_mirror_4.jpg)

## 카메라 전환

저는 거울이 목표이기 때문에 후면카메라를 전면으로 전환하려고 합니다.

![설명 이미지5](/image/smart_mirror/smart_mirror_5.jpg)

메인 액티비티에서 이 부분을

![설명 이미지6](/image/smart_mirror/smart_mirror_6.jpg)

이렇게 변경해 주면 됩니다. 거울이 목표이니 별도의 전환 기능은 필요 없습니다.

프리뷰 사이즈 조정은 마지막에 다루려고 합니다.
