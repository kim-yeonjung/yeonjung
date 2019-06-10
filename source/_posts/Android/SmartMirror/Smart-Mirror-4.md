---
title: 'Smart Mirror #4'
thumbnail: /image/smart_mirror/smart_mirror_8.jpg
date: 2017-11-26 01:35:00
tags:
    - Smart Mirror
    - Android
    - Android Vision
---

# 실제 데이터 연동하기

이제 틀은 갖췄으니 실제 데이터를 연동해야합니다.

이번에 구현할 부분은

1. 지정시간 이후 Greeting 메시지 제거, 시간 표시
2. 날씨정보 표시

입니다.

<!-- more -->

# 시간정보 표시

먼저 일정시간 초과 후 메시지를 사라지게 만들겠습니다. 이 경우 핸들러를 사용하는게 가장 빠른데 다음과 같이 사용할 수 있습니다.

```java
@SuppressLint("HandlerLeak") Handler handler = new Handler() { public void handleMessage(Message msg) { super.handleMessage(msg); greetingTextView.setVisibility(View.GONE); timeContainer.setVisibility(View.VISIBLE); } }; handler.sendEmptyMessageDelayed(0, 4000);
```

시간정보 표시는 그렇게 어렵지 않습니다. 이미 안드로이드에서 TextClock, DigitalClock , AnalogClock 등 위젯을 지원하고 있으며 별도의 작업 없이 추가만 하면 알아서 시간을 표시합니다.

```xml
<TextClock
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:textColor="@android:color/white"
        android:maxLines="1"
        android:alpha="0.5"
        android:format24Hour="hh:mm:ss"
        android:textSize="@dimen/greeting_message_size" />
```

저는 이 중에서 TextClock을 사용하였는데 여기서 별도로 수정한 부분은 alpha와 format24Hour 입니다. 거울위에 반투명하게 표시하기 위해서 alpha값을 변경하였으며 TextClock은 기본적으로 시간과 분만 표시하기 때문에 초까지 표시하기 위해서 format24Hour 의 값을 hh:mm:ss로 설정하였습니다. 이 부분은 대부분의 언어, 프로그램에서 시간을 표시하는 방법과 동일합니다.

![설명 이미지8](/image/smart_mirror/smart_mirror_8.jpg)

이제 반투명하게 시간을 표시할 수 있게 되었습니다.

# 날씨 정보

날씨 정보는 현재 위치의 날씨를 인터넷에서 받아오게 구현하였는데 이 과정에서 기기의 GPS 등은 사용하지 않았습니다.

그 이유는 LocationManager 등을 사용하려면 위치정보 권한 요청을 해야 하기 때문에 번거롭다고 생각하였고 웹사이트에서 사용하는 ip 기반 위치 조회를 사용하였습니다.

그리고 날씨 정보는 기상청의 경우 국내만 제공하기 때문에 다국어 지원을 고려하는 입장에서는 그리 좋은 선택은 아니라고 생각하였고 참고 자료에서 사용중인 darksky의 무료 api를 사용하기로 하였습니다.

작업 순서는

1. ip주소를 활용한 위치 조회
2. darksky에서 현위치의 날씨 조회

두 순서 모두 데이터를 json형식으로 반환하기 때문에 okhttp로 값을 받아오고 이를 JSONObject로 가져왔습니다.

```java
WeatherItem weatherItem = new WeatherItem();
OkHttpClient client = new OkHttpClient();

Location location = new Location("");
location.setLatitude(37.4536);
location.setLongitude(126.7317);

Request request = new Request.Builder().url("http://ip-api.com/json").build();

try (Response response = client.newCall(request).execute()) {
	JSONObject responseJson = new JSONObject(response.body().string());
	double latitude = responseJson.getDouble("lat");
	double longitude = responseJson.getDouble("lon");
    location.setLatitude(latitude);
    location.setLongitude(longitude);
} catch (Exception e) {
	e.printStackTrace();
}

String url = "https://api.darksky.net/forecast/"
	+ params[0].getResources().getString(R.string.darksky_key)
	+ "/" + location.getLatitude() + "," + location.getLongitude();

request = new Request.Builder().url(url).build();

try (Response response = client.newCall(request).execute()) {
	JSONObject data = new JSONObject(response.body().string());
	data = data.getJSONObject("currently");

	weatherItem.setSummary(data.getString("summary"));
	weatherItem.setTemperature(data.getDouble("temperature"));
	weatherItem.setImageId(iconResources.get(data.getString("icon")));
} catch (Exception e) {
	e.printStackTrace();
}
return weatherItem;
```

![설명 이미지9](/image/smart_mirror/smart_mirror_9.jpg)

![설명 이미지10](/image/smart_mirror/smart_mirror_10.jpg)
